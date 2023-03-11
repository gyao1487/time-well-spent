import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      volunteer {
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
    
    volunteer {
      _id
      username
      email
      password
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