import express from 'express';
import { getWhatsAppChatUrl, geocodeLocation, reverseGeocodeLocation } from '../controllers/external';

const router = express.Router();

// New route to generate WhatsApp chat URL
router.get('/whatsapp/:phoneNumber', getWhatsAppChatUrl);
router.get('/geocode', geocodeLocation);
router.get('/reverse-geocode', reverseGeocodeLocation);

export default router;