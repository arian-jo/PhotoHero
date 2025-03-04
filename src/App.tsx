import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, ChevronLeft, Star, Zap, Shield, Users, Clock, DollarSign } from 'lucide-react';
import { User } from 'firebase/auth';
import { auth } from './firebase/config';
import { GoogleSignInButton } from './components/GoogleSignInButton';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentPage } from './components/PaymentPage';
import { LoadingSpinner } from './components/LoadingSpinner';

// Componente de cuadrícula de fotos con efecto hover
const PhotoGrid = () => {
  // Fotos generadas por el modelo AI (mostradas por defecto)
  const generatedPhotos = [
    'https://i.ibb.co/Hn1J5x1/generated1.jpg', // Foto generada 1
    'https://i.ibb.co/mGZ6RKm/generated2.jpg', // Foto generada 2
    'https://i.ibb.co/VVPMx7Y/generated3.jpg', // Foto generada 3
    'https://i.ibb.co/k4B0nZv/generated4.jpg', // Foto generada 4
  ];
  
  // Fotos de entrenamiento originales (mostradas al hacer hover)
  const trainingPhotos = [
    'https://i.ibb.co/xF3vNPy/training1.jpg', // Foto de entrenamiento 1
    'https://i.ibb.co/Lx6QQWL/training2.jpg', // Foto de entrenamiento 2 
    'https://i.ibb.co/YX1Ld6k/training3.jpg', // Foto de entrenamiento 3
    'https://i.ibb.co/VmBqxyz/training4.jpg', // Foto de entrenamiento 4
  ];

  // Estado para controlar qué celda tiene hover
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Etiqueta informativa */}
      <div className="absolute top-0 left-0 z-10 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
        PhotoHero AI Model
      </div>
      
      {/* Cuadrícula de fotos */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {generatedPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Foto generada por AI (visible por defecto) */}
            <img
              src={generatedPhotos[index]}
              alt={`AI Generated photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Foto de entrenamiento (visible al hacer hover) */}
            <div
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                hoverIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={trainingPhotos[index]}
                alt={`Training photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Indicador de que esta es una foto de entrenamiento */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                Training Photo
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm mt-4 text-purple-400">
        <p>Hover over images to see original training photos</p>
      </div>
    </div>
  );
};

// Mantengo los componentes originales por si quieres usarlos en el futuro
const PhotoCarousel = () => {
  // Fotos generadas por el modelo AI
  const generatedPhotos = [
    'https://i.ibb.co/Hn1J5x1/generated1.jpg', // Foto principal generada 
    'https://i.ibb.co/mGZ6RKm/generated2.jpg', // Otra foto generada
    'https://i.ibb.co/VVPMx7Y/generated3.jpg', // Otra foto generada
  ];
  
  // Fotos de entrenamiento originales
  const trainingPhotos = [
    'https://i.ibb.co/xF3vNPy/training1.jpg', // Foto de entrenamiento 1
    'https://i.ibb.co/Lx6QQWL/training2.jpg', // Foto de entrenamiento 2 
    'https://i.ibb.co/YX1Ld6k/training3.jpg', // Foto de entrenamiento 3
    'https://i.ibb.co/VmBqxyz/training4.jpg', // Foto de entrenamiento 4
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showingGenerated, setShowingGenerated] = useState(true);
  
  // Seleccionar el conjunto de fotos a mostrar
  const photos = showingGenerated ? generatedPhotos : trainingPhotos;
  
  // Automáticamente cambiar el conjunto de fotos cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setShowingGenerated(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Cambiar slide manualmente
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Ir al slide anterior
  const prevSlide = () => {
    setCurrentSlide(current => 
      current === 0 ? photos.length - 1 : current - 1
    );
  };
  
  // Ir al slide siguiente
  const nextSlide = () => {
    setCurrentSlide(current => 
      current === photos.length - 1 ? 0 : current + 1
    );
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Etiqueta informativa */}
      <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
        {showingGenerated ? 'AI Generated Photos' : 'Training Photos'}
      </div>
      
      {/* Carrusel principal */}
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={photo}
              alt={`${showingGenerated ? 'Generated' : 'Training'} photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Controles del carrusel */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Miniaturas */}
      <div className="flex justify-center mt-4 gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-purple-600' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      {/* Botón para cambiar entre generadas y entrenamiento */}
      <button
        onClick={() => setShowingGenerated(prev => !prev)}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-purple-400 hover:text-purple-300"
      >
        Show {showingGenerated ? 'training' : 'generated'} photos
      </button>
    </div>
  );
};

const PhotoHoverEffect = () => {
  const [showCombined, setShowCombined] = useState(false);
  
  // Imágenes individuales
  const individualPhotos = [
    'https://imgur.com/utfCqTf.jpeg', // Arriba izquierda - Traje formal
    'https://imgur.com/FN0xA5I.jpeg', // Arriba derecha - Camisa azul
    'https://imgur.com/ybnqBOt.jpeg', // Abajo izquierda - Con taza
    'https://imgur.com/bqjcHR1.jpeg', // Abajo derecha - Selfie
  ];
  
  // Imagen combinada
  const combinedPhoto = 'https://imgur.com/emFdCuj.jpeg';

  return (
    <div 
      className="relative w-full max-w-md mx-auto aspect-square"
      onMouseEnter={() => setShowCombined(true)}
      onMouseLeave={() => setShowCombined(false)}
    >
      {/* Cuadrícula de miniaturas */}
      <div className="grid grid-cols-2 gap-2 w-full h-full">
        {individualPhotos.map((photo, index) => (
          <div
            key={index}
            className="w-full h-full rounded-lg overflow-hidden hover:opacity-90 cursor-pointer transition-all duration-300"
          >
            <img
              src={photo}
              alt={`Example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Imagen combinada superpuesta con transición de opacidad */}
      <img 
        src={combinedPhoto} 
        alt="Combined AI-enhanced portrait" 
        className={`absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-opacity duration-700 ease-in-out ${showCombined ? 'opacity-100' : 'opacity-0'}`} 
      />
    </div>
  );
};

// Componente protegido que requiere autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
              {/* Hero Section */}
              <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center gap-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-center">
                    Transform Your Photos with AI
                  </h1>
                  <p className="text-xl text-gray-300 text-center max-w-2xl">
                    Create stunning AI-enhanced portraits from your photos using our advanced machine learning technology.
                  </p>
                  
                  {/* Photo Grid Component */}
                  <div className="w-full max-w-4xl mx-auto mt-8">
                    <PhotoGrid />
                  </div>

                  {/* Features Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
                    <div className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-xl">
                      <Zap className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                      <p className="text-gray-400">Get your enhanced photos in seconds</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-xl">
                      <Star className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                      <p className="text-gray-400">Professional-grade results every time</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-gray-800/50 rounded-xl">
                      <Shield className="w-12 h-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Secure</h3>
                      <p className="text-gray-400">Your photos are safe with us</p>
                    </div>
                  </div>

                  {/* CTA Section with Google Sign In */}
                  <div className="mt-12 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">
                      Ready to Transform Your Photos?
                    </h2>
                    <div className="flex justify-center">
                      <GoogleSignInButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
