import React,{useState} from 'react'
import "./index.css"
import API from "../../utils/API"

const Signin = (props) => {
   const [loginEmail, setLoginEmail] = useState("")
   const [loginPassword, setLoginPassword] = useState("")
   const [signupEmail, setSignupEmail] = useState("")
   const [signupUsername, setSignupUsername] = useState("")
   const [signupPassword, setSignupPassword] = useState("")

   const handleInputChange = e =>{
    const {name,value} = e.target;
    switch (name) {
      case "loginEmail":
        setLoginEmail(value)
        break;
      case "loginPassword":
        setLoginPassword(value)
        break;
      case "signupEmail":
        setSignupEmail(value)
        break;
      case "signupUsername":
        setSignupUsername(value)
        break;
      case "signupPassword":
        setSignupPassword(value)
        break;
    
      default:
        break;
    }
   }

   const handleLoginSubmit = e=>{
    e.preventDefault();
    const userObj = {
      email:loginEmail,
      password:loginPassword
    }
    API.login(userObj).then(data=>{
      console.log("API response:", data);
      if(data.token){
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id)
      } else {
        alert("There was an error logging in, please try again.")
      }
      localStorage.setItem("token",data.token)
      console.log("Token saved in local storage:", localStorage.getItem("token"));
      setLoginEmail("");
      setLoginPassword("")
    })
   }
   const handleSignupSubmit = e=>{
    e.preventDefault();
    const userObj = {
      email:signupEmail,
      username:signupUsername,
      password:signupPassword
    }
    API.signup(userObj).then(data=>{
      console.log("API response:", data);
      if(data.token){
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUserId(data.user.id)
      } else {
        alert("There was an error signing up, please try again.")
      }
      localStorage.setItem("token",data.token)
      console.log("Token saved in local storage:", localStorage.getItem("token"));
      setSignupEmail("");
      setSignupUsername("");
      setSignupPassword("")
    })
   }


  return (
    <div class="page">
       <form class="login" onSubmit={handleLoginSubmit}>
        <input class="input" name="loginEmail" value={loginEmail} onChange={handleInputChange} placeholder="email"/>
        <input class="input" name="loginPassword" value={loginPassword} onChange={handleInputChange} placeholder="password" type="password"/>
        <button class="button">Login</button>
       </form>
       <form class="login" onSubmit={handleSignupSubmit}>
        <input class="input" name="signupEmail" value={signupEmail} onChange={handleInputChange} placeholder="email"/>
        <input class="input" name="signupUsername" value={signupUsername} onChange={handleInputChange} placeholder="username"/>
        <input class="input" name="signupPassword" value={signupPassword} onChange={handleInputChange} placeholder="password" type="password"/>
        <button class="button">Signup</button>
       </form>
    </div>
  )
}

export default SignIn