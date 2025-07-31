import { useState } from 'react'
import axios from 'axios'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    console.log("API URL:", import.meta.env.VITE_API_URL)
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password })
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      {error && <p className="bg-red-700 p-2 mb-4 rounded">{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mb-4 p-2 rounded bg-gray-900" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mb-4 p-2 rounded bg-gray-900" />
      <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition">Login</button>
    </form>
  )
}
