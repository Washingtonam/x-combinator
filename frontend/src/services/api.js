import axios from 'axios'

const token = localStorage.getItem('xcombinator_token')

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' }
})

if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default api
