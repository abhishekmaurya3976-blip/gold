'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { MapPin, Phone, Mail, Globe, Gem, Crown, Users, Award, Shield, Sparkles, Diamond, Heart } from 'lucide-react';

// Import professional fonts (same as header)
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair'
});

export default function AboutPage() {
  const productCategories = [
    'Gold Jewelry Collection',
    'Diamond Rings & Studs',
    'Silver Jewelry Range',
    'Bridal & Wedding Sets',
    'Temple & Spiritual Jewelry',
    'Kids & Baby Jewelry',
    'Fashion & Contemporary Designs',
    'Custom Made Jewelry'
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-yellow-50/30 via-white to-white ${inter.variable} ${playfair.variable}`}>
      {/* Hero Section - Premium Jewelry Version */}
      <section className="relative overflow-hidden pt-20 pb-20 px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 font-playfair leading-tight">
              <span className="block">Silver Shringar</span>
              <span className=" text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700 mt-2 text-4xl md:text-xl lg:text-6xl">
                A Legacy of Trust & Elegance
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your premier destination for exquisite jewelry, hallmarked gold, and certified diamonds. 
              We bring generations of trust, craftsmanship, and timeless elegance to every piece we create.
            </p>
          </div>
        </div>
      </section>

      {/* Store Location & Contact */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-b from-white to-yellow-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Visit Our Jewelry Haven
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located at the heart of Mira Road, we provide a luxurious space where you can explore, 
              select, and create your perfect jewelry pieces with expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Store Location</h3>
              <div className="space-y-3 text-gray-600">
                <p className="font-semibold text-yellow-700">Shree Shyam Jewellers</p>
                <p>Shop No 4, Ram Nagar, Ranawat Height 2</p>
                <p>Ramdev Park Road, Mira Road East</p>
                <p>Thane, Maharashtra 401105</p>
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-500">Landmark:</p>
                  <p className="text-yellow-600">Near Ramdev Park, Mira Road East</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact & WhatsApp</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Call & WhatsApp</p>
                  <a 
                    href="tel:+917977108932" 
                    className="text-xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors duration-300"
                  >
                    +91 79771 08932
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Store Timings:</p>
                  <p className="text-gray-700">Monday to Sunday: 10:30 AM - 8:30 PM</p>
                  <p className="text-sm text-gray-600">(Open all days including festivals)</p>
                </div>
                <div className="pt-4">
                  <a 
                    href="https://wa.me/917977108932" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">💬</span>
                    WhatsApp Now
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Email</p>
                  <a 
                    href="mailto:info@silvershringar.com" 
                    className="text-lg text-yellow-600 hover:text-yellow-700 transition-colors duration-300 break-all"
                  >
                    info@silvershringar.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Website</p>
                  <a 
                    href="https://www.silvershringar.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg text-yellow-600 hover:text-yellow-700 transition-colors duration-300 flex items-center"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    www.silvershringar.com
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500">Browse our collections online or visit our store for personalized service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Collections */}
      <section className="py-20 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Our Exquisite Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional gold to contemporary diamond designs, we offer a comprehensive range 
              of jewelry for every occasion and celebration.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="grid sm:grid-cols-2 gap-4">
                {productCategories.map((category, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 bg-white px-5 py-4 rounded-xl shadow-sm border border-yellow-50 hover:shadow-md hover:border-yellow-100 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-gray-700 font-medium group-hover:text-yellow-700 transition-colors duration-300">{category}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 font-playfair flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Our Promise to You
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span>100% BIS Hallmarked Gold & Certified Diamonds</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Award className="w-3 h-3" />
                    </div>
                    <span>Transparent Pricing with No Hidden Charges</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Heart className="w-3 h-3" />
                    </div>
                    <span>Custom Design & Personalization Services</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Crown className="w-3 h-3" />
                    </div>
                    <span>Home Trial & Free Cleaning Services</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                    Why Choose Silver Shringar?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Trust & Purity</h4>
                        <p className="text-gray-600">Every piece comes with BIS hallmark certification for guaranteed purity.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center flex-shrink-0">
                        <Diamond className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Expert Craftsmanship</h4>
                        <p className="text-gray-600">Traditional artisanship combined with modern design sensibilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Personalized Service</h4>
                        <p className="text-gray-600">One-on-one consultation to create your dream jewelry.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center flex-shrink-0">
                        <Gem className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Value for Money</h4>
                        <p className="text-gray-600">Competitive pricing with quality that lasts generations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Experience Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
                Our Legacy
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              With decades of experience in the jewelry business, we bring tradition, trust, 
              and timeless beauty to every customer relationship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-yellow-500/20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Crown className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Traditional Values</h3>
              <p className="text-gray-300">
                Upholding family values and ethical business practices for generations.
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-yellow-500/20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Certified Quality</h3>
              <p className="text-gray-300">
                All jewelry is BIS hallmarked and certified for purity and authenticity.
              </p>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-yellow-500/20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Customer First</h3>
              <p className="text-gray-300">
                Building lifelong relationships through exceptional service and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
            Find Your Perfect Piece
          </h2>
          <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
            Visit our store in Mira Road or contact us for personalized assistance. 
            Your dream jewelry awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+917977108932" 
              className="px-8 py-4 bg-white text-yellow-700 font-bold rounded-xl hover:bg-yellow-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a 
              href="https://wa.me/917977108932" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <span className="mr-2">💬</span>
              WhatsApp
            </a>
            <a 
              href="/products" 
              className="px-8 py-4 bg-gradient-to-r from-yellow-700 to-yellow-800 text-white font-bold rounded-xl hover:from-yellow-800 hover:to-yellow-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Browse Collections
            </a>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-8 px-4 text-center bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-300 font-bold text-xl mb-2 font-playfair">Silver Shringar</p>
          <p className="text-gray-400">© {new Date().getFullYear()} Silver Shringar - A Legacy of Trust & Elegance. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-4">
            Shree Shyam Jewellers • Shop No 4, Ram Nagar, Ranawat Height 2 • Ramdev Park Road, Mira Road East • Thane, Maharashtra 401105
          </p>
          <p className="text-yellow-400 font-medium mt-2">
            Call & WhatsApp: +91 7977108932
          </p>
        </div>
      </footer>
    </div>
  );
}