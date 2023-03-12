import React, { useState } from 'react';

function SignInForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      return name === 'userName' ? setUserName(value) : setPassword(value);
    };
  
    const handleFormSubmit = (e) => {
      
      e.preventDefault();
  
      setFirstName('');
      setLastName('');
    };

    return (
        <div>
          <p>
            Hello {firstName} {lastName}
          </p>
          <form className="form">
            <input
              value={userName}
              name="userName"
              onChange={handleInputChange}
              type="text"
              placeholder="User Name"
            />
            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type="text"
              placeholder="Password"
            />
            <button type="button" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
        </div>
      );
    }
    
    export default SignInForm;