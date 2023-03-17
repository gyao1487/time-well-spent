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
export const LOGIN_GOOGLE_VOLUNTEER =gql `
  mutation loginAsGoogleVolunteer($email: String!, $jti: String!) {
    loginAsGoogleVolunteer(email: $email, jti: $jti) {
      token
      googlev {
        _id
        username
        email
        picture
      }
    }
  }
`

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

export const ADD_CHARITY_EVENT = gql`
  mutation addCharityEvent($savedEvents: inputEvent!) {
    addCharityEvent(savedEvents: $savedEvents) {
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

export const ADD_VOLUNTEER_EVENT = gql`
  mutation addVolunteerEvent($eventId: ID!) {
    addVolunteerEvent(eventId: $eventId) {
      _id
      fullName
      username
      email
      skills
      password
      title
      savedEvents
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
      _id
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
export const UPDATE_GOOGLE_VOLUNTEER_DESCRIPTION =gql`
mutation updateGoogleVolunteer($_id: ID!, $user_description: String){
  updateGoogleVolunteer(_id: $_id, user_description: $user_description){
    user_description
  }
}
`

export const ADD_CHARITY = gql`
mutation createCharity($username: String!, $password: String!, $email: String!, $websiteURL: String!) {
  createCharity(username: $username, password: $password, email: $email, websiteURL: $websiteURL) {
    
    userc {
      _id
      username
      email
      password
      websiteURL
}
    
    token
  }
}
`;