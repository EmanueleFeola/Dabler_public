import React, { useContext } from "react";
import AllAlbumSong from "./AllAlbumSong";
import AlbumContext from "../../../context/album/albumContext";
import Spinner from "../../layout/Spinner";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import "../../../style/style.css";

const SongsList = () => {
  const albumContext = useContext(AlbumContext);
  const { currentAlbumSongs, loadingCurrentAlbum } = albumContext;

  return (
    <div>
      <h1>{albumContext.albumName}</h1>
      <List style={{ padding: "0px" }}>
        <ListItem style={{ padding: "0px" }}>
          <Grid container item xs={12} alignItems='center'>
            {loadingCurrentAlbum ? (
              <Spinner />
            ) : (
              currentAlbumSongs.map(song => (
                <AllAlbumSong song={song} key={song._id} />
              ))
            )}
          </Grid>
        </ListItem>
      </List>
    </div>
  );
};

export default SongsList;
