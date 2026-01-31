'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  MessageSquare, 
  Send, 
  Clock,
  ChevronRight,
  MessageCircle,
  Gem,
  Crown,
  Shield,
  Sparkles,
  Award,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Diamond,
  Home
} from 'lucide-react';

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

export default function ContactPage() {
  // WhatsApp contact information
  const whatsappNumber = '917977108932';
  const whatsappMessage = 'Hello Silver Shringar, I am interested in your jewelry collection.';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const businessHours = [
    { day: 'Monday', time: '10:30 AM - 8:30 PM' },
    { day: 'Tuesday', time: '10:30 AM - 8:30 PM' },
    { day: 'Wednesday', time: '10:30 AM - 8:30 PM' },
    { day: 'Thursday', time: '10:30 AM - 8:30 PM' },
    { day: 'Friday', time: '10:30 AM - 8:30 PM' },
    { day: 'Saturday', time: '10:30 AM - 8:30 PM' },
    { day: 'Sunday', time: '10:30 AM - 8:30 PM' },
  ];

  const socialMedia = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'from-pink-500 to-purple-600' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: 'from-blue-600 to-blue-800' },
    { name: 'WhatsApp', icon: MessageCircle, url: `https://wa.me/${whatsappNumber}`, color: 'from-green-500 to-green-600' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: 'from-red-500 to-red-600' },
  ];

  const services = [
    { name: 'BIS Hallmarked Gold', description: 'Certified purity guaranteed' },
    { name: 'Custom Jewelry Design', description: 'Create your unique piece' },
    { name: 'Free Cleaning Service', description: 'Bring back the shine' },
    { name: 'Home Trial Available', description: 'Try before you buy' },
    { name: 'Easy Exchange Policy', description: '7-day exchange window' },
    { name: 'Gift Packaging', description: 'Elegant presentation' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-yellow-50/30 via-white to-white ${inter.variable} ${playfair.variable}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-15 pb-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 font-playfair leading-tight">
              <span className="block">Contact Silver Shringar</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-700 mt-2 text-4xl md:text-5xl lg:text-6xl">
                Where Elegance Meets Service
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions about our jewelry collections? Need expert guidance on gold purity or diamond selection? 
              Our team is here to provide personalized assistance and help you find the perfect piece.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 font-playfair text-center">
            Visit Our Jewelry Store
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Store Address */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Store Location</h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-semibold text-yellow-700">Shree Shyam Jewellers</p>
                <p>Shop No 4, Ram Nagar</p>
                <p>Ranawat Height 2, Ramdev Park Road</p>
                <p>Mira Road East, Thane</p>
                <p>Maharashtra 401105</p>
                <div className="pt-3">
                  <p className="text-sm font-medium text-gray-500">Landmark:</p>
                  <p className="text-yellow-600 font-medium">Near Ramdev Park, Mira Road East</p>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=Shop+No+4+Ram+Nagar+Ranawat+Height+2+Ramdev+Park+Road+Mira+Road+East+Thane+401105"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-300 group/link"
              >
                View on Google Maps <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Phone Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call & WhatsApp</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+917977108932" 
                  className="text-2xl font-bold text-gray-900 hover:text-yellow-600 transition-colors duration-300 block"
                >
                  +91 7977108932
                </a>
                <p className="text-gray-600">Direct contact for inquiries & appointments</p>
                <div className="pt-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group/btn w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                    <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <a 
                href="mailto:info@silvershringar.com" 
                className="text-xl text-yellow-600 hover:text-yellow-700 transition-colors duration-300 block break-all mb-3"
              >
                info@silvershringar.com
              </a>
              <p className="text-gray-600">For detailed inquiries, custom orders, and quotations</p>
              <a 
                href="mailto:info@silvershringar.com" 
                className="inline-flex items-center mt-6 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-300 group/link"
              >
                Send an Email <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Website */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Browse Online</h3>
              <a 
                href="https://www.silvershringar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl text-yellow-600 hover:text-yellow-700 transition-colors duration-300 flex items-center mb-3"
              >
                <Globe className="w-5 h-5 mr-2" />
                www.silvershringar.com
              </a>
              <p className="text-gray-600 mb-4">Explore our full jewelry collections online</p>
              <a 
                href="https://www.silvershringar.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-300 group/link"
              >
                Visit Website <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Store Timings</h3>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{schedule.day}</span>
                    <span className="text-gray-600 font-medium">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-700 text-sm font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open 7 days a week including festivals
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 group">
              <h3 className="text-2xl font-bold text-white mb-6">Instant Contact</h3>
              <p className="text-yellow-100 mb-8">
                Connect with us instantly for expert jewelry guidance
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 group/quick"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center mr-3">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">WhatsApp</div>
                      <div className="text-sm text-yellow-100">Instant chat & photos</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover/quick:translate-x-1 transition-transform duration-300" />
                </button>

                <a
                  href="tel:+917977108932"
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 group/quick"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Call Now</div>
                      <div className="text-sm text-yellow-100">Direct conversation</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover/quick:translate-x-1 transition-transform duration-300" />
                </a>

                <a
                  href="mailto:info@silvershringar.com"
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 group/quick"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Email</div>
                      <div className="text-sm text-yellow-100">Detailed custom orders</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover/quick:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-b from-white to-yellow-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-playfair">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience exceptional service that matches the quality of our jewelry
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 bg-white p-6 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {index === 0 && <Shield className="w-6 h-6 text-yellow-600" />}
                  {index === 1 && <Gem className="w-6 h-6 text-yellow-600" />}
                  {index === 2 && <Sparkles className="w-6 h-6 text-yellow-600" />}
                  {index === 3 && <Home className="w-6 h-6 text-yellow-600" />}
                  {index === 4 && <Award className="w-6 h-6 text-yellow-600" />}
                  {index === 5 && <Heart className="w-6 h-6 text-yellow-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-b from-white to-yellow-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-playfair">
              Follow Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest collections, designs, and special offers
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            {socialMedia.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon className="w-7 h-7" />
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">Follow us for jewelry styling tips, new arrivals, and exclusive offers</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-b from-yellow-50/20 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common jewelry queries
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 text-yellow-600 mr-3" />
                Is your gold BIS hallmarked?
              </h3>
              <p className="text-gray-600">
                Yes! Every piece of gold jewelry at Silver Shringar is <strong className="text-yellow-600">100% BIS hallmarked</strong> for purity. 
                We provide complete certification and guarantee the quality of our gold.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Gem className="w-5 h-5 text-yellow-600 mr-3" />
                Do you offer custom jewelry design?
              </h3>
              <p className="text-gray-600">
                Absolutely! We specialize in <strong className="text-yellow-600">custom jewelry design</strong>. Bring your ideas or inspiration, 
                and our master craftsmen will create a unique piece just for you.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Clock className="w-5 h-5 text-yellow-600 mr-3" />
                What are your store timings?
              </h3>
              <p className="text-gray-600">
                We're open <strong>7 days a week</strong> from <strong>10:30 AM to 8:30 PM</strong>, 
                including Sundays and all festivals. You're always welcome to visit our store.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Diamond className="w-5 h-5 text-yellow-600 mr-3" />
                Do you provide diamond certification?
              </h3>
              <p className="text-gray-600">
                Yes, all our diamonds come with proper certification. We offer both <strong className="text-yellow-600">natural and lab-grown diamonds</strong> 
                with complete documentation of the 4Cs (Cut, Color, Clarity, Carat).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Home className="w-5 h-5 text-yellow-600 mr-3" />
                Is home trial available?
              </h3>
              <p className="text-gray-600">
                Yes, we offer <strong className="text-yellow-600">home trial services</strong> for selected jewelry pieces in the Mira Road area. 
                Contact us to schedule a convenient time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-3" />
                What is your exchange policy?
              </h3>
              <p className="text-gray-600">
                We offer a <strong className="text-yellow-600">7-day exchange policy</strong> on all jewelry (except customized pieces). 
                You can exchange your purchase within 7 days with the original bill and packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 xl:px-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Crown className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Find Your Perfect Jewelry
            </h2>
            <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
              Visit our store in Mira Road or contact us for personalized jewelry consultation
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </button>
            <a 
              href="tel:+917977108932" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91 79771 08932
            </a>
            <a 
              href="https://maps.google.com/?q=Shop+No+4+Ram+Nagar+Ranawat+Height+2+Ramdev+Park+Road+Mira+Road+East+Thane+401105"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-yellow-700 to-yellow-800 text-white font-bold rounded-xl hover:from-yellow-800 hover:to-yellow-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}