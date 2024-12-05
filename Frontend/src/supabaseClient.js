import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tfkgssvsqrlybxxjzwxx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRma2dzc3ZzcXJseWJ4eGp6d3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzM2NDIsImV4cCI6MjA0ODk0OTY0Mn0.z4f4u68nZRuelSi_2yIVQZERjKjyIivtgHdO53OjPkk"
;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);