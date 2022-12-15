import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type Props = {
  chain: string;
};

export default function ChainInformation(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getInfo = async () => {
    const res = await fetch("/api/getInfo", {
      method: "POST",
      body: JSON.stringify({ certificate: props.chain }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setInfo(data.stdout);
  };

  React.useEffect(() => {
    if (props.chain) getInfo();
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <SecurityIcon />
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={false}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Information Certificate
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{ display: "flex" }}>
            <pre style={{ margin: 10 }}>{props.chain}</pre>
            <hr />
            <pre style={{ margin: 10 }}>{info}</pre>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
