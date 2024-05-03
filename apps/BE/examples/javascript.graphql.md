# Examples of how to query data from graphql via Nodejs:

#### Using axios:
```js
const axios = require('axios');
let data = JSON.stringify({
  query: `query {
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
}`,
  variables: {}
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'localhost:5000/graphql',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Using Fetch:
```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const graphql = JSON.stringify({
  query: "query {\n  allUsers {\n    nodes {\n      id\n      firstName\n      lastName\n      email\n      profileImage\n      age\n      gender\n      phoneNumber\n    }\n  }\n}\n",
  variables: {}
})
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: graphql,
  redirect: "follow"
};

fetch("localhost:5000/graphql", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```