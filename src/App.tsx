import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard'
import {Routes, Route} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LinkRedirect from './components/LinkRedirect'
import Home from "./components/Home"
import './App.css'

function App() {
  return(
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
          />
          <Route path='/:shortCode' element={<LinkRedirect />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
 
}

export default App
