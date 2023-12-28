const crypto = require("crypto");
require("dotenv").config();

const alg = "aes-256-ctr";
const password = process.env.SECRET_CRYPTO;

const key = crypto.scryptSync(password, "salt", 32);

function crypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(alg, key, iv);
  const crypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedText: crypted };
}

function decode(encoded) {
  const decipher = crypto.createDecipheriv(
    alg,
    key,
    Buffer.from(encoded.iv, "hex")
  );
  const decrypted =
    decipher.update(encoded.encryptedText, "hex", "utf8") +
    decipher.final("utf8");
  return decrypted;
}

// const encryptedData = crypt("edison.matos@live.com");
// console.log("Texto Criptografado:", encryptedData.encryptedText);

// const decryptedText = decode(encryptedData);
// console.log("Texto Descriptografado:", decryptedText);

module.exports = { crypt, decode };
