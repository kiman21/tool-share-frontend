import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav/index"
import SignIn from "./pages/SignIn/index";
import Home from "./pages/Home/index";
import Profile from "./pages/Profile/index";
import API from "./utils/API";
import ToolForm from './components/ToolForm';
import ToolArrangementForm from './components/ToolArrangement';


function App() {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState("");

    useEffect(() => {
      const savedToken = localStorage.getItem("token");
      console.log('App.js - savedToken:', savedToken);
      console.log(savedToken);
      if (savedToken) {
        console.log('App.js - passing savedToken to API.isValidToken:', savedToken);
        API.isValidToken(savedToken).then(tokenData => {
          if (tokenData.isValid) {
            setToken(savedToken);
            setUserId(tokenData.user.id);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("token");
          }
        });
      }
    }, [])

    const logout = () => {
        setToken("");
        setUserId(0);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        return (
            window.location.href = "/"
        )
    };



    return (
      <Router className="w-full h-full rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <Nav isLoggedIn={isLoggedIn} userId={userId} logout={logout}/>
        <div>
          <Routes>
              <Route path="/signin" element={<SignIn setToken={setToken} setUserId={setUserId} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}/>
              <Route path="/" element={<SignIn setToken={setToken} setUserId={setUserId} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}/>
              {console.log('Parent - token:', token)}
              <Route path="/profile/:id" element={<Profile token={token} userId={userId} username={username}/>}/>
              {/* <Route path="/toolform/" element={<ToolForm token={token} userId={userId} username={username}/>}/>
              <Route path="/toolarrangement/" element={<ToolArrangementForm token={token} userId={userId} username={username}/>}/> */}
              <Route path="/home" element={<Home isLoggedIn={isLoggedIn} token={token} userId={userId}/>}/>
              <Route path="*" element={<h1>404 page not found</h1>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
