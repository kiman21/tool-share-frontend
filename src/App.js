import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import ToolForm from "./components/ToolForm";



function App() {
    return (

            <BrowserRouter>
             <Navbar/>
                <Routes>
                    <Route path="/" element={<Signin setToken={setToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/profile" element={<Profile token={token} userId={userId}/>}/>
                    <Route path="/toolform" element={<ToolForm token={token} userId={userId}/>}/>
                    <Route path="/toolarrangement" element={<ToolArrangement token={token} userId={userId}/>}/>
                    <Route path="*" element={<h1>404 page not found</h1>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
