import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const SimpleSnackbar = ({ text }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, []);

  function handleClick() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id='message-id'>{text}</span>}
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default SimpleSnackbar;
