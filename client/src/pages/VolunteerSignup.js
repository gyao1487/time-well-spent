import React, { useState, useEffect } from "react";
import googleOneTap from "google-one-tap";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VOLUNTEER, ADD_GOOGLE_VOLUNTEER } from "../utils/mutations";
import { useStateContext, useDispatchContext } from "../utils/GlobalState";
import ACTIONS from "../utils/actions";
import { QUERY_GOOGLE_VOLUNTEER } from "../utils/queries";
import { Link } from "react-router-dom";

const VolunteerSignup = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [createGoogleVolunteer] = useMutation(ADD_GOOGLE_VOLUNTEER);
  const [uservFormData, setVolunteerFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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

      if(data){
        console.log('success')
        Auth.login(data.createVolunteer.token);
      }
      
    } catch (err) {
      console.error(err);
    }

    setVolunteerFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
    });
  };


  useEffect(()=>{
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const options = {
      client_id: clientID,
      auto_select: false,
      cancel_on_tap_outside: false,
      context: "signup",
    };
    function decodeJwtResponse(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }

    googleOneTap(options, async (response) => {
      const res = await fetch("/api/google/signup", {
        method: "POST",
        body: JSON.stringify({
          token: response.credential,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const userData = await res.json();
        console.log(userData);
        const { name: username, email, picture, sub, jti } = userData;

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
            skills: "",
          },
        });
        console.log(data);
        if (errors) {
          console.log(errors);
        }
        const responsePayload = decodeJwtResponse(response.credential);
        dispatch({ type: ACTIONS.USER_INFO, payload: responsePayload });
        console.log(responsePayload);
        // localStorage.setItem('ID', JSON.stringify(data.createGoogleVolunteer.googlev._id));
        Auth.login(data.createGoogleVolunteer.token);
      }
    });
  }, []);

  return (
    <>
      <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div>
            <img
              className="mx-auto h-20 w-auto "
              src="./assets/volunteerLogo.png"
              alt="volunteer icon"
            />
            <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white pb-10">
              Start making a change today!
            </h2>
          </div>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-600">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="kindperson123"
                    required="yes"
                  />
                </div>

                <div>
                  <label
                    for="fullName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="fullName"
                    name="fullName"
                    id="fullName"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your full name here"
                    required="yes"
                  />
                </div>

                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                    required="yes"
                  />
                </div>
                <div>
                  <label
                    for="pwd"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="pwd"
                    placeholder="••••••••"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="yes"
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="yes"
                  />
                </div>

                <div>
                  <label
                    for="fullName"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Skills: 
                  </label>
                  <input
                    type="textinput"
                    name="fullName"
                    id="fullName"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Organizing, networking, fundrainsing, etc..."
                    required="yes"
                  />
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-600 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required="true"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  class=" btn w-full text-white btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-700 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Get Started
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-white">
                  Already have an account?{" "}
                  <Link to="/loginvolunteer" class="text-indigo-700 hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>




      <div className="container my-1">
        <h2>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username</label>
            <input
              placeholder="Amazing person"
              autoComplete="username"
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
              autoComplete="email"
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
              autoComplete="current-password"
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
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VolunteerSignup;

//Grace's code:
//Grace's work in progress below:
// <section className="h-screen">
//   <div className="container h-full px-6 py-12">
//     <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
//       <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
//         <img
//           src={process.env.PUBLIC_URL + "/assets/landing.png"}
//           alt="Example"
//         />
//       </div>
//       <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
//         <form>
//           {/* <!-- Email input --> */}
//           <div className="relative mb-6" data-te-input-wrapper-init>
//             <input
//               type="email"
//               className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//               id="exampleFormControlInput3"
//               placeholder="Email address"
//             />
//             <label
//               for="exampleFormControlInput3"
//               className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
//             >
//               Email address
//             </label>
//           </div>
//           {/*
//       <!-- Password input --> */}
//           <div className="relative mb-6" data-te-input-wrapper-init>
//             <input
//               type="password"
//               className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//               id="exampleFormControlInput33"
//               placeholder="Password"
//             />
//             <label
//               for="exampleFormControlInput33"
//               className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
//             >
//               Password
//             </label>
//           </div>

//           <div className="mb-6 flex items-center justify-between">
//             <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
//               <input
//                 className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
//                 type="checkbox"
//                 value=""
//                 id="exampleCheck3"
//                 checked
//               />
//               <label
//                 className="inline-block pl-[0.15rem] hover:cursor-pointer"
//                 for="exampleCheck3"
//               >
//                 Remember me
//               </label>
//             </div>
//             <a
//               href="#!"
//               className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
//             >
//               Terms and conditions
//             </a>
//           </div>

//           {/* <!-- Submit button --> */}
//           <button
//             type="submit"
//             className="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//             data-te-ripple-init
//             data-te-ripple-color="light"
//           >
//             Sign up
//           </button>

//           <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
//             <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
//               OR
//             </p>
//           </div>

//           <a
//             className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//             href="#!"
//             role="button"
//             data-te-ripple-init
//             data-te-ripple-color="light"
//           >
//             {/* <!-- Facebook --> */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-2 h-3.5 w-3.5"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
//             </svg>
//             Continue with Facebook
//           </a>
//           <a
//             className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
//             href="#!"
//             role="button"
//             data-te-ripple-init
//             data-te-ripple-color="light"
//           >
//             {/* <!-- Twitter --> */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="mr-2 h-3.5 w-3.5"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//             </svg>
//             Continue with Twitter
//           </a>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
