import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddMarker from './AddMarker';
import MarkerList from './MarkerList';

const useStyles = makeStyles(() => ({
    myMenu:{
        marginLeft: '50px'
    }
  }));

export default function Menu(props) {
    const classes = useStyles();

    return (
        <div className={classes.myMenu} >
          <h1> Add Marker </h1>
          <AddMarker  addMarker={props.addMarker} isExists={props.isExists}/>
          <h1> Add Marker </h1>
          <MarkerList markers={props.markers} deleteMarker={props.deleteMarker}/>
        </div>
    );
}
