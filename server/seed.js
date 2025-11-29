require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');

async function main() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gradebuddy';
  await mongoose.connect(MONGO_URI);
  console.log('Connected to', MONGO_URI);

  const sample = [
    {
      title: 'Math Homework 1',
      description: 'Algebra problems from chapter 2',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      points: 20,
      teacherId: 't1'
    },
    {
      title: 'History Essay',
      description: 'Write a 1000-word essay on WW2 causes',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      points: 30,
      teacherId: 't2'
    }
  ];

  try {
    await Assignment.insertMany(sample);
    console.log('Inserted sample assignments');
  } catch (err) {
    console.error('Insert error', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
