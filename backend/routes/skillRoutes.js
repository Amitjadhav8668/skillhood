const express = require('express');
const { addSkill, getMySkills, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, addSkill);
router.get('/my', protect, getMySkills);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;
