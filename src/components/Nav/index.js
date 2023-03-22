import React from "react";
import { Link } from "react-router-dom"
import "./style.css"

const Nav = (props) => {
    return (
        <div className="Navbar">
            <Link to="/home">Home</Link>
            {props.isLoggedIn ? <Link to={`/profile/${props.userId}`}>Profile</Link>:<Link to="/signin">Sign in</Link>}
            {/* <Link to="/toolform">Submit a tool</Link>
            <Link to="/toolarrangement">Borrow a tool</Link> */}
            {props.isLoggedIn?<button onClick={props.logout}>Logout</button>:null}
        </div>
    );
}

export default Nav