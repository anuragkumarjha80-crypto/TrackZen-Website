import { supabase } from './supabase';

const PROFILE_KEY = 'trackzen_profile';

export const saveDailyLog = async (logData) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not logged in');

    // Create a payload matching the Supabase SQL schema
    const payload = {
      user_id: session.user.id,
      theory: logData.theory || false,
      dpp: logData.dpp || null,
      practiceSheets: logData.practiceSheets ? Number(logData.practiceSheets) : null,
      pyqs: logData.pyqs ? Number(logData.pyqs) : null,
      formulas: logData.formulas || false,
      rating: logData.rating ? Number(logData.rating) : null,
      mistakes: logData.mistakes || null,
      improvement: logData.improvement || null,
      notes: logData.notes || null
      // date and created_at are generated automatically
    };

    const { error } = await supabase.from('daily_logs').insert([payload]);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Failed to save log to Supabase', error);
    return { success: false, message: error.message || 'Unknown network error' };
  }
};

export const getDailyLogs = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];

    const { data, error } = await supabase
      .from('daily_logs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('Failed to fetch logs', e);
    return [];
  }
};

export const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getProfile = () => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : { name: 'Student', exam: 'JEE', platform: 'PW' };
  } catch {
    return { name: 'Student', exam: 'JEE', platform: 'PW' };
  }
};
