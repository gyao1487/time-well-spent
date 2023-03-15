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
     _id
     title
     description
     image
     date
     address
     savedCharity
    }
  }
`;

export const ADD_VOLUNTEER = gql`
mutation createVolunteer($username: String!, $password: String!, $email: String!, $fullName: String!) {
  createVolunteer(username: $username, password: $password, email: $email, fullName: $fullName) {
    
    userv {
      _id
      username
      email 
      fullName
    }
    token
  }
}
`;
export const ADD_GOOGLE_VOLUNTEER = gql`
mutation createVolunteer($username: String!, $email: String!, $sub: String!, $jti: String!, $picture: String!) {
  createGoogleVolunteer(username: $username, email: $email, sub: $sub, jti: $jti, picture: $picture) {
    
    googlev {
      username
      email
      jti
      sub
      picture
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