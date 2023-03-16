import { Alert, Box, Button, TextField, Typography } from '@mui/material';
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


    if (parametros.id) {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography component="h1" variant="h6">Formulario de Restaurantes</Typography>
      <Box component="form" sx={{marginTop: 2}} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          id="standard-basic"
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required />
        <Button type="submit" sx={{marginTop: 1}} variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  )
}