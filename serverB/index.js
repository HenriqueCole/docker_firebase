const nodeFetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const crud = require("../crud/index.js");

app.use(express.json());

app.post("/product-register", async (req, res) => {
  const product = await registerProduct(
    req.body.description,
    req.body.name,
    req.body.password,
    req.body.price,
    req.body.userCPF
  );
  if (product) {
    res.send(product);
  } else {
    res.send("User not found");
  }
});

async function registerProduct(description, name, password, price, userCPF) {
  const user = await checkLogin(name, password);
  if (user) {
    const product = {
      description: description,
      name: name,
      price: price,
      userCPF: userCPF,
    };
    const savedProduct = await crud.post("Products", null, product);
    return savedProduct;
  } else {
    return false;
  }
}

async function checkLogin(name, password) {
  const requisition = await nodeFetch("http://localhost:3000/user-list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  const user = requisition.find(
    (user) => user.Name == name && user.Password == password
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
