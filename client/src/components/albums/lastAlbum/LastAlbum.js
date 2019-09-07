import React, { useContext, useEffect } from "react";
import LastAlbumSong from "./LastAlbumSong";
import Spinner from "../../layout/Spinner";
import AlbumContext from "../../../context/album/albumContext";

import Grid from "@material-ui/core/Grid";
import "../../../style/style.css";

const LastAlbum = () => {
  const albumContext = useContext(AlbumContext);
  const {
    lastAlbum,
    lastAlbumSongs,
    getLastAlbum,
    getAllAlbums,
    loadingLastAlbum
  } = albumContext;

  useEffect(() => {
    getLastAlbum();
    getAllAlbums();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className='lightRobotoFont centerFont'>{lastAlbum.title}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            {loadingLastAlbum ? (
              <Spinner />
            ) : (
              lastAlbumSongs.map(song => (
                <LastAlbumSong key={song._id} song={song} />
              ))
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LastAlbum;
