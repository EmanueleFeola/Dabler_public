import React from "react";

import LastAlbumWrapper from "../LastAlbumWrapper";
import AllAbumsWrapper from "../AllAbumsWrapper";

import "../../style/style.css";

import SwipeableViews from "react-swipeable-views";
import { useTheme, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#800000"
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <Paper
      style={{
        borderRadius: "35px",
        padding: "25px"
      }}
    >
      <AppBar
        position='static'
        color='default'
        style={{
          borderRadius: "35px"
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
          aria-label='tabs example'
          style={{
            borderRadius: "35px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "10px",
            paddingBottom: "10px"
          }}
        >
          <Tab label='All Albums' {...a11yProps(0)} />
          <Tab label='Last Album' {...a11yProps(1)} />
        </StyledTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AllAbumsWrapper />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LastAlbumWrapper />
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
}
