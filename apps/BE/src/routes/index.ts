import express from 'express';
import baseRoutes from './base.route';
import externalRoutes from './external.route';

const router = express.Router();

// Dynamically populate router with routes
router.use('/', baseRoutes);
router.use('/external', externalRoutes);

export default router;
