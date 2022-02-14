const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'monitor'] },
  courses: { type: Array },
  taken: { type: Array },
});

module.exports = mongoose.model('user', User);

questions = {
  taken: [
    { name: 'math201', score: 12 },
    { name: 'eng101', score: 18 },
  ],
};
