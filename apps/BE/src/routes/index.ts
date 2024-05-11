import express from 'express';
import baseRoutes from './base.route';
import externalRoutes from './external.route';

const router = express.Router();

router.use('/', baseRoutes);
router.use('/external', externalRoutes);

export default router;
