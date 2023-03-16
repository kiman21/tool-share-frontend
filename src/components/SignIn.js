import React, { useState } from 'react';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      return name === 'username' ? setUsername(value) : setPassword(value);
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

export default SignIn;