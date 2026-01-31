'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { Package, RefreshCw, Shield, Clock, CheckCircle, XCircle, Gem, Crown, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';

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

export default function ReturnsPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-yellow-50/30 via-white to-white ${inter.variable} ${playfair.variable}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 mb-8 shadow-2xl">
              <RefreshCw className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-playfair">
              Returns & Exchanges
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Easy and transparent exchange policy for your jewelry purchases
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-4xl mx-auto">
          {/* 30-Day Policy Highlight */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 mb-12 border border-yellow-200">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center border-2 border-white shadow-lg">
                  <span className="text-white font-bold text-sm">7</span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center font-playfair">
              7-Day Exchange Policy
            </h2>
            <p className="text-gray-700 text-center text-lg">
              We offer a 7-day window for exchanges from the date of purchase.
              All items must be in original condition with BIS hallmark intact, original packaging, and bill.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border border-yellow-300">
              <p className="text-yellow-800 font-medium text-center flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Note: Custom-made jewelry cannot be exchanged
              </p>
            </div>
          </div>

          {/* Policy Details */}
          <div className="space-y-8">
            {/* Eligibility */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Crown className="w-6 h-6 text-yellow-600 mr-3" />
                Exchange Eligibility
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 text-green-700">What Can Be Exchanged:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Unworn jewelry in original condition</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Items with intact BIS hallmark</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Original packaging and bill present</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Within 7 days of purchase</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 text-red-700">What Cannot Be Exchanged:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Worn or altered jewelry</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt=0.5" />
                      <span className="text-gray-700">Custom-made or personalized jewelry</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Items without original packaging/bill</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Damaged or tampered BIS hallmark</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="w-6 h-6 text-yellow-600 mr-3" />
                Exchange Process
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                  <h4 className="font-bold text-gray-900 mb-2">Visit Store</h4>
                  <p className="text-gray-600 text-sm">Bring item to our Mira Road store</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                  <h4 className="font-bold text-gray-900 mb-2">Inspection</h4>
                  <p className="text-gray-600 text-sm">Our experts verify condition & hallmark</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                  <h4 className="font-bold text-gray-900 mb-2">Choose New Item</h4>
                  <p className="text-gray-600 text-sm">Select replacement from our collection</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">4</div>
                  <h4 className="font-bold text-gray-900 mb-2">Complete Exchange</h4>
                  <p className="text-gray-600 text-sm">Pay any price difference & receive new item</p>
                </div>
              </div>
            </div>

            {/* Refund & Conditions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Exchange Conditions & Details</h3>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Gem className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Gold Value Exchange</h4>
                        <p className="text-gray-600 text-sm">Exchange based on current gold value at the time of exchange</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Making Charges</h4>
                        <p className="text-gray-600 text-sm">Non-refundable; only gold value can be exchanged</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Processing Time</h4>
                        <p className="text-gray-600 text-sm">Exchange processed immediately upon verification</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">New Hallmark</h4>
                        <p className="text-gray-600 text-sm">New BIS hallmark provided for exchanged item</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">
                    <span className="font-bold">Important:</span> For jewelry exchanges, only the gold weight value is transferable. 
                    Making charges are not refundable. Diamond/jewel value is evaluated separately based on current market rates.
                  </p>
                </div>
              </div>
            </div>

            {/* Cleaning & Services */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-playfair flex items-center">
                <Sparkles className="w-6 h-6 mr-3" />
                Additional Services
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-yellow-100">Free Cleaning Service</h4>
                  <ul className="space-y-2 text-yellow-50">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 mr-3"></div>
                      <span>Free jewelry cleaning for life on all purchases</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 mr-3"></div>
                      <span>Restore shine and sparkle to your jewelry</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-yellow-100">Size Adjustments</h4>
                  <ul className="space-y-2 text-yellow-50">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 mr-3"></div>
                      <span>Free size adjustments within 10 days</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 mt-2 mr-3"></div>
                      <span>Minor repairs and maintenance available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Package className="w-5 h-5 mr-2" />
                Start Exchange Process
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-yellow-700 font-bold rounded-xl hover:bg-yellow-50 border border-yellow-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Gem className="w-5 h-5 mr-2" />
                Browse Collections
              </Link>
            </div>
            <p className="text-gray-600 mt-6">
              Have questions about our exchange policy? Call us at{' '}
              <a href="tel:+917977108932" className="text-yellow-600 hover:text-yellow-700 font-medium">
                +91 7977108932
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}