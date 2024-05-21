import axios from 'axios';
import { Request, Response } from 'express';
import { OSMLocationResult } from '@betypes/osm';

import { LocationResult } from '@communetypes/Geocoding';
import { geocodeWithFallback } from '../../../utils/geocoding';

// Create a shared Axios instance
const client = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  params: {
    format: 'json',
    limit: 5,
  },
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
const geocodeLocation = async (req: Request, res: Response) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    const results = await geocodeWithFallback(location as string);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No results found' });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch geocoding data' });
  }
};

/**
 * @swagger
 * /api/v1/external/reverse-geocode:
 *   get:
 *     summary: Resolve location name from latitude and longitude
 *     description: Returns reverse geocoding result for the input coordinates.
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
 *     responses:
 *       200:
 *         description: A location result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationResult'
 *       400:
 *         description: Missing latitude or longitude parameters
 *       500:
 *         description: Failed to fetch reverse geocoding data
 */
const reverseGeocodeLocation = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude parameters are required' });
  }

  try {
    const response = await client.get<OSMLocationResult>(`/reverse`, {
      params: { lat, lon },
    });
    const result = response.data;
    const locationResult: LocationResult = {
      name: result.name,
      displayName: result.display_name,
      lat: result.lat,
      lon: result.lon,
    };

    res.json([locationResult]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reverse geocoding data' });
  }
};

export { geocodeLocation, reverseGeocodeLocation };
