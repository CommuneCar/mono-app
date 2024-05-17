# A list of example queries you can use to interact with the DB:
The examples here assume that you already have data in the DB that consists of:
* User IDs: 1, 2.
* Community IDs: 1, 2.

#### Create 3 Rides
```gql
mutation {
  createRide1: createRide(input: {
    ride: {
      ownerId: 1,
      fromLat: 34.0522,
      fromLong: -118.2437,
      toLat: 34.0522,
      toLong: -118.2437,
      gasMoney: 10,
      pronouns: true,
      startTime: "2023-05-03T09:00:00Z",
      seats: 4,
      modificationTs: "2023-05-03T09:00:00Z"
    }
  }) {
    ride {
      id
      ownerId
      fromLat
      fromLong
      toLat
      toLong
      startTime
      seats
    }
  }
  createRide2: createRide(input: {
    ride: {
      ownerId: 1,
      fromLat: 40.7128,
      fromLong: -74.0060,
      toLat: 40.7128,
      toLong: -74.0060,
      gasMoney: 15,
      pronouns: false,
      startTime: "2023-05-04T12:00:00Z",
      seats: 3,
      modificationTs: "2023-05-04T12:00:00Z"
    }
  }) {
    ride {
      id
      ownerId
      fromLat
      fromLong
      toLat
      toLong
      startTime
      seats
    }
  }
  createRide3: createRide(input: {
    ride: {
      ownerId: 2,
      fromLat: 37.7749,
      fromLong: -122.4194,
      toLat: 37.7749,
      toLong: -122.4194,
      gasMoney: 20,
      pronouns: true,
      startTime: "2023-05-05T15:00:00Z",
      seats: 2,
      modificationTs: "2023-05-05T15:00:00Z"
    }
  }) {
    ride {
      id
      ownerId
      fromLat
      fromLong
      toLat
      toLong
      startTime
      seats
    }
  }
}
```

#### Fetch a ride by ID
```gql
query {
  rideById(id: 1) {
    id
    ownerId
    fromLat
    fromLong
    toLat
    toLong
    gasMoney
    pronouns
    startTime
    seats
  }
}
```

#### Modify a ride by ID
```gql
mutation {
  updateRideById(input: {
    id: 3,
    ridePatch: {
      gasMoney: 12,
      seats: 5
    }
  }) {
    ride {
      id
      gasMoney
      seats
    }
  }
}
```

#### Delete a ride community by ID
```gql
mutation {
  deleteRideById(input: {
    id: 3
  }) {
    ride {
      id
    }
  }
}
```


#### Get all rides
```gql
query {
  allRides {
    nodes {
      id
      ownerId
      fromLat
      fromLong
      toLat
      toLong
      gasMoney
      pronouns
      startTime
      seats
    }
  }
}
```

#### Get all rides communities with details
```gql
query {
  allRides {
    nodes {
      id
      ownerId
      fromLat
      fromLong
      toLat
      toLong
      gasMoney
      pronouns
      startTime
      seats
    }
  }
}
```


#### Get all rides by owner id
```gql
query MyQuery {
  allRides(condition: {ownerId: 1}) {
    edges {
      node {
        id
        ownerId
        fromLat
        fromLong
        toLat
        toLong
        gasMoney
        pronouns
        startTime
        seats
      }
    }
  }
}
```


#### Associate a community id w/ a ride:
```gql
mutation UpdateRideCommunity {
  updateRideById(
    input: {
      id: 1,
      ridePatch: {
        communityId: 1
      }
    }
  ) {
    ride {
      id
      communityId
      community {
        id
        title
      }
    }
  }
}
```