import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from '../Pages/Firebasee';

function NavBar() {

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        });
      }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand href="/" style={{ fontFamily: 'Apple chancery', fontSize: '26px'}}>Uni<span style={{ color: 'yellow' }}>pal</span></Navbar.Brand>
          <Nav className="me-auto" style={{ fontSize: '18px'}}>

            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/">Pals</Nav.Link>

            <Nav.Link href="/">Chat</Nav.Link>

            <Nav.Link href="/">Feedback</Nav.Link>

            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Contact Us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

            <div style={{ color: '#A9A9A9', position: 'absolute', right: 30, fontSize: '26px' }}>
              <FontAwesomeIcon icon={faBell} />
            </div>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;