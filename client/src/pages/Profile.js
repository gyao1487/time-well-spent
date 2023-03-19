
import React from "react";
import { useStateContext, useDispatchContext } from "../utils/GlobalState";
import { useState, useEffect } from "react";
import Auth from '../utils/auth'
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_GOOGLE_VOLUNTEER } from '../utils/queries'
import { UPDATE_GOOGLE_VOLUNTEER_DESCRIPTION } from "../utils/mutations";
import styles from '../styles/Profile.module.css'

const Profile = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(Auth.getProfile().data._id);
  const [userDescription, setUserDescription] = useState('');
  const [isUserEditingDescription, setIsUserEditingDescription] = useState(false);
  // const [isUserEditingLocation, setIsUserEditingLocation] = useState(false);
  const { loading, error, data } = useQuery(QUERY_GOOGLE_VOLUNTEER, {
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
  
  const handleDescriptionSubmit =(e)=>{
    e.preventDefault();
    this.blur();
    setIsUserEditingDescription(false);
  }
  const handleSaveDescription = async (e)=>{
    
    setIsUserEditingDescription(false);
    const { data, error } = await updateGoogleVolunteer()
    if(error){
      alert('Something went wrong.')
      console.log(error)
    }
    
  }

  useEffect(()=>{
    console.log(userData)
    setUserData(data?.googleVolunteer)
    setUserDescription(data?.googleVolunteer?.user_description)
  },[data])

  useEffect(()=>{
    const getUserLocation = async () =>{
      const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,{
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
      })
      const locationData = await response.json();
      console.log(locationData);
    }
    getUserLocation();
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
                      className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    ></img>
                  </div>
                </div>

{/* ----------------------- ICONS ------------------------- */}
                <div className="w-full px-4 justify-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center items-center ">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <span className="text-sm text-blueGray-400">Contact</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <span className="text-sm text-blueGray-400">Website</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {userData?.username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {/* {isUserEditingLocation ?
                    <button
                      className={styles.saveLocation}
                      onClick={handleSaveLocation}  
                    >
                      Save
                    </button>
                    :
                    <button
                    className={styles.editLocation}
                    onClick={()=> setIsUserEditingLocation(true)}
                  >
                    Edit
                  </button>
                  } */}
                  Los Angeles, California
                </div>
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
