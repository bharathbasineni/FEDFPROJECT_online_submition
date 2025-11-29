require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const assignmentsRouter = require('./routes/assignments');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

console.log('Attempting MongoDB connection...');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection FAILED:');
    console.error(err && err.message ? err.message : err);
  });

app.use('/api/assignments', assignmentsRouter);
app.use('/api/auth', authRouter);

app.get('/test-db', async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    if (state === 1) return res.send('Database is connected ✅');
    return res.send('Database is NOT connected ❌ (state: ' + state + ')');
  } catch (err) {
    return res.send('Database is NOT connected ❌');
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running on port', port);
});
