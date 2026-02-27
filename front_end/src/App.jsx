import { useState } from 'react'
import './App.css'
import SignInPage from './pages/signIn'
import SignUpPage from './pages/signUp'
import Dashboard from './pages/dashboard'
import MyNotes from './pages/myNotes'
import { Routes , Route } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import MyUnsaveNotes from './pages/myUnsaveNotes'
import AuthRoute from './routes/AuthRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      
       {/* Authentication Route */}
      <Route element={<AuthRoute />}>
      <Route index element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      </Route>
      
       {/* Private Routes */}
      <Route element={<PrivateRoute />}>
      <Route path='/mynotes' element={<MyNotes /> } ></Route>
      <Route path='/myUnsaveNotes' element={<MyUnsaveNotes /> } ></Route>
      <Route path="/dashboard" element={<Dashboard />} />
     </Route>

     </Routes>
    </>
  )
}

export default App
