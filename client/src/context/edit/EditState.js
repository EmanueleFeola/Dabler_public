import React, { useReducer } from "react";
import axios from "axios";
import EditContext from "./editContext";
import EditReducer from "./editReducer";
import {
  GET_ALL_ALBUMS,
  ALBUM_ERROR,
  SET_CURRENT_ALBUM_SONGS,
  SET_SONG_TO_EDIT,
  SET_ALBUM_TO_EDIT,
  CLEAR_CURRENT_SONG,
  CLEAR_CURRENT_ALBUM,
  SET_MODIFY_ALBUM,
  CLEAR_ERRORS
} from "../types";

const EditState = props => {
  const initialState = {
    allAlbums: [],
    currentAlbum: null,
    currentAlbumSongs: [],
    currentSong: null, // canzone da modificare nel form
    modifyAlbum: false, // nel form di modifica, serve per impostare i campi del form (Album e Song hanno campi diversi)
    error: null
  };

  const [state, dispatch] = useReducer(EditReducer, initialState);

  // Get all albums
  const getAllAlbums = async () => {
    try {
      const res = await axios.get("/api/albums/");

      dispatch({
        type: GET_ALL_ALBUMS,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Erorr retrieving albums" });
    }
  };

  // Set current album songs
  const setCurrentAlbumSongs = async album => {
    try {
      const res = await axios.get("/api/songs", {
        params: {
          album: album
        }
      });

      dispatch({ type: SET_CURRENT_ALBUM_SONGS, payload: res.data });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Erorr retrieving songs" });
    }
  };

  // Set Album
  const setAlbumToEdit = object => {
    dispatch({
      type: SET_ALBUM_TO_EDIT,
      payload: object
    });

    setCurrentAlbumSongs(object._id);
  };

  // Set song to edit
  const setSongToEdit = object =>
    dispatch({ type: SET_SONG_TO_EDIT, payload: object });

  // Clear song to edit
  const clearCurrentSong = () => dispatch({ type: CLEAR_CURRENT_SONG });

  // Clear album to edit
  const clearCurrentAlbum = () => dispatch({ type: CLEAR_CURRENT_ALBUM });

  // Add Song to DB
  const addSong = async song => {
    console.log("addSong");

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.post("/api/songs", song, config);

      dispatch({ type: ALBUM_ERROR, payload: "Added Song" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Update Song on DB
  const updateSong = async song => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.put(`/api/songs/${song._id}`, song, config);

      dispatch({ type: ALBUM_ERROR, payload: "Uploaded Song" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Delete Song on DB
  const deleteSong = async id => {
    try {
      await axios.delete(`/api/songs/${id}`);
      dispatch({ type: ALBUM_ERROR, payload: "Deleted song" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Add Album to DB
  const addAlbum = async album => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.post("/api/albums", album, config);
      dispatch({ type: ALBUM_ERROR, payload: "Added Album" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Update Album on DB
  const updateAlbum = async album => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.put(`/api/albums/${album._id}`, album, config);

      dispatch({ type: ALBUM_ERROR, payload: "Updated Album" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Delete Album
  const deleteAlbum = async id => {
    try {
      await axios.delete(`/api/albums/${id}`);
      dispatch({ type: ALBUM_ERROR, payload: "Deleted Album" });
    } catch (error) {
      dispatch({ type: ALBUM_ERROR, payload: "Errore di sistema" });
    }
  };

  // Set modifyAlbum
  const setModifyAlbum = bool =>
    dispatch({ type: SET_MODIFY_ALBUM, payload: bool });

  // Clear Errors
  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERRORS
    });

  return (
    <EditContext.Provider
      value={{
        allAlbums: state.allAlbums,
        currentAlbum: state.currentAlbum,
        currentAlbumSongs: state.currentAlbumSongs,
        currentSong: state.currentSong,
        modifyAlbum: state.modifyAlbum,
        error: state.error,
        getAllAlbums,
        setCurrentAlbumSongs,
        setSongToEdit,
        setAlbumToEdit,
        addSong,
        addAlbum,
        updateSong,
        updateAlbum,
        deleteSong,
        deleteAlbum,
        clearCurrentSong,
        clearCurrentAlbum,
        setModifyAlbum,
        clearErrors
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
};

export default EditState;
