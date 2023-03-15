import React, { useState,useEffect } from 'react';
import googleOneTap from 'google-one-tap'
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_GOOGLE_VOLUNTEER, LOGIN_VOLUNTEER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginVolunteer(props) {
  const [uservformState, setFormState] = useState({ username: '', password: '' });
  const [loginAsVolunteer, { error }] = useMutation(LOGIN_VOLUNTEER);
  const [loginAsGoogleVolunteer, {err} ] = useMutation(LOGIN_GOOGLE_VOLUNTEER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await loginAsVolunteer({
        variables: { username: uservformState.username, password: uservformState.password },
      });
      const token = mutationResponse.data.loginAsVolunteer.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...uservformState,
      [name]: value,
    });
  };
  useEffect(()=>{
    if(Auth.loggedIn()){
      return;
    }
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const options = {
        client_id: clientID, 
        auto_select: false, 
        cancel_on_tap_outside: false, 
        context: 'signin',
    };
    function decodeJwtResponse(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      }

    googleOneTap(options, async (response) => {
        const res = await fetch('/api/google/login',{
            method: 'POST',
            body: JSON.stringify({
                token: response.credential
            }),
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        if(res.ok){
            const userData = await res.json();
            console.log(userData);
            const { name: username, email, picture, sub, jti } = userData;
            const {data, error} = await loginAsGoogleVolunteer({
              variables: {
                email: email,
                jti: jti,
              }
            })
            const responsePayload = decodeJwtResponse(response.credential);
            console.log(responsePayload);
            localStorage.setItem('ID', JSON.stringify(data.loginAsGoogleVolunteer.googlev._id));
            Auth.login(data.loginAsGoogleVolunteer.token);
            
        }
    });
 },[])

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Enter username</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
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
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/LoginCharity">← Charity Login</Link>
    </div>
  );
}

export default LoginVolunteer;
