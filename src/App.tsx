import React, { useState } from 'react';
import { Camera, ChevronRight, Star, Zap, Shield, Users } from 'lucide-react';

// Photo Hover Effect Component
const PhotoHoverEffect = () => {
  const [showCombined, setShowCombined] = useState(false);
  
  // Imagenes individuales (las que has compartido)
  const individualPhotos = [
    '/api/placeholder/400/320', // Arriba izquierda - Traje formal
    '/api/placeholder/400/320', // Arriba derecha - Camisa azul
    '/api/placeholder/400/320', // Abajo izquierda - Con taza
    '/api/placeholder/400/320', // Abajo derecha - Selfie
  ];
  
  // Imagen combinada (la primera que compartiste)
  const combinedPhoto = '/api/placeholder/640/640'; // Imagen combinada
  
  return (
    <div className="relative max-w-md mx-auto md:max-w-none md:ml-0">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-500/20 rounded-full blur-3xl"></div>
      
      {showCombined ? (
        <div 
          className="relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out"
          onMouseLeave={() => setShowCombined(false)}
        >
          <img 
            src={combinedPhoto} 
            alt="Combined AI-enhanced portrait" 
            className="w-full h-auto object-cover transition-all duration-500 transform" 
          />
        </div>
      ) : (
        <div 
          className="relative grid grid-cols-2 gap-2"
          onMouseEnter={() => setShowCombined(true)}
        >
          {individualPhotos.map((photo, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg overflow-hidden hover:opacity-90 cursor-pointer transition-all duration-300 ${
                index % 2 === 0 ? 'translate-y-4' : ''
              }`}
            >
              <img
                src={photo}
                alt={`Example ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
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
            <Camera className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold">Reflectify</span>
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
            <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-full px-3 py-1 mb-4 text-sm">
              <span className="text-purple-400 font-semibold">Product of the day</span>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs">2nd</span>
            </div>
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
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${1507003211169 + i}-0a1dd7228f2d?w=40&h=40&auto=format&fit=crop`}
                    alt={`User ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 text-sm">★★★★★</div>
                <span className="text-gray-400 text-sm">6,520 creators trust Reflectify</span>
              </div>
            </div>
          </div>
          
          {/* Here's where we're replacing the old image grid with the PhotoHoverEffect component */}
          <PhotoHoverEffect />
        </div>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Reflectify?</h2>
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
              Join thousands of satisfied creators who trust Reflectify
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
              <p className="text-gray-300">"Reflectify has revolutionized my workflow. The AI-enhanced photos are incredibly natural and save me hours of editing time."</p>
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
              Join thousands of creators who trust Reflectify to create stunning professional photos
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
              <span className="text-xl font-bold">Reflectify</span>
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
          <p>© 2025 Reflectify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
