import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logoImg from '../img/logo.png'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { countries } from 'countries-list';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Register() {

  const navigate = useNavigate(); 

  const [fname, seFname] = useState();
  const [lname, setLname] = useState();
  const [uni, setUni] = useState();
  const [country, setCountry] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const countryOptions = Object.keys(countries)
    .map((countryCode) => ({
      value: countryCode,
      label: countries[countryCode].name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); 
  
    const registerSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            //const uid = user.uid;
            console.log(user);
            navigate("/")

            // const userRef = ref(db, `Users/${uid}`);
            // const userData = {
            //     fname: fname,
            //     lname: lname, 
            //     role: role, 
            //     email: email,
            //   };
            //   set(userRef, userData);
        })
        .catch((error) => {
            if(error.code === "auth/email-already-in-use") {
                 setError("This email is already registered. Please Log in");
            } else if (error.code === "auth/invalid-email") {
                 setError("This email address is not valid.");
             } else if (error.code === "auth/operation-not-allowed") {
                 setError("Operation not allowed.");
             } else if (error.code === "auth/weak-password") {
                 setError("Your password is too weak.");
             }
             console.error(error);
         }
        );
      }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <div>
          <img src={logoImg} alt="Logo" style={{ width: '200px', height: 'auto' }}/>
        </div>

          <Typography component="h1" variant="h5">
             <b>Register</b> form:
          </Typography>
          <Box component="form" onSubmit={registerSubmit} noValidate sx={{ mt: 1 }}>
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              id="demo-helper-text-aligned"
              label="First name"
              style={{ marginRight: '5px' }}
              required
            />

            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Last name"
              style={{ marginLeft: '5px' }}
              required
            />
          </div>

            <TextField
              margin="normal"
              required
              fullWidth
              label="University name"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Country of origin"
              autoFocus
              select
            >
            {countryOptions.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
            </TextField>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already registered? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;