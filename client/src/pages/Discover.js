import React, { useState } from "react";
import EventCard from "../components/EventCard";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EVENTS} from "../utils/queries";
import SearchBar from "../components/SearchBar"

const Discover = () => {
  // query for all events
  const { loading, data } = useQuery( QUERY_ALL_EVENTS);
  const events = data?.allEvents || [];
  const [searchInput, setSearchInput] = useState('');

  // if loading, return something else]
  return (
    <div className="flex">
      <h1 className="text-center text-gray-900 font-bold text-2xl tracking-tight m-4 dark:text-white">
        What kind of help are you wanting to provide?
      </h1>

      {/* ------------------SearchBar---------------- */}
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput}/>
        </div>
      </div>
   {/* ---------------Event Cards----------------- */}
        {/* If loading, show loading div. If done loading, show event cards
       !!!!!!!!!!!!!!!  Need to create better loading element later */}
        <div className="flex flex-wrap">
          {loading ? (
            <div>Loading...</div>
          ) : (
              <div>
                {events.filter((event) => {
                  if (searchInput.toLowerCase()==='') {
                    return event
                  } 
                  else if (event.title.toLowerCase().includes(searchInput) || event.description.toLowerCase().includes(searchInput)) {
                    return event
                  }
                }).map((event) => (
                  <EventCard event={event} key={event._id} />
                ))}
              </div>
          )}
        </div>
    </div>
  );
};

export default Discover;
