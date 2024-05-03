# A list of example queries you can use to interact with the DB:
The examples here assume that you already have data in the DB that consists of:
* User IDs: 1, 2.
* Community IDs: 1, 2.

#### Create 3 User Rides
```gql
mutation {
  createUserRide1: createUserRide(input: {
    userRide: {
      userId: 1,
      rideId: 1,
      status: "Confirmed",
      fromLat: 34.0522,
      fromLong: -118.2437,
      toLat: 34.0522,
      toLong: -118.2437
    }
  }) {
    userRide {
      userId
      rideId
      status
    }
  }
  createUserRide2: createUserRide(input: {
    userRide: {
      userId: 2,
      rideId: 1,
      status: "Pending",
      fromLat: 34.0522,
      fromLong: -118.2437,
      toLat: 34.0522,
      toLong: -118.2437
    }
  }) {
    userRide {
      userId
      rideId
      status
    }
  }
  createUserRide3: createUserRide(input: {
    userRide: {
      userId: 1,
      rideId: 2,
      status: "Cancelled",
      fromLat: 40.7128,
      fromLong: -74.0060,
      toLat: 40.7128,
      toLong: -74.0060
    }
  }) {
    userRide {
      userId
      rideId
      status
    }
  }
}
```

#### Fetch a user-ride by user ID and ride ID
```gql
query {
  userRideByUserIdAndRideId(userId: 1, rideId: 1) {
    userByUserId {
      id
      firstName
      lastName
    }
    rideByRideId {
      id
      fromLat
      fromLong
      toLat
      toLong
      startTime
    }
    status
  }
}
```

#### Modify a user ride by user ID and ride ID
```gql
mutation {
  updateUserRideByUserIdAndRideId(input: {
    userId: 1,
    rideId: 2,
    userRidePatch: {
      status: "Completed"
    }
  }) {
    userRide {
      userId
      rideId
      status
    }
  }
}
```

#### Delete a user ride by user ID and ride ID
```gql
mutation {
  deleteUserRideByUserIdAndRideId(input: {
    userId: 1,
    rideId: 2
  }) {
    userRide {
      userId
      rideId
      status
    }
  }
}
```

#### Get all user rides with details
```gql
query {
  allUserCommunities {
    nodes {
      userId
      communityId
      status
      userByUserId {
        firstName
        lastName
        email
      }
      communityByCommunityId {
        title
        description
      }
    }
  }
}
```