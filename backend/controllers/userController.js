const User = require('../models/User');
const Skill = require('../models/Skill');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const skills = await Skill.find({ userId: req.user._id });

    res.json({
      success: true,
      data: {
        user,
        skills: {
          offer: skills.filter(s => s.type === 'offer'),
          want: skills.filter(s => s.type === 'want')
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, city, bio, availability, latitude, longitude } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = name || user.name;
    user.city = city || user.city;
    user.bio = bio || user.bio;
    user.availability = availability || user.availability;
    user.latitude = latitude !== undefined ? latitude : user.latitude;
    user.longitude = longitude !== undefined ? longitude : user.longitude;

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby users
// @route   GET /api/users/nearby
// @access  Private
const getNearbyUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const mySkills = await Skill.find({ userId: req.user._id });

    // Get users in same city
    const nearbyUsers = await User.find({
      city: currentUser.city,
      _id: { $ne: req.user._id }
    }).select('-password');

    // Get skills for each user and calculate match score
    const usersWithSkills = await Promise.all(
      nearbyUsers.map(async (user) => {
        const userSkills = await Skill.find({ userId: user._id });
        
        // Calculate match score
        const myOffers = mySkills.filter(s => s.type === 'offer').map(s => s.name.toLowerCase());
        const myWants = mySkills.filter(s => s.type === 'want').map(s => s.name.toLowerCase());
        const theirOffers = userSkills.filter(s => s.type === 'offer').map(s => s.name.toLowerCase());
        const theirWants = userSkills.filter(s => s.type === 'want').map(s => s.name.toLowerCase());

        let matchScore = 0;
        myOffers.forEach(skill => {
          if (theirWants.includes(skill)) matchScore += 50;
        });
        myWants.forEach(skill => {
          if (theirOffers.includes(skill)) matchScore += 50;
        });

        return {
          user,
          skills: {
            offer: userSkills.filter(s => s.type === 'offer'),
            want: userSkills.filter(s => s.type === 'want')
          },
          matchScore: Math.min(matchScore, 100)
        };
      })
    );

    // Sort by match score
    usersWithSkills.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      data: usersWithSkills
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, getNearbyUsers };
