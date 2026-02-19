-- ============================================
-- ReferTRM Database Setup for Supabase
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create USERS table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  name VARCHAR(255),
  avatar_url TEXT,
  avatar_type VARCHAR(50) DEFAULT 'neutral',
  avatar VARCHAR(50) DEFAULT '🧑',
  points INTEGER DEFAULT 50,
  total_points_earned INTEGER DEFAULT 50,
  streak INTEGER DEFAULT 1,
  max_streak INTEGER DEFAULT 1,
  referral_code VARCHAR(20) UNIQUE DEFAULT ('REF' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6))),
  total_referrals INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  total_earned DECIMAL(12,2) DEFAULT 0,
  level VARCHAR(50) DEFAULT 'Amateur',
  completed_modules TEXT[] DEFAULT '{}',
  purchased_items TEXT[] DEFAULT '{}',
  last_login_at TIMESTAMP WITH TIME ZONE,
  last_bonus_claim TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create COMPANIES table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_mm VARCHAR(255),
  industry VARCHAR(100),
  location VARCHAR(255),
  website VARCHAR(255),
  logo_url TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create JOBS table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  title_mm VARCHAR(255),
  company VARCHAR(255) NOT NULL,
  company_id UUID REFERENCES companies(id),
  location VARCHAR(255),
  salary VARCHAR(100),
  salary_min INTEGER,
  salary_max INTEGER,
  reward INTEGER DEFAULT 0,
  reward_full INTEGER,
  skills TEXT[] DEFAULT '{}',
  type VARCHAR(50) DEFAULT 'Full-time',
  level VARCHAR(50) DEFAULT 'Mid',
  urgent BOOLEAN DEFAULT TRUE,
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  status VARCHAR(50) DEFAULT 'active',
  posted_by UUID,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 5. Create REFERRALS table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL,
  referrer_code VARCHAR(20),
  candidate_name VARCHAR(255) NOT NULL,
  candidate_email VARCHAR(255),
  candidate_phone VARCHAR(50),
  job_id UUID REFERENCES jobs(id),
  job_title VARCHAR(255),
  company_id UUID REFERENCES companies(id),
  company_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  reward_amount DECIMAL(12,2) DEFAULT 0,
  reward_paid BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create LEADS table (for CV Lead Tracker data)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  current_company VARCHAR(255),
  current_position VARCHAR(255),
  skills TEXT[],
  experience_years INTEGER,
  expected_salary INTEGER,
  preferred_location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  source VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can insert user" ON users
  FOR INSERT WITH CHECK (true);

-- 9. Create RLS Policies for public tables
CREATE POLICY "Anyone can view companies" ON companies
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view active jobs" ON jobs
  FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view referrals" ON referrals
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert referrals" ON referrals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view leads" ON leads
  FOR SELECT USING (true);

-- 10. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- ============================================
-- INSERT COMPANIES DATA
-- ============================================

INSERT INTO companies (name, industry, location) VALUES
('RK Yangon Steel', 'Manufacturing', 'Thanlyin'),
('Universal Energy', 'Energy', 'Thingangyun'),
('Shwe Taung Htun', 'Media', 'Mingalar Taung Nyunt'),
('Sun Myat Tun', 'Construction', 'Botahtaung'),
('NielsenIQ Myanmar', 'Market Research', 'Yangon'),
('Real Aid Microfinance', 'Finance', 'Ayeyarwady'),
('Unicharm Myanmar', 'Consumer Goods', 'Yankin'),
('Myanmar Information Technology', 'Technology', 'Insein'),
('KBZ Life Insurance', 'Insurance', 'Bahan'),
('Salpyar', 'E-commerce', 'North Dagon'),
('WOW Sport', 'Retail', 'Kamaryut'),
('AMI', 'Marketing', 'Kamaryut'),
('TOMO', 'Technology', 'South Dagon'),
('Wave Plus', 'Telecommunications', 'Mingalardon'),
('Yangoods', 'Retail', 'Pyin Oo Lwin'),
('GK International Company', 'Trading', 'Kamaryut'),
('Delight Amatat', 'Interior Design', 'Thingangyun')
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERT JOBS DATA (26 Urgent Positions)
-- ============================================

