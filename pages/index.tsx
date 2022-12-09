import { Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Item from "../components/Item";
import Websites from "../components/Websites";
import search from "../types/search";
function delay(time: any) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function verify(search: any) {
  let obj = {
    website: search,
    google: 1,
    mozilla: 2,
    microsoft: 3,
  };
  return obj;
}

const Home: NextPage = () => {
  const [data, setData] = React.useState<Array<search>>([]);
  const [search, setSearch] = React.useState<string>("");
  const [error, setError] = React.useState<Boolean>(false);

  const handleTyping = (e: any) => {
    setSearch(e.target.value);
  };

  const handleClickVerify = async () => {
    const reg =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (reg.test(search)) {
      const res = await fetch(`http://localhost:3000/api/${search}`);
      await delay(1000);

      const res2 = await fetch(`http://localhost:3000/api/cat`);
      const result2 = await res2.json();
      let tmozilla = 0;
      let tgoogle = 0;
      let tmicrosoft = 0;

      if (result2 == "") {
        tmozilla = 0;
        tgoogle = 0;
        tmicrosoft = 0;
      } else {
        tmozilla = 2;
        tgoogle = 2;
        tmicrosoft = 2;
      }
      let proces: search = {
        website: result2.result,
        mozilla: tmozilla,
        google: tgoogle,
        microsoft: tmicrosoft,
      };

      setData([...data, proces]);
    } else {
      setError(true);
    }
  };

  const handleClickClean = () => {
    setData([]);
  };

  return (
    <>
      <Head>
        <title>WebSites Verifier</title>
        <meta
          property="og:title"
          content="Determinar la confianza de un sitio web mediante la verificación de su certificado digital SSL/TLS"
          key="title"
        />
        <link rel="icon" href="./logo.png" />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          minHeight={800}
        >
          <Grid item xs={10}>
            <Box
              component={"div"}
              mb={10}
              width="100%"
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Typography variant="h3">
                Digital Certificates Trust Verifier
              </Typography>
            </Box>
          </Grid>

          <Grid
            container
            item
            xs={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={5} md={5}>
              {error && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setError(false);
                  }}
                >
                  error de formato
                </Alert>
              )}
              <TextField
                onChange={handleTyping}
                fullWidth
                id="outlined-basic"
                label="ingresar URL o verificar..."
                variant="outlined"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={1} md={3} sx={{ textAlign: "center" }}>
              <Button onClick={handleClickVerify} variant="outlined">
                VERIFICAR
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Item>CARGAR EN LOTE</Item>
            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Box width="100%" mt={7}>
              <Websites data={data} />
            </Box>
            <Box
              mt={5}
              component={"div"}
              width="100%"
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <Button onClick={handleClickClean} variant="outlined">
                Limpiar todo
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Item>
              {" "}
              <Link href="/Mozilla">Ver Mozilla Trust Store </Link>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              {" "}
              <Link href="/Microsoft"> Ver Microsoft Trust Store </Link>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Link href="/Google"> Ver Google Trust Store</Link>{" "}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
