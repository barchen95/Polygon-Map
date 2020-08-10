import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    myText:{
        width: '50%',
        display: 'flex'
    }
}));


export default function AddMarker(props) {
    const classes = useStyles();
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    
    function isNumber(v) {
        var float = /^[-+]?[0-9]+\.[0-9]+$/;
        var int = /^-?[0-9]+$/;
        return float.test(v) || int.test(v);
    }

    const addMarker = () => {
        const loc = [Number(lat), Number(lng)];
        if (props.isExists(loc) === -1) {
            if (isNumber(loc[0]) && isNumber(loc[1])) {
                props.addMarker(loc)
                setLat("");
                setLng("");
            }
            else
                alert("The location must be a number")
        }
        else
            alert("this location already exists")
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
                    className={classes.myText}
                        autoFocus
                        margin="dense"
                        id="lng"
                        label="lng"
                        fullWidth
                        value={lng}
                        onChange={onChangeLng}
                    />
               
               <Button variant="contained"  onClick={addMarker}  color="primary">
        Add
      </Button>
        </>
    );
}
