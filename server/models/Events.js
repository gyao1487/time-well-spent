const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const eventSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  savedCharity: {
    type: Schema.Types.ObjectId,
    ref: "Charity",
    required: true,
  },
  
});

const Event = model('Event', eventSchema);

module.exports = Event;
