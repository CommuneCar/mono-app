enum TripLocationType {
  Start = 'start',
  End = 'end',
  Pickup = 'pickup',
  Dropoff = 'dropoff',
}

interface TripRouteLocation {
  lat: number;
  long: number;
  userName: string;
  type: TripLocationType;
}

export { TripLocationType };
export type { TripRouteLocation };