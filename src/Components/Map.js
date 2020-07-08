import React, { useState } from "react";
import { ReactBingmaps } from 'react-bingmaps';

import AddMarker from './AddMarker'

export default function Map(props) {
    const [markers, setMarkers] = useState([]);
    const [polygon, setPolygon] = useState({ "location": [], "option": { fillColor: "green", strokeThickness: 2 } });
    const lat = 0, lng = 1;

    const isExists = (loc) => {
        for (let currLoc of markers) {
            if (currLoc.location[lat] === loc[lat] && currLoc.location[lng] === loc[lng])
                return true
        }

        return false;
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

    return (
        <>
            <ReactBingmaps
                center={[13.0827, 80.2707]}
                polyline={polygon}
                pushPins={markers}
                bingmapKey="AiR0htfjEOXr8-HdLNwSi1_RyUMc47OWPZ2OrAjWY_19HDIDudb_8ZTiCCTsWSka" >
            </ReactBingmaps>
            <AddMarker addMarker={addMarker} isExists={isExists} />
        </>
    );
}
