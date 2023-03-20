
import React from "react";
import { useStateContext, useDispatchContext } from "../utils/GlobalState";
import { useState, useEffect } from "react";
import Auth from '../utils/auth'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_EVENT, QUERY_GOOGLE_VOLUNTEER, QUERY_ALL_EVENTS,QUERY_VOLUNTEER } from '../utils/queries'
import { UPDATE_GOOGLE_VOLUNTEER_DESCRIPTION, UPDATE_VOLUNTEER_DESCRIPTION } from "../utils/mutations";
import styles from '../styles/Profile.module.css'
import EventForm from "./EventForm";

const Profile = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(Auth.getProfile().data._id);
  const [userDescription, setUserDescription] = useState('');
  const [userEvents, setUserEvents] = useState(null)
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isUserEditingDescription, setIsUserEditingDescription] = useState(false);
  
  const { loading, error, data: googleVolunteerData } = useQuery(QUERY_GOOGLE_VOLUNTEER, {
    variables: {
      _id: userId
    },
    skip: !userId
  })
  const { loading : volunteerLoading, error: volunteerError, data: volunteerData} = useQuery(QUERY_VOLUNTEER, {
    variables: {
      _id: userId
    },
    skip: !userId
  })

  const [updateGoogleVolunteer] = useMutation(UPDATE_GOOGLE_VOLUNTEER_DESCRIPTION,{
    variables: {
      user_description: userDescription,
      _id: Auth.getProfile()?.data._id,
    },
  })
  const [updateVolunteerDescription] = useMutation(UPDATE_VOLUNTEER_DESCRIPTION,{
    variables: {
      user_description: userDescription,
      _id: Auth.getProfile()?.data._id,
    },
  })

  const handleSaveDescription = async (e)=>{
    
    setIsUserEditingDescription(false);
    if(googleVolunteerData?.googleVolunteer){
        const { data, error } = await updateGoogleVolunteer()
    }
    if(volunteerData?.volunteer){
      const { data: vData, error: vError } = await updateVolunteerDescription()
      if(vError){
        alert('Something went wrong.')
        console.log(vError)
      }
    }
    }
    console.log(volunteerData)

  useEffect(()=>{
      if(volunteerData?.volunteer){
        setUserData(volunteerData?.volunteer)
        setUserDescription(volunteerData?.volunteer?.user_description)
        setUserEvents(volunteerData?.volunteer?.savedEvents)
      }
      if(googleVolunteerData?.googleVolunteer){
        setUserData(googleVolunteerData?.googleVolunteer)
        setUserDescription(googleVolunteerData?.googleVolunteer?.user_description)
        setUserEvents(googleVolunteerData?.googleVolunteer?.savedEvents)
      }
      
  },[loading,volunteerLoading, userEvents])

  useEffect(()=>{
    const getUserLatLng = async () =>{
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,{
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
      })
      const locationData = await response.json();
      return locationData;
    }
    // getUserLatLng();

    const getUserAddress = async(locationData)=>{
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.lat},${locationData.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
      const addressData = await response.json();
      return addressData.results[6].formatted_address;
    }
    setIsLocationLoading(true);
    getUserLatLng().then((locationData)=>getUserAddress(locationData.location))
      .then((address)=> setUserLocation(address));
    setIsLocationLoading(false);
  },[])
  return (
    <div>
      <section className={styles.mainContainer}>
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="">
                    <img
                      alt={userData?.username}
                      src={userData?.picture}
                      className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 lg:-ml-16 max-w-150-px"
                    ></img>
                  </div>
                </div>

{/* ----------------------- ICONS ------------------------- */}
                <div className="w-full px-4 justify-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className=" p-3 text-center items-center ">
                      

                      <span className="text-sm text-blueGray-400">Events</span>
                      {userEvents?.map((event)=>{
                        return <a
                                  key={event._id}
                                  href={`/event/${event._id}`}
                                >
                                  {event.title} 
                                </a>
                      })}
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {userData?.username}
                </h3>
                {!isLocationLoading ?
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  
                    {userLocation}
                      
                  </div>
                  : <div>

                  </div>
                }
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center flex-col items-center">
                  {isUserEditingDescription ?
                    <button
                      className={styles.saveDescription}
                      onClick={handleSaveDescription}  
                    >
                      Save
                    </button>
                    :
                    <button
                    className={styles.editDescription}
                    onClick={()=> setIsUserEditingDescription(true)}
                  >
                    Edit Description
                  </button>
                  }
                  
                  <div className="w-full lg:w-9/12 px-4">
                    {isUserEditingDescription ?
                      <textarea
                        className="textarea textarea-info bg-transparent w-96 mt-7"
                        placeholder="Bio"
                        type="text"
                        autoFocus={true}
                        id="description"
                        value={userDescription}
                        onChange={(e)=> setUserDescription(e.target.value)}
                        onKeyDown={(e)=>{
                          if(e.keyCode === 27){
                            e.currentTarget.blur();
                            setIsUserEditingDescription(false);
                          }
                        }}
                        // onBlur={()=> setIsUserEditingDescription(false)}
                      /> :
                      <p
                        className="mb-4 text-blueGray-700 mt-7"
                      >
                        {userDescription}
                      </p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
