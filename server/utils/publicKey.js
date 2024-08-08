const fs = require("fs");
const path = require("path");

const PUBLIC_KEY_FILE = path.join(__dirname, "../public_key.pem");

function storePublicKey(publicKey) {
  fs.writeFileSync(PUBLIC_KEY_FILE, publicKey);
}

function getStoredPublicKey() {
  try {
    return fs.readFileSync(PUBLIC_KEY_FILE, "utf-8");
  } catch (error) {
    throw new Error("Public key not found.");
  }
}

module.exports = {
  storePublicKey,
  getStoredPublicKey,
};
