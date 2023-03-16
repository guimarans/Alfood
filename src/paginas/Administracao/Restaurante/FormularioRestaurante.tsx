import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import IRestaurante from 'interfaces/IRestaurante';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function FormularioRestaurante() {

  const parametros = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros]);

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();


    if(parametros.id) {
      axios.put<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante 
      })
      .then(() => (
        <Alert severity="success" color="info">
          Cadastro atualizado com sucesso
        </Alert>
      ))
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', { 
        nome: nomeRestaurante 
      })
      .then(() => (
        <Alert severity="success" color="info">
          Cadastro realizado com sucesso
        </Alert>
      ))
    }
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
        id="standard-basic"
        label="Nome do restaurante"
        variant="standard" />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>)
}