/*
  # Create Contacts Platform Schema

  1. New Tables
    - `users` - User profiles and settings
    - `contacts` - Contact information with metadata
    - `demo_feedback` - Demo mode user feedback
    - `waitlist_submissions` - Landing page signups
    - `tags` - Contact categorization tags
    - `reminders` - Follow-up and birthday reminders
    - `changelog` - Contact change tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Public access for demo feedback and waitlist
*/

-- Users table for profiles and settings
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  avatar_url text DEFAULT '',
  bio text DEFAULT '',
  location text DEFAULT '',
  website text DEFAULT '',
  social_links jsonb DEFAULT '{}',
  privacy_settings jsonb DEFAULT '{"name": true, "email": false, "bio": true, "location": false, "website": true, "social_links": true}',
  my_page_slug text UNIQUE,
  dark_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contacts table for storing contact information
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text DEFAULT '',
  phone text DEFAULT '',
  company text DEFAULT '',
  position text DEFAULT '',
  notes text DEFAULT '',
  avatar_url text DEFAULT '',
  date_met date DEFAULT CURRENT_DATE,
  location_met text DEFAULT '',
  how_met text DEFAULT '',
  birthday date,
  social_links jsonb DEFAULT '{}',
  custom_fields jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Demo feedback table
CREATE TABLE IF NOT EXISTS demo_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  satisfaction_rating integer CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  feedback_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Waitlist submissions
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  referral_source text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Tags for contact categorization
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Contact tags junction table
CREATE TABLE IF NOT EXISTS contact_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(contact_id, tag_id)
);

-- Reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('follow_up', 'birthday', 'custom')),
  title text NOT NULL,
  description text DEFAULT '',
  reminder_date timestamptz NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Changelog table for tracking contact changes
CREATE TABLE IF NOT EXISTS changelog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  field_name text NOT NULL,
  old_value text DEFAULT '',
  new_value text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can read public profiles"
  ON users
  FOR SELECT
  TO anon
  USING (my_page_slug IS NOT NULL);

-- Contacts policies
CREATE POLICY "Users can manage own contacts"
  ON contacts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Demo feedback policies (public insert)
CREATE POLICY "Anyone can submit demo feedback"
  ON demo_feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Waitlist policies (public insert)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Tags policies
CREATE POLICY "Users can manage own tags"
  ON tags
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Contact tags policies
CREATE POLICY "Users can manage own contact tags"
  ON contact_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contacts 
      WHERE contacts.id = contact_tags.contact_id 
      AND contacts.user_id = auth.uid()
    )
  );

-- Reminders policies
CREATE POLICY "Users can manage own reminders"
  ON reminders
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Changelog policies
CREATE POLICY "Users can read own changelog"
  ON changelog
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert changelog"
  ON changelog
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_date_met_idx ON contacts(date_met);
CREATE INDEX IF NOT EXISTS tags_user_id_idx ON tags(user_id);
CREATE INDEX IF NOT EXISTS reminders_user_id_idx ON reminders(user_id);
CREATE INDEX IF NOT EXISTS reminders_date_idx ON reminders(reminder_date);
CREATE INDEX IF NOT EXISTS changelog_contact_id_idx ON changelog(contact_id);
CREATE INDEX IF NOT EXISTS users_my_page_slug_idx ON users(my_page_slug);