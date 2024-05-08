import { Community, Ride } from '@communecar/types';

export type CommunityWithRides = Community & { rides: Ride[] };
