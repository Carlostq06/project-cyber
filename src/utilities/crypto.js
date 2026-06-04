const crypto = require('crypto');
// La clave debe tener exactamente 32 caracteres (256 bits)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

function cifrar(text) {
    if (!text) return null;
    //El iv es un texto random que se mete en la clave para confusion
    const iv = crypto.randomBytes(IV_LENGTH);
    //aes es el sistema de cifrado simetrico estandard
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function descifrar(text) {
    if (!text) return null;
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        return '[Error al descifrar el dato]';
    }
}
module.exports = { cifrar, descifrar }