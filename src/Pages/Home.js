import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "./CurrentUser";
import {  signOut } from "firebase/auth";
import { auth } from '../Pages/Firebasee';

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    // Redirect to login page if currentUser doesn't exist
    navigate('/login');
    return null;
  }

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        console.log("Signed out successfully")
    }).catch((error) => {
        console.log(error);
    });
}

  return (
    <div>
      Home page
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
