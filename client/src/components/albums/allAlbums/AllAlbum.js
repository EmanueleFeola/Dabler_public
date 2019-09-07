import React, { useContext } from "react";
import AlbumItem from "./AlbumItem";
import SongsList from "./SongsList";
import AlbumContext from "../../../context/album/albumContext";
import Spinner from "../../layout/Spinner";

import Grid from "@material-ui/core/Grid";

const AllAlbum = () => {
  const albumContext = useContext(AlbumContext);
  const { allAlbums, loadingAllAlbums } = albumContext;

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div>
            {loadingAllAlbums ? (
              <Spinner />
            ) : (
              allAlbums.map(album => (
                <AlbumItem key={album._id} album={album} />
              ))
            )}
          </div>
        </Grid>
        <Grid container item xs={12}>
          <SongsList />
        </Grid>
      </Grid>
    </div>
  );
};

export default AllAlbum;
