import { FC } from 'react';
import { signInWithGoogle } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export const GoogleSignInButton: FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigate('/payment'); // Redirige a la página de pago
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
    >
      <img 
        src="/google-icon.png" 
        alt="Google Icon" 
        className="w-6 h-6"
      />
      Iniciar sesión con Google
    </button>
  );
}; 