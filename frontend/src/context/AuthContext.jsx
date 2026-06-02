import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, registerUser, fetchCurrentUser } from '../services/auth'
import api from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const setToken = token => {
    if (token) {
      localStorage.setItem('xcombinator_token', token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      localStorage.removeItem('xcombinator_token')
      delete api.defaults.headers.common.Authorization
    }
  }

  const syncToken = () => {
    const token = localStorage.getItem('xcombinator_token')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }

  useEffect(() => {
    const initialize = async () => {
      syncToken()
      const token = localStorage.getItem('xcombinator_token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await fetchCurrentUser()
        setUser(data.user)
      } catch (err) {
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const data = await loginUser(email, password)
      setToken(data.token)
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      throw err
    }
  }

  const register = async (email, password) => {
    setError(null)
    try {
      const data = await registerUser(email, password)
      setToken(data.token)
      setUser(data.user)
      return data.user
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      throw err
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
