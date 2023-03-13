import React, { useState } from 'react';
import { ADD_CHARITY } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';



const CharitySignup = () => {
  // set initial form state
  const [usercFormData, setCharityFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
 

  // new code
  const [createCharity, { error }] = useMutation(ADD_CHARITY);
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    // event.preventDefault();
    setCharityFormData({ ...usercFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
    }

    // new code
    try {
      const { data } = await createCharity({
        variables: { ...usercFormData },
      });

      Auth.login(data.createCharity.token);
    } catch (err) {
      console.error(err);
    };

    setCharityFormData({
      username: '',
      email: '',
      password: '',
    });
  };
  return (
    <div className="container my-1">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username</label>
          <input
            placeholder="Amazing person"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="email@domain.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="skills">Skills:</label>
          <input
            placeholder="Organizing, outgoing,"
            name="skills"
            type="skills"
            id="skills"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CharitySignup;