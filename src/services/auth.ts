import { GoogleAuthProvider, signInWithPopup, AuthError } from 'firebase/auth';
import { auth } from '../firebase/config';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Error al iniciar sesión con Google:', {
      code: authError.code,
      message: authError.message
    });
    throw authError;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
}; 