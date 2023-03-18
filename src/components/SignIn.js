import React, { useState } from 'react';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      return name === 'email' ? setEmail(value) : setPassword(value);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
    };

    return (
        <div>
          <form className="form">
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="text"
              placeholder="email"
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