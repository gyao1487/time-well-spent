//GY: Pasted in styling/logic from ViewOnlyProfile. Just need to add the correct logic/query for
//logged in charity via _id. Then implement the edit features for fields and description at the bottom
import styles from "../styles/Profile.module.css";
import React, { useEffect } from "react";
import { QUERY_CHARITY, QUERY_ALL_EVENTS } from "../utils/queries";
import { UPDATE_CHARITY } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";
import Auth from "../utils/auth";
import { useDispatchContext, useStateContext } from "../utils/GlobalState";

function CharityProfile() {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const userId = Auth.getProfile().data._id;
  const { loading, error, data } = useQuery(QUERY_CHARITY, {
    variables: {
      _id: userId,
    },
  });

  console.log(userId);
  const [userEvents, setUserEvents] = useState(null);
  const [userData, setUserData] = useState(null); // add closing parenthesis
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(""); // add missing variables
  const [charityName, setCharityName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedEvents, setSavedEvents] = useState("");
  const [image, setImage] = useState("");
  // const [userEvents, setUserEvents] =useState(null)
  // const [userData, setUserData] = useState(
  //   {
  //   userInformation: {
  //     _id: Auth.getProfile()?.data._id,
  //     description: data.description,
  //     charityName: data.charityName,
  //     websiteURL: data.websiteURL,
  //     address: data.address,
  //     facebook: data.facebook,
  //     instagram: data.instagram,
  //     twitter: data.twitter,
  //     phoneNumber: data.phoneNumber,
  //   },
  // }
  // );

  // const [isEditing, setIsEditing] = useState(false);

  // //ID

  // const [userId, setUserId] = useState(Auth.getProfile().data._id);

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
      savedEvents: savedEvents,
    },
  });
  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
  } = useQuery(QUERY_ALL_EVENTS, {
    variables: {
      _id: data?.charity.savedEvents,
    },
  });

  console.log(data);

  useEffect(() => {
    // setUserData(data);
    setDescription(data?.charity.description);
    setCharityName(data?.charityName);
    setWebsiteURL(data?.charity.websiteURL);
    setAddress(data?.address);
    setFacebook(data?.facebook);
    setInstagram(data?.instagram);
    setTwitter(data?.twitter);
    setPhoneNumber(data?.phoneNumber);
    setSavedEvents(data?.savedEvents);
    setUserEvents(eventsData);
    setImage(data?.image);
  }, [data, eventsData]);
  // const { _id } = useParams();
  // console.log(username);
  // const { loading, error, data } = useQuery(QUERY_CHARITY_BY_USERNAME, {
  //   variables: { username: username },
  // });
  // const charity = data?.charity;

  //Save function
  const handleSave = async (e) => {
    setIsEditing(false);
    const { data, error } = await updateCharity();
    window.location.reload();
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
                      src={data?.charity.image}
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
                            href={`https://${data?.charity.websiteURL}`}
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
                            </button>
                          </a>
                        </div>
                      </div>

                      <span className="text-sm text-blueGray-400"></span>
                    </div>

                    {/* ----------------------------------------------------------- */}
                    <div className="mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                        <a
                            href={`https://twitter.com/${data?.charity.twitter}`}
                            target="blank"
                            rel="noopener"
                          >
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-flex items-center justify-center w-8 h-8 mr-2  rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </button>
                          </a>
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
                          </button>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400"></span>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Email edit field */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="text-sm font-small leading-6 text-gray-900"
                    >
                      Website:
                    </label>
                    <input
                      className=" block w-full text-sm bg-white rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="www.mynewURL.com"
                      type="website"
                      autoFocus={true}
                      id="websiteURL"
                      value={websiteURL}
                      onChange={(e) => setWebsiteURL(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 27) {
                          e.currentTarget.blur();
                          setIsEditing(false);
                        }
                      }}
                      // onBlur={()=> setIsUserEditingDescription(false)}
                    />
                  </div>

                {/* Twitter edit field */}
                   <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="text-sm font-small leading-6 text-gray-900"
                    >
                      Twitter Handle:
                    </label>
                    <input
                      className=" block w-full text-sm bg-white rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="myTwitterHandle"
                      type="twitter"
                      autoFocus={true}
                      id="twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 27) {
                          e.currentTarget.blur();
                          setIsEditing(false);
                        }
                      }}
                      // onBlur={()=> setIsUserEditingDescription(false)}
                    />
                  </div>
                  
                </div>
              ) : null}


              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {data?.charity.username}
                </h3>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-location-dot mr-2 text-lg text-blueGray-400"></i>
                  {data?.charity.address}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                  {data?.charity.phoneNumber}
                </div>
                {/* <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                </div> */}
              </div>
              <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center flex-col items-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p>{data?.charity.description}</p>
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
