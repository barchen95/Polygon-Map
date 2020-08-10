import React, { useState } from "react";
import { ReactBingmaps } from 'react-bingmaps';
import Grid from '@material-ui/core/Grid';

import Menu from './Menu'

export default function Map(props) {
    const [markers, setMarkers] = useState([]);
    const [polygon, setPolygon] = useState({ "location": [], "option": { fillColor: "green", strokeThickness: 2 } });
    const lat = 0, lng = 1;

    const isExists = (loc) => {
            return markers.findIndex(currLoc => currLoc.location[lat] === loc[lat] && currLoc.location[lng] === loc[lng])
    }

    const addMarker = (loc) => {

        const markersCopy = JSON.parse(JSON.stringify(markers));
        markersCopy.push({ "location": loc, "option": { color: 'red' } })
        setMarkers(markersCopy)

        let polygonCopy = JSON.parse(JSON.stringify(polygon));
        if (polygonCopy.location.length === 0) {

            polygonCopy.location.push(loc)
            polygonCopy.location.push(loc)
        }
        else
            polygonCopy.location.splice(polygonCopy.location.length - 1, 0, loc);
        setPolygon(polygonCopy)

    }

    const deleteMarker = (loc) => {
        const markerIndex = isExists(loc);
        const polyIndex = polygon.location.findIndex(currLoc => currLoc[lat] === loc[lat] && currLoc[lng] === loc[lng])

        if (markers.length > 1){
            let markersCopy = JSON.parse(JSON.stringify(markers));
            let polygonCopy = JSON.parse(JSON.stringify(polygon));
            markersCopy.splice(markerIndex, 1);
            polygonCopy.location.splice(polyIndex, 1);
            setMarkers(markersCopy)
            setPolygon(polygonCopy)
        }
        else{
            setMarkers([])
            setPolygon({ "location": [], "option": { fillColor: "green", strokeThickness: 2 } })
        }
    }

    return (
        <Grid container justify="center" style={{height:'100%', position: 'fixed'}}>
            <Grid item style={{width: '50%'}}>
                <Menu addMarker={addMarker} isExists={isExists} markers={markers} deleteMarker={deleteMarker}/>
            </Grid>
             <Grid item style={{width: '50%'}}>
                <ReactBingmaps 
                    center={[13.0827, 80.2707]}
                    polyline={polygon}
                    pushPins={markers}
                    bingmapKey="AiR0htfjEOXr8-HdLNwSi1_RyUMc47OWPZ2OrAjWY_19HDIDudb_8ZTiCCTsWSka" >
                </ReactBingmaps>
            </Grid>
            
        </Grid>
    );
}
