const Skill = require('../models/Skill');

// @desc    Add new skill
// @route   POST /api/skills
// @access  Private
const addSkill = async (req, res) => {
  try {
    const { name, description, level, experience, type } = req.body;

    const skill = await Skill.create({
      userId: req.user._id,
      name,
      description,
      level,
      experience,
      type
    });

    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my skills
// @route   GET /api/skills/my
// @access  Private
const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user._id });

    res.json({
      success: true,
      data: {
        offer: skills.filter(s => s.type === 'offer'),
        want: skills.filter(s => s.type === 'want')
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { name, description, level, experience } = req.body;
    skill.name = name || skill.name;
    skill.description = description || skill.description;
    skill.level = level || skill.level;
    skill.experience = experience || skill.experience;

    const updatedSkill = await skill.save();

    res.json({
      success: true,
      data: updatedSkill
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await skill.deleteOne();

    res.json({
      success: true,
      message: 'Skill removed'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addSkill, getMySkills, updateSkill, deleteSkill };
