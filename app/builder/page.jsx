'use client'

import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import TopNav from '../_components/TopNav'

export default function BuilderPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] flex items-center justify-center">
        <TopNav />
        <div className="text-[#4a4540]">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1]">
      <TopNav />
      <nav className="border-b border-[#d4cec3] bg-white/50 backdrop-blur mt-16">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-light text-[#4a4540]">
            <span className="text-[var(--brand-red)]">⭕</span> OpenCosmo Builder
          </Link>
          <div className="flex gap-4">
            <Link
              href="/builder/dashboard"
              className="px-4 py-2 text-[#4a4540] hover:bg-white/30 rounded transition"
            >
              Dashboard
            </Link>
            <Link
              href="/builder/agent"
              className="px-4 py-2 bg-[#c89f5b] text-white rounded hover:bg-[#b8905b] transition"
            >
              Create Agent
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-light text-[#4a4540]">
            Agent Builder
          </h1>
          <p className="text-xl text-[#7d7268] font-light">
            Create, configure, and manage your AI agents
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/builder/dashboard"
              className="px-6 py-3 bg-[#c89f5b] text-white rounded hover:bg-[#b8905b] transition font-light"
            >
              View Dashboard
            </Link>
            <Link
              href="/builder/agent"
              className="px-6 py-3 border-2 border-[#c89f5b] text-[#c89f5b] rounded hover:bg-[#c89f5b]/5 transition font-light"
            >
              Build New Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
