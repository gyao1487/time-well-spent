import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHARITY_EVENT } from "../utils/mutations";
import { parse } from "graphql";

function EventForm(props) {
  const [usercformState, setFormState] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    address: "",
    // savedCharity: "",
  });
  const [addCharityEvent, { error }] = useMutation(ADD_CHARITY_EVENT);

  //Form Validation:
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    time: "",
    address: "",
    // savedCharity: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //Form validation:
    const {title, description, image, date, time, address, savedCharity} = usercformState;
    const formErrors = {
      title: title ? "" : "Please enter a title for your event",
      description: description ? "" : "Please enter a description for your event",
      image: image ? "" : "Please insert an image for your event",
      date: date ? "" : "Please enter the date of your event",
      time: time ? "" : "Please enter the time of your event",
      address: address ? "" : "Please enter the address of your event",
      // savedCharity: savedCharity ? "" : "Please enter the name of your Charity",
    };
    if(Object.values(formErrors).some((error) => error)){
      setErrors(formErrors);
      setSubmitted(false);
      return; 
    }

    try {
      console.log("Before calling addCharityEvent");
      const mutationResponse = await addCharityEvent({
        variables: {
          savedEvents: {
            title: usercformState.title,
            description: usercformState.description,
            image: usercformState.image,
            date: usercformState.date,
            time: usercformState.time,
            address: usercformState.address,
          },
        },
      });
      console.log("After calling addCharityEvent");
      console.log("Mutation response:", mutationResponse);
    } catch (e) {
      console.log("Error during addCharityEvent call:", e);
    } finally {
      setSubmitted(true);
      console.log("Form submission completed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...usercformState,
      [name === "charity" ? "savedCharity" : name]: value,
    });
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                Create a new event
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                Just type in details about your event, and we'll work our magic!
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleFormSubmit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  {/*---------------------------- TITLE-------------------------- */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Event Title
                    </label>
                    <input
                      placeholder="Community Cleanup"
                      name="title"
                      type="text"
                      id="title"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </div>
                  {/*---------------------------- Event Details -------------------------- */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Event Details
                    </label>
                    <div className="mt-2">
                      <textarea
                        placeholder="Type description here"
                        name="description"
                        type="text"
                        id="description"
                        onChange={handleChange}
                        defaultValue={""}
                        className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      What do you want your volunteers to know about the event?
                    </p>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </div>

                  {/*---------------------------- Date-------------------------- 
                  Will add cooler date and time picker later*/}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date
                    </label>
                    <input
                      placeholder="3/27/23"
                      name="date"
                      type="date"
                      id="date"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                  </div>

                  {/*----------------------------Time------------------------- 
                  Will add cooler date and time picker later*/}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Time
                    </label>
                    <input
                      placeholder="12:30PM"
                      name="time"
                      type="time"
                      id="time"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                  </div>
                  {/*----------------------------Address------------------------- 
                  */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      placeholder="200 W Awesome Street, Chicago IL, 60618"
                      name="address"
                      type="address"
                      id="address"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
                  {/*---------------------------- Image------------------------- 
                  This is just a placeholder for now*/}

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="imageLink"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image Link
                    </label>
                    <input
                      placeholder="Place an Image link here"
                      name="image"
                      type="link"
                      id="image"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                  </div>
                  {/*---------------------------- PLACEHOLDER ONLY: Charity Name------------------------- */}
                  {/* <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="charityName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Charity Name
                    </label>
                    <input
                      placeholder="Stardew Community Center"
                      name="charity"
                      type="text"
                      id="charity"
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.savedCharity && <p className="mt-1 text-sm text-red-500">{errors.savedCharity}</p>}
                  </div> */}
                </div>
                {/*---------------------------- Submit Button------------------------- */}
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={() => document.location.replace("/CharityProfile")}
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Create Event
                  </button>
                </div>
                {/*---------------------------- Error Message (make it a modal/notification)------------------------- */}
                {error ? (
                  <div>
                    <p className="error-text">Failed to create event. Please try again!</p>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="container my-1">
        <h2>Create New Event</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="title">Enter Title</label>
            <input
              placeholder="title"
              name="title"
              type="text"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="description">Description:</label>
            <input
              placeholder="Describe the Event here"
              name="description"
              type="text"
              id="description"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="date">Date:</label>
            <input
              placeholder="Enter date of event"
              name="date"
              type="text"
              id="date"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="address">Address</label>
            <input
              placeholder="Enter address"
              name="address"
              type="text"
              id="address"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="image">Image:</label>
            <input
              placeholder="Place an Image link here"
              name="image"
              type="text"
              id="image"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="image">Name of your charity:</label>
            <input
              placeholder="Type Charity Name Here"
              name="charity"
              type="text"
              id="charity"
              onChange={handleChange}
            />
          </div>

          {error ? (
            <div>
              <p className="error-text">Fail to create an Event</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default EventForm;
