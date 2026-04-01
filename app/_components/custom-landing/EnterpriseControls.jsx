"use client"

import { motion } from "framer-motion"

export default function EnterpriseControls() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          OpenCosmo Control Plane
        </span>
        <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-md">
          Production Environment
        </span>
      </div>

      <div className="grid grid-cols-12 min-h-[420px]">

        {/* Sidebar */}
        <div className="col-span-3 border-r border-gray-100 p-4 space-y-3 bg-gray-50">
          <SidebarItem label="Access Control" active />
          <SidebarItem label="Policies" />
          <SidebarItem label="Execution Logs" />
          <SidebarItem label="Deployment" />
        </div>

        {/* Main Panel */}
        <div className="col-span-9 p-6 space-y-6">

          {/* RBAC Section */}
          <Section title="Role-Based Access Control">
            <PermissionRow role="Admin" access="Full Access" />
            <PermissionRow role="Operator" access="Deploy & Monitor" />
            <PermissionRow role="Reviewer" access="Approve / Reject" />
          </Section>

          {/* Policy Section */}
          <Section title="Policy Enforcement Layer">
            <PolicyRow text="Refunds over $2,000 require human approval" />
            <PolicyRow text="No external API calls without token validation" />
          </Section>

          {/* Logging Section */}
          <Section title="Execution Logging & Replay">
            <LogRow action="Refund pipeline executed" status="Completed" />
            <LogRow action="Email dispatch blocked by policy" status="Blocked" />
          </Section>

        </div>
      </div>
    </div>
  )
}

/* ---- Components ---- */

function SidebarItem({ label, active }) {
  return (
    <div
      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition
        ${active ? "bg-white shadow text-gray-900" : "text-gray-600 hover:bg-white"}
      `}
    >
      {label}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

function PermissionRow({ role, access }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
      <span className="text-sm text-gray-700">{role}</span>
      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
        {access}
      </span>
    </div>
  )
}

function PolicyRow({ text }) {
  return (
    <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-700">
      {text}
    </div>
  )
}

function LogRow({ action, status }) {
  const statusColor =
    status === "Completed"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"

  return (
    <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
      <span className="text-sm text-gray-700">{action}</span>
      <span className={`text-xs px-2 py-1 rounded-md ${statusColor}`}>
        {status}
      </span>
    </div>
  )
}