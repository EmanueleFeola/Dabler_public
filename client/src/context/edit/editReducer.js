import {
  ALBUM_ERROR,
  SONG_ERROR,
  GET_ALL_ALBUMS,
  SET_CURRENT_ALBUM_SONGS,
  SET_SONG_TO_EDIT,
  SET_ALBUM_TO_EDIT,
  CLEAR_CURRENT_SONG,
  CLEAR_CURRENT_ALBUM,
  SET_MODIFY_ALBUM
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

    case SET_SONG_TO_EDIT:
      return {
        ...state,
        currentSong: action.payload,
        modifyAlbum: false
      };

    case CLEAR_CURRENT_SONG:
      return {
        ...state,
        currentSong: null
      };

    case CLEAR_CURRENT_ALBUM:
      return {
        ...state,
        currentAlbum: null
      };

    case SET_ALBUM_TO_EDIT:
      return {
        ...state,
        currentAlbum: action.payload,
        modifyAlbum: true
      };

    case SET_MODIFY_ALBUM:
      return {
        ...state,
        modifyAlbum: action.payload
      };

    case ALBUM_ERROR:
    case SONG_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
