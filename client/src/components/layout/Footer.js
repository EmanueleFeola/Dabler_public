import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import "../../style/style.css";

const Footer = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <footer className='footer'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            <h3 className='footer-text'>
              About the developer
              <br />
              <IconButton
                target='_blank'
                href='https://github.com/EmanueleFeola/dablerWebSite'
                color='inherit'
              >
                <i className='fab fa-github' />
              </IconButton>
              <IconButton
                target='_blank'
                color='inherit'
                href='https://www.linkedin.com/in/emanuele-feola-b9405a160/'
              >
                <i className='fab fa-linkedin-in' />
              </IconButton>
            </h3>
          </div>
        </Grid>

        <Grid
          item
          xs={6}
          style={{ background: "#f5f5f5", borderRadius: "250px" }}
        >
          <div>
            <Link to='/login'>
              <h3 className='footer-textBlack'>
                {isAuthenticated ? "Edit" : "Login"}
                <br />
                <IconButton color='inherit'>
                  <i className='fas fa-user-cog' />
                </IconButton>
              </h3>
            </Link>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
