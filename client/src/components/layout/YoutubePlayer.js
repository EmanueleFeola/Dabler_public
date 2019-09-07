import React, { useContext } from "react";
import YouTube from "react-youtube";
import AlbumContext from "../../context/album/albumContext";
import "../../style/style.css";

const opts = {
  // height: "390",
  // width: "640",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const _onReady = event => {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
};

const YouTubePlayer = () => {
  const albumContext = useContext(AlbumContext);
  const { youtubeSong } = albumContext;

  return (
    <YouTube
      videoId={youtubeSong.youtubeId}
      opts={opts}
      onReady={_onReady}
      className='ytPlayer'
    />
  );
};

export default YouTubePlayer;
