import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { DemoSetup } from './pages/DemoSetup';
import { Demo } from './pages/Demo';

function AppContent() {
  const { user, isDemoMode, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/demo-setup" element={<DemoSetup />} />
        <Route path="/demo" element={isDemoMode ? <Demo /> : <Navigate to="/demo-setup" />} />
        <Route 
          path="/dashboard" 
          element={user ? <div>Live Dashboard Coming Soon</div> : <Navigate to="/auth" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;