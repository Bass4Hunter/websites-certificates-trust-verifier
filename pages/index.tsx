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
import Alert, { AlertColor } from '@mui/material/Alert';
import sslCertificate from '../functions/sslCertificate'

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'ERROR',
  UNDEFINED: 'UNDEFINED'
}

const expression = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const validUrl = new RegExp(expression);

function isValidUrl(search: string) {
  return validUrl.test(search)
}

function getWebCertificate(search: string) {
  sslCertificate('nodejs.org').then(function (certificate: any) {
    console.log(certificate)
    // certificate is a JavaScript object

    console.log(certificate.issuer)
    // { C: 'GB',
    //   ST: 'Greater Manchester',
    //   L: 'Salford',
    //   O: 'COMODO CA Limited',
    //   CN: 'COMODO RSA Domain Validation Secure Server CA' }

    console.log(certificate.valid_from)
    // 'Aug  14 00:00:00 2017 GMT'

    console.log(certificate.valid_to)
    // 'Nov 20 23:59:59 2019 GMT'

    // If there was a certificate.raw attribute, then you can access certificate.pemEncoded
    console.log(certificate.pemEncoded)
    // -----BEGIN CERTIFICATE-----
    // ...
    // -----END CERTIFICATE-----
  })

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
  const [search, setSearch] = React.useState<string>('')
  const [status, setStatus] = React.useState<AlertColor | undefined>()

  const handleTyping = (e: any) => {
    setSearch(e.target.value)
  }

  const handleClickVerify = () => {
    console.log(isValidUrl(search))
    if (!isValidUrl(search)) {
      setStatus('error')
      return
    } else {
      setStatus('success')
    }
    setData([...data, getWebCertificate(search)])
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
            {status != undefined ? <Alert severity={status}>This is an error alert — check it out!</Alert> : <></>}
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
