# A list of example queries you can use to interact with the DB:
The examples here assume that you already have data in the DB that consists of:
* User IDs: 1, 2.
* Community IDs: 1, 2.

#### Create 3 User Communities
```gql
mutation {
  createUserCommunity1: createUserCommunity(input: {
    userCommunity: {
      userId: 1,
      communityId: 1,
      status: "Active"
    }
  }) {
    userCommunity {
      userId
      communityId
      status
    }
  }
  createUserCommunity2: createUserCommunity(input: {
    userCommunity: {
      userId: 1,
      communityId: 2,
      status: "Pending"
    }
  }) {
    userCommunity {
      userId
      communityId
      status
    }
  }
  createUserCommunity3: createUserCommunity(input: {
    userCommunity: {
      userId: 2,
      communityId: 2,
      status: "Active"
    }
  }) {
    userCommunity {
      userId
      communityId
      status
    }
  }
}
```

#### Fetch a user community by user ID
```gql
query {
  userCommunityByUserIdAndCommunityId(userId: 1, communityId: 1) {
    userByUserId {
      id
      firstName
      lastName
    }
    communityByCommunityId {
      id
      title
      description
    }
    status
  }
}
```

#### Modify a user community by ID
```gql
mutation {
  updateUserCommunityByUserIdAndCommunityId(input: {
    userCommunityPatch: {
      status: "Inactive"
    },
    userId: 2,
    communityId: 2
  }) {
    userCommunity {
      userId
      communityId
      status
    }
  }
}
```

#### Delete a user community by ID
```gql
mutation {
  deleteUserCommunityByUserIdAndCommunityId(input: {
    userId: 2,
    communityId: 2
  }) {
    userCommunity {
      userId
      communityId
      status
    }
  }
}
```


#### Get all user communities
```gql
query {
  allUserCommunities {
    nodes {
      userId
      communityId
      status
    }
  }
}
```

#### Get all user communities with details
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


#### Get all user communities by user id
```gql
query MyQuery {
  allUserCommunities(condition: {userId: 1}) {
    nodes {
      communityId
      status
      userId
      communityByCommunityId {
        id
        lat
        long
        ownerId
        description
        title
      }
      userByUserId {
        age
        email
        firstName
        gender
        id
        lastName
        phoneNumber
        profileImage
      }
    }
  }
}
```