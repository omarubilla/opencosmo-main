'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useAgents } from '@/hooks/useDatabase';
import TopNav from '../_components/TopNav';

const AVAILABLE_TOOLS = [
  { id: 'create_calendar_event', name: 'Create Calendar Event' },
  { id: 'send_email', name: 'Send Email' },
  { id: 'run_script', name: 'Run Script' },
  { id: 'check_stock', name: 'Check Stock Price' },
  { id: 'deploy_app', name: 'Deploy App' },
];

export default function AgentPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get('id');

  const { fetchAgents, createAgent, updateAgent, deleteAgent } = useAgents();
  const [agent, setAgent] = useState({
    name: '',
    persona: '',
    goals: '',
    tools_enabled: [],
  });
  const [loading, setLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/');
      return;
    }
    if (agentId) {
      loadAgent();
    }
  }, [isLoaded, user, agentId]);

  const loadAgent = async () => {
    const agents = await fetchAgents();
    const found = agents.find(a => a.id === agentId);
    if (found) {
      setAgent(found);
    }
  };

  const handleToggleTool = (toolId) => {
    setAgent(prev => {
      const enabled = prev.tools_enabled || [];
      return {
        ...prev,
        tools_enabled: enabled.includes(toolId)
          ? enabled.filter(t => t !== toolId)
          : [...enabled, toolId],
      };
    });
  };

  const handleSave = async () => {
    if (!agent.name.trim()) {
      alert('Agent name is required');
      return;
    }

    setLoading(true);
    setSavedMessage('');

    try {
      if (agentId) {
        await updateAgent(agentId, agent);
      } else {
        await createAgent(agent);
      }
      setSavedMessage('Agent saved successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      setSavedMessage('Error saving agent: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!agentId || !confirm('Delete this agent?')) return;
    setLoading(true);
    await deleteAgent(agentId);
    router.push('/dashboard');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex items-center justify-center">
        <TopNav />
        <div className="text-[#4a4540]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1]">
      <TopNav />
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#f5f2ed] border-b border-[#e8dcc4] shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[#7d7268] hover:text-[#4a4540] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-xl font-light text-[#4a4540]">
            {agentId ? 'Edit Agent' : 'Create Agent'}
          </h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {/* Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4a4540] mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={agent.name}
              onChange={e => setAgent({ ...agent, name: e.target.value })}
              placeholder="e.g., Email Assistant"
              className="w-full px-4 py-3 bg-white border border-[#e8dcc4] rounded-lg text-[#4a4540] placeholder-[#a89a8f] focus:outline-none focus:ring-2 focus:ring-[#c89f5b]"
            />
          </div>

          {/* Persona */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4a4540] mb-2">
              Persona
            </label>
            <textarea
              value={agent.persona}
              onChange={e => setAgent({ ...agent, persona: e.target.value })}
              placeholder="Describe the agent's personality and role"
              rows="3"
              className="w-full px-4 py-3 bg-white border border-[#e8dcc4] rounded-lg text-[#4a4540] placeholder-[#a89a8f] focus:outline-none focus:ring-2 focus:ring-[#c89f5b] resize-none"
            />
          </div>

          {/* Goals */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4a4540] mb-2">
              Goals
            </label>
            <textarea
              value={agent.goals}
              onChange={e => setAgent({ ...agent, goals: e.target.value })}
              placeholder="What should this agent accomplish?"
              rows="3"
              className="w-full px-4 py-3 bg-white border border-[#e8dcc4] rounded-lg text-[#4a4540] placeholder-[#a89a8f] focus:outline-none focus:ring-2 focus:ring-[#c89f5b] resize-none"
            />
          </div>

          {/* Tools */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#4a4540] mb-4">
              Enabled Tools
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_TOOLS.map(tool => (
                <label
                  key={tool.id}
                  className="flex items-center gap-3 p-3 bg-white border border-[#e8dcc4] rounded-lg cursor-pointer hover:bg-[#f5f2ed] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={(agent.tools_enabled || []).includes(tool.id)}
                    onChange={() => handleToggleTool(tool.id)}
                    className="w-4 h-4 text-[#c89f5b] cursor-pointer"
                  />
                  <span className="text-sm text-[#4a4540]">{tool.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Messages */}
          {savedMessage && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              savedMessage.includes('success')
                ? 'bg-[#e7f5e8] text-[#2d5f3f]'
                : 'bg-[#ffe7e7] text-[#5f2d2d]'
            }`}>
              {savedMessage}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#c89f5b] text-white rounded-lg hover:bg-[#b8915c] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Agent
            </button>
            {agentId && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
