import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wbkmidakttccxbjyqdhx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VEDa8S40UPFymWkG6HM18A_R_4vHPnD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
