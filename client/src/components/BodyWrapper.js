import React from "react";
import Intro from "./Intro";
import Tab from "./layout/Tab";

import Grid from "@material-ui/core/Grid";
import "../style/style.css";

const BodyContainer = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Intro />
        </Grid>
        <Grid item xs={12} md={6}>
          <Tab />
        </Grid>
      </Grid>
    </div>
  );
};

export default BodyContainer;
