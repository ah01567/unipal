import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Navbar from '../Components/Navbar';
import '../CSS/Profile.css';
import useAuth from "./CurrentUser";
import { get, ref } from 'firebase/database';
import { db } from './Firebasee';

export default function EditButton() {

    // consts holding the User's data
    const { currentUserID } = useAuth();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [country, setCountry] = useState();
    const [uni, setUni] = useState();
    const [degree, setDegree] = useState('');
    const [course, setCourse] = useState('');
    const [bio, setBio] = useState('');
    const UsersDB = ref(db, `Users/${currentUserID}`);

    // Options for the user's degree dropdown
    const options = [
        { value: 'Undergrad', label: 'Undergrad' },
        { value: 'Postgrad', label: 'Postgrad' },
        { value: 'Prefer not to say', label: 'Prefer not to say' },
      ];

      // Handle selecting a 'Degree'
      const handleDegreeChange = (value) => {
        setDegree(value);
      };

      // Handle selecting a 'Course'
      const handleCourseChange = (event) => {
        setCourse(event.target.value);
      };
    useEffect(() => {
        const fetchUniversityAndNationalities = async () => {
          try {
            const snapshot = await get(UsersDB);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              // Assuming the university name is stored in a property called 'uni' in the database;
              const fname = userData.fname;
              const lname = userData.lname;
              const country = userData.country; 
              const university = userData.uni;
              setFname(fname);
              setLname(lname);
              setCountry(country);
              setUni(university);
            }
          } catch (error) {
            console.error('Error retrieving university and nationalities:', error);
          }
        };
      
        fetchUniversityAndNationalities();
      }, [UsersDB]); // Specify UsersDB as a dependency

  return (
    <div>
        <Navbar />
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
                <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{fname} {lname}</MDBTypography>
                    <MDBCardText>{uni}</MDBCardText>
                    </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <Button variant='outline-dark' style={{height: '36px', overflow: 'visible', marginLeft:'20px'}}>
                        Edit profile
                    </Button>
                    <div className="d-flex justify-content-center text-center py-1">
                    <div>
                        <MDBCardText className="mb-1 h5">{country}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Nationality</MDBCardText>
                    </div>
                    <div className="px-3">
                        <MDBCardText className="mb-1 h5">0</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Pals</MDBCardText>
                    </div>
                    <div>
                        <MDBCardText className="mb-1 h5">0</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Souvenirs</MDBCardText>
                    </div>
                    </div>
                </div>
                <MDBCardBody className="text-black p-4">
                    <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                        <MDBCardText className="font-italic mb-1"><b>Degree:</b> 
                        <select value={degree} onChange={handleDegreeChange} disabled>
                            <option value="">Select an option</option>
                            {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                            ))}
                        </select>
                        </MDBCardText>
                        <MDBCardText className="font-italic mb-1"><b>Course:</b> 
                        <input
                            type="text"
                            value={course}
                            onChange={handleCourseChange}
                            placeholder="Enter your course"
                            disabled
                        />
                        </MDBCardText>
                        <MDBCardText className="font-italic mb-0"><b>Bio:</b> 
                        <input
                            type="text"
                            value={course}
                            onChange={handleCourseChange}
                            placeholder="Enter your course"
                            disabled
                        />
                        </MDBCardText>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                    <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                    </div>
                    <MDBRow>
                    <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    </MDBRow>
                    <MDBRow className="g-2">
                    <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    </MDBRow>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    </div>
  );
}