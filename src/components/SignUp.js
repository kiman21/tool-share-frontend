import React, { useState } from 'react';

function SignUp() {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'userName') {
        setUsername(value);
      } else if (name === 'userEmail') {
        setUserEmail(value);
      } else {
        setPassword(value);
      }
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
    };

    return (
        <div>
          <form className="form">
            <input
              value={username}
              name="username"
              onChange={handleInputChange}
              type="text"
              placeholder="Username"
            />
            <input
              value={userEmail}
              name="userEmail"
              onChange={handleInputChange}
              type="Email"
              placeholder="Email Address"
            />
            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
            />
            <button type="submit" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
        </div>
      );
}

export default SignUp;