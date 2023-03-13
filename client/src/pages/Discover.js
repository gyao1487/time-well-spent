import React from "react";
import EventCard from "../components/EventCard";

//Components:
//Discover Header
//Event Cards
//Filter Popup
//Search Bar
//Search Fields

//Logic needed:
//Search function - populate cards with events that fit the parameters

const Discover = () => {
  // query for all events

  // if loading, return something else

  return (
    <div>
      <h1 className="text-center text-gray-900 font-bold text-2xl tracking-tight m-4 dark:text-white">
        Discover New Opportunities
      </h1>

      {/* ------------------SearchBar---------------- */}
      <div className="container mx-auto my-auto">
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <div className="relative mb-1 flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 block w-[1%] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

{/* map through the events data */}
{/* for each event, pass the props (title, description) */}
        <EventCard />

      </div>
    </div>
  );
};

export default Discover;

// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';

// import Cart from '../components/Cart';
// import { useStoreContext } from '../utils/GlobalState';
// import {
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
//   ADD_TO_CART,
//   UPDATE_PRODUCTS,
// } from '../utils/actions';
// import { QUERY_PRODUCTS } from '../utils/queries';
// import { idbPromise } from '../utils/helpers';
// import spinner from '../assets/spinner.gif';

// function Discover() {
//   const [state, dispatch] = useStoreContext();
//   const { id } = useParams();

//   const [currentProduct, setCurrentProduct] = useState({});

//   const { loading, data } = useQuery(QUERY_PRODUCTS);

//   const { products, cart } = state;

//   useEffect(() => {
//     // already in global store
//     if (products.length) {
//       setCurrentProduct(products.find((product) => product._id === id));
//     }
//     // retrieved from server
//     else if (data) {
//       dispatch({
//         type: UPDATE_PRODUCTS,
//         products: data.products,
//       });

//       data.products.forEach((product) => {
//         idbPromise('products', 'put', product);
//       });
//     }
//     // get cache from idb
//     else if (!loading) {
//       idbPromise('products', 'get').then((indexedProducts) => {
//         dispatch({
//           type: UPDATE_PRODUCTS,
//           products: indexedProducts,
//         });
//       });
//     }
//   }, [products, data, loading, dispatch, id]);

//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === id);
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...currentProduct, purchaseQuantity: 1 },
//       });
//       idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
//     }
//   };

//   const removeFromCart = () => {
//     dispatch({
//       type: REMOVE_FROM_CART,
//       _id: currentProduct._id,
//     });

//     idbPromise('cart', 'delete', { ...currentProduct });
//   };

//   return (
//     <>
//       {currentProduct && cart ? (
//         <div className="container my-1">
//           <Link to="/">← Back to Products</Link>

//           <h2>{currentProduct.name}</h2>

//           <p>{currentProduct.description}</p>

//           <p>
//             <strong>Price:</strong>${currentProduct.price}{' '}
//             <button onClick={addToCart}>Add to Cart</button>
//             <button
//               disabled={!cart.find((p) => p._id === currentProduct._id)}
//               onClick={removeFromCart}
//             >
//               Remove from Cart
//             </button>
//           </p>

//           <img
//             src={`/images/${currentProduct.image}`}
//             alt={currentProduct.name}
//           />
//         </div>
//       ) : null}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//       <Cart />
//     </>
//   );
// }

// export default Discover;
