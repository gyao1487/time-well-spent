//!!! NEED TO REPLACE WITH TAILWIND///
//Need to create SignUp Landing Page
//Components:
// Logo
//Background image
// Buttons for two options as well as images/icons?
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_VOLUNTEER } from '../utils/mutations';


const SignupForm = () => {
  // set initial form state
  const [uservFormData, setVolunteerFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // new code
  const [createVolunteer, { error }] = useMutation(ADD_VOLUNTEER);
  
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setVolunteerFormData({ ...uservFormData, [name]: value });
    
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
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
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={uservFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={uservFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={uservFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(uservFormData.username && uservFormData.email && uservFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        {/* {error && <div>Sign up failed</div>} */}
      </Form>
    </>
  );
};

export default SignupForm;
