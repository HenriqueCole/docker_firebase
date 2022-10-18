const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const crud = require("../crud/index.js");

app.use(express.json());

app.post("/user-register", async (req, res) => {
  console.log(req.body);
  const user = await registerUser(
    req.body.CPF,
    req.body.Name,
    req.body.Password
  );
  res.send(user);
});

async function registerUser(CPF, Name, Password) {
  const user = {
    CPF: CPF,
    Name: Name,
    Password: Password,
  };
  const savedUser = await crud.post("Users", null, user);
  return savedUser;
}

app.post("/login", async (req, res) => {
  const user = await checkUser(req.body.CPF, req.body.Name, req.body.Password);
  res.send(user);
});

async function checkUser(CPF, Name, Password) {
  const user = await crud.get("Users", CPF);
  if (user) {
    if (user.Name == Name && user.Password == Password) {
      return user;
    } else {
      return "User not found";
    }
  } else {
    return "User not found";
  }
}

app.get("/user-list", (req, res) => {
  crud.get("Users", null).then((users) => {
    res.send(users);
  });
});

app.listen(port, () => {
  console.log(`Server A running on port ${port}`);
});
