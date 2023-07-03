const mongoose = require('mongoose');

// Create Mentor schema
const mentorSchema = new mongoose.Schema({
    name : String,
    email : String
});

// Create mentor model
const Mentor = mongoose.model('Mentor',mentorSchema);

//exporting mentor data
module.exports = Mentor;