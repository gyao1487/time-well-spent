//!!! NEED TO REPLACE WITH TAILWIND///
//Need to create SignUp Landing Page
//Components:
// Logo
//Background image
// Buttons for two options as well as images/icons?

import React from 'react';


const Signup = () => {
  return ( 
    <div>
      <div className="h-1/2">
      </div>
      <div className="flex items-center justify-center" id="button-elements">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick ={ ()=> document.location.replace('/VolunteerSignup') }>
          I want to help
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick ={ ()=> document.location.replace('/CharitySignup') }>
          I'm looking for volunteers
        </button>
      </div>
    </div>
  )
};

export default Signup;