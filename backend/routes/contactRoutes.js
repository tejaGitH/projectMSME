import express from 'express';
const router = express.Router();
import { createContactMessage } from '../controllers/contactController.js';

router.route('/').post(createContactMessage);

export default router;
