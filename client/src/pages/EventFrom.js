import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { parse } from 'graphql';


function EventFrom(props) {
  const [usercformState, setFormState] = useState({ title: '', description: '', price: '',image: '',quantity: '',});
  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addEvent({
        variables: { 
            savedEvent:{
        title: usercformState.title, 
        description: usercformState.description,
        price:parseInt(usercformState.price),
        image: usercformState.image,
        quantity: usercformState.quantity
            }
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
      [name]: value,
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
            placeholder="Descirbe the Event here"
            name="description"
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">price:</label>
          <input
            placeholder="Add Price to enter event here"
            name="price"
            type="number"
            id="price"
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

export default EventFrom;
