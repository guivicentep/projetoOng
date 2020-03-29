// Constante que traz o crypto, que gera o ID randômico de uma ONG
const crypto = require('crypto');

module.exports = function generateUniqueId () {
    // Cria um código aleatório para cada ONG
    return crypto.randomBytes(4).toString('HEX');
}