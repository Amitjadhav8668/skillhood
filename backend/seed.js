const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Skill = require('./models/Skill');
const SwapRequest = require('./models/SwapRequest');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const users = [
  {
    name: 'Alex Davis',
    email: 'alex@example.com',
    password: 'password123',
    city: 'San Francisco',
    latitude: 37.7749,
    longitude: -122.4194,
    bio: 'Full-stack developer passionate about teaching',
    availability: 'Weekends',
    role: 'user'
  },
  {
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    password: 'password123',
    city: 'San Francisco',
    latitude: 37.7849,
    longitude: -122.4094,
    bio: 'Content writer and SEO specialist',
    availability: 'Evenings',
    role: 'user'
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123',
    city: 'San Francisco',
    latitude: 37.7649,
    longitude: -122.4294,
    bio: 'Graphic designer and illustrator',
    availability: 'Flexible',
    role: 'user'
  },
  {
    name: 'Admin User',
    email: 'admin@skillhood.com',
    password: 'admin123',
    city: 'San Francisco',
    latitude: 37.7749,
    longitude: -122.4194,
    bio: 'Platform administrator',
    availability: 'Always',
    role: 'admin'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Skill.deleteMany();
    await SwapRequest.deleteMany();

    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users created');

    // Create skills for Alex
    await Skill.create([
      {
        userId: createdUsers[0]._id,
        name: 'Web Development',
        description: 'HTML, CSS, JavaScript, React',
        level: 'Expert',
        experience: '5 years',
        type: 'offer'
      },
      {
        userId: createdUsers[0]._id,
        name: 'JavaScript',
        description: 'ES6+, Node.js, Express',
        level: 'Expert',
        experience: '5 years',
        type: 'offer'
      },
      {
        userId: createdUsers[0]._id,
        name: 'Guitar',
        description: 'Acoustic guitar basics',
        level: 'Beginner',
        type: 'want'
      },
      {
        userId: createdUsers[0]._id,
        name: 'Spanish Language',
        description: 'Conversational Spanish',
        level: 'Beginner',
        type: 'want'
      }
    ]);

    // Create skills for Sarah
    await Skill.create([
      {
        userId: createdUsers[1]._id,
        name: 'Content Writing',
        description: 'Blog posts, articles, copywriting',
        level: 'Advanced',
        experience: '3 years',
        type: 'offer'
      },
      {
        userId: createdUsers[1]._id,
        name: 'SEO',
        description: 'On-page and off-page SEO',
        level: 'Intermediate',
        experience: '2 years',
        type: 'offer'
      },
      {
        userId: createdUsers[1]._id,
        name: 'Photography',
        description: 'Portrait and landscape',
        level: 'Beginner',
        type: 'want'
      },
      {
        userId: createdUsers[1]._id,
        name: 'Web Development',
        description: 'Frontend basics',
        level: 'Beginner',
        type: 'want'
      }
    ]);

    // Create skills for Mike
    await Skill.create([
      {
        userId: createdUsers[2]._id,
        name: 'Graphic Design',
        description: 'Logo design, branding, UI design',
        level: 'Expert',
        experience: '4 years',
        type: 'offer'
      },
      {
        userId: createdUsers[2]._id,
        name: 'Illustration',
        description: 'Digital illustration, character design',
        level: 'Advanced',
        experience: '3 years',
        type: 'offer'
      },
      {
        userId: createdUsers[2]._id,
        name: 'Web Development',
        description: 'Want to learn frontend',
        level: 'Beginner',
        type: 'want'
      },
      {
        userId: createdUsers[2]._id,
        name: 'Guitar',
        description: 'Acoustic and electric',
        level: 'Intermediate',
        experience: '2 years',
        type: 'offer'
      }
    ]);

    console.log('Skills created');

    // Create swap requests
    await SwapRequest.create([
      {
        fromUser: createdUsers[1]._id,
        toUser: createdUsers[0]._id,
        offeredSkill: 'Content Writing',
        requestedSkill: 'Web Development',
        message: 'Hi! I would love to learn web development from you.',
        status: 'accepted'
      },
      {
        fromUser: createdUsers[2]._id,
        toUser: createdUsers[0]._id,
        offeredSkill: 'Graphic Design',
        requestedSkill: 'JavaScript',
        message: 'Interested in learning JavaScript!',
        status: 'pending'
      }
    ]);

    console.log('Swap requests created');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('User: alex@example.com / password123');
    console.log('User: sarah@example.com / password123');
    console.log('User: mike@example.com / password123');
    console.log('Admin: admin@skillhood.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
