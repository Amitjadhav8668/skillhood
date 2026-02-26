const Message = require('../models/Message');
const SwapRequest = require('../models/SwapRequest');

// @desc    Send message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { requestId, receiverId, message } = req.body;

    // Check if request exists and is accepted
    const request = await SwapRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.status !== 'accepted') {
      return res.status(403).json({ success: false, message: 'Can only message accepted requests' });
    }

    // Verify user is part of the request
    const isPartOfRequest = 
      request.fromUser.toString() === req.user._id.toString() ||
      request.toUser.toString() === req.user._id.toString();

    if (!isPartOfRequest) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const newMessage = await Message.create({
      requestId,
      senderId: req.user._id,
      receiverId,
      message
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('senderId', 'name')
      .populate('receiverId', 'name');

    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get messages for a request
// @route   GET /api/messages/:requestId
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Check if user is part of the request
    const request = await SwapRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    const isPartOfRequest = 
      request.fromUser.toString() === req.user._id.toString() ||
      request.toUser.toString() === req.user._id.toString();

    if (!isPartOfRequest) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const messages = await Message.find({ requestId })
      .populate('senderId', 'name')
      .populate('receiverId', 'name')
      .sort('timestamp');

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
