import React from "react";
import Paper from "@material-ui/core/Paper";
import AllAlbum from "./albums/allAlbums/AllAlbum";
import YoutubePlayer from "./layout/YoutubePlayer";

import "../style/style.css";

const RoundedContainer = () => {
  return (
    <div>
      <Paper
        style={{
          borderRadius: "35px",
          padding: "25px",
          background: "#F5F5F5"
        }}
      >
        <p
          className='lightRobotoFont centerFont'
          style={{ color: "#800000", fontStyle: "italic" }}
        >
          ~ Click on the album to listen to its songs ~
        </p>

        <AllAlbum />

        <YoutubePlayer />
      </Paper>
    </div>
  );
};

export default RoundedContainer;
