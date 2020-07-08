import React, { useState } from "react";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';


export default function AddMarker(props) {
    const [open, setOpen] = useState(false);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addMarker = () => {
        const loc = [Number(lat), Number(lng)];
        if (!props.isExists(loc)) {
            props.addMarker(loc)
            handleClose();
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
            <Fab style={{ position: 'absolute', right: 0 }}>
                <Add onClick={handleClickOpen} />
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add marker</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lat"
                        label="lat"
                        fullWidth
                        value={lat}
                        onChange={onChangeLat}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lng"
                        label="lng"
                        fullWidth
                        value={lng}
                        onChange={onChangeLng}
                    />
                </DialogContent>
                <DialogActions>
                    <Add onClick={addMarker} />
                    <Close onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </>
    );
}
