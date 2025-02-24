import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

import Navbar from './components/Navbar'

import SignUpPage from './pages/auth/SignUpPage'
import LoginPage from './pages/auth/LoginPage'

import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import EditProfilePage from './pages/EditProfilePage'

import MessagesPage from "./pages/tools/MessagesPage"
import DecksPage from "./pages/tools/DecksPage"
import ReaderPage from './pages/tools/ReaderPage'

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import ProfilePage from './pages/ProfilePage'



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = useThemeStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-dvh">
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  )

  return (
    <div style={{ height: "100dvh", overflow: "auto" }} data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/own-profile" element={authUser ? <EditProfilePage /> : <Navigate to="/login" />} />
        <Route path="/messages" element={authUser ? <MessagesPage /> : <Navigate to="/login" />} />
        <Route path="/decks" element={authUser ? <DecksPage /> : <Navigate to="/login" />} />
        <Route path="/reader" element={authUser ? <ReaderPage /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div >
  )
}

export default App