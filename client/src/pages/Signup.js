//!!! NEED TO REPLACE WITH TAILWIND///
//Need to create SignUp Landing Page
//Components:
// Logo
//Background image
// Buttons for two options as well as images/icons?
import React, { useState } from 'react';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_VOLUNTEER } from '../utils/mutations';


const Signup = () => {
  // set initial form state
  const [uservFormData, setVolunteerFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation

  // new code
  const [createVolunteer, { error }] = useMutation(ADD_VOLUNTEER);
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    // event.preventDefault();
    setVolunteerFormData({ ...uservFormData, [name]: value });
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
      const { data } = await createVolunteer({
        variables: { ...uservFormData },
      });

      Auth.login(data.createVolunteer.token);
    } catch (err) {
      console.error(err);
    };

    setVolunteerFormData({
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

export default Signup;
    // <>
    //   {/* This is needed for the validation functionality above */}
    //   <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
    //     {/* show alert if server response is bad */}
    //     <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
    //       Something went wrong with your signup!
    //     </Alert>

    //     <Form.Group>
    //       <Form.Label htmlFor='username'>Username</Form.Label>
    //       <Form.Control
    //         type='text'
    //         placeholder='Your username'
    //         name='username'
    //         onChange={handleInputChange}
    //         value={uservFormData.username}
    //         required
    //       />
    //       <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
    //     </Form.Group>

    //     <Form.Group>
    //       <Form.Label htmlFor='email'>Email</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Your email address'
    //         name='email'
    //         onChange={handleInputChange}
    //         value={uservFormData.email}
    //         required
    //       />
    //       <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
    //     </Form.Group>

    //     <Form.Group>
    //       <Form.Label htmlFor='password'>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Your password'
    //         name='password'
    //         onChange={handleInputChange}
    //         value={uservFormData.password}
    //         required
    //       />
    //       <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
    //     </Form.Group>
    //     <Button
    //       disabled={!(uservFormData.username && uservFormData.email && uservFormData.password)}
    //       type='submit'
    //       variant='success'>
    //       Submit
    //     </Button>
    //     {/* {error && <div>Sign up failed</div>} */}
    //   </Form>
    // </>