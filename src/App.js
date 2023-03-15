import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";



function App() {
    return (

            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/signin" element={<h1>Sign In</h1>}/>
                    <Route path="/profile" element={<h1>User Profile</h1>}/>
                    <Route path="/toolform" element={<h1>Submit a Tool</h1>}/>
                    <Route path="/toolarrangement" element={<h1>Borrow a Tool</h1>}/>
                    <Route path="*" element={<h1>404 page not found</h1>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
