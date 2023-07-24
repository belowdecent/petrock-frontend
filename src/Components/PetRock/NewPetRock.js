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

export default function NewPetRock(props) {
  const { setLoggedIn } = props;

  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      name: formData.get('name'),
      color: formData.get('color'),
    };

    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:3333/pets', form, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    } catch {
      setErrorMessage('Session timeout');
      setLoggedIn(false);
    }

    navigate('/');
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
            New Rock
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Pet Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="color"
              label="Pet Color"
              id="color"
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
              Add rock
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
