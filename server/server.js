// server.js
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");

const { storePassword } = require("./utils/password");

const app = express();
app.use(bodyParser.json());

// Retrieve and store password from command-line argument
const [, , inputPassword] = process.argv;
if (!inputPassword) {
  console.error("Error: Password must be provided as a command-line argument.");
  process.exit(1);
}

storePassword(inputPassword);

// Use routes
app.use("/", apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
