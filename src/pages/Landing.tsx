import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useApp } from '../contexts/AppContext';
import { 
  Brain, 
  Clock, 
  Map, 
  Calendar, 
  Tag, 
  Share2,
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react';

export function Landing() {
  const { setDemoMode } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleTryDemo = () => {
    setDemoMode(true);
    navigate('/demo-setup');
  };

  const features = [
    {
      icon: Brain,
      title: 'Smart Contact Creation',
      description: 'Voice-to-text contact creation with automatic field detection'
    },
    {
      icon: Clock,
      title: 'Follow-up Reminders',
      description: 'Never forget to reconnect with intelligent reminder scheduling'
    },
    {
      icon: Map,
      title: 'Discovery Map',
      description: 'Visualize where you met contacts with interactive location mapping'
    },
    {
      icon: Calendar,
      title: 'Birthday Notifications',
      description: 'Automatic birthday tracking with advance notifications'
    },
    {
      icon: Tag,
      title: 'Custom Tags & Filters',
      description: 'Organize contacts with smart tagging and powerful filtering'
    },
    {
      icon: Share2,
      title: 'Public Profile Builder',
      description: 'Create and share your professional profile with QR codes'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Startup Founder',
      content: 'This platform transformed how I manage my professional network. The voice creation feature saves me hours every week.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Sales Director',
      content: 'The reminder system is game-changing. I never miss a follow-up anymore and my conversion rates have doubled.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Consultant',
      content: 'The discovery map helps me remember exactly where I met each contact. It\'s like having a photographic memory.',
      rating: 5
    }
  ];

  return (
    <Layout showNav={false}>
      <div className="bg-white dark:bg-gray-900 relative">
        {/* Bolt.new Badge - Fixed Position */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://bolt.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transform hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            <img
              src="https://builton.top/bolt_logo_black_circle_360x360.png"
              alt="Built on Bolt.new"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Contacts+
                  </span>
                </div>
                
                <div className="ml-4 px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Built with Bolt</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Contacts that
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> remember</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Go beyond name and number. Remember when, where, and why you met someone. 
                Get intelligent reminders to follow up and build meaningful professional relationships.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleTryDemo}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Try Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/auth"
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Everything you need to manage contacts intelligently
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Powerful features designed to transform how you build and maintain professional relationships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Storytelling Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Voice-powered contact creation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Simply speak and watch as our intelligent system automatically fills in contact details, 
                  tags relationships, and schedules follow-ups.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Automatic field detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Smart relationship tagging</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Instant reminder scheduling</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Recording...</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "I just met Sarah Chen at the TechCrunch conference. She's a startup founder working on AI tools. 
                    Her email is sarah@aitools.com. I should follow up next week about the partnership opportunity."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Loved by professionals worldwide
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See how Contacts+ is transforming professional networking
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to revolutionize your networking?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Join thousands of professionals who never miss a connection opportunity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleTryDemo}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Try Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/auth"
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Contacts+
                  </span>
                </div>
                <p className="text-gray-400 mb-6">
                  The modern contacts platform that remembers what matters most about your professional relationships.
                </p>
                <div className="flex items-center space-x-4">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <Smartphone className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Contacts+. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}