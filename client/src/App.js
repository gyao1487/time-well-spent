import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';


import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          
            <Nav />
            <Routes>
              {/* <Route 
                path="/" 
                element={<Home />} 
              /> */}
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              {/* <Route 
                path="/VolunteerSignup" 
                element={<VolunteerSignup />} 
              /> */}
              {/* <Route 
                path="/CharitySignup" 
                element={<CharitySignup />} 
              /> */}
              {/* <Route 
                path="/success" 
                element={<Success />} 
              /> */}
              {/* <Route 
                path="/discover" 
                element={<Discover />} 
              /> */}
              {/* <Route 
                path="/VolunteerProfile/:id" 
                element={<VolunteerProfile />} 
              />
              <Route 
                path="/CharityProfile/:id" 
                element={<CharityProfile />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              /> */}
            </Routes>
        
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
