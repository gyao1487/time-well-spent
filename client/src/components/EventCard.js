//Will make this a map function once we have save data
function EventCard() {
  return (
    <div className="flex flex-wrap">
      <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
        {/* Need to change to Link to="/..." for production mode later */}
        <a href="/event/:id">
          <img
            className="rounded-t-lg"
            src="https://ignatius.nyc/wp-content/uploads/2021/01/011619b-Inline.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="/event/:id">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Event Name
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            <a href="/charity/:id</p>">Charity Name</a>
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
            <p className="font-normal text-gray-400 ">Time and Date</p>
          </div>

          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="font-normal text-gray-400 ">Address</p>
          </div>
        </div>
      </div>
      <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
        <a href="/event/:id">
          <img
            className="rounded-t-lg"
            src="https://ignatius.nyc/wp-content/uploads/2021/01/011619b-Inline.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="/event/:id">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Event Name
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            <a href="/charity/:id</p>">Charity Name</a>
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
            <p className="font-normal text-gray-400 ">Time and Date</p>
          </div>

          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="font-normal text-gray-400 ">Address</p>
          </div>
        </div>
      </div>


      <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
        <a href="/event/:id">
          <img
            className="rounded-t-lg"
            src="https://ignatius.nyc/wp-content/uploads/2021/01/011619b-Inline.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="/event/:id">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Event Name
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            <a href="/charity/:id</p>">Charity Name</a>
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
            <p className="font-normal text-gray-400 ">Time and Date</p>
          </div>

          <div className="flex space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <p className="font-normal text-gray-400 ">Address</p>
          </div>
        </div>
      </div>
      

    </div>
  );
}

export default EventCard;
