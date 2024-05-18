import { useMutation, useQueryClient } from 'react-query';
import { addNewRide } from '../../apis/rides/add-new-ride';
import { Ride } from '@communecar/types';

const useAddNewRide = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (ride: Ride) => addNewRide(ride),
    {
      onSuccess: () => {
        // Successfully added the ride, invalidate previous rides and fetch new values from the BE:
        queryClient.invalidateQueries('rides');
      },
      onError: (error) => {
        console.error('Error adding new ride:', error);
      }
    }
  );
};

export { useAddNewRide };