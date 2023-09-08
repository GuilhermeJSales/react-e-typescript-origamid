import './App.css'
import { Input } from './Input'
import {useEffect, useState} from 'react'

interface Venda { 
  id: string;
  nome: string;
  preco: number;
  status: string;
  pagamento: string;
  parcelas: null | number;
  data: string;
}

export function App() {
  const [inicio, setInicio] = useState('');
  const [final, setFinal] = useState('');
  const [data, setData] = useState<null | Venda[]>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      let json;
      if(inicio !== "" && final !== "") {
      try {
        setLoad(true)
        response = await fetch(`https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`)
        json = await response.json();
        if(!response.ok) throw new Error(json.message);       
      } catch(error) {
        setData(null)
        console.log(error);
      } finally {
        setLoad(false);
        setData(json as Venda[])
      }
    }
  }
    fetchData()
  }, [inicio, final])

  return (
    <div className='container'>  
      <h1 className="title">Exercício TypeScript com React</h1>
      <form>
        <Input label="Início" id="inicio" type="date" value={inicio} setState={setInicio}/>
        <Input label="Final" id="final" type="date" value={final} setState={setFinal}/>
      </form>

    <div className='infos'>
      <ul>
        <div className='containerLoad'>
        {load && <div className='load' />}
        </div>
        {data && 
        data.map((venda) => (
          <li key={venda.id}>{venda.nome}: <span className={venda.status}>{venda.status}</span></li>
        ))}
      </ul>
      </div>

      
    </div>
  )
}