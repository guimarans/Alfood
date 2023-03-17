import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from '@mui/material';
import { Outlet } from 'react-router';
import { Link as RouterLink } from 'react-router-dom'

export default function PaginaBaseAdmin() {

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6"> Administracao </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}> Restaurantes </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}> Novo restaurantes </Button>
              </Link>
            </Box>
          </Toolbar>

        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  )
}