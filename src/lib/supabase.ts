import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string;
          bio: string;
          location: string;
          website: string;
          social_links: Record<string, any>;
          privacy_settings: Record<string, any>;
          my_page_slug: string | null;
          dark_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string;
          avatar_url?: string;
          bio?: string;
          location?: string;
          website?: string;
          social_links?: Record<string, any>;
          privacy_settings?: Record<string, any>;
          my_page_slug?: string;
          dark_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          bio?: string;
          location?: string;
          website?: string;
          social_links?: Record<string, any>;
          privacy_settings?: Record<string, any>;
          my_page_slug?: string;
          dark_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          company: string;
          position: string;
          notes: string;
          avatar_url: string;
          date_met: string;
          location_met: string;
          how_met: string;
          birthday: string | null;
          social_links: Record<string, any>;
          custom_fields: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email?: string;
          phone?: string;
          company?: string;
          position?: string;
          notes?: string;
          avatar_url?: string;
          date_met?: string;
          location_met?: string;
          how_met?: string;
          birthday?: string;
          social_links?: Record<string, any>;
          custom_fields?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string;
          position?: string;
          notes?: string;
          avatar_url?: string;
          date_met?: string;
          location_met?: string;
          how_met?: string;
          birthday?: string;
          social_links?: Record<string, any>;
          custom_fields?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};