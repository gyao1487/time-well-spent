const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {authMiddleware} = require('./utils/auth')
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const session = require('express-session');
const {v4} = require('uuid')
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(session({
  secret: 'super duper secret',
  cookie: {
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  },
  genid: function(req) {
    return  v4();
  },
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}))


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
app.post('/api/google-signup', (req, res)=>{
  const { token } = req.body;
  async function verify(){
    try{
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      console.log(userid);
      
      
        req.session.user = payload;
        console.log(req.session)
      // req.session.save((err)=>{
      //   if(err) return err;
      //   res.status(200).redirect('/');
      // })
      res.status(200).json(payload)
    }catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  }
  verify().catch(console.error);
})


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
 