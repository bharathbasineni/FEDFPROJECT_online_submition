const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// GET /api/assignments
router.get('/', async (req, res) => {
  try {
    const list = await Assignment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/assignments
router.post('/', async (req, res) => {
  try {
    const a = await Assignment.create(req.body);
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
