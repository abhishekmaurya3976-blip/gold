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
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Gold Jewelry', href: '/categories/gold-jewelry' },
      { name: 'Diamond Rings', href: '/categories/diamond-rings' },
      { name: 'Silver Collection', href: '/categories/silver-collection' },
      { name: 'Bridal Collection', href: '/categories/bridal-collection' },
      { name: 'New Arrivals', href: '/products?sort=newest' },
      { name: 'Best Sellers', href: '/products?isBestSeller=true' },
    ],
    customer: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Policy', href: '/policy/shipping' },
      { name: 'Return & Exchange', href: '/policy/returns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Hallmarking', href: '/about#hallmark' },
      { name: 'Privacy Policy', href: '/policy/privacy' },
      { name: 'Terms of Service', href: '/policy/shipping' },
    ],
  };

  const paymentMethods = ['VISA', 'MASTERCARD', 'AMEX', 'RUPAY', 'UPI', 'NETBANKING'];

  return (
    <footer className="bg-gradient-to-b from-amber-900 via-amber-800 to-yellow-900 text-amber-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-300/5 rounded-full blur-3xl"></div>
      
      {/* Gold Dust Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-amber-200 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo and Brand Section */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <Link href="/" className="text-5xl font-serif font-bold text-amber-50 tracking-wider mb-4 hover:scale-105 transition-transform duration-300">
            Silver <span className="text-yellow-300">Shringar</span>
          </Link>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto italic font-light">
            Where Tradition Meets Elegance • Hallmarked Gold & Diamond Jewelry Since 1985
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="flex items-center text-sm">
              <Shield className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-amber-100">BIS Hallmarked</span>
            </div>
            <div className="h-4 w-px bg-yellow-300/30"></div>
            <div className="flex items-center text-sm">
              <Award className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-amber-100">Trusted Since 1985</span>
            </div>
            <div className="h-4 w-px bg-yellow-300/30"></div>
            <div className="flex items-center text-sm">
              <Gem className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-amber-100">Certified Diamonds</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Description */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-amber-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-300" />
                Our Legacy
              </h3>
              <p className="text-amber-100/90 leading-relaxed text-sm">
                Silver Shringar has been crafting exquisite jewelry for generations. 
                Our commitment to purity, craftsmanship, and timeless design has made 
                us a trusted name in luxury jewelry. Each piece tells a story of 
                tradition, elegance, and unparalleled quality.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 border border-yellow-300/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                  <Phone className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <div className="text-xs text-amber-200/70">Call Us Anytime</div>
                  <a href="tel:+911234567890" className="text-amber-50 font-medium hover:text-yellow-200 transition-colors duration-300">
                    +91 12345 67890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-yellow-600/20 border border-yellow-300/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                  <Mail className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <div className="text-xs text-amber-200/70">Email Support</div>
                  <a href="mailto:info@silvershringar.com" className="text-amber-50 font-medium hover:text-yellow-200 transition-colors duration-300">
                    info@silvershringar.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-amber-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
              <Gem className="w-5 h-5 mr-2 text-yellow-300" />
              Shop Collections
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-amber-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
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
            <h3 className="text-lg font-semibold text-amber-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-yellow-300" />
              Customer Care
            </h3>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-amber-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
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
              <h3 className="text-lg font-semibold text-amber-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-300" />
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-amber-100/90 hover:text-yellow-200 transition-all duration-300 group flex items-center py-2 text-sm"
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
              <h3 className="text-lg font-semibold text-amber-50 mb-6 tracking-wider uppercase border-l-4 border-yellow-400 pl-4 flex items-center">
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
                    className="w-10 h-10 rounded-full bg-amber-700/30 border border-amber-600/20 flex items-center justify-center text-amber-200 hover:text-white hover:border-yellow-300/30 hover:bg-amber-600/40 transition-all duration-300 group"
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

        {/* Business Hours & Features */}
        <div className="py-8 border-t border-amber-700/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business Hours */}
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/20 border border-yellow-300/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                <Clock className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-amber-200/70">Business Hours</div>
                <div className="text-amber-50 font-medium">10:00 AM - 8:00 PM (Mon-Sun)</div>
                <div className="text-sm text-yellow-300/90">Emergency Contact: +91 98765 43210</div>
              </div>
            </div>

            {/* Store Location */}
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/20 border border-yellow-300/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                <MapPin className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-amber-200/70">Visit Our Store</div>
                <div className="text-amber-50 font-medium">123 Jewel Street, Mumbai</div>
                <div className="text-sm text-yellow-300/90">With 5+ branches across India</div>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="flex items-center group">
              <div className="w-12 h-12 rounded-full bg-yellow-600/20 border border-yellow-300/20 flex items-center justify-center mr-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                <Truck className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-xs text-amber-200/70">Free Shipping</div>
                <div className="text-amber-50 font-medium">Free delivery on orders above ₹4999</div>
                <div className="text-sm text-yellow-300/90">Pan India • Cash on Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Bottom Section */}
        <div className="pt-8 mt-8 border-t border-amber-700/30">
          {/* Payment Methods */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-yellow-300 mr-3" />
              <span className="text-amber-200/80 text-sm font-medium">Secure Payment Methods</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {paymentMethods.map((method) => (
                <div 
                  key={method} 
                  className="px-4 py-2 bg-gradient-to-r from-amber-800/40 to-amber-700/40 border border-amber-600/30 rounded-lg text-amber-100 text-sm font-medium hover:border-yellow-300/40 hover:text-yellow-200 transition-all duration-300"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright & Developer Credit */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-amber-700/30">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-amber-200/70 text-sm">
                © {currentYear} Silver Shringar. All rights reserved.
              </p>
              <p className="text-amber-200/50 text-xs mt-1">
                All jewelry is BIS hallmarked and certified for purity.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-3">
              <div className="flex items-center space-x-2 text-amber-200/60 text-xs">
                <Shield className="w-3 h-3" />
                <span>100% Secure & Trusted</span>
                <span className="mx-2">•</span>
                <Gem className="w-3 h-3" />
                <span>Certified Diamonds</span>
                <span className="mx-2">•</span>
                <Award className="w-3 h-3" />
                <span>Hallmarked Gold</span>
              </div>
              
              <a 
                href="https://www.arnavcreativesolutions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-200/70 hover:text-yellow-200 text-sm transition-all duration-300 group flex items-center"
              >
                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-300">
                  ✨
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Crafted by Arnav Creative Solutions
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
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </footer>
  );
}