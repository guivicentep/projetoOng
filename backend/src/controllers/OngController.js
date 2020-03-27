// Constante de conexão com o banco
const connection = require('../database/connection');

// Constante que traz o crypto, que gera o ID randômico de uma ONG
const crypto = require('crypto'); 

module.exports = {
    async index(request, response) {

    // Query que faz a busca de todas as ongs no banco de dados    
    const ongs = await connection('ongs').select('*');

    // Retorna todas as ongs em formato JSON
    return response.json(ongs)
    },
    async create(request, response) {


        // Constante que vai buscar todos os campos no front-end
        const { name, email, whatsapp, city, uf } = request.body;



        // Cria um código aleatório para cada ONG
        const id = crypto.randomBytes(4).toString('HEX');
        
        // Aguarda a conexão com ongs, e depois realiza o insert
        await connection('ongs').insert({
            id, 
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        // Retorna o id da ONG em formato JSON, para ser utilizado no front
        return response.json({id});
    }
}