import axios from 'axios'

const api = axios.create({
  baseURL: 'https://donations.edu.netlor.fr',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${import.meta.env.VITE_API_KEY}`
  }
})

export default api
