import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  deleteField,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase/config.ts';

export interface UserNotificationPreferences {
  emailAlerts: boolean;
  weeklyDigest: boolean;
  communityUpdates: boolean;
}

export interface UserProfileData {
  userId: string;
  email: string;
  displayName: string;
  preferredDialect: string;
  appearance: 'light' | 'dark' | 'system';
  fontSize: 'standard' | 'large';
  showPronunciation: boolean;
  communityRole?: string;
  region?: string;
  notifications: UserNotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface SavedPhraseItem {
  id: string;
  userId: string;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  category?: string;
  date: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfileData | null;
  savedPhrases: SavedPhraseItem[];
  isLoading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signUpWithEmail: (email: string, password: string, displayName: string, preferredDialect?: string) => Promise<void>;
  logInWithEmail: (email: string, password: string) => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfileData>) => Promise<void>;
  updateNotificationPreferences: (prefs: Partial<UserNotificationPreferences>) => Promise<void>;
  updateAppearance: (appearance: 'light' | 'dark' | 'system') => Promise<void>;
  savePhraseToCloud: (phrase: { sourceText: string; targetText: string; sourceLang: string; targetLang: string; category?: string }) => Promise<void>;
  deleteSavedPhrase: (phraseId: string) => Promise<void>;
  clearAllSavedPhrases: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [savedPhrases, setSavedPhrases] = useState<SavedPhraseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const clearAuthError = () => setAuthError(null);

  // Sync profile document from Firestore
  const syncUserProfile = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfileData);
      } else {
        // Create initial default profile in Firestore
        const initialProfile: UserProfileData = {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Chin Community Member',
          preferredDialect: 'cnh',
          appearance: 'system',
          fontSize: 'standard',
          showPronunciation: true,
          notifications: {
            emailAlerts: true,
            weeklyDigest: true,
            communityUpdates: false,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, initialProfile);
        setUserProfile(initialProfile);
      }
    } catch (err) {
      console.error('Failed to sync profile from Firestore:', err);
      // Fallback local profile so user can still work
      setUserProfile({
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Chin Community Member',
        preferredDialect: 'cnh',
        appearance: 'system',
        fontSize: 'standard',
        showPronunciation: true,
        notifications: { emailAlerts: true, weeklyDigest: true, communityUpdates: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncUserProfile(user);
      } else {
        setUserProfile(null);
        setSavedPhrases([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to user's private saved phrases subcollection
  useEffect(() => {
    if (!currentUser) {
      setSavedPhrases([]);
      return;
    }

    const phrasesRef = collection(db, 'users', currentUser.uid, 'saved_phrases');
    const unsubscribe = onSnapshot(
      phrasesRef,
      (snapshot) => {
        const items: SavedPhraseItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as any),
          });
        });
        // Sort descending by date/id
        items.sort((a, b) => (b.date || b.id).localeCompare(a.date || a.id));
        setSavedPhrases(items);
      },
      (error) => {
        console.error('Error listening to saved phrases:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Sign Up with Email and Password
  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    preferredDialect: string = 'cnh'
  ) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      if (displayName) {
        await updateFirebaseProfile(user, { displayName });
      }

      const initialProfile: UserProfileData = {
        userId: user.uid,
        email: user.email || email,
        displayName: displayName || email.split('@')[0],
        preferredDialect,
        appearance: 'system',
        fontSize: 'standard',
        showPronunciation: true,
        notifications: {
          emailAlerts: true,
          weeklyDigest: true,
          communityUpdates: false,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), initialProfile);
      setUserProfile(initialProfile);
    } catch (err: any) {
      console.error('Sign up error:', err);
      let msg = 'Failed to create account. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered. Please log in instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Log in with Email and Password
  const logInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.error('Log in error:', err);
      let msg = 'Failed to log in. Please check your email and password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Access temporarily locked due to multiple failed login attempts. Please wait a few moments.';
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Log in with Google popup
  const logInWithGoogle = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await syncUserProfile(userCredential.user);
    } catch (err: any) {
      console.error('Google log in error:', err);
      let msg = 'Google sign in failed.';
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign in popup was closed. Please try again.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        msg = 'Popup request cancelled.';
      }
      setAuthError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Log Out
  const logOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
      setSavedPhrases([]);
    } catch (err: any) {
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update User Profile in Firestore
  const updateUserProfile = async (updates: Partial<UserProfileData>) => {
    if (!currentUser || !userProfile) return;
    try {
      const updatedProfile: UserProfileData = {
        ...userProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      if (updates.displayName && updates.displayName !== currentUser.displayName) {
        await updateFirebaseProfile(currentUser, { displayName: updates.displayName });
      }

      await updateDoc(doc(db, 'users', currentUser.uid), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });

      setUserProfile(updatedProfile);
    } catch (err: any) {
      console.error('Profile update error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  // Update Notification Preferences in Firestore
  const updateNotificationPreferences = async (prefs: Partial<UserNotificationPreferences>) => {
    if (!currentUser || !userProfile) return;
    try {
      const nextNotifications = {
        ...userProfile.notifications,
        ...prefs,
      };

      await updateDoc(doc(db, 'users', currentUser.uid), {
        notifications: nextNotifications,
        updatedAt: new Date().toISOString(),
      });

      setUserProfile({
        ...userProfile,
        notifications: nextNotifications,
        updatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Notification update error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
    }
  };

  // Update Appearance / Theme Mode
  const updateAppearance = async (appearance: 'light' | 'dark' | 'system') => {
    if (!currentUser || !userProfile) return;
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        appearance,
        updatedAt: new Date().toISOString(),
      });

      setUserProfile({
        ...userProfile,
        appearance,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Appearance update error:', err);
    }
  };

  // Save Phrase to user's private Firestore subcollection
  const savePhraseToCloud = async (phrase: {
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
    category?: string;
  }) => {
    if (!currentUser) return;
    try {
      const phraseId = 'phrase-' + Date.now();
      const docRef = doc(db, 'users', currentUser.uid, 'saved_phrases', phraseId);
      const newPhrase: SavedPhraseItem = {
        id: phraseId,
        userId: currentUser.uid,
        sourceText: phrase.sourceText,
        targetText: phrase.targetText,
        sourceLang: phrase.sourceLang,
        targetLang: phrase.targetLang,
        category: phrase.category || 'General',
        date: new Date().toLocaleDateString(),
      };
      await setDoc(docRef, newPhrase);
    } catch (err: any) {
      console.error('Save phrase error:', err);
      handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}/saved_phrases`);
    }
  };

  // Delete saved phrase from Firestore
  const deleteSavedPhrase = async (phraseId: string) => {
    if (!currentUser) return;
    try {
      const docRef = doc(db, 'users', currentUser.uid, 'saved_phrases', phraseId);
      await deleteDoc(docRef);
    } catch (err: any) {
      console.error('Delete phrase error:', err);
      handleFirestoreError(err, OperationType.DELETE, `users/${currentUser.uid}/saved_phrases/${phraseId}`);
    }
  };

  // Clear all saved phrases for current user
  const clearAllSavedPhrases = async () => {
    if (!currentUser || savedPhrases.length === 0) return;
    try {
      for (const phrase of savedPhrases) {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'saved_phrases', phrase.id));
      }
    } catch (err: any) {
      console.error('Clear phrases error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        savedPhrases,
        isLoading,
        authError,
        clearAuthError,
        signUpWithEmail,
        logInWithEmail,
        logInWithGoogle,
        logOut,
        updateUserProfile,
        updateNotificationPreferences,
        updateAppearance,
        savePhraseToCloud,
        deleteSavedPhrase,
        clearAllSavedPhrases,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
