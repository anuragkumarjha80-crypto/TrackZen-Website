import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import FloatingActionButton from './components/FloatingActionButton'
import DailyTracker from './pages/DailyTracker'
import ClassTracker from './pages/ClassTracker'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DailyTracker />} />
        <Route path="/classes" element={<ClassTracker />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <FloatingActionButton onClick={() => console.log('Action')} />
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
