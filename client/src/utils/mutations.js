import { gql } from '@apollo/client';

export const LOGIN_VOLUNTEER = gql`
  mutation loginAsVolunteer($username: String!, $password: String!) {
    loginAsVolunteer(username: $username, password: $password) {
      token
      userv {
        _id
        username
      }
    }
  }
`;

// export const ADD_ORDER = gql`
//   mutation addOrder($products: [ID]!) {
//     addOrder(products: $products) {
//       purchaseDate
//       products {
//         _id
//         name
//         description
//         price
//         quantity
//         category {
//           name
//         }
//       }
//     }
//   }
// `;

export const ADD_VOLUNTEER = gql`
mutation createVolunteer($username: String!, $password: String!, $email: String!) {
  createVolunteer(username: $username, password: $password, email: $email) {
    
    userv {
      _id
      username
      email 
    }
    token
  }
}
`;

export const ADD_CHARITY = gql`
mutation createCharity($username: String!, $password: String!, $email: String!) {
  createCharity(username: $username, password: $password, email: $email) {
    
    charity {
      _id
      username
      email
      password
}
    
    token
  }
}
`;