"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
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
const getIndex = (req, res) => {
    res.send('Application works!');
};
exports.getIndex = getIndex;
