import { Link } from "react-router-dom";
import { ADD_VOLUNTEER_EVENT, ADD_GOOGLE_VOLUNTEER_EVENT } from "../utils/mutations";
import { QUERY_VOLUNTEER, QUERY_GOOGLE_VOLUNTEER } from '../utils/queries'
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import styles from '../styles/EventCard.module.css'

function EventCard({ event }) {
  console.log( "params " +window.location);
  const [userToken, setUserToken] = useState(null);
  const [isEventRemoved, setIsEventRemoved] = useState(false);
  const [addVolunteerEvent, { error }] = useMutation(ADD_VOLUNTEER_EVENT, {
    context: { token: userToken }, // Pass the JWT token in the context here
    update: (cache, { data: { addVolunteerEvent } }) => {
      
      // Update the cache
    },
    onError: (err) => {
      // console.error(err);
    },
  });
  const [addGoogleVolunteerEvent, { error: googlevError }] = useMutation(ADD_GOOGLE_VOLUNTEER_EVENT, {
    context: { token: userToken }, // Pass the JWT token in the context here
    update: (cache, { data: { addVolunteerEvent } }) => {
      
      // Update the cache
    },
    onError: (err) => {
      // console.error(err);
    },
  });
  const {loading: volunteerLoading, error: volunteerError, data: volunteerData} = useQuery(QUERY_VOLUNTEER,{
    variables:{
      _id: userToken?.data._id,
    },
    skip: !userToken?.data._id,
  })
  const {loading: googleVolunteerLoading, error: googleVolunteerError, data: googleVolunteerData} = useQuery(QUERY_GOOGLE_VOLUNTEER,{
    variables:{
      _id: userToken?.data._id,
    },
    skip: !userToken?.data._id,
  })

  const handleAddEvent = async (e) => { // Make the function async
    const eventId = e.target.dataset.id;
    // console.log(eventId, userToken);
    console.log(volunteerData)
    console.log(googleVolunteerData)
  
    try {
      const { data, errors } = await addVolunteerEvent({
        variables: { eventId },
        update: (cache, { data: { addVolunteerEvent } }) => {
          // ...
        },
      });
      
      const {googleData, errors: googleErrors} = await addGoogleVolunteerEvent({
        variables: { eventId }
      })
      setIsEventRemoved(false)
    } catch (error) {
      // console.error('Error in addVolunteerEvent mutation:', error); // Add this line
    }
  };
  const handleRemoveEvent = async (e) =>{
        setIsEventRemoved(true)
  }
  
  useEffect(() => {
    setUserToken(Auth.getProfile())
    console.log(event);
  }, [event]);


  if (!event) {
    return <h3>No events match this search, check again later!</h3>
  }

  return (
      <div className="max-w-sm max-h-max rounded overflow-hidden shadow-lg">
          <Link to={`/event/${event._id}`}>
            <img
              className="rounded-t-lg h-48 w-96 object-cover"
              src= {event.image}
              alt=""
            />
          </Link>
          <div className="p-5">
            <Link to={`/event/${event._id}`}>
              <h5 className="text-gray-900 font-bold text-2xl text-left tracking-tight mb-2 dark:text-white">
                {event.title}
              </h5>
            </Link>
            <p className="font-normal text-gray-700 mb-3 text-left dark:text-gray-400">
              <Link to ={`/profile/${event.savedCharity}`}>{event.savedCharity}</Link>
            </p>
          <div className="flex space-x-1 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{" "}
            <p className="font-normal text-gray-400 ">{event.date}</p>
          </div>

          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="font-normal text-gray-400 ">{event.address}</p>
           
          </div>
          <div className ="grid place-self-end pt-2">
          {(!isEventRemoved &&  googleVolunteerData?.googleVolunteer?.savedEvents?.includes(event._id)) || (!isEventRemoved && volunteerData?.volunteer?.savedEvents?.includes(event._id)) ?
            <button
              type="button"
              className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-cyan-300 dark:focus:ring-cyan-800 font-small 
              text-4xl text-center m-2 
              rounded-full px-3 py-1 text-sm font-semibold   mb-2 ` + styles.removeEvent}
              data-te-ripple-init
              data-te-ripple-color="light"
              data-id={event._id} onClick={handleRemoveEvent}>
              Remove Event
            </button>
            :
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 
              hover:bg-gradient-to-bl focus:ring-4 focus:outline-none 
              focus:ring-cyan-300 dark:focus:ring-cyan-800 font-small 
              text-4xl text-center m-2 
              rounded-full px-3 py-1 text-sm font-semibold   mb-2"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-id={event._id} onClick={handleAddEvent}>
              Sign up!
            </button>
          }
            
          </div>
        </div>
      </div>
      
  );
}

export default EventCard;
