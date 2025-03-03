import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, ChevronLeft, Star, Zap, Shield, Users, Clock, DollarSign } from 'lucide-react';

// Componente de carrusel de fotos
const PhotoCarousel = () => {
  // Fotos generadas por el modelo AI
  const generatedPhotos = [
    'https://imgur.com/emFdCuj.jpeg', // Foto principal generada 
    'https://imgur.com/bqjcHR1.jpeg', // Otra foto generada
    'https://imgur.com/ybnqBOt.jpeg', // Otra foto generada
  ];
  
  // Fotos de entrenamiento originales
  const trainingPhotos = [
    'https://imgur.com/utfCqTf.jpeg', // Foto de entrenamiento 1
    'https://imgur.com/FN0xA5I.jpeg', // Foto de entrenamiento 2 
    'https://imgur.com/ybnqBOt.jpeg', // Foto de entrenamiento 3
    'https://imgur.com/bqjcHR1.jpeg', // Foto de entrenamiento 4
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
  const goToSlide = (index) => {
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

// Mantengo el componente original por si se quiere usar en el futuro
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

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:pl-4 lg:pl-12 xl:pl-20">
            <img
              src="https://i.imgur.com/HXhNC1X.png"
              alt="PhotoHero Logo"
              className="h-12"
            />
            <span className="text-xl font-bold"></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a>
            <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
            <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-full text-sm transition">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,1fr] gap-4 items-center py-8">
          <div className="md:pl-4 lg:pl-12 xl:pl-20 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Own AI Model
              <span className="block">for Just <span className="text-purple-500">$9</span></span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Upload 10 to 15 photos, and we'll train your custom PhotoHero model in about 10 minutes. You own your model and only pay for the images you generate!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition">
                Create My Model Now <ChevronRight className="w-4 h-4" />
              </button>
              <div className="text-sm text-gray-400 mt-2 sm:mt-0 sm:self-center">Just $9 for your personalized model.</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 text-sm">★★★★★</div>
                <span className="text-gray-400 text-sm">20 creators trust PhotoHero</span>
              </div>
            </div>
          </div>
          
          {/* Se integra el componente PhotoCarousel */}
          <PhotoCarousel />
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started with your own AI model in just a few simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload Your Photos</h3>
              <p className="text-gray-400">Choose 10-15 photos of yourself, your product, or any subject you want.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Train Your Model</h3>
              <p className="text-gray-400">We'll handle the AI training for just $9. Your custom model is ready in about 10 minutes, and it's entirely yours.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Generate Unlimited Images</h3>
              <p className="text-gray-400">Pay only for the images you create. Explore endless styles—portraits, artistic filters, or professional looks.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ChevronRight className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Download & Share</h3>
              <p className="text-gray-400">Get high-resolution images you can use on social media, in portfolios, or anywhere else.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PhotoHero?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform gives you complete control of your custom model
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Ownership of Your Model</h3>
              <p className="text-gray-400">Once trained, it's all yours. No subscriptions, no hidden fees.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-400">Just $9 to train your model. Then, pay only for the images you generate.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
              <p className="text-gray-400">Our AI network delivers realistic, high-resolution images.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
              <p className="text-gray-400">In about 10 minutes, your model is trained and ready to generate images.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-400">Need help? Our team is here to guide you every step of the way.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pay As You Go</h3>
              <p className="text-gray-400">No subscriptions required. Pay only for what you use.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No subscriptions. No hidden fees. Just pay for what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-500">
              <h3 className="text-xl font-semibold mb-2">Model Training</h3>
              <div className="text-3xl font-bold mb-4">$9<span className="text-lg text-gray-400"> one-time</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Full ownership of your model</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Trained with 10-15 photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Model ready in about 10 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Lifetime access to your model</span>
                </li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition">
                Get Started
              </button>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Image Generation</h3>
              <div className="text-3xl font-bold mb-4">$6<span className="text-lg text-gray-400"> per 100 images</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>High-resolution output</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Use your model as many times as you want</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Perfect for social media, product shots, and more</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Bulk discounts available for businesses</span>
                </li>
              </ul>
              <button className="w-full border border-purple-500 hover:bg-purple-950 px-6 py-2 rounded-full transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied creators who trust PhotoHero
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=faces"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-gray-400">Content Creator</div>
                </div>
              </div>
              <p className="text-gray-300">"I trained my model in minutes and now create content for my social media without any subscription. The quality is amazing!"</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=faces"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-400">Entrepreneur</div>
                </div>
              </div>
              <p className="text-gray-300">"Perfect for my e-commerce products. I trained a model once and generate unlimited photos. It saves me thousands in product photography."</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=faces"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">David Martinez</div>
                  <div className="text-sm text-gray-400">Photographer</div>
                </div>
              </div>
              <p className="text-gray-300">"The pay-as-you-go model is brilliant. I only pay for what I need and the $9 training fee is totally worth it for the quality I get."</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get answers to the most common questions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">What does owning my model mean?</h3>
              <p className="text-gray-400">You control your custom-trained model entirely. No ongoing subscription or restrictions.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">How long does it take to train a model?</h3>
              <p className="text-gray-400">Typically around 10 minutes, depending on server load.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Can I train multiple models?</h3>
              <p className="text-gray-400">Absolutely! Each model costs $9 to train, so you can have different models for different people or products.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">What if I need more images later?</h3>
              <p className="text-gray-400">You can generate as many images as you want. You only pay for the additional images you create.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Are my photos stored on your platform?</h3>
              <p className="text-gray-400">We only use your photos to train the model. You can delete them afterward or keep them for future re-training.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-purple-600/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to train your own AI model for just $9?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              No subscription. No commitments. Pay only for what you use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-lg font-semibold transition">
                Create My Model Now
              </button>
              <button className="border border-purple-500 hover:bg-purple-950 px-8 py-3 rounded-full text-lg font-semibold transition">
                View Gallery
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-purple-500" />
              <span className="text-xl font-bold">PhotoHero</span>
            </div>
            <p className="text-gray-400">
              Your custom AI model, 100% yours, in just 10 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Gallery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 PhotoHero. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
