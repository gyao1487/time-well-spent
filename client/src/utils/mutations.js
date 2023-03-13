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

export const LOGIN_CHARITY = gql`
  mutation loginAsCharity($username: String!, $password: String!) {
    loginAsCharity(username: $username, password: $password) {
      token
      userc {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($savedEvent: inputEvent!) {
    addEvent(savedEvent: $savedEvent) {
      username
      savedEvents {
        title
        description
        price
        image
        quantity
       
      }
    }
  }
`;

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
    
    userc {
      _id
      username
      email
      password
}
    
    token
  }
}
`;