import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Home from './pages/Home'
import { useState, useEffect } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Filmhub</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
              <Link to="/upload" className="bg-green-600 px-3 py-1 rounded">Upload</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
              <Link to="/register" className="bg-indigo-600 px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/upload" element={user ? <Upload user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}