INSERT INTO jobs (title, company, location, salary, salary_min, salary_max, reward, urgent, status) VALUES
('Senior Supervisor', 'RK Yangon Steel', 'Thanlyin', '7.5 Lakhs to 10 Lakhs', 750000, 1000000, 100000, true, 'active'),
('Warehouse Supervisor', 'Universal Energy', 'Thingangyun', 'Negotiable', 0, 0, 80000, true, 'active'),
('Content & Script Writer', 'Shwe Taung Htun', 'Mingalar Taung Nyunt', '4 Lakhs to 6 Lakhs', 400000, 600000, 60000, true, 'active'),
('Site Engineer', 'Sun Myat Tun', 'Botahtaung', '7.5 Lakhs', 750000, 750000, 90000, true, 'active'),
('Data Collector', 'NielsenIQ Myanmar', 'Mdy,Sagaing,Meikhtila', '3.5 Lakhs', 350000, 350000, 50000, true, 'active'),
('Loan Officer', 'Real Aid Microfinance', 'Ayeyarwady', '4 Lakhs to 5 Lakhs', 400000, 500000, 60000, true, 'active'),
('Cashier', 'Real Aid Microfinance', 'Ayeyarwady', 'Above 3 Lakhs', 300000, 400000, 40000, true, 'active'),
('Brand Executive', 'Unicharm Myanmar', 'Yankin', '7 Lakhs to 9 Lakhs', 700000, 900000, 80000, true, 'active'),
('Assistant Brand Manager', 'Unicharm Myanmar', 'Yankin', '15 Lakhs to 17 Lakhs', 1500000, 1700000, 150000, true, 'active'),
('Receptionist', 'Myanmar Information Technology', 'Insein', '3 Lakhs to 4 Lakhs', 300000, 400000, 40000, true, 'active'),
('Assistant Accountant', 'KBZ Life Insurance', 'Bahan', '4 Lakhs to 5 Lakhs', 400000, 500000, 50000, true, 'active'),
('Accountant', 'Universal Energy', 'Thingangyun', '6 Lakhs to 7 Lakhs', 600000, 700000, 70000, true, 'active'),
('Online Sale', 'Salpyar', 'North Dagon', '2.4 Lakhs', 240000, 240000, 30000, true, 'active'),
('Graphic Designer', 'WOW Sport', 'Kamaryut', 'Around 10 Lakhs', 900000, 1100000, 100000, true, 'active'),
('Senior Sales Executive', 'WOW Sport', 'Kamaryut', '10 Lakhs', 1000000, 1000000, 100000, true, 'active'),
('Senior Agency Sales Representative', 'AMI', 'Kamaryut', '5 Lakhs to 6.5 Lakhs', 500000, 650000, 70000, true, 'active'),
('Admin Supervisor', 'TOMO', 'South Dagon', '5 Lakhs to 6 Lakhs', 500000, 600000, 60000, true, 'active'),
('IT Supervisor', 'Wave Plus', 'Mingalardon', '6 Lakhs', 600000, 600000, 70000, true, 'active'),
('Sales Staff', 'Yangoods', 'Pyin Oo Lwin', '2.04 Lakhs', 204000, 204000, 25000, true, 'active'),
('Senior Page Admin', 'TOMO', 'Tamwe', 'Negotiable', 0, 0, 60000, true, 'active'),
('Junior Page Admin', 'TOMO', 'Tamwe', '3 Lakhs to 3.5 Lakhs', 300000, 350000, 40000, true, 'active'),
('Junior Accountant', 'Unicharm Myanmar', 'Yankin', '3.5 Lakhs to 4 Lakhs', 350000, 400000, 45000, true, 'active'),
('Accountant', 'GK International Company', 'Kamaryut', '6.5 Lakhs to 8 Lakhs', 650000, 800000, 80000, true, 'active'),
('Assistant Project Coordinator', 'GK International Company', 'Kamaryut', '3.5 Lakhs to 5 Lakhs', 350000, 500000, 50000, true, 'active'),
('Interior Designer', 'Delight Amatat', 'Thingangyun', '10 Lakhs to 15 Lakhs', 1000000, 1500000, 120000, true, 'active'),
('Quantity Surveyor', 'Delight Amatat', 'Thingangyun', '10 Lakhs to 15 Lakhs', 1000000, 1500000, 120000, true, 'active');

-- ============================================
-- DONE! Your ReferTRM database is ready.
-- ============================================
-- Copy this entire SQL and run it in:
-- Supabase Dashboard > SQL Editor > New Query
-- ============================================
