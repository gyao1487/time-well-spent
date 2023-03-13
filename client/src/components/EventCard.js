//Will make this a map function once we have save data

function EventCard() {
  return (
    <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="/event/:id">
        <img
          class="rounded-t-lg"
          src="https://ignatius.nyc/wp-content/uploads/2021/01/011619b-Inline.jpg"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="/event/:id">
          <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            Event Name
          </h5>
        </a>
        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">
          Charity Name
        </p>

        <div className="flex flex-row space-x-40">
          <div className="flex space-x-1">
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
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
