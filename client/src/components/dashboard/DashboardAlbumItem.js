import React, { useContext } from "react";
import EditContext from "../../context/edit/editContext";

import Paper from "@material-ui/core/Paper";
import "../../style/style.css";

const DashboardAlbumItem = ({ album }) => {
  const editContext = useContext(EditContext);
  const { setAlbumToEdit } = editContext;

  const onClickAlbum = () => {
    setAlbumToEdit(album);
  };

  return (
    <Paper
      style={{ margin: "10px", padding: "5px", minWidth: "200px" }}
      onClick={onClickAlbum}
    >
      <h3 className='dark-title centerFont'>{album.title}</h3>
    </Paper>
  );
};

export default DashboardAlbumItem;
