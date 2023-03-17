import IPrato from "interfaces/IPrato";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from "react-router-dom";
import http from "../../../http";

export default function AdministracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => console.log(setPratos(resposta.data)))
      .catch(erro => console.error(erro))
  }, [])

  function excluir(pratoAhSerExcluido: IPrato) {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPratos]);
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Nome </TableCell>
            <TableCell> Tag </TableCell>
            <TableCell> Imagem </TableCell>
            <TableCell> Editar </TableCell>
            <TableCell> Excluir </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato =>
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                [ <a href="{prato.imagem}" target="_blank"> Ver imagem </a> ]
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}> Editar </Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}