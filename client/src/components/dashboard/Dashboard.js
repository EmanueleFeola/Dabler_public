import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardAlbumItem from "./DashboardAlbumItem";
import DashboardSongItem from "./DashboardSongItem";
import FormAlbum from "./FormAlbum";
import FormSong from "./FormSong";

import EditContext from "../../context/edit/editContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import Fab from "@material-ui/core/Fab";
import ExitIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "../../style/style.css";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: "rgb(128,128,0)"
  }
}));

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { logout, loadUser } = authContext;

  useEffect(() => {
    loadUser();

    /*
    Ogni volta che ricarico la pagina il context viene azzerato.
    Il token torna uguale a localStorage.getItem("token"), mentre il resto dei campi ritornano null.
    Quindi loadUser ripopola i campi correttamente mandando una richiesta che ha nell header il token 
    */

    getAllAlbums();

    if (error) {
      setAlert(error);
    }

    clearErrors();

    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const editContext = useContext(EditContext);
  const {
    getAllAlbums,
    allAlbums,
    currentAlbumSongs,
    modifyAlbum,
    clearCurrentSong,
    clearCurrentAlbum,
    currentAlbum,
    setModifyAlbum,
    error,
    clearErrors
  } = editContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const addNewSong = () => {
    clearCurrentSong();
    setModifyAlbum(false);
  };

  const addNewAlbum = () => {
    clearCurrentAlbum();
    setModifyAlbum(true);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <div className='dashboard'>
      <div style={{ textAlign: "center" }}>
        <Link to='/'>
          <Fab variant='extended' aria-label='delete' className={classes.fab}>
            Home
            <HomeIcon className={classes.extendedIcon} />
          </Fab>
        </Link>

        <Fab
          variant='extended'
          aria-label='delete'
          className={classes.fab}
          onClick={onLogout}
        >
          Logout
          <ExitIcon className={classes.extendedIcon} />
        </Fab>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div style={{ textAlign: "center" }}>
            <h1 className='title centerFont'>Albums</h1>
            <Fab
              variant='extended'
              aria-label='delete'
              className={classes.fab}
              onClick={addNewAlbum}
            >
              Add new album
              <AddIcon className={classes.icon} />
            </Fab>
          </div>
          <Grid container justify='center' spacing={1}>
            {allAlbums.map(album => (
              <DashboardAlbumItem album={album} key={album._id} />
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {modifyAlbum ? <FormAlbum /> : <FormSong />}
        </Grid>

        <Grid item xs={12} md={3}>
          <div style={{ textAlign: "center" }}>
            <h1 className='title centerFont'>Songs</h1>
            {currentAlbum && (
              <Fab
                variant='extended'
                aria-label='delete'
                className={classes.fab}
                onClick={addNewSong}
              >
                <p style={{ textAlign: "center" }}>Add new song</p>

                <AddIcon className={classes.icon} />
              </Fab>
            )}
          </div>
          <Grid container justify='center' spacing={1}>
            {currentAlbumSongs.length === 0 ? (
              <h2 className='title centerFont'> Select an album </h2>
            ) : (
              currentAlbumSongs.map(song => (
                <DashboardSongItem song={song} key={song._id} />
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
