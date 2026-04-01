'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Plus, Edit, Play, Trash2 } from 'lucide-react';
import { useAgents } from '@/hooks/useDatabase';
import TopNav from '../../_components/TopNav';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { fetchAgents, deleteAgent } = useAgents();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/');
      return;
    }
    loadAgents();
  }, [isLoaded, user]);

  const loadAgents = async () => {
    setLoading(true);
    const data = await fetchAgents();
    setAgents(data);
    setLoading(false);
  };

  const handleDelete = async (agentId) => {
    if (confirm('Delete this agent?')) {
      await deleteAgent(agentId);
      loadAgents();
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex items-center justify-center">
        <TopNav />
        <div className="text-[#4a4540]">Loading agents...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1]">
      <TopNav />
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#f5f2ed] border-b border-[#e8dcc4] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#c89f5b]" />
            <h1 className="text-2xl font-light text-[#4a4540]">OpenCosmo Agents</h1>
          </div>
          <Link
            href="/builder/agent"
            className="flex items-center gap-2 px-4 py-2 bg-[#c89f5b] text-white rounded-lg hover:bg-[#b8915c] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {agents.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="w-16 h-16 text-[#e8dcc4] mx-auto mb-4 opacity-50" />
            <p className="text-[#7d7268] text-lg mb-6">No agents yet</p>
            <Link
              href="/builder/agent"
              className="inline-block px-6 py-3 bg-[#c89f5b] text-white rounded-lg hover:bg-[#b8915c] transition-colors"
            >
              Create your first agent
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div
                key={agent.id}
                className="bg-white rounded-xl p-6 border border-[#e8dcc4] shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-medium text-[#4a4540] mb-2">{agent.name}</h3>
                <p className="text-sm text-[#7d7268] mb-4">{agent.persona}</p>
                <div className="mb-4 text-xs text-[#a89a8f]">
                  <p><strong>Goals:</strong> {agent.goals}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/builder/agent?id=${agent.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#f5f2ed] text-[#4a4540] rounded-lg hover:bg-[#ece8e1] transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <Link
                    href={`/builder/run?agent_id=${agent.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#c89f5b] text-white rounded-lg hover:bg-[#b8915c] transition-colors text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Run
                  </Link>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="px-3 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
