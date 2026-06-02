import React from 'react'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Profile() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="mt-4 text-slate-600">Review your account details and role information.</p>

          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div>
              <h2 className="font-medium text-slate-900">Email</h2>
              <p>{user?.email}</p>
            </div>
            <div>
              <h2 className="font-medium text-slate-900">Role</h2>
              <p>{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
