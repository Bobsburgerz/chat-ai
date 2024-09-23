const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convoSchema = new Schema({
  model: { type: String, required: true },
  messages: [
    {
      content: { type: String },
      role: { type: String },
 
    },
  ],
});

const Convo = mongoose.models.Convo|| mongoose.model('Convo', convoSchema);
 

export default Convo;