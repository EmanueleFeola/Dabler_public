import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import AlbumContext from "../../../context/album/albumContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0.5),
    color: "black",
    background: "#FFA800",
    borderRadius: "500px"
  }
}));

const AllAlbumSongItem = ({ song }) => {
  const classes = useStyles();

  const albumContext = useContext(AlbumContext);

  const setCurrentSong = song => {
    albumContext.setSong(song);
  };

  return (
    <Button
      variant='outlined'
      className={classes.button}
      onClick={() => setCurrentSong(song)}
      style={{ borderColor: "black" }}
    >
      <p className='boldRobotoFont centerFont'> {song.title} </p>
    </Button>
  );
};

export default AllAlbumSongItem;
