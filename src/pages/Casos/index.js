import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import lixeira from '../../assets/delete.svg';

export default function Casos(props){
  const [ casos, setCasos ] = useState([]);
  const [texto, setTexto] = useState('');

  
  async function loadDados(){

    const dados = await api.get('/admin-casos');
    let resposta = dados.data;
    if(resposta.status === 'sucesso'){
      if(resposta.casos.length > 0){
        setCasos(resposta.casos);
        console.log(resposta.casos)
        setTexto('');
      }else{

        setTexto('Ainda não tem nenhum caso criado. Clique no botão acima e crie seu primeiro caso.')
      }
  }
}
  useEffect(()=>{
    loadDados();
  },[]);



  return (
    <>
    {texto && <h2 className="texto-primeiro">{texto}</h2>}
    <div className="casos">
      {casos.map(caso =>(
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
              <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(caso.valor)}</p>
            </li>
            <li className="painel-contatos">
              <a href={`https://web.whatsapp.com/send?phone=55${caso.telefone}`} target="_blank" rel="noopener noreferrer" className="painel-whats">WhatsApp</a>
              <a href={`mailto:${caso.email}`} className="painel-email">Email</a>
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}