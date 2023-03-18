import React, { useState } from "react";
import { ADD_CHARITY } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

const CharitySignup = () => {
  // set initial form state
  const [usercFormData, setCharityFormData] = useState({
    username: "",
    email: "",
    password: "",
    websiteURL: "",
  });
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
    }

    setCharityFormData({
      username: "",
      email: "",
      password: "",
      websiteURL: "",
    });
  };
  return (
    <div className="container my-1">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Account Name</label>
          <input
            placeholder="Amazing charity"
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
        <div className="col-span-3 sm:col-span-2">
          <label
            htmlFor="company-website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Website:
          </label>
          <div className="mt-2 flex rounded-md shadow-sm my-2">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              http://
            </span>
            <input
               name="websiteURL"
               type="websiteURL"
               id="websiteURL"
              onChange={handleChange}
              className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="  www.yourwebsite.org"
            />
          </div>
        </div>
      
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
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
  );
};

export default CharitySignup;
