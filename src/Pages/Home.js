import React from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import useAuth from "./CurrentUser";


function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    // Redirect to login page if currentUser doesn't exist
    navigate('/login');
    return null;
  }


  return (
    <div>
      <Navbar />
      <div>
        Home page
      </div>
    </div>
  );
}

export default Home;
