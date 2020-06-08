import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logoLucas.png';
import './index.css'
export default function CadastroCaso(){
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [link, setLink] = useState('');

  useEffect(()=>{
    let acesso = localStorage.getItem('acesso');
    if(acesso === 'ong'){
      setLink('/painel')
    }else{
      setLink('/dashboard')
    }
  }, [])
  return(
    <div className="cadastro-container">
      <div className="container">
        <div className="esquerdo">
          <img src={logo} alt="Ártemis - Todos por um"/>
          <p>Preencha todos os Dados para cadastrar o Caso.</p>
          <Link to={link} >Voltar ao painel</Link>
        </div>

        <form className="direito">
          <h2>Preencha todos os campos abaixo e cadastra seu caso</h2>

          <input type="text" placeholder="Título do caso" onChange={e => setTitulo(e.target.value)}/>
          <input type="valor" placeholder="Valor necessário" onChange={e => setValor(e.target.value)}/>
          <input type="text" placeholder="Tipo de PET" onChange={e => setTipo(e.target.value)}/>
          <textarea name="descricao" id="descricao" rows="10" placeholder="Descrição" onChange={e => setDescricao(e.target.value)}></textarea>
          <button type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
    
  )
}