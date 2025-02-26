import './App.css';
import { Routes , Route, Navigate} from 'react-router-dom'

import Navbar from "./components/Navbar";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import ProfilePage from "./components/ProfilePage";
import HomePage from "./components/HomePage";

import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast'

function App() {

  const {authUser,checkAuth,isCheckingAuth,onlineUser} = useAuthStore()
  console.log({onlineUser});
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <h2>Loadin..</h2>
  )

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
