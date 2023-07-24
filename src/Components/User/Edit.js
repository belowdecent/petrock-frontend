import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Edit(props) {
  const { setLoggedIn } = props;
  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
      };

      if (!form.email) delete form.email;

      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:3333/users', form, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      navigate('/');
    } catch {
      setErrorMessage("Session timeout");
      setLoggedIn(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Edit profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoFocus
            />
            <Typography component="p" variant="p" color="red">
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
