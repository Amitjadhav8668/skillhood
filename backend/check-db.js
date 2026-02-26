const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/skillhood')
  .then(async () => {
    const User = require('./models/User');
    const users = await User.find().select('-password');
    console.log('\n=== USERS IN DATABASE ===');
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
