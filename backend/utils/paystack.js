const crypto = require('crypto');

function verifyPaystackSignature(rawBody, signature, secret) {
  try {
    const hmac = crypto.createHmac('sha512', secret);
    hmac.update(JSON.stringify(rawBody));
    const digest = hmac.digest('hex');
    return digest === signature;
  } catch (err) {
    return false;
  }
}

module.exports = { verifyPaystackSignature };
