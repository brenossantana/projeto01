import {useState} from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep ] = useState({})

  async function handleSearch(){
    if(input === ''){
      alert('Digite o CEP correto');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    }catch{
      alert("Ops erro ao digitar")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch/>
        </button>
      </div>
      {Object.keys(cep).length > 0 &&(
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade}</span>
        <span>{cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
