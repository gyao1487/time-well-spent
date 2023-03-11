import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function CharitySignup(props) {
  const [formState, setFormState] = useState({ charityName: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        password: formState.password,
        charityName: formState.charityName,
        focus: formState.focus,
        address: formState.address,
        email: formState.email,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="charityName">Charity/Nonprofit Name:</label>
          <input
            placeholder="Charity Name"
            name="charityName"
            type="charityName"
            id="charityName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="focus">Organizational Focus</label>
          <input
            placeholder="Helping the underpriveledged youth of Chicago"
            name="focus"
            type="focus"
            id="focus"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
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
        <div>
          <label htmlFor="address">Address:</label>
          <input
            placeholder="1060 W. Addison, Chicago IL, 60613"
            name="address"
            type="address"
            id="address"
            onChange={handleChange}  
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
        <p>OR</p>
        <div className="flex-row flex-end">
          <button type="submit">Sign up with Google</button>
        </div>
      </form>
    </div>
  );
}

export default CharitySignup;
