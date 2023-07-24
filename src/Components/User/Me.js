import axios from 'axios';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Me(props) {
  const { setLoggedIn } = props;
  const [some, setSome] = React.useState([]);
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

        setSome(data);
      } catch {
        setLoggedIn(false);
        navigate('/');
      }
    }
    fetchData();
  }, [navigate, setLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {some.id}
        <br />
        {some.email}
        <br />
        {some.firstName}
        <br />
        {some.lastName}
        <Link to={`/edit`}>Edit</Link>
      </Container>
    </ThemeProvider>
  );
}
