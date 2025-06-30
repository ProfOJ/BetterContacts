import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { 
  Plus, 
  Search, 
  Filter, 
  Map, 
  BarChart3, 
  X, 
  Mic, 
  MicOff,
  Calendar,
  Clock,
  Tag,
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  Star
} from 'lucide-react';

export function Demo() {
  const { setDemoMode } = useApp();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');
  const [satisfaction, setSatisfaction] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Demo form state
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    locationMet: '',
    howMet: '',
    notes: '',
    tags: [] as string[]
  });

  useEffect(() => {
    // Load demo data from localStorage
    const demoContacts = JSON.parse(localStorage.getItem('demoContacts') || '[]');
    const demoTags = JSON.parse(localStorage.getItem('demoTags') || '[]');
    const demoReminders = JSON.parse(localStorage.getItem('demoReminders') || '[]');
    
    setContacts(demoContacts);
    setFilteredContacts(demoContacts);
    setTags(demoTags);
    setReminders(demoReminders);
  }, []);

  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(contact => 
        contact.tags.includes(selectedTag)
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, selectedTag]);

  const simulateVoiceInput = () => {
    setIsRecording(true);
    
    setTimeout(() => {
      setIsRecording(false);
      // Simulate voice-to-text conversion
      setNewContact({
        name: 'Alex Thompson',
        email: 'alex@designstudio.com',
        company: 'Design Studio',
        position: 'Creative Director',
        phone: '+1 (555) 234-5678',
        locationMet: 'Design Conference, Austin',
        howMet: 'Met during workshop on UX trends',
        notes: 'Interested in collaboration on design projects. Mentioned upcoming rebranding project.',
        tags: ['Designer', 'Creative', 'Austin']
      });
    }, 3000);
  };

  const handleAddContact = () => {
    const contact = {
      id: Date.now().toString(),
      ...newContact,
      dateMet: new Date().toISOString().split('T')[0],
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    };

    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem('demoContacts', JSON.stringify(updatedContacts));
    
    setShowAddContact(false);
    setNewContact({
      name: '',
      email: '',
      company: '',
      position: '',
      phone: '',
      locationMet: '',
      howMet: '',
      notes: '',
      tags: []
    });
  };

  const handleExitDemo = async () => {
    setSubmittingFeedback(true);
    
    try {
      const demoUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
      
      // Save feedback to Supabase
      const { error } = await supabase
        .from('demo_feedback')
        .insert([
          {
            name: demoUser.name || 'Anonymous',
            email: demoUser.email || '',
            satisfaction_rating: satisfaction || null,
            feedback_text: feedback || ''
          }
        ]);

      if (error) {
        console.error('Error saving feedback:', error);
        // Still proceed with exit even if feedback save fails
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    } finally {
      setSubmittingFeedback(false);
      
      // Clear demo data
      localStorage.removeItem('demoUser');
      localStorage.removeItem('demoContacts');
      localStorage.removeItem('demoTags');
      localStorage.removeItem('demoReminders');
      
      setDemoMode(false);
      navigate('/');
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed).slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Demo Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Experience intelligent contact management
            </p>
          </div>
          <button
            onClick={() => setShowExitModal(true)}
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Exit Demo
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contacts.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Active Reminders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingReminders.length}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Tags Created</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{tags.length}</p>
              </div>
              <Tag className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'contacts', label: 'Contacts', icon: User },
            { id: 'reminders', label: 'Reminders', icon: Clock },
            { id: 'map', label: 'Discovery Map', icon: Map },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            {/* Contacts Header */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowAddContact(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Contact</span>
              </button>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={contact.avatarUrl}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {contact.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {contact.position} at {contact.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{contact.locationMet}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1">
                    {contact.tags.slice(0, 2).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {contact.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{contact.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Upcoming Reminders
            </h2>
            <div className="space-y-4">
              {upcomingReminders.map((reminder) => {
                const contact = contacts.find(c => c.id === reminder.contactId);
                return (
                  <div key={reminder.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {reminder.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contact?.name} • {reminder.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(reminder.reminderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                      Mark Complete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Discovery Map
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive map showing where you met each contact
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  (Map visualization would appear here in the full version)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Growth
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Growth chart would appear here
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tag Distribution
              </h3>
              <div className="space-y-3">
                {tags.slice(0, 5).map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                      <span className="text-gray-900 dark:text-white">{tag.name}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {contacts.filter(c => c.tags.includes(tag.name)).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Contact
                </h2>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <button
                  onClick={simulateVoiceInput}
                  disabled={isRecording}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    isRecording
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 animate-pulse" />
                      <span>Recording... (Demo)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      <span>Try Voice Input (Demo)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={newContact.position}
                    onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Where did you meet?
                  </label>
                  <input
                    type="text"
                    value={newContact.locationMet}
                    onChange={(e) => setNewContact({...newContact, locationMet: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newContact.notes}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Demo Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              How was your demo experience?
            </h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Rate your satisfaction (1-5):
              </p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSatisfaction(rating)}
                    className={`w-10 h-10 rounded-full transition-colors ${
                      satisfaction >= rating
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Star className="w-5 h-5 mx-auto" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Any feedback for us?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your feedback helps us improve..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExitModal(false)}
                disabled={submittingFeedback}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                Continue Demo
              </button>
              <button
                onClick={handleExitDemo}
                disabled={submittingFeedback}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {submittingFeedback ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Exit Demo</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}