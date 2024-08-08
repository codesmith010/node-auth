// controllers/keyController.js
const { storePublicKey } = require("../utils/publicKey");
const { getStoredPassword, hashPassword } = require("../utils/password");

async function handleStoreKey(req, res) {
  const { publicKey, password } = req.body;

  try {
    const storedPassword = getStoredPassword();
    const hashedPassword = hashPassword(password);
    if (hashedPassword === storedPassword) {
      storePublicKey(publicKey);
      res.send("Public key stored.");
    } else {
      res.status(403).send("Invalid password.");
    }
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
}

module.exports = { handleStoreKey };
