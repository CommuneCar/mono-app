import express from 'express';
import baseRoutes from './base.route';

const router = express.Router();

// Dynamically populate router with routes
router.use('/', baseRoutes);

export default router;
