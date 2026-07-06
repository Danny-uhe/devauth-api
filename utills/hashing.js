const bcrypt = require('bcrypt');
const crypto = require('crypto');

const doHash = async (password, saltValue) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltValue);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const doHashValidation = async (password, hashedPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  } catch (error) {
    throw error;
  }
};

const hmacProcess = (value, key) => {
  try {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(value);
    return hmac.digest('hex');
  } catch (error) {
    throw error;
  }
};

module.exports = { doHash, doHashValidation, hmacProcess };
