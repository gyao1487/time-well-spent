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
    address: "",
    savedCharity:""
  });
  const [addCharityEvent, { error }] = useMutation(ADD_CHARITY_EVENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const mutationResponse = await addCharityEvent({
        variables: {
          savedEvents: {
            title: usercformState.title,
            description: usercformState.description,
            image: usercformState.image,
            date: usercformState.date,
            address: usercformState.address,
            savedCharity: usercformState.savedCharity
            // savedCharity: {
            //   _id:
            // }
          },
        },
      });
    } catch (e) {
      console.log(e);
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
    <div className="container my-1">
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
    </div>
  );
}

export default EventForm;
