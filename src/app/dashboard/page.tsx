'use client'

import { useAuth } from '@/context/AuthContext'

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()

  return (
    <>
      <h1 className="text-3xl text-gray-900">Dashboard</h1>
      <h2 className="text-md text-gray-800">
        {`User is authenticated: ${isAuthenticated} `}
      </h2>
      <h2 className="text-md text-gray-800">{user?.email}</h2>
    </>
  )
}
