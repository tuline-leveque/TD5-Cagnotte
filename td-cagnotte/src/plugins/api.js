import axios from 'axios'

const api = axios.create({
  baseURL: 'https://donations.edu.netlor.fr',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=yD[bv.MVkLD6'
  }
})

export default api
