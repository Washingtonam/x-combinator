import axios from 'axios'

const token = localStorage.getItem('xcombinator_token')

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const baseURL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default api
