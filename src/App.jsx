import { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login , logout } from './store/authSlice'
import authService from './appwrite/auth'
import './App.css'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  } , [])
  
  
  return !loading ? (
    <div className='min-h-screen'>Test</div>
  ) : null
}

export default App
