import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Me from './User/Me';
import Edit from './User/Edit';
import NewPetRock from './PetRock/NewPetRock';

export default function Index(props) {
  const { isLoggedIn, setLoggedIn } = props;
  return (
    <div>
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Me setLoggedIn={setLoggedIn} />}></Route>
            <Route
              path="/new-pet-rock"
              element={<NewPetRock setLoggedIn={setLoggedIn} />}
            ></Route>
            <Route
              path="/edit"
              element={<Edit setLoggedIn={setLoggedIn} />}
            ></Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
              }
            ></Route>
            <Route
              path="/signup"
              element={<SignUp setIsLoggedIn={setLoggedIn} />}
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
