import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import AddMarker from "./AddMarker";
import MarkerList from "./MarkerList";
import { CreateMap, GetMap } from "./../Services/salesforceService";

const useStyles = makeStyles(() => ({
  myMenu: {
    display: "flex",
    flexDirection: "column",
    marginTop: "25px",
  },
  myDiv: {
    display: "flex",
    marginBottom: "10px",
    justifyContent: "space-around",
  },
  myText: {
    flexGrow: "3",
    maxWidth: "50%",
  },
  myBtn: {
    maxWidth: "100px",
    height: "40px",
    flexGrow: "1",
    backgroundColor: "#4dadff",
    color: "white",
  },
}));

export default function Menu(props) {
  const classes = useStyles();

  const saveOrUpdate = () => {
    if (props.mapName === "") {
      alert("map name cant be empty");
    } else {
      const cords = props.markers.map((x) => x.location);
      if (cords.length === 0)
        alert("cant creat map without cords")
      else
        CreateMap(props.mapName, cords, (mapId) =>{ alert(mapId); props.setMapID(mapId)});
    }
  };

  const getMapByID = () => {
    if (props.mapID === "") {
      alert("map name cant be empty");
    } else {
      GetMap(props.mapID, (res) => (res)? props.loadMapDetails(res.map, res.cords) : alert("map id dont exists"));
    }
  };

  return (
    <div className={classes.myMenu}>
      <div className={classes.myDiv}>
        <TextField
          variant="outlined"
          className={classes.myText}
          autoFocus
          margin="dense"
          id="mapName"
          label="mapName"
          fullWidth
          value={props.mapName}
          onChange={props.onChangeMapName}
        />
        <Button
          variant="contained"
          onClick={saveOrUpdate}
          className={classes.myBtn}
        >
          save
        </Button>
      </div>
      <div className={classes.myDiv}>
        <TextField
          variant="outlined"
          className={classes.myText}
          autoFocus
          margin="dense"
          id="mapID"
          label="mapID"
          fullWidth
          value={props.mapID}
          onChange={props.onChangeMapID}
        />
        <Button
          variant="contained"
          onClick={getMapByID}
          className={classes.myBtn}
        >
          get Map
        </Button>
      </div>
      <div className={classes.myDiv}>
        <div className={classes.myMenu} style={{ width: "50%" }}>
          <h1> Add Marker </h1>
          <AddMarker addMarker={props.addMarker} mapID={props.mapID} />
        </div>
      </div>
      <div className={classes.myDiv}>
        <div
          className={classes.myMenu}
          style={{ width: "50%", textAlign: "center" }}
        >
          <h1> List Marker </h1>
          <MarkerList
            markers={props.markers}
            deleteMarker={props.deleteMarker}
            mapID={props.mapID}
          />
        </div>
      </div>
    </div>
  );
}
