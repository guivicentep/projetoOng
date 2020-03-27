import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import de alguns estilos de botão
import { FiArrowLeft } from 'react-icons/fi';

// import da conexão com o BackEnd
import api from '../../services/api';
import './styles.css';


import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // variável que vai retornar o usuário para a tela de login após o cadastro
    const history = useHistory();

    async function handleRegister(e){
        // Esse método faz com que a página não siga o padrão, logo não fica recarregando automaticamente a cada click
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        
        // try catch para validar se a conexão com o backend está funcionando
        try{
            // o await faz com que a variável aguarde o metodo post acontecer para prosseguir
            const response = await api.post('ongs', data);

            // Retorna o ID de acesso do usuário na tela
            alert(`Seu ID de acesso: ${response.data.id}`);

            // Retorna o usuário para a tela de Login
            history.push('/');
        }   catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro</Link>
                </section>

                {/* onSubmit realiza o chamado da classe handleRegister, para submeter todo o form abaixo */}
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    // As duas variáveis abaixo servem para pegar os valores que serão digitados no campo
                    value={name}
                    onChange={e => setName(e.target.value)}
                    
                    />
                    <input type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input 
                        placeholder="UF"
                        style={{width: 80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit"> Cadastrar</button>
                </form>
            </div>
        </div>
    );
}