import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { UpdateMap } from './../Services/salesforceService'

const useStyles = makeStyles(() => ({
  myMarkerRow: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
  },
  myBtn: {
    backgroundColor: "#f50057",
    color: "white",
    width: "20px",
    height: "20px",
    minWidth: "10px",
  },
}));

export default function MarkerRow(props) {
  const classes = useStyles();
  const onClick = () => {
    props.deleteMarker(props.loc);
    if (props.mapID == null) {
      alert("you must have map id");
    } else {
        UpdateMap(props.mapID, null,null, [props.loc])
    }
  };

  return (
    <div className={classes.myMarkerRow}>
      {props.loc[0]}, {props.loc[1]}
      <Button variant="contained" className={classes.myBtn} onClick={onClick}>
        X
      </Button>
    </div>
  );
}
