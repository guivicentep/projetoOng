const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;


        // Realiza a contagem de casos no banco
        const [count] = await connection('incidents').count();

        // Retorna a quantidade de casos no console
        console.log(count);

        const incidents = await connection('incidents')
            // Faz um join com outra tabela
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            // Faz uma limitação de retornos por página
            .offset((page - 1) * 5)

            // Faz o select no BD
            .select(['incidents.*',
             'ongs.name',
             'ongs.email',
             'ongs.whatsapp',
             'ongs.city',
             'ongs.uf'
            ]);
        
        // Faz o count do total de casos cadastrados
        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    async create(request, response){
        const {title, description, value} = request.body;

        // Faz a validação do ID da ong
        const ong_id  = request.headers.authorization;


        // Realiza o insert do caso no BD
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        // Retorna o ID do caso em formato JSON
        return response.json({ id });

    },

    // Método para deletar uma ONG
    async delete(request, response){

        // Recebe o ID do caso
        const {id} = request.params;

        // Recebe o ID da ONG
        const ong_id  = request.headers.authorization;

        // Realiza o select do caso no banco
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        // Caso o ID do caso não seja igual o da ONG que deseja exclui-lo
        if(incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        // Faz a exclusão do caso
        await connection('incidents').where('id', id).delete();

        // Retorna a mensagem de exito
        return response.status(204).send();

    }
    
}