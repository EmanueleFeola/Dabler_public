import React, { useContext } from "react";
import AlbumContext from "../../../context/album/albumContext";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const AlbumItem = ({ album }) => {
  const albumContext = useContext(AlbumContext);
  const { setCurrentAlbum } = albumContext;

  const handleClick = () => {
    setCurrentAlbum(album);
  };

  return (
    <Paper style={{ margin: "10px", padding: "5px" }}>
      <List>
        <ListItem
          onClick={handleClick}
          style={{ cursor: "pointer", padding: "0px" }}
        >
          <Grid
            alignItems='center'
            direction='column'
            container
            centered
            spacing={0}
          >
            <Grid item xs={12} md={3}>
              <ListItemAvatar>
                <Avatar src={album.icon} />
              </ListItemAvatar>
            </Grid>
            <Grid item xs={12} md={9}>
              <ListItemText
                className='thinRobotoFont centerFont'
                primary={album.title}
                style={{ padding: "10px" }}
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  );
};

export default AlbumItem;
