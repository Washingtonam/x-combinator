import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser, registerUser, fetchCurrentUser } from '../services/auth'
import api from '../services/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'xcombinator_token'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const setToken = token => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setIsAuthenticated(true)
      return
    }

    localStorage.removeItem(STORAGE_KEY)
    delete api.defaults.headers.common.Authorization
    setIsAuthenticated(false)
  }

  const clearSession = () => {
    setToken(null)
    setUser(null)
    setError(null)
  }

  const initializeSession = async () => {
    const token = localStorage.getItem(STORAGE_KEY)
    if (!token) {
      clearSession()
      setLoading(false)
      return
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    try {
      const { user: currentUser } = await fetchCurrentUser()
      setUser(currentUser)
      setIsAuthenticated(true)
    } catch (err) {
      clearSession()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initializeSession()
  }, [])

  const login = async (email, password) => {
    setError(null)

    try {
      const { token, user: authenticatedUser } = await loginUser(email, password)
      setToken(token)
      setUser(authenticatedUser)
      return authenticatedUser
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      clearSession()
      throw err
    }
  }

  const register = async (email, password) => {
    setError(null)

    try {
      const { token, user: newUser } = await registerUser(email, password)
      setToken(token)
      setUser(newUser)
      return newUser
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      clearSession()
      throw err
    }
  }

  const logout = () => {
    clearSession()
    window.location.href = '/login'
  }

  const hasRole = allowedRoles => {
    return Boolean(user && allowedRoles.includes(user.role))
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      register,
      logout,
      hasRole,
    }),
    [user, isAuthenticated, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
