const connection = require('../database/connection');

module.exports = {
    // Valida se o usuário existe no BD para realizar o login no sistema
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id',id)
            .select('name')
            .first();
        if (!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    }
}