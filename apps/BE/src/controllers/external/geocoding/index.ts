import { Request, Response } from "express";
import axios from "axios";
import { LocationResult } from '@communetypes/Geocoding';

// Create a shared Axios instance
const client = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    params: {
        format: 'json',
        limit: 5
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     LocationResult:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the location
 *         displayName:
 *           type: string
 *           description: Full display name of the location
 *         lat:
 *           type: string
 *           description: Latitude of the location
 *         lon:
 *           type: string
 *           description: Longitude of the location
 * /api/v1/external/geocode:
 *   get:
 *     summary: Resolve location from a query string
 *     description: Returns geocoding results for the input location string.
 *     parameters:
 *       - in: query
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: The location name to resolve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Maximum number of results to return (default 5)
 *     responses:
 *       200:
 *         description: An array of location results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationResult'
 *       400:
 *         description: Missing location parameter
 */
export const geocodeLocation = async (req: Request, res: Response) => {
    const { location, limit = 5 } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location parameter is required" });
    }

    try {
        const response = await client.get(`/search`, {
            params: { q: location as string, limit }
        });

        const results: LocationResult[] = response.data.map((item: any) => ({
            name: item.name,
            displayName: item.display_name,
            lat: item.lat,
            lon: item.lon
        }));

        if (results.length === 0) {
            return res.status(404).json({ error: "No results found" });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch geocoding data" });
    }
};


/**
 * @swagger
 * /api/v1/external/reverse-geocode:
 *   get:
 *     summary: Resolve location name from latitude and longitude
 *     description: Returns reverse geocoding results for the input coordinates.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *         description: Latitude of the location
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: string
 *         description: Longitude of the location
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Maximum number of results to return (default 5)
 *     responses:
 *       200:
 *         description: An array of location results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationResult'
 *       400:
 *         description: Missing latitude or longitude parameters
 */
export const reverseGeocodeLocation = async (req: Request, res: Response) => {
    const { lat, lon, limit = 5 } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude parameters are required" });
    }

    try {
        const response = await client.get(`/reverse`, { params: { lat, lon, limit } });
        const result = response.data;
        const locationResult: LocationResult = {
            name: result.name,
            displayName: result.display_name,
            lat: result.lat,
            lon: result.lon
        };

        res.json([locationResult]);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reverse geocoding data" });
    }
};
