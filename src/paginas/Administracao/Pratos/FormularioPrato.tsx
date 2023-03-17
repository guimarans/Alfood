import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import http from '../../../http';
import { useEffect, useState } from 'react';
import ITag from 'interfaces/ITag';
import IRestaurante from 'interfaces/IRestaurante';
import { useNavigate, useParams } from 'react-router-dom';
import IPrato from 'interfaces/IPrato';
import { Method } from 'axios';

export default function FormularioPrato() {
  const params = useParams();
  const navigate = useNavigate();

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

    if(params.id) {
      http.get<IPrato>(`/pratos/${params.id}/`)
        .then(resposta => {
          setNomePrato(resposta.data.nome)
          setDescricao(resposta.data.descricao)
          setTag(resposta.data.tag)
          restaurantes.find( restaurante => {
            if(Number(restaurante.id) === resposta.data.restaurante) {
              setRestaurante(restaurante.nome)
            }
          });

          console.log('API: ' + resposta.data.restaurante)
        })
    }
    
  }, [params]);

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    };
  }

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    
    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    let url = '/pratos/';
    let method: Method = 'POST';
    
    if(params.id) {
      method = 'PUT'
      url += `${params.id}/`
    }

    http.request({
      url,
      method,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        alert('Cadastrado com sucesso!');
        navigate('/admin/pratos/');
      })
      .catch(erro => console.error(erro))
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
              <MenuItem key={tag.id} value={tag.value}> {tag.value} </MenuItem>
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