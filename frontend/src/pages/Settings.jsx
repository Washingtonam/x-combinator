import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-4 text-slate-600">Configure platform settings, security policies, and application preferences.</p>
      </div>
    </DashboardLayout>
  )
}
