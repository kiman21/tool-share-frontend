import React, { useState } from 'react';
import './index.css';

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
        <div className="w-full flex h-full flex-wrap items-center justify-center lg:justify-between bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-4 md:space-y-6">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              name="email"
              onChange={handleInputChange}
              type="text"
              placeholder="email"
            />
            <input className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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