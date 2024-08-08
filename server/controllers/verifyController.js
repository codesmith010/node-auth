// controllers/verifyController.js
const { verifyMessage } = require("../utils/verify");

async function handleVerifyMessage(req, res) {
  const { message, signature } = req.body;

  try {
    const result = verifyMessage(message, signature);
    res.json(result);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
}

module.exports = { handleVerifyMessage };
