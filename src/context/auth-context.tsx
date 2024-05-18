import { AuthUser } from '@/types/User'
import React, { createContext, useEffect, useState } from 'react'

type AuthProviderProps = {
  children: React.ReactNode
}

export interface AuthContextType {
  user: AuthUser
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser>(null)

  // Simulate fetching user data from an API or local storage
  useEffect(() => {
    const fetchUser = async () => {
      // Replace this with your actual data fetching logic
      const loggedInUser = {
        name: 'John Doe',
        isOnboarded: true
      }
      setUser(loggedInUser)
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
