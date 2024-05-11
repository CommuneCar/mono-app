# A list of example queries you can use to interact with the DB:
#### Create 3 users:
```gql
mutation {
    createUser(input: {
        user: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            profileImage: "http://example.com/profile.jpg",
            age: 30,
            gender: "Male",
            phoneNumber: "123-456-7890"
        }
    }) {
        user {
            id
            firstName
            lastName
            email
            profileImage
            age
            gender
            phoneNumber
        }
    }
}
```
```gql
mutation {
    createUser(input: {
        user: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            profileImage: "http://example.com/jane.jpg",
            age: 28,
            gender: "Female",
            phoneNumber: "987-654-3210"
        }
    }) {
        user {
            id
            firstName
            lastName
            email
            profileImage
            age
            gender
            phoneNumber
        }
    }
}
```
```gql
mutation {
    createUser(input: {
        user: {
            firstName: "Alex",
            lastName: "Johnson",
            email: "alex.johnson@example.com",
            profileImage: "http://example.com/alex.jpg",
            age: 35,
            gender: "Male",
            phoneNumber: "555-555-5555"
        }
    }) {
        user {
            id
            firstName
            lastName
            email
            profileImage
            age
            gender
            phoneNumber
        }
    }
}
```

#### Fetch a specific user:
```gql
query {
  userById(id: 1) {
    id
    firstName
    lastName
    email
    profileImage
    age
    gender
    phoneNumber
  }
}
```

#### Modify a user:
```gql
mutation {
  updateUserById(input: {
    id: 1,
    userPatch: {
      firstName: "Johnny",
      email: "johnny.doe@example.com",
      profileImage: "http://example.com/johnny.jpg"
    }
  }) {
    user {
      id
      firstName
      lastName
      email
      profileImage
      age
      gender
      phoneNumber
    }
  }
}
```


#### Delete a user:
```gql
mutation {
  deleteUserById(input: {
    id: 3
  }) {
    user {
      id
    }
  }
}
```

#### Fetch all users:
```gql
query {
  allUsers {
    nodes {
      id
      firstName
      lastName
      email
      profileImage
      age
      gender
      phoneNumber
    }
  }
}
```