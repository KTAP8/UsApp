import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Types for Supabase tables
export type Tables = {
  users: {
    Row: {
      id: string;
      email: string;
      full_name: string;
      avatar_url: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      email: string;
      full_name: string;
      avatar_url?: string;
    };
    Update: {
      email?: string;
      full_name?: string;
      avatar_url?: string;
      updated_at?: string;
    };
  };
  couples: {
    Row: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
      join_code: string;
      status: "active" | "inactive";
    };
    Insert: {
      name: string;
      join_code: string;
      status?: "active" | "inactive";
    };
    Update: {
      name?: string;
      status?: "active" | "inactive";
      updated_at?: string;
    };
  };
  couple_members: {
    Row: {
      id: string;
      couple_id: string;
      user_id: string;
      role: "creator" | "member";
      joined_at: string;
    };
    Insert: {
      couple_id: string;
      user_id: string;
      role: "creator" | "member";
    };
    Update: {
      role?: "creator" | "member";
    };
  };
};
