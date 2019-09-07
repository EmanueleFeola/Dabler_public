import React, { useContext } from "react";
import EditContext from "../../context/edit/editContext";

import Paper from "@material-ui/core/Paper";
import "../../style/style.css";

const DashboardSongItem = ({ song }) => {
  const editContext = useContext(EditContext);
  const { setSongToEdit } = editContext;

  const onClickSong = () => {
    setSongToEdit(song);
  };

  return (
    <Paper
      style={{ margin: "10px", padding: "5px", minWidth: "100px" }}
      onClick={onClickSong}
    >
      <h3 className='dark-title centerFont'>{song.title}</h3>
    </Paper>
  );
};

export default DashboardSongItem;
