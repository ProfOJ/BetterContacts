import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Moon, Sun, Zap, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function Layout({ children, showNav = true }: LayoutProps) {
  const { isDarkMode, setDarkMode, isDemoMode, user, signOut } = useApp();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {showNav && (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  to={isDemoMode ? "/demo" : user ? "/dashboard" : "/"} 
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Contacts+
                  </span>
                </Link>
                
                {isDemoMode && (
                  <div className="ml-4 px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                    Demo Mode
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!isDarkMode)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {user && (
                  <div className="flex items-center space-x-3">
                    <Link
                      to="/profile"
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}