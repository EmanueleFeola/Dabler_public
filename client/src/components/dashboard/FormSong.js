import React, { useState, useEffect, useContext } from "react";
import EditContext from "../../context/edit/editContext";
import ConfirmDialog from "../layout/ConfirmDialog";
import SelectAlbum from "./SelectAlbum";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../style/style.css";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    color: "rgb(128,128,0)"
  },
  iconDelete: {
    marginRight: theme.spacing(1),
    color: "rgb(139,0,0)"
  }
}));

const FormSong = () => {
  const classes = useStyles();

  const editContext = useContext(EditContext);
  const {
    allAlbums,
    currentSong,
    addSong,
    updateSong,
    deleteSong,
    clearCurrentSong
  } = editContext;

  useEffect(() => {
    if (currentSong !== null) {
      setSong({
        title: currentSong.title,
        album: currentSong.album,
        duration: currentSong.duration,
        feat: currentSong.feat,
        youtubeId: currentSong.youtubeId,
        _id: currentSong._id
      });
    } else {
      setSong({
        title: "",
        album: "",
        duration: "",
        feat: "",
        youtubeId: ""
      });
    }
  }, [currentSong]);

  const [alert, setAlert] = useState({
    displayAlert: false
  });
  const { displayAlert } = alert;

  const [song, setSong] = useState({
    title: "",
    album: "",
    duration: "",
    feat: "",
    youtubeId: ""
  });

  const { title, duration, feat, youtubeId } = song;

  const onChange = e => {
    setSong({
      ...song,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(song);

    if (currentSong === null) {
      addSong(song);
    } else {
      updateSong(song);
    }

    clearCurrentSong();
  };

  const onDelete = () => {
    setAlert({
      displayAlert: true
    });
  };

  const dialogReponse = bool => {
    setAlert({
      displayAlert: false
    });

    if (bool) {
      deleteSong(currentSong._id);
      clearCurrentSong();
    }
  };

  const fromNameToId = id => {
    setSong({
      ...song,
      album: id
    });
  };

  return (
    <div>
      {displayAlert ? (
        <ConfirmDialog onClick={dialogReponse} />
      ) : (
        <form onSubmit={onSubmit}>
          <h1 className='title centerFont'>
            {currentSong ? "Edit Song" : "Add Song"}
          </h1>

          <input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={onChange}
          />

          {allAlbums && allAlbums.length > 0 && (
            <SelectAlbum albums={allAlbums} callback={fromNameToId} />
          )}

          <input
            type='text'
            name='duration'
            placeholder='Duration'
            value={duration}
            onChange={onChange}
          />
          <input
            type='text'
            name='feat'
            placeholder='Feat'
            value={feat}
            onChange={onChange}
          />
          <input
            type='text'
            name='youtubeId'
            placeholder='YoutubeId'
            value={youtubeId}
            onChange={onChange}
          />

          <div style={{ textAlign: "center" }}>
            <Fab
              type='submit'
              variant='extended'
              aria-label='delete'
              className={classes.fab}
            >
              {currentSong ? "Update" : "Add"}
              <SaveIcon className={classes.icon} />
            </Fab>

            {currentSong && (
              <Fab
                variant='extended'
                aria-label='delete'
                className={classes.fab}
                onClick={onDelete}
              >
                Delete
                <DeleteIcon className={classes.iconDelete} />
              </Fab>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default FormSong;
