import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AppState {
  user: User | null;
  isDemoMode: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  contacts: any[];
  tags: any[];
  reminders: any[];
}

interface AppContextType extends AppState {
  setDemoMode: (isDemoMode: boolean) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setContacts: (contacts: any[]) => void;
  setTags: (tags: any[]) => void;
  setReminders: (reminders: any[]) => void;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_DEMO_MODE'; payload: boolean }
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONTACTS'; payload: any[] }
  | { type: 'SET_TAGS'; payload: any[] }
  | { type: 'SET_REMINDERS'; payload: any[] };

const initialState: AppState = {
  user: null,
  isDemoMode: false,
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  isLoading: true,
  contacts: [],
  tags: [],
  reminders: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_DEMO_MODE':
      return { ...state, isDemoMode: action.payload };
    case 'SET_DARK_MODE':
      localStorage.setItem('darkMode', action.payload.toString());
      return { ...state, isDarkMode: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_REMINDERS':
      return { ...state, reminders: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setDemoMode = (isDemoMode: boolean) => {
    dispatch({ type: 'SET_DEMO_MODE', payload: isDemoMode });
  };

  const setDarkMode = (isDarkMode: boolean) => {
    dispatch({ type: 'SET_DARK_MODE', payload: isDarkMode });
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setContacts = (contacts: any[]) => {
    dispatch({ type: 'SET_CONTACTS', payload: contacts });
  };

  const setTags = (tags: any[]) => {
    dispatch({ type: 'SET_TAGS', payload: tags });
  };

  const setReminders = (reminders: any[]) => {
    dispatch({ type: 'SET_REMINDERS', payload: reminders });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setContacts([]);
    setTags([]);
    setReminders([]);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.isDarkMode);
  }, [state.isDarkMode]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    ...state,
    setDemoMode,
    setDarkMode,
    setUser,
    setLoading,
    setContacts,
    setTags,
    setReminders,
    signOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}