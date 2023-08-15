'use client'

import { useAuth } from '@/context/AuthContext'

export default function Dashboard() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center py-12 space-y-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl">Dashboard</h1>
      <h2 className="text-md">
        {`User is authenticated: ${isAuthenticated} `}
      </h2>
      <h2 className="text-md">{user?.email}</h2>

      <button
        type="button"
        onClick={signOut}
        className="mt-2 w-56 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Out
      </button>
    </div>
  )
}
