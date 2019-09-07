import {
  SET_ALBUM,
  SET_SONG,
  ALBUM_ERROR,
  GET_LAST_ALBUM,
  SET_LAST_ALBUM_SONGS,
  SONG_ERROR,
  GET_ALL_ALBUMS,
  SET_CURRENT_ALBUM_SONGS,
  SET_LOADING_CURRENT_ALBUM,
  REMOVE_LOADING_CURRENT_ALBUM,
  CLEAR_ALL,
  SET_SONG_TO_EDIT,
  SET_ALBUM_TO_EDIT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.payload,
        loadingAllAlbums: false
      };

    case SET_CURRENT_ALBUM_SONGS:
      return {
        ...state,
        currentAlbumSongs: action.payload,
        loadingCurrentAlbum: false
      };

    case GET_LAST_ALBUM:
      return {
        ...state,
        lastAlbum: action.payload
      };

    case SET_LAST_ALBUM_SONGS:
      return {
        ...state,
        lastAlbumSongs: action.payload,
        loadingLastAlbum: false
      };

    case ALBUM_ERROR:
    case SONG_ERROR:
      return state;

    case SET_ALBUM:
      return {
        ...state,
        currentAlbum: action.payload
      };

    case SET_SONG:
      return {
        ...state,
        youtubeSong: action.payload
      };

    case SET_LOADING_CURRENT_ALBUM:
      return {
        ...state,
        loadingCurrentAlbum: true
      };

    case REMOVE_LOADING_CURRENT_ALBUM:
      return {
        ...state,
        loadingCurrentAlbum: false
      };

    case CLEAR_ALL:
      return {
        ...state,
        currentAlbum: null,
        currentAlbumSongs: [],
        currentSong: null,
        loadingCurrentAlbum: false
      };

    case SET_SONG_TO_EDIT:
      return {
        ...state,
        currentSong: action.payload,
        modifyAlbum: false
      };

    case SET_ALBUM_TO_EDIT:
      return {
        ...state,
        currentAlbum: action.payload,
        modifyAlbum: true
      };

    // case CLEAR_CURRENT:
    //   return {
    //     ...state,
    //     currentSong: null
    //   };

    default:
      return state;
  }
};
