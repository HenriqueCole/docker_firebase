const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userList = [
  {
    id: 1,
    username: "cole",
    password: "123",
  },
];

app.post("/user-register", (req, res) => {
  console.log(req.body);
  const user = registerUser(req.body.username, req.body.password);
  res.send(user);
});

function registerUser(username, password) {
  const user = {
    id: userList.length + 1,
    username: username,
    password: password,
  };
  userList.push(user);
  return user;
}

app.post("/login", (req, res) => {
  const user = checkUser(req.body.username, req.body.password);
  res.send(user);
});

app.get("/user-list", (req, res) => {
  res.send(userList);
});

function checkUser(username, password) {
  const user = userList.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    console.log(user);
    return user;
  } else {
    return "User not found";
  }
}

app.listen(port, () => {
  console.log(`Server A running on port ${port}`);
});
