import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://guzwjncnbuiiazedbuis.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1endqbmNuYnVpaWF6ZWRidWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTkyNjgsImV4cCI6MjAyOTY5NTI2OH0.24aX1cMX4ilkkUoZs-GE-MxWCoqfaE6rmnwRpJMxs-g';

export const supabase = createClient(supabaseUrl, supabaseKey);
