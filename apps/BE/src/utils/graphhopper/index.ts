import { GraphHopperActivity, GraphHopperLocation, ServiceLocation } from '@betypes/graphhopper';
import axios from 'axios';
require('dotenv').config();  // Load environment variables

const GRAPHHOPPER_KEY = process.env.GRAPHHOPPER_KEY || 'graphhopper_key';


/**
 * Calls the GraphHopper API to solve a routing problem.
 * Heavily assumes the structure in which we perform the request and in which we receive results.
 * Honestly this wasn't worth the effort to develop a more generic solution here since its usage is very specific.
 * @param {GraphHopperLocation} startLocation - The starting point with name, lat, and long.
 * @param {GraphHopperLocation} endLocation - The ending point with name, lat, and long.
 * @param {Array<ServiceLocation>} serviceLocations - Array of locations for services with name, lat, and long.
 * @returns {Promise<Array<GraphHopperLocation>>} - A Promise resolving to an array of locations in the order determined by GraphHopper.
 */
const fetchGraphHopperRoute = async (startLocation: GraphHopperLocation, endLocation: GraphHopperLocation, serviceLocations: Array<ServiceLocation>): Promise<Array<GraphHopperLocation>> => {
    const url = 'https://graphhopper.com/api/1/vrp';
    const body = constructRequestBody(startLocation, endLocation, serviceLocations);

    try {
        const response = await axios.post(url, body, {
            headers: { 'Content-Type': 'application/json' },
            params: { key: GRAPHHOPPER_KEY }
        });

        // Assuming the response structure includes activities within the first route
        return response.data.solution.routes[0].activities.map((activity: GraphHopperActivity) => ({
            name: activity.location_id,
            lat: activity.address.lat,
            long: activity.address.lon
        }));
    } catch (error) {
        console.error('Error during GraphHopper API call:', error);
        return [startLocation, ...serviceLocations, endLocation];
    }
}

/**
 * Constructs the request body for the GraphHopper API.
 * Also heavily assumes the structure of the request body.
 * @param {GraphHopperLocation} start - The starting location.
 * @param {GraphHopperLocation} end - The ending location.
 * @param {Array<GraphHopperLocation>} services - List of service locations.
 * @returns {Object} - The request body for the GraphHopper API.
 */
const constructRequestBody = (start: GraphHopperLocation, end: GraphHopperLocation, services: Array<ServiceLocation>): object => {
    return {
        vehicles: [{
            vehicle_id: "vehicle_1",
            start_address: {
                location_id: start.name,
                lat: start.lat,
                lon: start.long
            },
            end_address: {
                location_id: end.name,
                lat: end.lat,
                lon: end.long
            }
        }],
        services: services.map(service => ({
            id: `${service.name}_${service.userId}`,
            type: service.type,
            name: `${service.type.charAt(0).toUpperCase() + service.type.slice(1)} at ${service.name}`,
            address: {
                location_id: service.name,
                lat: service.lat,
                lon: service.long
            },
            duration: 300  // Assuming a fixed duration for simplicity; this can be dynamic
        }))
    };
}


export { fetchGraphHopperRoute, constructRequestBody };
