const crypto = require('crypto');
function generateSHA1Hash(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

module.exports = { generateSHA1Hash };
