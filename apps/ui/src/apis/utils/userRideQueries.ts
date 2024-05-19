const getUserRideQueries = (userId: number) => {
  return `
query MyQuery {
  allUserRides(condition: { userId: ${userId} }) {
    nodes {
      fromLat
      fromLong
      rideId
      status
      toLat
      toLong
      userId
    }
  }
}
`;
};

export { getUserRideQueries };