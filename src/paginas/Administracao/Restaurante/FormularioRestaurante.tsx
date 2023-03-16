import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function FormularioRestaurante() {

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
      .then(() => {
        return (
          <Alert severity="success" color="info">
            Cadastro realizado com sucesso
          </Alert>
        )
      })
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