import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">Unauthorized</h1>
      <p className="text-base text-slate-600 mb-6">
        You do not have permission to view this page. If you believe this is an error, contact your administrator.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
      >
        Back to home
      </Link>
    </div>
  )
}
