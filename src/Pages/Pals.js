import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { MDBCol, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
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
  const [selectedUni, setSelectedUni] = useState('');
  const [nationalities, setNationalities] = useState([]);
  const UsersDB = ref(db, `Users/${currentUserID}`);

useEffect(() => {
  const fetchUniversityAndNationalities = async () => {
    try {
      const snapshot = await get(UsersDB);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const university = userData.uni; // Assuming the university name is stored in a property called 'uni' in the database;
        setSelectedUni(university);

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

const countryFlagMapping = {
  'Algeria': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR0WODrLpWQ93S553CHPFvbR3ahP4Gtg569A&usqp=CAU',
  'Spain': 'https://media.istockphoto.com/id/508516477/photo/spanish-flag.webp?b=1&s=170667a&w=0&k=20&c=Prj5Mg5FEWcN96MmjlUtL_9o9plVXLiliPR42fZ_gcI=',
  // Add more country-flag mappings as needed
};

// State variable to track the selected nationality
const [selectedNationality, setSelectedNationality] = useState('');
const [displayedUser, setDisplayUser] = useState(null);

// Function to handle the click event on a nationality card
const handleNationalityClick = async (nationality) => {

  setSelectedNationality(nationality);
    // Retrieve the user data from the corresponding country's user database
    const userRef = ref(db, `Universities/${selectedUni}/${nationality}`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const usersData = [];
        Object.keys(userData).forEach((userID) => {
          const { fname, lname } = userData[userID];
          usersData.push({ fname, lname });
        });
        setDisplayUser(usersData);
      } else {
        setDisplayUser(null);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setDisplayUser(null);
    }
};

// State variable to track the index of the currently displayed user card
const [activeCardIndex, setActiveCardIndex] = useState(0);

// Function to handle the next card button click
const handleNextCard = () => {
  setActiveCardIndex((prevIndex) => (prevIndex + 1) % displayedUser.length);
};

// Function to handle the previous card button click
const handlePreviousCard = () => {
  setActiveCardIndex((prevIndex) => (prevIndex - 1 + displayedUser.length) % displayedUser.length);
};


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
        <Card
          key={index}
          style={{
            width: '13rem',
            height: '13rem',
            marginLeft: '10px',
            backgroundImage: `url(${countryFlagMapping[nationality]})`,
            backgroundSize: 'cover',
          }}
          onClick={() => handleNationalityClick(nationality)}
        >
        <Card.Body>
          <Card.Title style={{ background: `linear-gradient(rgba(211, 211, 211, 0.7), rgba(211, 211, 211, 0.7) 40%, rgba(211, 211, 211, 0.7) 40%, rgba(211, 211, 211, 0.7))`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <b>{nationality}</b>
          </Card.Title>
        </Card.Body>
      </Card>
      ))} 
        </div>
        {selectedNationality && (
          <div>
            <h3 style={{marginTop:'20px'}}>Here are all the students from {selectedNationality} at your uni:</h3>
            {displayedUser && displayedUser.length > 1 && (
              <div className="d-flex justify-content-center mt-3">
                <Button outline variant="outline-primary" className="me-2" onClick={handlePreviousCard}> PREVIOUS </Button>
                <Button outline variant="outline-primary" onClick={handleNextCard}> NEXT </Button>
              </div>
            )}
            {displayedUser && displayedUser.length > 0 && (
                <MDBRow className="justify-content-center" style={{marginBottom:'50px'}}>
                  <MDBCol md="9" lg="7" xl="5" className="mt-5">
                    <MDBCard style={{ borderRadius: '15px' }}>
                      <MDBCardBody className="p-4">
                        <div className="d-flex text-black">
                          <div className="flex-shrink-0">
                            <MDBCardImage
                              style={{ width: '180px', borderRadius: '10px' }}
                              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                              alt='Generic placeholder image'
                              fluid
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <MDBCardTitle>{displayedUser[activeCardIndex].fname} {displayedUser[activeCardIndex].lname}</MDBCardTitle>
                            <MDBCardText>{selectedUni}</MDBCardText>

                            <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                              <div>
                                <p className="small text-muted mb-1">Pals</p>
                                <p className="mb-0">24</p>
                              </div>
                              <div className="px-3">
                                <p className="small text-muted mb-1">Degree</p>
                                <p className="mb-0">MSc</p>
                              </div>
                              <div>
                                <p className="small text-muted mb-1">Course</p>
                                <p className="mb-0">Computer science</p>
                              </div>
                            </div>
                            <div className="d-flex pt-1">
                              <Button variant="primary" className="me-1 flex-grow-1">View profile</Button>
                              <Button variant="success" className="flex-grow-1">Add pal</Button>
                            </div>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
      
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pals;