'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Play, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAgents, useRuns } from '@/hooks/useDatabase';
import TopNav from '../../_components/TopNav';

export default function RunPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agent_id');

  const { fetchAgents } = useAgents();
  const { fetchRuns, createRun, updateRun } = useRuns();

  const [agent, setAgent] = useState(null);
  const [runs, setRuns] = useState([]);
  const [input, setInput] = useState('');
  const [executing, setExecuting] = useState(false);
  const [currentRun, setCurrentRun] = useState(null);
  const [toolLogs, setToolLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push('/');
      return;
    }
    if (!agentId) {
      router.push('/builder/dashboard');
      return;
    }
    loadData();
  }, [isLoaded, user, agentId]);

  const loadData = async () => {
    const agents = await fetchAgents();
    const found = agents.find(a => a.id === agentId);
    if (found) {
      setAgent(found);
      const runsList = await fetchRuns(agentId);
      setRuns(runsList);
    }
    setLoading(false);
  };

  const handleExecute = async () => {
    if (!input.trim() || !agent) return;

    setExecuting(true);
    setToolLogs([]);

    try {
      // Step 1: Generate plan with Claude
      const planResponse = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: input,
          toolsList: agent.tools_enabled || [],
          agentPersona: agent.persona,
          agentGoals: agent.goals,
        }),
      });

      const planData = await planResponse.json();
      if (!planData.plan) throw new Error('Failed to generate plan');

      const plan = planData.plan;
      addLog('info', `Plan: ${plan.goal}`);

      // Create run record
      const run = await createRun({
        agent_id: agentId,
        input: input,
        plan: plan,
        tool_calls: [],
        output: '',
        status: 'executing',
      });

      setCurrentRun(run);

      // Step 2: Execute plan with GPT
      if (plan.steps && plan.steps.length > 0) {
        for (const step of plan.steps) {
          addLog('pending', `Executing: ${step.tool}`);

          try {
            const toolResponse = await fetch('/api/execute-tool', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                tool: step.tool,
                args: step.args || {},
              }),
            });

            const toolResult = await toolResponse.json();
            if (toolResult.success) {
              addLog('success', `${step.tool}: ${JSON.stringify(toolResult.result)}`);
            } else {
              addLog('error', `${step.tool}: ${toolResult.error}`);
            }
          } catch (err) {
            addLog('error', `${step.tool}: ${err.message}`);
          }
        }
      }

      addLog('success', 'Execution completed successfully');

      // Update run with results
      await updateRun(run.id, {
        tool_calls: toolLogs,
        output: `Successfully executed plan: ${plan.goal}`,
        status: 'completed',
      });

      setInput('');
      loadData();
    } catch (error) {
      addLog('error', error.message);
    } finally {
      setExecuting(false);
    }
  };

  const addLog = (type, message) => {
    const log = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setToolLogs(prev => [...prev, log]);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex items-center justify-center">
        <TopNav />
        <div className="text-[#4a4540]">Loading...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex items-center justify-center">
        <TopNav />
        <div className="text-center">
          <p className="text-[#7d7268] mb-4">Agent not found</p>
          <Link href="/builder/dashboard" className="text-[#c89f5b] hover:text-[#b8915c]">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1]">
      <TopNav />
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#f5f2ed] border-b border-[#e8dcc4] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/builder/dashboard"
            className="flex items-center gap-2 text-[#7d7268] hover:text-[#4a4540] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-xl font-light text-[#4a4540]">
            Run: {agent.name}
          </h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-[#e8dcc4]">
            <p className="text-xs text-[#a89a8f] mb-1">Agent Name</p>
            <p className="text-sm font-medium text-[#4a4540]">{agent.name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#e8dcc4]">
            <p className="text-xs text-[#a89a8f] mb-1">Status</p>
            <p className="text-sm font-medium text-[#4a4540]">
              {executing ? '🔄 Executing' : currentRun ? '✅ Completed' : '⏳ Ready'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#e8dcc4]">
            <p className="text-xs text-[#a89a8f] mb-1">Runs Today</p>
            <p className="text-sm font-medium text-[#4a4540]">{runs.length}</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-8 bg-white rounded-lg border border-[#e8dcc4] p-6">
          <label className="block text-sm font-medium text-[#4a4540] mb-3">
            Enter Task
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What would you like the agent to do?"
            rows="4"
            disabled={executing}
            className="w-full px-4 py-3 bg-[#f5f2ed] border border-[#e8dcc4] rounded-lg text-[#4a4540] placeholder-[#a89a8f] focus:outline-none focus:ring-2 focus:ring-[#c89f5b] resize-none disabled:opacity-50"
          />
          <button
            onClick={handleExecute}
            disabled={executing || !input.trim()}
            className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#c89f5b] text-white rounded-lg hover:bg-[#b8915c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {executing ? 'Executing...' : 'Execute Agent'}
          </button>
        </div>

        {/* Execution Logs */}
        {toolLogs.length > 0 && (
          <div className="mb-8 bg-white rounded-lg border border-[#e8dcc4] p-6">
            <h2 className="text-lg font-medium text-[#4a4540] mb-4">Execution Log</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {toolLogs.map(log => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg text-sm flex items-start gap-3 ${
                    log.type === 'success'
                      ? 'bg-[#e7f5e8] text-[#2d5f3f]'
                      : log.type === 'error'
                      ? 'bg-[#ffe7e7] text-[#5f2d2d]'
                      : log.type === 'pending'
                      ? 'bg-[#fff3cd] text-[#664d33]'
                      : 'bg-[#e7f1ff] text-[#2d3f5f]'
                  }`}
                >
                  <span className="mt-1">
                    {log.type === 'success' && <CheckCircle className="w-4 h-4" />}
                    {log.type === 'error' && <AlertCircle className="w-4 h-4" />}
                    {log.type === 'pending' && <Clock className="w-4 h-4 animate-spin" />}
                    {log.type === 'info' && <Clock className="w-4 h-4" />}
                  </span>
                  <div className="flex-1">
                    <p className="break-words">{log.message}</p>
                    <p className="text-xs opacity-50 mt-1">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous Runs */}
        {runs.length > 0 && (
          <div className="bg-white rounded-lg border border-[#e8dcc4] p-6">
            <h2 className="text-lg font-medium text-[#4a4540] mb-4">Previous Runs</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {runs.map(run => (
                <div key={run.id} className="p-3 bg-[#f5f2ed] rounded-lg border border-[#e8dcc4]">
                  <p className="text-sm text-[#4a4540] font-medium">{run.input}</p>
                  <p className="text-xs text-[#a89a8f] mt-1">
                    {new Date(run.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
