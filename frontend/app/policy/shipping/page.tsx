'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { FileText, Check, Scale, Shield, Gem } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
});

export default function TermsPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-amber-50 via-white to-white ${inter.variable} ${playfair.variable}`}>
      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Terms of Service
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4 md:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Notice Box */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <Check className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-800">
                  By accessing and using Silver Shringar's services, you agree to be bound by these terms. 
                  Please read them carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-6">
            {/* Account Terms */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-amber-600 mr-2" />
                1. Account Registration
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>You must be at least 18 years old to create an account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>You are responsible for maintaining your account security</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Provide accurate and complete information during registration</span>
                </li>
              </ul>
            </div>

            {/* Order & Payment */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 text-amber-600 mr-2" />
                2. Orders & Payments
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>All orders are subject to product availability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>We reserve the right to cancel any order</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>All prices are in Indian Rupees (₹)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Gem className="w-5 h-5 text-amber-600 mr-2" />
                3. Product Information
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We make every effort to display our products accurately. However, actual colors and 
                  finishes may vary slightly from website images due to screen settings and lighting conditions.
                </p>
                <div className="bg-amber-50 p-4 rounded border border-amber-100">
                  <p className="text-amber-800 font-medium">
                    All gold jewelry is BIS hallmarked for purity assurance.
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping & Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                4. Shipping & Delivery
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Delivery times are estimates and not guaranteed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Shipping charges apply as per the order value and destination</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>International shipping available for select countries</span>
                </li>
              </ul>
            </div>

            {/* Returns & Refunds */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                5. Returns & Refunds
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We accept returns within 7 days of delivery for unworn items in original condition with 
                  all tags and certificates intact.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span>Customized or personalized items cannot be returned</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span>Refunds are processed within 7-10 business days</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-3">
                All content on this website, including logos, text, graphics, and product images, is 
                the property of Silver Shringar or its licensors and is protected by copyright laws.
              </p>
              <p className="text-gray-700">
                The "Silver Shringar" name, logo, and all related trademarks are the property of 
                Silver Shringar.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We may update these terms from time to time. The updated version will be indicated by 
                an updated "Last updated" date at the top of this page.
              </p>
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-300"
                >
                  Contact Us for Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}