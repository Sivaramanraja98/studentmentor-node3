const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Mentor = require("./models/mentordata");
const Student = require("./models/studentdata");

// express setup
const app = express();
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect("mongodb://localhost:27017/studentmentor", { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error('Failed to connect to MongoDB', err));

//API for creating mentor
app.post('/mentors', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
});


// API to create a student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API to assign a student to a mentor
app.post('/assign', async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student) {
        student.mentor = mentor;
        await student.save();
      }
    }
    res.json({ message: 'Students assigned successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add multiple students to a Mentor
app.post('/mentors/:mentorId/add-multiple-students', (req, res) => {
  const mentorId = parseInt(req.params.mentorId);
  const { studentIds } = req.body;

  const mentor = mentors.find((mentor) => mentor.id === mentorId);
  if (!mentor) {
    res.status(404).json({ message: 'Mentor not found.' });
  } else {
    studentIds.forEach((studentId) => {
      const student = students.find((student) => student.id === parseInt(studentId));
      if (student && !student.mentorId) {
        student.mentorId = mentorId;
      }
    });
    res.json({ message: 'Students added successfully.' });
  }
});


// Assign or Change Mentor for a particular Student
app.post('/students/:studentId/assign-mentor/:mentorId', (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const mentorId = parseInt(req.params.mentorId);

  const student = students.find((student) => student.id === studentId);
  const mentor = mentors.find((mentor) => mentor.id === mentorId);

  if (!student || !mentor) {
    res.status(404).json({ message: 'Student or mentor not found.' });
  } else {
    student.mentorId = mentorId;
    res.json({ message: 'Mentor assigned successfully.' });
  }
});

// Show all students for a particular mentor
app.get('/mentors/:mentorId/students', (req, res) => {
  const mentorId = parseInt(req.params.mentorId);

  const mentor = mentors.find((mentor) => mentor.id === mentorId);
  if (!mentor) {
    res.status(404).json({ message: 'Mentor not found.' });
  } else {
    const mentorStudents = students.filter((student) => student.mentorId === mentorId);
    res.json({ students: mentorStudents });
  }
});

// Show the previously assigned mentor for a particular student
app.get('/students/:studentId/previous-mentor', (req, res) => {
  const studentId = parseInt(req.params.studentId);

  const student = students.find((student) => student.id === studentId);
  if (!student) {
    res.status(404).json({ message: 'Student not found.' });
  } else {
    const previousMentor = mentors.find((mentor) => mentor.id === student.mentorId);
    res.json({ mentor: previousMentor });
  }
});

//Starting server
const PORT =2300;
app.listen(PORT, () => {
    console.log("This Node application is running on port ",PORT );
  });
  
