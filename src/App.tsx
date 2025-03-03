import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, Zap } from 'lucide-react';

const Carousel3D = () => {
  // Grupos de fotos
  const generatedPhotos = [
    {
      url: 'https://imgur.com/emFdCuj.jpeg',
      label: 'Professional Portrait'
    },
    {
      url: 'https://imgur.com/bqjcHR1.jpeg',
      label: 'Business Casual'
    },
    {
      url: 'https://imgur.com/ybnqBOt.jpeg',
      label: 'Creative Shot'
    }
  ];
  
  const trainingPhotos = [
    {
      url: 'https://imgur.com/utfCqTf.jpeg',
      label: 'Original Selfie 1'
    },
    {
      url: 'https://imgur.com/FN0xA5I.jpeg',
      label: 'Original Selfie 2'
    },
    {
      url: 'https://imgur.com/ybnqBOt.jpeg',
      label: 'Original Selfie 3'
    },
    {
      url: 'https://imgur.com/bqjcHR1.jpeg',
      label: 'Original Selfie 4'
    }
  ];
  
  const [activeGroup, setActiveGroup] = useState('generated'); // 'generated' o 'training'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isCompareMode, setIsCompareMode] = useState(false);
  
  // Seleccionar el grupo activo
  const photos = activeGroup === 'generated' ? generatedPhotos : trainingPhotos;
  
  // Rotación automática
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => 
        current === photos.length - 1 ? 0 : current + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoRotating, photos.length, activeGroup]);
  
  // Cambiar entre grupos
  const toggleGroup = () => {
    setActiveGroup(current => current === 'generated' ? 'training' : 'generated');
    setActiveIndex(0);
  };
  
  // Pausar/reanudar rotación automática
  const toggleAutoRotate = () => {
    setIsAutoRotating(current => !current);
  };
  
  // Activar/desactivar modo comparativo
  const toggleCompareMode = () => {
    setIsCompareMode(current => !current);
    setIsAutoRotating(false);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Controles superiores */}
      <div className="flex justify-between mb-2">
        <button
          onClick={toggleGroup}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
            activeGroup === 'generated' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          {activeGroup === 'generated' ? (
            <>
              <Zap className="w-3 h-3" /> AI Generated
            </>
          ) : (
            <>
              <Camera className="w-3 h-3" /> Training Photos
            </>
          )}
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={toggleAutoRotate}
            className={`p-1 rounded-full ${
              isAutoRotating ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleCompareMode}
            className={`px-2 py-1 rounded-full text-xs ${
              isCompareMode ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Compare
          </button>
        </div>
      </div>
      
      {/* Carrusel principal */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800">
        {isCompareMode ? (
          /* Modo comparativo */
          <div className="grid grid-cols-2 h-full gap-1">
            <div className="relative">
              <img
                src={generatedPhotos[0].url}
                alt="AI Generated"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-purple-600/90 text-white px-2 py-1 rounded text-xs">
                AI Generated
              </div>
            </div>
            <div className="relative">
              <img
                src={trainingPhotos[0].url}
                alt="Training Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-gray-800/90 text-white px-2 py-1 rounded text-xs">
                Original
              </div>
            </div>
          </div>
        ) : (
          /* Modo carrusel */
          <div className="relative perspective">
            <div className="w-full h-full">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 scale-100 z-10'
                      : index === (activeIndex + 1) % photos.length
                        ? 'opacity-0 scale-95 translate-x-full z-0'
                        : 'opacity-0 scale-95 -translate-x-full z-0'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Etiqueta de la foto */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm">
                    {photo.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Controles de navegación */}
      {!isCompareMode && (
        <div className="flex justify-center mt-4 gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoRotating(false);
              }}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-purple-600' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Descripción */}
      <div className="mt-4 text-center text-sm text-gray-400">
        {isCompareMode
          ? "See the transformation from your original photos to AI-enhanced portraits"
          : activeGroup === 'generated'
            ? "Professionally generated AI portraits for all your needs"
            : "Just a few sample photos are all we need for training"
        }
      </div>
    </div>
  );
};

// Para usar en la Hero Section
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header permanece igual */}
      
      {/* Hero Section modificada */}
      <main className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,1fr] gap-4 items-center py-8">
          <div className="md:pl-4 lg:pl-12 xl:pl-20 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-purple-500">AI-powered</span> portraits
              <span className="block">from your everyday photos</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Our cutting-edge AI transforms your regular photos into stunning professional portraits. Just upload a few photos and see the magic happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition">
                Try Now <ChevronRight className="w-4 h-4" />
              </button>
              <button className="border border-purple-500 hover:bg-purple-950 px-6 py-2.5 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition">
                View Gallery
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 text-sm">★★★★★</div>
                <span className="text-gray-400 text-sm">20 creators trust PhotoHero</span>
              </div>
            </div>
          </div>
          
          {/* Reemplazamos PhotoHoverEffect con Carousel3D */}
          <Carousel3D />
        </div>
        
        {/* El resto del contenido permanece igual */}
      </main>
    </div>
  );
}

export default App;
