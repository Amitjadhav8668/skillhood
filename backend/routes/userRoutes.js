const express = require('express');
const { getProfile, updateProfile, getNearbyUsers } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/nearby', protect, getNearbyUsers);

module.exports = router;
