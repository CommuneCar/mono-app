import { Request, Response } from "express";

/**
 * @swagger
 * /api/v1/external/whatsapp/{phoneNumber}:
 *   get:
 *     summary: Generate WhatsApp chat URL
 *     description: Returns a URL to start a new WhatsApp chat with the given phone number.
 *     parameters:
 *       - in: path
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The phone number to start a chat with, including country code
 *     responses:
 *       200:
 *         description: A URL to start a WhatsApp chat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://wa.me/1234567890"
 *       400:
 *         description: Invalid phone number format
 */
export const getWhatsAppChatUrl = (req: Request, res: Response) => {
    const { phoneNumber } = req.params;

    // Basic validation for phone number - this can be more complex depending on your needs
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
        return res.status(400).json({ error: "Invalid phone number format" });
    }

    const chatUrl = `https://wa.me/${phoneNumber}`;
    res.json({ url: chatUrl });
};