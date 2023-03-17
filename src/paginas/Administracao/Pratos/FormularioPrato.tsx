import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import http from '../../../http';
import IPrato from 'interfaces/IPrato';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function FormularioPrato() {

  const parametros = useParams();
  const [nomePrato, setNomePrato] = useState('');

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
    }
  }, [parametros]);

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();


    if (parametros.id) {
      http.put<IPrato>(`pratos/${parametros.id}/`, {
        nome: nomePrato
      })
        .then(() => (
          <Alert severity="success" color="info">
            Cadastro atualizado com sucesso
          </Alert>
        ))
    } else {
      http.post('pratos/', {
        nome: nomePrato
      })
        .then(() => (
          <Alert severity="success" color="info">
            Cadastro realizado com sucesso
          </Alert>
        ))
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }} >
      <Typography component="h1" variant="h6">Formulario de pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          id="standard-basic"
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required />
        <Button type="submit" sx={{ mt: 1 }} variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  )
}