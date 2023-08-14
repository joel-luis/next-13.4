'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { api } from '@/lib/api'

type SignInCredentials = {
  email: string
  password: string
}

type User = {
  email: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user?: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const router = useRouter()

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const registerResponse = await api.post('/register', {
        email,
        password,
      })

      const { token } = registerResponse.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      setUser({
        email,
      })

      api.defaults.headers.Autorization = `Bearer ${token}`

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
