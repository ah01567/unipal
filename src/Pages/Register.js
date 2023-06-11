import * as React from 'react';
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

function register() {

  const countryOptions = Object.keys(countries)
    .map((countryCode) => ({
      value: countryCode,
      label: countries[countryCode].name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            Unipal <b>register</b> form:
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
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

export default register;