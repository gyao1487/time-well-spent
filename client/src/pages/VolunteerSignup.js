
//!!! NEED TO REPLACE WITH TAILWIND///
//Need to create SignUp Landing Page
//Components:
// Logo
//Background image
// Buttons for two options as well as images/icons?
import React, { useState, useEffect } from 'react';
import googleOneTap from 'google-one-tap'
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_VOLUNTEER, ADD_GOOGLE_VOLUNTEER } from '../utils/mutations';
import { useStateContext, useDispatchContext } from "../utils/GlobalState";
import ACTIONS from '../utils/actions'
import { QUERY_GOOGLE_VOLUNTEER } from '../utils/queries';

const VolunteerSignup = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [createGoogleVolunteer] = useMutation(ADD_GOOGLE_VOLUNTEER);
  const [uservFormData, setVolunteerFormData] = useState({ username: '', email: '', password: '' });
  const [createVolunteer, { error }] = useMutation(ADD_VOLUNTEER);

  

  const handleChange = (event) => {
    const { name, value } = event.target;
   
    setVolunteerFormData({ ...uservFormData, [name]: value });
    };
    const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

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
      fullName: '',
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
        context: 'signup',
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
        const res = await fetch('/api/google/signup',{
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
            const { name: username, email, picture, sub, jti } = userData

            // if(error){
            //   console.log(error)
            // }
            
            const { data, errors } = await createGoogleVolunteer({
                variables: {
                    username: username,
                    email: email,
                    jti: jti,
                    sub: sub,
                    picture: picture,
                }
            })
            console.log(data)
            if(errors){
                console.log(errors);
            }
            const responsePayload = decodeJwtResponse(response.credential);
            dispatch({type: ACTIONS.USER_INFO, payload: responsePayload})
            console.log(responsePayload);
            localStorage.setItem('ID', JSON.stringify(data.createGoogleVolunteer.googlev._id));
            Auth.login(data.createGoogleVolunteer.token);
            
        }
    });
 },[])  

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="fullName">Full Name:</label>
          <input
            placeholder="Put your full name here"
            name="fullName"
            type="fullName"
            id="fullName"
            onChange={handleChange}            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerSignup;