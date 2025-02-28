import React, { useState } from 'react';
import { Camera, ChevronRight, Star, Zap, Shield, Users } from 'lucide-react';

// Componente con transición suave al hacer hover
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
              src="https://i.imgur.com/HXhNC1X.png"  // Si lo pones en public, la ruta es /nombreDelArchivo
              alt="PhotoHero Logo"
              className="h-8"   // Ajusta la altura a tu gusto
            />
            <span className="text-xl font-bold"></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-purple-400 transition">How it Works</a>
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
              Your photos,
              <span className="block">reimagined with <span className="text-purple-500">AI</span></span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Upload 10-15 photos and let our FLUX model create stunning professional shots. Fine-tuned to capture your unique essence.
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
          
          {/* Se integra el componente PhotoHoverEffect */}
          <PhotoHoverEffect />
        </div>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PhotoHero?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform transforms your everyday photos into professional-grade portraits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-400">Get your AI-enhanced photos in minutes, not hours</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-400">Your photos are encrypted and automatically deleted after processing</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
              <p className="text-gray-400">Studio-quality results from your personal photos</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-4">$9<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>50 AI-enhanced photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Basic editing tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition">
                Get Started
              </button>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-sm px-3 py-1 rounded-full">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">$29<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>200 AI-enhanced photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Advanced editing tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Custom presets</span>
                </li>
              </ul>
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition">
                Get Started
              </button>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Unlimited photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>Custom AI model training</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span>API access</span>
                </li>
              </ul>
              <button className="w-full border border-purple-500 hover:bg-purple-950 px-6 py-2 rounded-full transition">
                Contact Sales
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
                  <div className="text-sm text-gray-400">Professional Photographer</div>
                </div>
              </div>
              <p className="text-gray-300">"PhotoHero has revolutionized my workflow. The AI-enhanced photos are incredibly natural and save me hours of editing time."</p>
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
                  <div className="text-sm text-gray-400">Content Creator</div>
                </div>
              </div>
              <p className="text-gray-300">"The quality of the AI-generated photos is amazing. It's like having a professional photographer on demand."</p>
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
                  <div className="text-sm text-gray-400">Entrepreneur</div>
                </div>
              </div>
              <p className="text-gray-300">"The enterprise plan has been a game-changer for our business. The custom AI model delivers consistent, branded photos."</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-purple-900/50 to-purple-600/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Photos?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust PhotoHero to create stunning professional photos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-lg font-semibold transition">
                Get Started Now
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
              Transform your photos with the power of AI
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Pricing</a></li>
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
