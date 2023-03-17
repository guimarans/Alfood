import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import http from '../../../http';
import IPrato from 'interfaces/IPrato';
import { useEffect, useState } from 'react';
import ITag from 'interfaces/ITag';
import IRestaurante from 'interfaces/IRestaurante';

export default function FormularioPrato() {

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState('');

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');

  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
      .catch(erro => console.error(erro))

    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
      .catch(erro => console.error(erro))
  }, []);

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    };
  }

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }} >
      <Typography component="h1" variant="h6">Formulario de pratos</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          id="prato"
          label="Nome do prato"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <TextField
          value={descricao}
          onChange={evento => setDescricao(evento.target.value)}
          id="descricao"
          label="Descrição do prato"
          variant="standard"
          fullWidth
          margin="dense"
          required
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag"> Tags </InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={evento => setTag(evento.target.value)}
            required
          >
            {tags.map(tag => (
              <MenuItem key={tag.id} value={tag.id}> {tag.value} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante"> Restaurante </InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={evento => setRestaurante(evento.target.value)}
            required
          >
            {restaurantes.map(restaurante => (
              <MenuItem key={restaurante.id} value={restaurante.id}> {restaurante.nome} </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ mt: 1 }}
          variant="outlined"
          component="label"
        >
          {imagem != null ? imagem.name : 'Procurar arquivo'}
          <input type="file" onChange={selecionarArquivo} hidden />
        </Button>

        <Button type="submit" sx={{ mt: 1 }} variant="outlined" fullWidth>Salvar</Button>
      </Box>
    </Box>
  )
}