const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// @desc    Create swap request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const { toUser, offeredSkill, requestedSkill, message } = req.body;

    const request = await SwapRequest.create({
      fromUser: req.user._id,
      toUser,
      offeredSkill,
      requestedSkill,
      message
    });

    const populatedRequest = await SwapRequest.findById(request._id)
      .populate('fromUser', 'name email city')
      .populate('toUser', 'name email city');

    res.status(201).json({
      success: true,
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my requests
// @route   GET /api/requests/my
// @access  Private
const getMyRequests = async (req, res) => {
  try {
    const received = await SwapRequest.find({ toUser: req.user._id })
      .populate('fromUser', 'name email city')
      .sort('-createdAt');

    const sent = await SwapRequest.find({ fromUser: req.user._id })
      .populate('toUser', 'name email city')
      .sort('-createdAt');

    res.json({
      success: true,
      data: {
        received,
        sent
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await SwapRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.toUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    const populatedRequest = await SwapRequest.findById(request._id)
      .populate('fromUser', 'name email city')
      .populate('toUser', 'name email city');

    res.json({
      success: true,
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createRequest, getMyRequests, updateRequestStatus };
