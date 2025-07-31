import { useState } from 'react'
import axios from 'axios'

export default function Upload({ user }) {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return setMessage('No file selected')

    const formData = new FormData()
    formData.append('file', file)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      })
      setMessage('Upload successful!')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4 font-bold">Upload a file</h2>
      {message && <p className="mb-4">{message}</p>}
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button type="submit" className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition">Upload</button>
    </form>
  )
}
