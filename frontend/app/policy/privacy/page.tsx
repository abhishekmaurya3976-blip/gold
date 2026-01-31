'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { Shield, Lock, Eye, FileText, Users, Gem, Crown, Sparkles, Award } from 'lucide-react';

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

export default function PrivacyPolicyPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-yellow-50/30 via-white to-white ${inter.variable} ${playfair.variable}`}>
      {/* Hero Section */}
      <section className="pt-15 pb-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 mb-8 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-playfair">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Our Commitment to Protecting Your Information at Silver Shringar
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-8 mb-8">
            <div className="flex items-center mb-6">
              <Crown className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-700 mb-6">
              At Silver Shringar, we value the trust you place in us when you share your personal information. 
              This policy outlines how we collect, use, and safeguard your data while providing you with our premium jewelry services.
            </p>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Your privacy is as important to us as the purity of our gold. We handle your information with the same care and integrity.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Gem className="w-6 h-6 text-yellow-600 mr-3" />
                Information We Collect
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">Personal Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Name and contact details for personalized service</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Email address for order confirmations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Phone number for delivery coordination</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Shipping and billing addresses</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Date of birth for special occasion offers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">Transaction Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Purchase history and preferences</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Payment details (securely processed)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Jewelry customization requests</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Service and repair history</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                      <span>Communication preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-yellow-600 mr-3" />
                How We Use Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 text-yellow-600 mr-2" />
                      <h4 className="font-bold text-yellow-800">Order Processing</h4>
                    </div>
                    <p className="text-yellow-700 text-sm">To process, fulfill, and deliver your jewelry orders</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <Award className="w-4 h-4 text-green-600 mr-2" />
                      <h4 className="font-bold text-green-800">Customer Service</h4>
                    </div>
                    <p className="text-green-700 text-sm">To provide personalized assistance and after-sales support</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                      <h4 className="font-bold text-blue-800">Service Improvements</h4>
                    </div>
                    <p className="text-blue-700 text-sm">To enhance your shopping experience and jewelry recommendations</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-2">
                      <Gem className="w-4 h-4 text-purple-600 mr-2" />
                      <h4 className="font-bold text-purple-800">Personalized Communication</h4>
                    </div>
                    <p className="text-purple-700 text-sm">To send relevant offers, jewelry care tips, and updates (with consent)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-yellow-600 mr-3" />
                Data Protection & Security
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement industry-standard security measures to protect your personal information. 
                  Your data is stored securely and accessed only by authorized personnel for legitimate business purposes.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Secure Transactions</h4>
                    <p className="text-gray-700 text-sm">All payment information is encrypted and processed through secure gateways</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Limited Access</h4>
                    <p className="text-gray-700 text-sm">Only authorized staff can access customer information</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">
                    <span className="font-bold">Important:</span> We never sell, rent, or share your personal information 
                    with third parties for marketing purposes without your explicit consent.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Retention & Your Rights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Retention & Your Rights</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Data Retention Period</h4>
                  <p className="text-gray-700">
                    We retain your personal information only for as long as necessary to fulfill the purposes 
                    outlined in this policy, unless a longer retention period is required or permitted by law.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Your Rights</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></div>
                      <span>Access your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></div>
                      <span>Request correction of inaccurate data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></div>
                      <span>Request deletion of your data (subject to legal requirements)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></div>
                      <span>Opt-out of marketing communications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact & Updates */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us & Policy Updates</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  This privacy policy may be updated periodically to reflect changes in our practices or legal requirements. 
                  We encourage you to review this page regularly for any updates.
                </p>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-gray-800 mb-2">For Privacy-Related Inquiries</h4>
                  <p className="text-gray-700">
                    Please contact us at{' '}
                    <a href="mailto:info@silvershringar.com" className="text-yellow-600 hover:text-yellow-700 font-medium">
                      info@silvershringar.com
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    We typically respond within 24-48 hours to privacy-related concerns.
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Last updated:</span>{' '}
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}