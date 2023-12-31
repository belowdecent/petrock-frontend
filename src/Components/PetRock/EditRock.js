import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function EditRock(props) {
  const { id } = useParams();
  const { setLoggedIn } = props;

  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  const [some, setSome] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get(`http://localhost:3333/pets/${id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        setSome(data);
      } catch {
        setLoggedIn(false);
        navigate('/');
      }
    }
    fetchData();
  }, [navigate, setLoggedIn, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const token = localStorage.getItem('token');

    const form = {
      id: some.id,
      name: formData.get('name'),
      color: formData.get('color'),
    };
    
    if (!form.name) delete form.name;
    if (!form.color) delete form.color;

    try {
      await axios.patch(`http://localhost:3333/pets/${id}`, form, {
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
            Edit rock
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
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
