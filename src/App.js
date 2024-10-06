import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { auth} from './config/firebase';
import Patients from './pages/census/patients';
import Layout from './pages/Layout';

function App() {


  const [user, setUser] = useState(null)
  const [idToken, setIdToken]=useState('')
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')

  
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
         setUser(user);
        const token= await user.getIdToken()
        setIdToken(token)
        setName(user.displayName)
        setEmail(user.email)
      } else {
        setUser(null);
      }
    })

     return()=> unsubscribe();
  }, [])

  

  return (
    <BrowserRouter>
    <Layout idToken={idToken} name={name} user={user} email={email}/>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/patients" /> : <Login />}
        />
        <Route
          path="/patients"
          element={user ? <Patients idToken={idToken}/> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
