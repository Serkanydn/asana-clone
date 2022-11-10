const CryptoJs = require('crypto-js');

const passwordToHash = (password) => {
    const sha1Password = CryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
    return CryptoJs.SHA256(password, sha1Password).toString();
}

module.exports = {
    passwordToHash,
}
