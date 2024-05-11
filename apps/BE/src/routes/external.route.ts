import express from 'express';
import { getWhatsAppChatUrl } from '../controllers';

const router = express.Router();

// New route to generate WhatsApp chat URL
router.get('/chat-with/:phoneNumber', getWhatsAppChatUrl);

export default router;
