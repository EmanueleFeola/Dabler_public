import React, { useContext, useState, useEffect } from "react";

import ConfirmDialog from "../layout/ConfirmDialog";
import Spinner from "../layout/Spinner2";

import EditContext from "../../context/edit/editContext";
import AlertContext from "../../context/alert/alertContext";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import firebaseConfig from "../../utils/firebase-config";

firebase.initializeApp(firebaseConfig);

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

const FormAlbum = () => {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const editContext = useContext(EditContext);
  const {
    currentAlbum,
    clearCurrentAlbum,
    addAlbum,
    updateAlbum,
    deleteAlbum
  } = editContext;

  const [album, setAlbum] = useState({
    title: "",
    date: "",
    icon: ""
  });
  const { title, date } = album;

  const [dialog, setDialog] = useState({
    displayDialog: false,
    loadingIcon: false
  });
  const { displayDialog, loadingIcon } = dialog;

  const onUploadStart = () => {
    setDialog({
      ...dialog,
      loadingIcon: true
    });
  };

  const onProgress = perc => {
    console.log(perc);
  };

  const onUploadSuccess = filename => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setDialog({
          ...dialog,
          loadingIcon: false
        });

        setAlert("Image Uploaded Successfully");

        setAlbum({
          ...album,
          icon: url
        });
      });
  };

  useEffect(() => {
    if (currentAlbum !== null) {
      setAlbum({
        title: currentAlbum.title,
        date: currentAlbum.date.substring(0, 10),
        icon: currentAlbum.icon,
        _id: currentAlbum._id
      });
    } else {
      setAlbum({
        title: "",
        date: "",
        icon: "",
        _id: ""
      });
    }
  }, [currentAlbum]);

  const onChange = e => {
    setAlbum({
      ...album,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (currentAlbum === null) {
      addAlbum(album);
    } else {
      updateAlbum(album);
    }

    clearCurrentAlbum();
  };

  const onDelete = () => {
    setDialog({
      ...dialog,
      displayDialog: true
    });
  };

  const dialogReponse = bool => {
    setDialog({
      ...dialog,
      displayDialog: false
    });

    if (bool) {
      deleteAlbum(currentAlbum._id);
      clearCurrentAlbum();
    }
  };

  return (
    <div>
      {displayDialog ? (
        <ConfirmDialog onClick={dialogReponse} />
      ) : loadingIcon ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <h1 className='title centerFont'>
            {currentAlbum ? "Edit Album" : "Add Album"}
          </h1>

          <input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={onChange}
          />
          <input
            type='date'
            name='date'
            placeholder='Date'
            value={date}
            onChange={onChange}
          />

          <FileUploader
            accept='image/*'
            name='image'
            storageRef={firebase.storage().ref("images")}
            onUploadSuccess={onUploadSuccess}
            onUploadStart={onUploadStart}
            onProgress={onProgress}
          />
          {/* <FileUpload onIconUpload={onIconUpload} /> */}

          <div style={{ textAlign: "center", margin: "50px" }}>
            <Fab
              type='submit'
              variant='extended'
              aria-label='delete'
              className={classes.fab}
            >
              {currentAlbum ? "Update " : "Add "}
              <SaveIcon className={classes.icon} />
            </Fab>

            {currentAlbum && (
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

export default FormAlbum;
