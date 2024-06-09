import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     PickupLocation:
 *       type: object
 *       properties:
 *         fromLat:
 *           type: number
 *           description: Latitude of the pickup location
 *         fromLong:
 *           type: number
 *           description: Longitude of the pickup location
 * /api/v1/trips/route/{rideId}:
 *   get:
 *     summary: Get pickup locations for a specific ride
 *     description: Returns all the latitude and longitude coordinates for pickups from the specified ride.
 *     tags: ["Trips"]
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the ride
 *     responses:
 *       200:
 *         description: A list of pickup locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PickupLocation'
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Failed to fetch pickup locations
 */
const getRideRoute = async (req: Request, res: Response) => {
  const { rideId } = req.params;
  if (!rideId) {
    return res.status(400).json({ error: 'Ride ID parameter is required' });
  }

  try {
    const locations = [];
    const ride = await prisma.ride.findUnique({
      where: { id: parseInt(rideId, 10) },
      include: {
        userRide: {
          include: {
            user: true,  // Include the user data
          },
        },
      },
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    // Add the ride owner's information
    const owner = await prisma.user.findUnique({
      where: { id: ride.ownerId },
    });

    if (owner) {
      locations.push({
        userName: `${owner.firstName} ${owner.lastName}`,
        lat: ride.fromLat,
        long: ride.fromLong,
      });
      locations.push({
        userName: `${owner.firstName} ${owner.lastName}`,
        lat: ride.toLat,
        long: ride.toLong,
      });
    }

    // Add the user rides' information
    for (const userRide of ride.userRide) {
      locations.push({
        userName: `${userRide.user.firstName} ${userRide.user.lastName}`,
        lat: userRide.fromLat,
        long: userRide.fromLong,
      });
      locations.push({
        userName: `${userRide.user.firstName} ${userRide.user.lastName}`,
        lat: userRide.toLat,
        long: userRide.toLong,
      });
    }
    
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pickup locations' });
  }
};

export { getRideRoute };
