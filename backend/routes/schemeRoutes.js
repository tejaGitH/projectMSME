import express from 'express';
const router = express.Router();
import { findMatchingSchemes } from '../controllers/schemeController.js';

router.route('/find').post(findMatchingSchemes);

export default router;
