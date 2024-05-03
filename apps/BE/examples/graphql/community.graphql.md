# A list of example queries you can use to interact with the DB:
Note: The examples here assume that an owner (==user) with the ID 1 already exists.

#### Create 3 communities
```gql
mutation {
  createCommunity(input: {
    community: {
      ownerId: 1,
      title: "Green Society",
      description: "Dedicated to creating a sustainable future for all.",
      lat: 34.0522,
      long: -118.2437
    }
  }) {
    community {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
```
```gql
mutation {
  createCommunity(input: {
    community: {
      ownerId: 2,
      title: "Tech Innovators",
      description: "Fostering innovation and technology in the community.",
      lat: 37.7749,
      long: -122.4194
    }
  }) {
    community {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
```
```gql
mutation {
  createCommunity(input: {
    community: {
      ownerId: 2,
      title: "Art Enthusiasts",
      description: "Celebrating creativity and artistic expression.",
      lat: 40.7128,
      long: -74.0060
    }
  }) {
    community {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
```

#### Fetch a community by ID
```gql
query {
  communityById(id: 1) {
    id
    ownerId
    title
    description
    lat
    long
  }
}
```

#### Modify a community by ID
```gql
mutation {
  updateCommunityById(input: {
    id: 1,
    communityPatch: {
      title: "Green and Clean Society",
      description: "Committed to a sustainable and clean environment."
    }
  }) {
    community {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
```

#### Delete a community by ID
```gql
mutation {
  deleteCommunityById(input: {
    id: 3
  }) {
    community {
      id
    }
  }
}
```


#### Get all communities
```gql
query {
  allCommunities {
    nodes {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
```