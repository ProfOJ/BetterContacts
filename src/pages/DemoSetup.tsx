import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { ArrowRight, User, Mail } from 'lucide-react';

export function DemoSetup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setDemoMode } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Store demo user information in Supabase waitlist_submissions table
      const { error: waitlistError } = await supabase
        .from('waitlist_submissions')
        .insert([
          {
            email: email,
            name: name,
            referral_source: 'demo_signup'
          }
        ]);

      if (waitlistError) {
        console.error('Error saving to waitlist:', waitlistError);
        // Don't block demo if waitlist save fails
      }

      // Store demo user data in localStorage for demo functionality
      localStorage.setItem('demoUser', JSON.stringify({ name, email }));
      
      // Initialize demo data
      const demoContacts = [
        {
          id: '1',
          name: 'Sarah Chen',
          email: 'sarah@aitools.com',
          company: 'AI Tools Inc',
          position: 'Founder & CEO',
          dateMet: '2025-01-10',
          locationMet: 'TechCrunch Conference, San Francisco',
          howMet: 'Introduced by mutual friend at networking event',
          tags: ['Startup Founder', 'AI Expert', 'Potential Partner'],
          notes: 'Discussed potential partnership for AI integration. Very interested in our platform.',
          phone: '+1 (555) 123-4567',
          birthday: '1990-05-15',
          avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
        },
        {
          id: '2',
          name: 'Marcus Johnson',
          email: 'marcus@salesforge.co',
          company: 'SalesForge',
          position: 'Sales Director',
          dateMet: '2025-01-08',
          locationMet: 'Coffee meeting, Downtown',
          howMet: 'LinkedIn connection turned into coffee meeting',
          tags: ['Sales Expert', 'B2B', 'Industry Contact'],
          notes: 'Shared insights about sales automation. Great potential for knowledge exchange.',
          phone: '+1 (555) 987-6543',
          birthday: '1985-11-22',
          avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
        },
        {
          id: '3',
          name: 'Emily Rodriguez',
          email: 'emily@consultingpro.com',
          company: 'Consulting Pro',
          position: 'Business Consultant',
          dateMet: '2025-01-05',
          locationMet: 'Industry Workshop, Miami',
          howMet: 'Met during breakout session on digital transformation',
          tags: ['Consultant', 'Digital Transformation', 'Miami'],
          notes: 'Expert in digital transformation. Could be valuable for client referrals.',
          phone: '+1 (555) 456-7890',
          birthday: '1992-08-03',
          avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
        }
      ];

      const demoTags = [
        { id: '1', name: 'Startup Founder', color: '#3B82F6' },
        { id: '2', name: 'AI Expert', color: '#8B5CF6' },
        { id: '3', name: 'Sales Expert', color: '#10B981' },
        { id: '4', name: 'Consultant', color: '#F59E0B' },
        { id: '5', name: 'Industry Contact', color: '#EF4444' }
      ];

      const demoReminders = [
        {
          id: '1',
          contactId: '1',
          type: 'follow_up',
          title: 'Follow up with Sarah Chen',
          description: 'Discuss partnership proposal and next steps',
          reminderDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        },
        {
          id: '2',
          contactId: '2',
          type: 'follow_up',
          title: 'Send resources to Marcus',
          description: 'Share sales automation case studies he requested',
          reminderDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false
        }
      ];

      localStorage.setItem('demoContacts', JSON.stringify(demoContacts));
      localStorage.setItem('demoTags', JSON.stringify(demoTags));
      localStorage.setItem('demoReminders', JSON.stringify(demoReminders));
      
      setDemoMode(true);
      navigate('/demo');
    } catch (error: any) {
      console.error('Error setting up demo:', error);
      setError('Failed to set up demo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Try Our Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your name and email to try our demo (No account needed!)
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                    required
                    disabled={loading}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Setting up demo...</span>
                  </>
                ) : (
                  <>
                    <span>Start Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What's included in the demo:
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Voice-to-text contact creation</li>
                <li>• Smart tagging and filtering</li>
                <li>• Discovery map visualization</li>
                <li>• Reminder management</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}