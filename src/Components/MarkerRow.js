import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    myMarkerRow:{
        display: 'flex'
    }
  }));

export default function MarkerRow(props) { 

    const classes = useStyles();
    const onClick = () => {
        props.deleteMarker(props.loc)
    }

    return (
        <div className={classes.myMarkerRow}>
            {props.loc[0]}, {props.loc[1]}

            <Button variant="contained" color="secondary" onClick={onClick}>
                X
            </Button>
        </div>
    );
}
