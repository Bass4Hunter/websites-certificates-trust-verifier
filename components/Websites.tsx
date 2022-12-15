import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import TSearch from "../types/search";
import Item from "./Item";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { IconButton } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { microsoft } from "../constants/microsoft";
import { google } from "../constants/google";
import { firefox } from "../constants/firefox";
import ReportIcon from "@mui/icons-material/Report";
import ChainInformation from "./ChainInformation";
import ForwardIcon from "@mui/icons-material/Forward";

function getCertificates(chain: string) {
  const lines = chain.split("\n");

  const begin = "-----BEGIN CERTIFICATE-----";
  const end = "-----END CERTIFICATE-----";

  const certificates: string[] = [];

  let certificate = "";
  let write = false;
  lines.forEach((line) => {
    if (line == begin) write = true;
    if (write) certificate += line + "\n";
    if (line == end) {
      write = false;
      certificates.push(certificate);
      certificate = "";
    }
  });

  return certificates;
}

function getIssuer(text: string) {
  const lines = text.split("\n");
  let obj: any = {};
  lines.forEach((line) => {
    if (line.includes("Issuer:")) {
      const attrs = line.replace("Issuer:", "").split(",");
      attrs.forEach((attr) => {
        const values = attr.split("=");
        obj[values[0].trim()] = values[1].trim();
      });
      return obj;
    }
  });
  return obj;
}

function getRatingMicrosoft(text: string) {
  if (text)
    for (const e of microsoft)
      if (e["CA Common Name or Certificate Name"] == text.trim()) return 3;
  return 0;
}

function getRatingGoogle(text: string) {
  if (text)
    for (const e of google) if (e["Subject"].includes(text.trim())) return 3;
  return 0;
}

function getRatingMozilla(text: string) {
  if (text)
    for (const e of firefox)
      if (e["Common Name or Certificate Name"] == text.trim()) return 3;
  return 0;
}

type dataSearch = {
  searchs: Array<TSearch>;
};

const Websites = (props: dataSearch) => {
  const { searchs } = props;

  const [chain, setChain] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [ratings, setRatings] = React.useState<TSearch[]>([]);
  const [title, setTitle] = React.useState("");

  const moreInformation = (stdout: string) => {
    const certificates = getCertificates(stdout);
    return (
      <div style={{ display: "flex" }}>
        {certificates.map((ctc, index) => (
          <>
            <ChainInformation key={index} chain={ctc} />
            {index != certificates.length - 1 ? <ForwardIcon /> : null}
          </>
        ))}
      </div>
    );
  };

  React.useEffect(() => {
    if (searchs) {
      console.log(searchs);
      const wrapper = async () => {
        let newRatings: TSearch[] = [];
        for (const e of searchs) {
          const certificates = getCertificates(e.stdout);
          const root = certificates.pop();

          const asyncFunc = async () => {
            const res = await fetch("/api/getInfo", {
              method: "POST",
              body: JSON.stringify({ certificate: root }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            const issuer = getIssuer(data.stdout);
            return {
              ...e,
              certificates,
              microsoft: getRatingMicrosoft(issuer.CN),
              google: getRatingGoogle(issuer.CN),
              mozilla: getRatingMozilla(issuer.CN),
            };
          };
          const result = await asyncFunc();
          newRatings.push(result);
        }
        return newRatings;
      };
      wrapper().then((value) => {
        setRatings(value);
      });
    }
    if (searchs.length == 0) setRatings([]);
  }, [searchs]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300, minWidth: 1000 }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Microsoft Edge</TableCell>
            <TableCell align="center">Google Chrome</TableCell>
            <TableCell align="center">Mozilla Firefox</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Dialog
            onClose={() => {
              setIsOpen(false);
              setTitle("");
              setChain("");
            }}
            open={isOpen}
            maxWidth={false}
          >
            <DialogTitle>{title}</DialogTitle>
            <div style={{ margin: 10 }}>{moreInformation(chain)}</div>
            <div style={{ margin: 10 }}>
              <pre>{chain}</pre>
            </div>
          </Dialog>
          {ratings.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <IconButton
                  onClick={() => {
                    setIsOpen(true);
                    setTitle("Chain Certificates");
                    setChain(row.stdout);
                  }}
                >
                  <PrivacyTipIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsOpen(true);
                    setTitle("More Infomation");
                    setChain(row.stderr);
                  }}
                >
                  <ReportIcon />
                </IconButton>
                {row.website}
              </TableCell>
              <TableCell align="center">
                <Item>
                  <Rating defaultValue={row.microsoft} max={3} readOnly />
                </Item>
              </TableCell>
              <TableCell align="center">
                <Item>
                  <Rating defaultValue={row.google} max={3} readOnly />
                </Item>
              </TableCell>
              <TableCell align="center">
                <Item>
                  <Rating defaultValue={row.mozilla} max={3} readOnly />
                </Item>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Websites;
