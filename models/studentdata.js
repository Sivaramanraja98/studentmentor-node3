const mongoose = require('mongoose');

// Create Student schema
const studentSchema = new mongoose.Schema({
    name : String,
    email : String,
    mentor : {type : mongoose.Schema.Types.ObjectId, ref : 'Mentor'}
});

// Create Student model
const Student = mongoose.model('Student',studentSchema);

//exporting student data
module.exports = Student;