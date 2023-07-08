import React, { useEffect, useState } from 'react';
import { get, ref, onValue } from 'firebase/database';
import { db } from './Firebasee';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import useAuth from "./CurrentUser";
import '../CSS/Pals.css';
import Card from 'react-bootstrap/Card';

function Pals() {
  const { currentUser, currentUserID } = useAuth();
  const navigate = useNavigate();

  // Fetch the currentUser's university 
  const [nationalities, setNationalities] = useState([]);
  const UsersDB = ref(db, `Users/${currentUserID}`);

useEffect(() => {
  const fetchUniversityAndNationalities = async () => {
    try {
      const snapshot = await get(UsersDB);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const university = userData.uni; // Assuming the university name is stored in a property called 'uni' in the database;

        const universitiesDB = ref(db, `Universities/${university}`);
        const snapshotNationalities = await get(universitiesDB);

        if (snapshotNationalities.exists()) {
          const data = snapshotNationalities.val();
          const nationalityList = Object.keys(data);
          setNationalities(nationalityList);
        } else {
          // No nationalities found
          setNationalities([]);
        }
      }
    } catch (error) {
      console.error('Error retrieving university and nationalities:', error);
    }
  };

  fetchUniversityAndNationalities();
}, [UsersDB]); // Specify UsersDB as a dependency

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
              <Card className='card' style={{ width: '13rem', height: '13rem', marginLeft: '10px', backgroundImage: 'url("")', backgroundSize: 'cover' }}>
                <Card.Body>
                  <Card.Title style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <b>{nationality}</b>
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