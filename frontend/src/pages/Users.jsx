import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Users() {
  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-semibold">Users</h1>
        <p className="mt-4 text-slate-600">Manage team members, invite new users, and assign roles from this section.</p>
      </div>
    </DashboardLayout>
  )
}
