const mongoose = require('mongoose')
const { Schema } = mongoose;

const Courses = new Schema({
    course:{type:Object}
})

module.exports = mongoose.model('course', Courses)

questions = { taken: [{name:'math201', score: 12 }, {name:'eng101', score: 18 }] }

        // {"questions": [{ "question": "what is your name", "options": ["yaya", "mamoudou", "toure"]}], "answer": "yaya"}
