'use client';

import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Gem,
  Crown,
  Heart,
  CreditCard,
  Truck,
  Award,
  Sparkles,
  Package,
  Star
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collections: [  
      { name: 'New Arrivals', href: '/products?sort=newest' },

    ],
    customer: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Policy', href: '/policy/shipping' },
      { name: 'Return Policy', href: '/policy/returns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
    
      { name: 'Privacy Policy', href: '/policy/privacy' },
      { name: 'Terms of Service', href: '/policy/terms' },
   
    ],
  };

  const paymentMethods = ['VISA', 'MASTERCARD', 'AMEX', 'RUPAY', 'UPI', 'NETBANKING'];

  return (
    <footer className="bg-gradient-to-b from-yellow-900 via-yellow-800 to-yellow-900 text-yellow-50 relative overflow-hidden">
      {/* Golden Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px'
        }}></div>
      </div>

      {/* Golden Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/5 to-transparent animate-pulse-slow"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo and Brand Section */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          
          <Link href="/" className="text-5xl md:text-6xl font-serif font-bold text-white tracking-wider mb-2 hover:scale-105 transition-transform duration-300">
            Silver <span className="text-yellow-300">Shringar</span>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Description */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-yellow-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
                <Gem className="w-5 h-5 mr-2 text-yellow-300" />
                Our Legacy
              </h3>
              <p className="text-yellow-100/90 leading-relaxed text-sm">
                Crafting exquisite jewelry with generations of expertise. Our commitment to purity, 
                craftsmanship, and timeless design makes every piece a treasure to cherish forever.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-yellow-600/30 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/40 transition-all duration-300">
                  <Phone className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <div className="text-xs text-yellow-200/70">Call & WhatsApp</div>
                  <a href="tel:+917977108932" className="text-yellow-50 font-medium hover:text-yellow-200 transition-colors duration-300">
                    +91 79771 08932
                  </a>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-yellow-600/30 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/40 transition-all duration-300">
                  <Mail className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <div className="text-xs text-yellow-200/70">Email</div>
                  <a href="mailto:silvershringar@outlook.com" className="text-yellow-50 font-medium hover:text-yellow-200 transition-colors duration-300 break-all">
                    silvershringar@outlook.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-300" />
              Collections
            </h3>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
                  >
                    <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-yellow-300" />
              Customer Care
            </h3>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
                  >
                    <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Social */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-yellow-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-300" />
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-yellow-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
                    >
                      <span className="w-0 h-0.5 bg-yellow-400 group-hover:w-4 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
                Follow Us
              </h3>
              <div className="flex space-x-3">
                {[
                  { name: 'Instagram', icon: Instagram, color: 'hover:bg-gradient-to-br from-purple-600 to-pink-600' },
                  { name: 'Facebook', icon: Facebook, color: 'hover:bg-blue-600' },
                  { name: 'Twitter', icon: Twitter, color: 'hover:bg-sky-500' },
                  { name: 'YouTube', icon: Youtube, color: 'hover:bg-red-600' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full bg-yellow-700/40 border border-yellow-600/30 flex items-center justify-center text-yellow-200 hover:text-white hover:border-yellow-300/50 hover:bg-yellow-600/50 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}>
                      <social.icon className="w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Store Details Section */}
        <div className="py-8 border-t border-yellow-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Store Location */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/30 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/40 transition-all duration-300 flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-yellow-200/70 mb-1">Store Location</div>
                <div className="text-yellow-50 font-bold mb-1">Shree Shyam Jewellers</div>
                <div className="text-sm text-yellow-100/90">Shop No 4, Ram Nagar</div>
                <div className="text-sm text-yellow-100/90">Ranawat Height 2, Ramdev Park Rd</div>
                <div className="text-sm text-yellow-100/90">Mira Road East, Thane</div>
                <div className="text-sm text-yellow-100/90">Maharashtra 401105</div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/30 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/40 transition-all duration-300 flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-yellow-200/70 mb-1">Store Timings</div>
                <div className="text-yellow-50 font-bold mb-1">10:30 AM - 8:30 PM</div>
                <div className="text-sm text-yellow-100/90">Monday to Sunday</div>
                <div className="text-sm text-yellow-100/90">(Open all days including festivals)</div>
              </div>
            </div>

            {/* Services */}
            <div className="flex items-start group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/30 border border-yellow-400/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/40 transition-all duration-300 flex-shrink-0 mt-1">
                <Award className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-yellow-200/70 mb-1">Our Services</div>
                <div className="text-yellow-50 font-bold mb-1">BIS Hallmarked Gold</div>
                <div className="text-sm text-yellow-100/90">Certified Diamonds</div>
                <div className="text-sm text-yellow-100/90">7-Day Return Policy</div>
                <div className="text-sm text-yellow-100/90">Free Shipping*</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="pt-8 mt-8 border-t border-yellow-700/50">
          {/* Payment Methods */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-yellow-300 mr-3" />
              <span className="text-yellow-200/80 text-sm font-medium">Secure Payment Methods</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {paymentMethods.map((method) => (
                <div 
                  key={method} 
                  className="px-4 py-2 bg-gradient-to-r from-yellow-800/50 to-yellow-700/50 border border-yellow-600/40 rounded-lg text-yellow-100 text-sm font-medium hover:border-yellow-400/50 hover:text-yellow-50 transition-all duration-300"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright & Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-yellow-700/50">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-yellow-200/70 text-sm">
                © {currentYear} Silver Shringar. All rights reserved.
              </p>
              <p className="text-yellow-200/50 text-xs mt-1">
                All jewelry comes with BIS hallmark certification for guaranteed purity.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-3">
              <div className="text-yellow-200/60 text-xs text-center md:text-right max-w-md">
                <p className="font-medium mb-1">Shree Shyam Jewellers</p>
                <p>Shop No 4, Ram Nagar, Ranawat Height 2 • Mira Road East, Thane 401105</p>
              </div>
              
              <a 
                href="https://www.arnavcreativesolutions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-yellow-200/70 hover:text-yellow-100 text-sm transition-all duration-300 group flex items-center"
              >
                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-300">
                  ✨
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Developed by Arnav Creative Solutions
                </span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-300">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </footer>
  );
}