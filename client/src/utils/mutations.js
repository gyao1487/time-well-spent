import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      volunteer {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_VOLUNTEER = gql`
  mutation addVolunteer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addVolunteer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      volunteer {
        _id
      }
    }
  }
`;

export const ADD_CHARITY = gql`
  mutation addCharity(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addCharity(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      charity {
        _id
      }
    }
  }
`;