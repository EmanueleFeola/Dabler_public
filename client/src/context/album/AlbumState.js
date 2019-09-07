import React, { useReducer } from "react";
import axios from "axios";
import AlbumContext from "./albumContext";
import AlbumReducer from "./albumReducer";
import {
  SET_ALBUM,
  SET_SONG,
  GET_LAST_ALBUM,
  ALBUM_ERROR,
  SET_LAST_ALBUM_SONGS,
  SONG_ERROR,
  GET_ALL_ALBUMS,
  SET_CURRENT_ALBUM_SONGS,
  SET_LOADING_CURRENT_ALBUM,
  REMOVE_LOADING_CURRENT_ALBUM,
  CLEAR_ALL,
  SET_SONG_TO_EDIT,
  SET_ALBUM_TO_EDIT
  // CLEAR_CURRENT
} from "../types";

const AlbumState = props => {
  const initialState = {
    lastAlbum: {},
    lastAlbumSongs: [],
    loadingLastAlbum: true,

    allAlbums: [],
    loadingAllAlbums: true,
    currentAlbum: {},
    currentAlbumSongs: [],
    loadingCurrentAlbum: false,

    youtubeSong: {},

    modifyAlbum: false, // nel form di modifica, serve per impostare i campi del form (Album e Song hanno campi diversi)
    currentSong: {} // canzone da modificare nel form
  };

  const [state, dispatch] = useReducer(AlbumReducer, initialState);

  // Set last album id
  const getLastAlbum = async () => {
    try {
      const res = await axios.get("/api/albums/last");

      dispatch({
        type: GET_LAST_ALBUM,
        payload: res.data
      });

      setLastAlbumSongs(res.data._id);
    } catch (error) {
      dispatch({
        type: ALBUM_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Get all albums
  const getAllAlbums = async () => {
    try {
      const res = await axios.get("/api/albums/");

      dispatch({
        type: GET_ALL_ALBUMS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: ALBUM_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Set last album songs
  const setLastAlbumSongs = async album => {
    try {
      const res = await axios.get("/api/songs", {
        params: {
          album: album
        }
      });

      dispatch({ type: SET_LAST_ALBUM_SONGS, payload: res.data });
    } catch (error) {
      dispatch({ type: SONG_ERROR, payload: error.response.msg });
    }
  };

  // setLoadingCurrentAlbum
  const setLoadingCurrentAlbum = () => {
    dispatch({ type: SET_LOADING_CURRENT_ALBUM });
  };

  // removeLoadingCurrentAlbum
  const removeLoadingCurrentAlbum = () => {
    dispatch({ type: REMOVE_LOADING_CURRENT_ALBUM });
  };

  // Set current album songs
  const setCurrentAlbumSongs = async album => {
    setLoadingCurrentAlbum();

    try {
      const res = await axios.get("/api/songs", {
        params: {
          album: album
        }
      });

      dispatch({ type: SET_CURRENT_ALBUM_SONGS, payload: res.data });
    } catch (error) {
      dispatch({ type: SONG_ERROR, payload: error.response.msg });
    }

    removeLoadingCurrentAlbum();
  };

  // Set Album
  const setCurrentAlbum = object => {
    dispatch({
      type: SET_ALBUM,
      payload: object
    });

    setCurrentAlbumSongs(object._id);
  };

  // Set Song
  const setSong = object => dispatch({ type: SET_SONG, payload: object });

  // Set song to edit
  const setSongToEdit = object =>
    dispatch({ type: SET_SONG_TO_EDIT, payload: object });

  // Set album to edit
  const setAlbumToEdit = object =>
    dispatch({ type: SET_ALBUM_TO_EDIT, payload: object });

  // Clear all
  const clearAll = () => dispatch({ type: CLEAR_ALL });

  const addSong = async song => {
    console.log("addSong");

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.post("/api/songs", song, config);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSong = async song => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios.put(`/api/songs/${song._id}`, song, config);
    } catch (error) {
      console.log(error);
    }
  };

  // const clearCurrentSong = () => dispatch({ type: CLEAR_CURRENT });

  return (
    <AlbumContext.Provider
      value={{
        lastAlbum: state.lastAlbum,
        lastAlbumSongs: state.lastAlbumSongs,
        allAlbums: state.allAlbums,
        currentAlbum: state.currentAlbum,
        currentAlbumSongs: state.currentAlbumSongs,
        youtubeSong: state.youtubeSong,
        loadingLastAlbum: state.loadingLastAlbum,
        loadingAllAlbums: state.loadingAllAlbums,
        loadingCurrentAlbum: state.loadingCurrentAlbum,
        modifyAlbum: state.modifyAlbum,
        currentSong: state.currentSong,

        setCurrentAlbum,
        setSong,
        getLastAlbum,
        setLastAlbumSongs,
        getAllAlbums,
        setCurrentAlbumSongs,
        clearAll,
        setSongToEdit,
        setAlbumToEdit,
        addSong,
        updateSong
        // clearCurrentSong
      }}
    >
      {props.children}
    </AlbumContext.Provider>
  );
};

export default AlbumState;
