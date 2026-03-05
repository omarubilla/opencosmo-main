// Database hooks for agent operations
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';

export function useAgents() {
  const { user } = useUser();

  const fetchAgents = async () => {
    if (!user) return [];
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching agents:', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Supabase not configured:', err.message);
      return [];
    }
  };

  const createAgent = async (agentData) => {
    if (!user) return null;
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('agents')
        .insert([{ ...agentData, user_id: user.id }])
        .select()
        .single();
      
      if (error) console.error('Error creating agent:', error);
      return data;
    } catch (err) {
      console.error('Error:', err.message);
      return null;
    }
  };

  const updateAgent = async (agentId, updates) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('agents')
        .update(updates)
        .eq('id', agentId)
        .select()
        .single();
      
      if (error) console.error('Error updating agent:', error);
      return data;
    } catch (err) {
      console.error('Error:', err.message);
      return null;
    }
  };

  const deleteAgent = async (agentId) => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', agentId);
      
      if (error) console.error('Error deleting agent:', error);
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  return { fetchAgents, createAgent, updateAgent, deleteAgent };
}

export function useRuns() {
  const fetchRuns = async (agentId) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('runs')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching runs:', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Error:', err.message);
      return [];
    }
  };

  const createRun = async (runData) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('runs')
        .insert([runData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating run:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error:', err.message);
      return null;
    }
  };

  const updateRun = async (runId, updates) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('runs')
        .update(updates)
        .eq('id', runId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating run:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Error:', err.message);
      return null;
    }
  };

  return { fetchRuns, createRun, updateRun };
}
