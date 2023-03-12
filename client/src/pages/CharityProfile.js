//Components on page:
//Profile picture/Banner
//Google Map window
//Donation Button
//About section
//Contact icons
//Event cards (active volunteer experiences)
//Edit buttons
import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_CHARITY } from '../utils/queries';

function CharityProfile() {
  const { data } = useQuery(QUERY_CHARITY);
  let charity;

  if (data) {
    charity = data.charity;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {charity ? (
          <>
            <h2>
              Order History for {charity.firstName} {charity.lastName}
            </h2>
            {charity.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default CharityProfile;
