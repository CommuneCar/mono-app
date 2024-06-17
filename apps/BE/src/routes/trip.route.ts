import express from 'express';
import { getRideRoute } from '../controllers/trip';

const router = express.Router();

router.get('/route/:rideId', getRideRoute);

export default router;
