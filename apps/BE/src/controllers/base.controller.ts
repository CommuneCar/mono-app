import { Request, Response } from "express";

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Get the main endpoint
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: A welcome message
 */
export const getIndex = (req: Request, res: Response) => {
    res.send('Application works!');
};