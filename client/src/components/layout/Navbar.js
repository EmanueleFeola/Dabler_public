import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import "../../style/style.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  icon: {
    paddingRight: "10px",
    paddingLeft: "10px"
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position='static'
      style={{
        background: "transparent",
        boxShadow: "none",
        alignItems: "center"
      }}
    >
      <Toolbar>
        {/* <img src={logo} style={{width: '50px', height: 'auto', borderRadius: '250px'}}/> */}
        <div>
          <IconButton
            className={classes.icon}
            target='_blank'
            href='https://it-it.facebook.com/pages/category/Music-Video/Dabler-Official-185989798805517/'
            color='default'
          >
            <i className='fab fa-facebook-f' />
          </IconButton>
          <IconButton
            className={classes.icon}
            target='_blank'
            href='https://www.instagram.com/_.dabler._/'
            color='default'
          >
            <i className='fab fa-instagram' />
          </IconButton>
          <IconButton
            className={classes.icon}
            target='_blank'
            href='https://www.youtube.com/channel/UC30fjqoHaqDhr3nP41WaIaA'
            color='default'
          >
            <i className='fab fa-youtube' />
          </IconButton>
          <IconButton
            className={classes.icon}
            target='_blank'
            href='mailto:test@test.it'
            color='default'
          >
            <i className='far fa-envelope' />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
