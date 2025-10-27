import express from 'express';
const router = express.Router();
import { findSchemes } from '../controllers/schemeController.js';
import Scheme from '../models/scheme.js'; // Keep for test routes

// Main search endpoint
router.route('/find').post(findSchemes);

// --- Test & Debug Routes ---
router.get('/all', async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.json({ count: schemes.length, schemes });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Scheme.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
