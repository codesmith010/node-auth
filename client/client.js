const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const serverUrl = "http://localhost:3000";

// Function to generate key pair
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });

  // Save keys to files
  fs.writeFileSync(
    path.join(__dirname, "public_key.pem"),
    publicKey.export({ type: "pkcs1", format: "pem" })
  );
  fs.writeFileSync(
    path.join(__dirname, "private_key.pem"),
    privateKey.export({ type: "pkcs1", format: "pem" })
  );

  console.log("Key pair generated and saved.");
}

// Function to submit public key to server
async function submitPublicKey(password) {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "public_key.pem"),
    "utf8"
  );

  try {
    const response = await axios.post(`${serverUrl}/store-key`, {
      password,
      publicKey,
    });
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error submitting public key:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to sign a message
function signMessage(message) {
  const privateKey = fs.readFileSync(
    path.join(__dirname, "private_key.pem"),
    "utf8"
  );
  const sign = crypto.createSign("SHA256");
  sign.update(message);
  sign.end();
  const signature = sign.sign(privateKey, "hex");

  console.log("Message:", message);
  console.log("Signature:", signature);
  return { message, signature };
}

// Function to verify message signature
async function verifyMessageSignature(message, signature) {
  try {
    const response = await axios.post(`${serverUrl}/verify`, {
      message,
      signature,
    });
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error verifying message:",
      error.response ? error.response.data : error.message
    );
  }
}

// CLI argument handling and invoking functions
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node client.js <command> [options]");
  console.log("Commands:");
  console.log("  generate-keypair");
  console.log("  submit-public-key <password>");
  console.log("  sign-message <message>");
  console.log("  verify-message <message> <signature>");
  process.exit(1);
}

const command = args[0];

switch (command) {
  case "generate-keypair":
    generateKeyPair();
    break;
  case "submit-public-key":
    if (args.length < 2) {
      console.error("Password required.");
      process.exit(1);
    }
    submitPublicKey(args[1]);
    break;
  case "sign-message":
    if (args.length < 2) {
      console.error("Message required.");
      process.exit(1);
    }
    signMessage(args[1]);
    break;
  case "verify-message":
    if (args.length < 3) {
      console.error("Message and signature required.");
      process.exit(1);
    }
    verifyMessageSignature(args[1], args[2]);
    break;
  default:
    console.error("Unknown command.");
    process.exit(1);
}
