import React, { useEffect, useState } from 'react';
import { get, ref, onValue } from 'firebase/database';
import { db } from './Firebasee';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import useAuth from "./CurrentUser";
import '../CSS/Pals.css';
import Card from 'react-bootstrap/Card';

function Pals() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const nationalitiesDB = ref(db, 'Nationalities');
  const [nationalities, setNationalities] = useState([]);

  // Retrieve Existing Nationalities from the database
  useEffect(() => {
    const getData = async () => {
      try {
        const snapshot = await get(nationalitiesDB);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const nationalityList = Object.values(data);
          setNationalities(nationalityList);
        } else {
          // No nationalities found
          setNationalities([]);
        }
      } catch (error) {
        console.error('Error retrieving nationalities:', error);
      }
    };

    // Subscribe to real-time changes in the database
    const unsubscribe = onValue(nationalitiesDB, () => {
      getData();
    });

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  if (!currentUser) {
    // Redirect to login page if currentUser doesn't exist
    navigate('/login');
    return null;
  }
  return (
    <div>
      <Navbar />
      <div className='nationalities'>
        <h3>Choose a nationality:</h3>
        <div className='nationalitiesCards'>
          {nationalities.map((nationality, index) => (
            <div className='cardWrapper' key={index}>
              <Card style={{ width: '13rem', height: '13rem', marginLeft: '10px', backgroundImage: 'url("")', backgroundSize: 'cover' }}>
                <Card.Body>
                  <Card.Title style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <b>{nationality.country}</b>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pals;