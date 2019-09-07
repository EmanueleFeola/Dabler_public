import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: "93%",
    color: "black",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
    fontSize: "20px",
    // margin: "8px",
    fontFamily: "lightRoboto"
  },
  label: {
    margin: theme.spacing(1),
    color: "black",
    paddingLeft: "10px",
    fontSize: "18px",
    fontFamily: "lightRoboto"
    // color: "grey"
  }
}));

const SelectAlbum = ({ albums, callback }) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
    callback(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor='name-error' className={classes.label}>
        Album
      </InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={age}
        onChange={handleChange}
      >
        <MenuItem disabled value=''>
          <em>Albums</em>
        </MenuItem>
        {albums.map(album => (
          <MenuItem key={album._id} value={album._id}>
            {album.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectAlbum;
