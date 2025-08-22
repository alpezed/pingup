import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import {
	addConnection,
	getAllConnections,
} from '../controllers/connection.controller.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getAllConnections).post(addConnection);

export default router;
