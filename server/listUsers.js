require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function main() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gradebuddy';
  await mongoose.connect(MONGO_URI);
  console.log('Connected to', MONGO_URI);

  try {
    const users = await User.find({}, { passwordHash: 0, __v: 0 }).sort({ createdAt: -1 }).lean();
    if (!users || users.length === 0) {
      console.log('No users found');
    } else {
      console.log(`Found ${users.length} user(s):`);
      users.forEach(u => {
        console.log(JSON.stringify({ id: u._id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt }, null, 2));
      });
    }
  } catch (err) {
    console.error('Error fetching users:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
