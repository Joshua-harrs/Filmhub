export default function Home({ user }) {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 rounded text-center">
      <h1 className="text-4xl mb-4 font-bold">Welcome to Filmhub</h1>
      {user ? (
        <p>Logged in as <strong>{user.email}</strong></p>
      ) : (
        <p>Please login or register to upload videos.</p>
      )}
    </div>
  )
}
