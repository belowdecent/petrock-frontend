import axios from 'axios';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Me(props) {
  const { setLoggedIn } = props;
  const [user, setUser] = React.useState([]);
  const [pets, setPets] = React.useState([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get('http://localhost:3333/users/me', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        setUser(data);
      } catch {
        setLoggedIn(false);
        navigate('/');
      }
    }
    fetchData();

    async function fetchPetRocks() {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get('http://localhost:3333/pets', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        setPets(data);
      } catch {
        setLoggedIn(false);
        navigate('/');
      }
    }
    fetchPetRocks();
  }, [navigate, setLoggedIn]);


  const killRock = (id) => {
    return async (event) => {
      event.preventDefault();
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:3333/pets/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const { data } = await axios.get('http://localhost:3333/pets', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setPets(data);
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {user.id}
        <br />
        {user.email}
        <br />
        {user.firstName}
        <br />
        {user.lastName}
        <br />
        <Link to={`/edit`}>Edit</Link>
        {pets.map((pet) => {
          return (
            <div>
              {pet.name}, a {pet.color} rock
              <br />
              <Link to={`pet/${pet.id}`}>ponder</Link>
              <br />
              <Link to={`pet/${pet.id}/edit`}>edit</Link>
              <br />
              <button onClick={killRock(pet.id)}>Kill rock</button>
            </div>
          );
        })}
        <Link to={`/new-pet-rock`}>New pet rock</Link>
      </Container>
    </ThemeProvider>
  );
}
