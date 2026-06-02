import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import navConfig from '../config/navConfig'

export default function Sidebar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const menuItems = useMemo(() => {
    return navConfig.filter(item => item.roles.includes(user?.role))
  }, [user?.role])

  return (
    <>
      <div className="md:hidden bg-slate-900 px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Menu</div>
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        </div>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 py-8">
          <div>
            <div className="mb-10">
              <span className="block text-2xl font-semibold">X-Combinator</span>
              <p className="mt-2 text-sm text-slate-400">Enterprise dashboard</p>
            </div>

            <div className="space-y-1">
              {menuItems.map(item => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-800 p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Signed in as</p>
            <p className="truncate">{user?.email || 'Unknown user'}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{user?.role || 'guest'}</p>
          </div>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
