import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import LastAlbum from "./albums/lastAlbum/LastAlbum";

import AlbumContext from "../context/album/albumContext";

import "../style/style.css";

const text1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies purus lectus, at luctus massa scelerisque nec. Sed ac urna magna. Nam vestibulum, tortor ac hendrerit viverra, est orci vulputate risus, vitae sodales massa.";

const Center = () => {
  const albumContext = useContext(AlbumContext);
  const { lastAlbum } = albumContext;

  return (
    <div>
      <Paper
        style={{
          borderRadius: "35px",
          padding: "25px",
          background: "#F5F5F5"
        }}
      >
        <img
          src={lastAlbum.icon}
          style={{ width: "100%", height: "auto", borderRadius: "500px" }}
          alt=''
        />

        <LastAlbum />

        <h3 className='lightRobotoFont centerFont' style={{ color: "black" }}>
          Overview
        </h3>

        <Paper
          style={{
            background: "#F6F2E7",
            borderRadius: "20px",
            padding: "25px",
            margin: "25px"
          }}
        >
          <p className='thinRobotoFont centerFont' style={{ color: "black" }}>
            {text1}
          </p>
        </Paper>
      </Paper>
    </div>
  );
};

export default Center;
