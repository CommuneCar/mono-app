import { axiosClient } from '../client';


const fetchTripRoute = async (rideId: number) => {
  const { data } = await axiosClient.get(`/api/v1/trips/route/${rideId}`);
  return data;
};

export { fetchTripRoute };
