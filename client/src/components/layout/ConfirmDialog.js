import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = props => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleCloseDisagree() {
    props.onClick(false);
    setOpen(false);
  }

  function handleCloseAgree() {
    props.onClick(true);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    handleClickOpen();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Conferma"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Sei sicuro di voler eliminare il brano / album?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree} color='primary'>
            NO
          </Button>
          <Button onClick={handleCloseAgree} color='primary' autoFocus>
            SI
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
