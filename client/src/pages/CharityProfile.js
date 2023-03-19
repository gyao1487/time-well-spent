//GY: Pasted in styling/logic from ViewOnlyProfile. Just need to add the correct logic/query for
//logged in charity via _id. Then implement the edit features for fields and description at the bottom
import styles from "../styles/Profile.module.css";
import React, { useEffect } from "react";
import { QUERY_CHARITY, QUERY_CHARITY_BY_USERNAME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";
import Auth from "../utils/auth";

function CharityProfile() {
  const [userData, setUserData] = useState({
    userInformation: {
      _id: Auth.getProfile()?.data._id,
      description: description,
      charityName: charityName,
      websiteURL: websiteURL,
      address: address,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      phoneNumber: phoneNumber,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  // //ID
  
  // const [userId, setUserId] = useState(Auth.getProfile().data._id);


  //Save function
  const handleSave = async (e) => {
    setIsEditing(false);
    const { data, error } = await updateCharity();
    if (error) {
      alert("Something went wrong.");
      console.log(error);
    }
  };

  //Edit function
  const handleEdit = async (e) => {
    setUserData();
    setIsEditing(true);
  };

  const { loading, error, data } = useQuery(QUERY_CHARITY, {
    variables: {
      _id: userId,
    },
    skip: !userId,
  });

  const [updateCharity] = useMutation(UPDATE_CHARITY, {
    variables: {
      _id: Auth.getProfile()?.data._id,
      description: description,
      charityName: charityName,
      websiteURL: websiteURL,
      address: address,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      phoneNumber: phoneNumber,
      savedEvents: [savedEvents],
    },
  });

  useEffect(() => {
    setUserData(data?.charity);
    setUser;
  });
  // const { _id } = useParams();
  // console.log(username);
  // const { loading, error, data } = useQuery(QUERY_CHARITY_BY_USERNAME, {
  //   variables: { username: username },
  // });
  // const charity = data?.charity;

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

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
                      alt=""
                      src={charity.image}
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
                          <a
                            href={`https://${charity.websiteURL}`}
                            target="blank"
                            rel="noopener"
                          >
                            <button
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="inline-flex items-center justify-center w-8 h-8 mr-2  rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              <i className="fa-solid fa-globe"></i>
                              {/* <svg
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
                            </svg> */}
                            </button>
                          </a>
                          {isEditing? 
                           <textarea
                           className="textarea textarea-info bg-transparent w-96 mt-7"
                           placeholder="Description"
                           type="text"
                           autoFocus={true}
                           id="description"
                           value={userData.userInformation.description}
                           onChange={(e)=> setUserData({userInformation: {
                            ...userInformation, 
                            description: userData.userInformation.description}})}
                           onKeyDown={(e)=>{
                             if(e.keyCode === 27){
                               e.currentTarget.blur();
                               setIsUserEditingDescription(false);
                             }
                           }}
                           // onBlur={()=> setIsUserEditingDescription(false)}
                         /> : <div>{userData.userInformation.description}</div>}
                        </div>
                      </div>

                      <span className="text-sm text-blueGray-400"></span>
                    </div>

                    {/* ----------------------------------------------------------- */}
                    <div className="mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-flex items-center justify-center w-8 h-8 mr-2  rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <i className="fa-brands fa-twitter"></i>
                            {/* <svg
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
                            </svg> */}
                          </button>
                        </div>
                      </div>

                      <span className="text-sm text-blueGray-400"></span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-flex items-center justify-center w-8 h-8 mr-2  rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <i className="fa-brands fa-instagram"></i>
                            {/* <svg
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
                            </svg> */}
                          </button>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {charity.username}
                </h3>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-location-dot mr-2 text-lg text-blueGray-400"></i>
                  {charity.address}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                  {charity.phoneNumber}
                </div>
                {/* <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                </div> */}
              </div>
              <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center flex-col items-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p>{charity.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Description</button>
          )}
        </div>
      </section>
    </div>
  );
}

export default CharityProfile;
