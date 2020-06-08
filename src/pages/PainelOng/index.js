import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {logout } from '../../services/auth';
import sair from '../../assets/sair.svg';
import logo from '../../assets/logoLucas2.png';
import lixeira from '../../assets/delete.svg';

import './index.css';

export default function PainelOng(props){
  const [casos, setCasos] = useState([]);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState(localStorage.getItem('nome'));

  async function loadDados(){
    const id = localStorage.getItem('id_user');
    const dados = await api.get(`/casos/all/${id}`);
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.casos.length > 0){
        setCasos(resposta.casos);
        console.log(resposta.casos)
        setTexto('');
      }else{

        setTexto('Você ainda não tem nenhum caso criado. Clique no botão acima e crie seu primeiro caso.')
      }
    }
  }
  useEffect(()=>{
    loadDados();

  },[])


  function signOut(e){
    e.preventDefault();
    try{
      logout();
      return props.history.push('/');
    }catch(e){
      return console.log(e)
    }
  }
  
  return(
    <div className="painel-container">
      <div className="container">
        
        <header>
          <div className="esquerdo">
            <img src={logo} className="painel-logotipo" alt="Ártemis - Todos por UM"/>
            <span>Olá, {nome}</span>
          </div>
          <div className="direito">
            <Link to="/cadastro-caso" className="cadastrar-caso">Cadastrar novo caso</Link>
            <button onClick={signOut}>
              <img src={sair} alt="Fazer logout"/>
            </button>
          </div>
        </header>

        <main>
          <div className="titulo">
            <h1>SEUS CASOS CADASTRADOS</h1>
          </div>
          {texto && <h2 className="texto-primeiro">{texto}</h2>}
          <div className="casos">
            {casos.map(caso=>(
              <ul key={caso.id}>
                <button className="painel-deletar">
                  <img src={lixeira} alt="deletar"/>
                </button>
                <li>
                  <h2>{caso.titulo}</h2>
                </li>
                <li>
                  <h3>Descrição</h3>
                  <p>{caso.descricao}</p>
                </li>
                <li>
                  <h3>Categoria</h3>
                  <p>{caso.tipo}</p>
                </li>
                <li>
                  <h3>Valor necessário</h3>
                  <p>{caso.valor}</p>
                </li>
                <li className="painel-contatos">
                  <a href={`https://web.whatsapp.com/send?phone=55${caso.telefone}`} target="_blank" rel="noopener noreferrer" className="painel-whats">WhatsApp</a>
                  <a href={`mailto:${caso.email}`} className="painel-email">Email</a>
                </li>
              </ul>
            ))}
          
          </div>
        </main>
          
      </div>
    </div>
  )
}