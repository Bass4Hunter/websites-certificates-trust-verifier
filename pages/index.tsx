import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import type { NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';
import Item from '../components/Item';
import Websites from '../components/Websites';
import search from '../types/search';

function verify(search: any) {
  let obj = {
    website: search,
    google: 1,
    mozilla: 2,
    microsoft: 3,
  }
  return obj
}

const Home: NextPage = () => {
  const [data, setData] = React.useState<Array<search>>([])
  const [search, setSearch] = React.useState<string | null>()

  const handleTyping = (e: any) => {
    setSearch(e.target.value)
  }

  const handleClickVerify = () => {
    setData([...data, verify(search)])
  }

  const handleClickClean = () => {
    setData([])
  }

  return <>
    <Head>
      <title>WebSites Verifier</title>
      <meta property="og:title" content="Determinar la confianza de un sitio web mediante la verificación de su certificado digital SSL/TLS" key="title" />
      <link rel="icon" href="./logo.png" />
    </Head >

    <Box sx={{ flexGrow: 1 }}>

      <Grid container
        direction='column'
        justifyContent="center"
        alignItems="center"
        minHeight={800}
      >
        <Grid item xs={10}>
          <Box component={'div'} mb={10} width='100%' sx={{ justifyContent: 'center', display: 'flex' }}>
            <Typography variant='h3'>Digital Certificates Trust Verifier</Typography>
          </Box>
        </Grid>

        <Grid container item xs={2} 
          direction="row"
          justifyContent="center"
          alignItems="center"
        >

          <Grid item xs={5} md={5}>
            <TextField onChange={handleTyping} fullWidth id="outlined-basic" label="ingresar URL o verificar..." variant="outlined" />
          </Grid>

          <Grid item xs={1} md={3} sx={{ textAlign: 'center' }}>
            <Button onClick={handleClickVerify} variant='outlined'>VERIFICAR</Button>
          </Grid>
          <Grid item xs={2}>
            <Item>CARGAR EN LOTE</Item>
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <Box width='100%' mt={7}>
            <Websites data={data} />
          </Box>
          <Box mt={5} component={'div'} width='100%' sx={{ justifyContent: 'center', display: 'flex' }}>
            <Button onClick={handleClickClean} variant='outlined'>Limpiar todo</Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Item>Ver Mozilla Trust Store</Item>
        </Grid >
        <Grid item xs={2}>
          <Item>Ver Microsoft Trust Store</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Ver Google Trust Store</Item>
        </Grid>
      </Grid>
    </Box>
  </>
}

export default Home
