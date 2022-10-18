const nodeFetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const productList = [
  {
    id: 1,
    productName: "Apple",
    price: 1,
    username: "cole",
    password: "123",
  },
];

app.post("/product-register", async (req, res) => {
  const product = await registerProduct(
    req.body.productName,
    req.body.price,
    req.body.username,
    req.body.password
  );
  res.json(product);
});

async function registerProduct(productName, price, username, password) {
  const user = await checkLogin(username, password);
  console.log("USER: ", user);
  if (user) {
    const product = {
      id: productList.length + 1,
      productName: productName,
      price: price,
      username: username,
      password: password,
    };
    productList.push(product);
    return product;
  } else {
    return "User not found";
  }
}

async function checkLogin(username, password) {
  const requisition = await nodeFetch("http://localhost:3000/user-list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  console.log("REQUISITION: ", requisition);
  const user = requisition.find(
    (user) => user.username == username && user.password == password
  );
  if (user) {
    return user;
  } else {
    return false;
  }
}

app.get("/product-list", (req, res) => {
  res.send(productList);
});

app.listen(port, () => {
  console.log(`Server B running on port ${port}`);
});
