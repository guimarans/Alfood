import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from 'interfaces/IRestaurante';
import {IPaginacao} from 'interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');

  function carregarDados(url:string, opcoes: AxiosRequestConfig = {}) {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch( error => console.error(error))
  }

  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const opcoes = {
      params: {} as IParametrosBusca
    }

    if(busca) {
      opcoes.params.search = busca
    }

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  // const verMais = () => {
  //   axios.get<IPaginacao<IRestaurante>>(proximaPagina)
  //   .then(resposta => {
  //     setRestaurantes([...restaurantes, ...resposta.data.results])
  //     setProximaPagina(resposta.data.next)
  //   })
  //   .catch( error => console.error(error))
  // }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      <button type="submit"> Pesquisar </button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}> Página Anterior </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}> Proxima pagina </button>}
  </section>)
}

export default ListaRestaurantes