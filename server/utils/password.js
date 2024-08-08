const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PASSWORD_FILE = path.join(__dirname, "../password.txt");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function storePassword(password) {
  const hashedPassword = hashPassword(password);
  fs.writeFileSync(PASSWORD_FILE, hashedPassword);
  console.log("Password set and stored securely.");
}

function getStoredPassword() {
  try {
    return fs.readFileSync(PASSWORD_FILE, "utf-8");
  } catch (error) {
    throw new Error("Password not set.");
  }
}

module.exports = {
  hashPassword,
  storePassword,
  getStoredPassword,
};
