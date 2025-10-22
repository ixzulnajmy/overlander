-- Migration: Add status field to bikes table
-- Run this in your Supabase SQL Editor

-- Add status column to bikes table if it doesn't exist
ALTER TABLE public.bikes
ADD COLUMN IF NOT EXISTS status text
CHECK (status IN ('current','past','wishlist'))
DEFAULT 'current';

-- Update any existing bikes to have 'current' status
UPDATE public.bikes
SET status = 'current'
WHERE status IS NULL;
