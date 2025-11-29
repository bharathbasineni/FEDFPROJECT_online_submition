require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function main() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gradebuddy';
  await mongoose.connect(MONGO_URI);
  console.log('Connected to', MONGO_URI);

  const name = process.env.NEW_USER_NAME || 'Test User';
  const email = process.env.NEW_USER_EMAIL || 'test@example.com';
  const password = process.env.NEW_USER_PASSWORD || 'TestPass123!';
  const role = process.env.NEW_USER_ROLE || 'student';

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log('User already exists:', existing.email);
      return;
    }

    // Use bcrypt directly to create passwordHash consistent with auth route
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), passwordHash, role });
    console.log('Created user:', user.email, 'id:', user._id.toString());
  } catch (err) {
    console.error('Error creating user:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
