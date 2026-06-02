import React from 'react'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Welcome back, {user?.email}</h1>
            <p className="mt-2 text-slate-600">This is your dashboard. Your account is now authenticated.</p>
          </div>
          <button
            onClick={logout}
            className="rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold">Next step</h2>
            <p className="mt-3 text-slate-700">Add wallet funding, view transaction history, and launch identity requests from this dashboard.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold">User role</h2>
            <p className="mt-3 text-slate-700">Current role: <strong>{user?.role}</strong></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
