const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const eventSchema = new Schema({
  eventName: [
    {
      type: String,
    },
  ],
  
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: String,
  },
  
});

const Event = model('Event', eventSchema);

module.exports = Event;
