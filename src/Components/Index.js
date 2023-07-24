import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";



export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props
    return (
        <div>
            <BrowserRouter>
                {isLoggedIn ?
                    <Routes>
                        <Route path="/" element={<p>Hi</p>}>
                        </Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<Login setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
                        </Route>
                        <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}>
                        </Route>
                    </Routes>
                }
            </BrowserRouter>
        </div>

    )
}
