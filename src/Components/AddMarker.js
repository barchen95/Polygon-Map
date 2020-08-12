import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { isLoctionsAlreadyExists } from "./../Services/utils";

const useStyles = makeStyles(() => ({
  myText: {
    display: "flex",
  },
  myBtn: {
    backgroundColor: "#4dadff",
    color: "white",
  },
}));

export default function AddMarker(props) {
  const classes = useStyles();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const addMarker = () => {
    const loc = [Number(lat), Number(lng)];
    props.addMarker(loc, (isSucceed) => {
      if (isSucceed) {
        setLat("");
        setLng("");
      }
    });
  };

  const onChangeLat = (e) => {
    setLat(e.target.value);
  };
  const onChangeLng = (e) => {
    setLng(e.target.value);
  };

  return (
    <>
      <TextField
        variant="outlined"
        className={classes.myText}
        autoFocus
        margin="dense"
        id="lat"
        label="lat"
        fullWidth
        value={lat}
        onChange={onChangeLat}
      />
      <TextField
        variant="outlined"
        className={classes.myText}
        autoFocus
        margin="dense"
        id="lng"
        label="lng"
        fullWidth
        value={lng}
        onChange={onChangeLng}
      />

      <Button variant="contained" onClick={addMarker} className={classes.myBtn}>
        Add
      </Button>
    </>
  );
}
