import React from "react";
import {Link} from "react-router-dom"
import "./style.css"

const Navbar = () => {
    return (
        <div className="Navbar">
            <Link to="/homepage/:id">Home</Link>
            <Link to="/signin">Sign In</Link>
            <Link to="/toolform">Submit a Tool</Link>
            <Link to="/toolarrangement">Borrow a Tool</Link>
        </div>
    )
}

export default Navbar