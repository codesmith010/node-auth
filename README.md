# Authentication and Verification API

This project provides an API for storing a public key and verifying a signed message. It uses Node.js, Express.

## Features

- **Store Public Key:** Stores a provided public key after validating the provided password.
- **Verify Signed Message:** Verifies the provided message and signature using the stored public key.

## Prerequisites

- Node.js and npm installed

## Installation

1. **Clone the repository:**

   ```bash
   git clone git-repo-url
   cd auth-verification-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```


3. **Start the server:**

   ```bash
   node server.js your-password
   ```

   Replace `your-password` with a password of your choice. This password will be hashed and stored in the MongoDB database.

## Assumptions

Used text files instead of in memory storage to persist data and for relatively faster read/write operations.


## Usage

### Generate Key Pair

To generate a key pair, use the following command:

```bash
node client.js generate-keypair
node client.js submit-public-key your-password
node client.js sign-message "your message"
node client.js verify-message "your message" "your-signature"

```
