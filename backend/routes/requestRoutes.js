const express = require('express');
const { createRequest, getMyRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/my', protect, getMyRequests);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;
