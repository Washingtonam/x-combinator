import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">X-Combinator</h1>
          <p className="mt-6 text-xl text-slate-300">Identity and corporate service automation built for Nigeria — fast, secure, and backed by modern wallet-powered flows.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400">
              Get started
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/20">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
