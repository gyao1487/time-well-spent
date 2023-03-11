import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Discover from './pages/Discover';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserSignup from './pages/UserSignup';
import CharitySignup from './pages/CharitySignup';
import UserProfile from './pages/UserProfile';
import CharityProfile from './pages/CharityProfile';
import Nav from './components/Nav';
import { CharityProvider } from './utils/GlobalState';
import Success from './pages/Success';

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
          <CharityProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/UserSignup" 
                element={<UserSignup />} 
              />
              <Route 
                path="/CharitySignup" 
                element={<CharitySignup />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/discover" 
                element={<Discover />} 
              />
              <Route 
                path="/UserProfile/:id" 
                element={<UserProfile />} 
              />
              <Route 
                path="/CharityProfile/:id" 
                element={<CharityProfile />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          </CharityProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
