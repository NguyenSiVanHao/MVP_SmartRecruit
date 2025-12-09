"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "candidate" | "recruiter" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>
  register: (email: string, password: string, name: string, role: "candidate" | "recruiter") => Promise<{ success: boolean; error?: string; user?: User }>
  loginWithGoogle: (googleUser: { email: string; name: string; picture?: string }) => Promise<{ success: boolean; error?: string; user?: User }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("smartrecruit_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("smartrecruit_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      return { success: false, error: "Vui lòng nhập email và mật khẩu" }
    }

    // Check if user exists in localStorage
    const storedUsers = JSON.parse(localStorage.getItem("smartrecruit_users") || "[]")
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, error: "Email hoặc mật khẩu không đúng" }
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      avatar: foundUser.avatar,
    }

    setUser(userData)
    localStorage.setItem("smartrecruit_user", JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "candidate" | "recruiter"
  ) => {
    // Simple validation
    if (!email || !password || !name) {
      return { success: false, error: "Vui lòng điền đầy đủ thông tin" }
    }

    if (password.length < 6) {
      return { success: false, error: "Mật khẩu phải có ít nhất 6 ký tự" }
    }

    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem("smartrecruit_users") || "[]")
    const existingUser = storedUsers.find((u: any) => u.email === email)

    if (existingUser) {
      return { success: false, error: "Email đã được sử dụng" }
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password, // In production, this should be hashed
      name,
      role,
    }

    storedUsers.push(newUser)
    localStorage.setItem("smartrecruit_users", JSON.stringify(storedUsers))

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    }

    setUser(userData)
    localStorage.setItem("smartrecruit_user", JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const loginWithGoogle = async (googleUser: { email: string; name: string; picture?: string }) => {
    const storedUsers = JSON.parse(localStorage.getItem("smartrecruit_users") || "[]")
    let foundUser = storedUsers.find((u: any) => u.email === googleUser.email)

    // If user doesn't exist, create one
    if (!foundUser) {
      const newUser = {
        id: `user_${Date.now()}`,
        email: googleUser.email,
        name: googleUser.name,
        role: "candidate", // Default role for Google sign-in
        avatar: googleUser.picture,
        googleAuth: true,
      }
      storedUsers.push(newUser)
      localStorage.setItem("smartrecruit_users", JSON.stringify(storedUsers))
      foundUser = newUser
    }

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role || "candidate",
      avatar: foundUser.avatar || googleUser.picture,
    }

    setUser(userData)
    localStorage.setItem("smartrecruit_user", JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("smartrecruit_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

