import React from 'react'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6">{children}</main>
      </div>
    </div>
  )
}
