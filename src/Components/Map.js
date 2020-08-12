import React, { useState, useEffect } from "react";
import { ReactBingmaps } from "react-bingmaps";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "./Menu";
import consts from "./../Constant/consts";
import { isLoctionsAlreadyExists, marketValidation } from "./../Services/utils";
import { UpdateMap, GetMap } from './../Services/salesforceService'

const useStyles = makeStyles(() => ({
  myAlerts: {
    position: "absolute",
    zIndex: "1000",
    left: "0",
    bottom: "0",
  },
}));

export default function Map(props) {
  const classes = useStyles();
  const [markers, setMarkers] = useState([]);
  const [polygon, setPolygon] = useState({
    location: [],
    option: { fillColor: "green", strokeThickness: 2 },
  });
  const [error, setError] = useState([]);
  const [mapName, setMapName] = useState("");
  const [mapID, setMapID] = useState(null);
  const onChangeMapName = (e) => {
    setMapName(e.target.value);
  };

  const onChangeMapID = (e) => {
    setMapID(e.target.value);
  };

  useEffect(() => {
    const mapID = new URLSearchParams(window.location.search).get("c__MapId");
    if (mapID) {
        setMapID(mapID)
        GetMap(mapID, (res) => loadMapDetails(res.map, res.cords))
    }
  });

  const loadMapDetails = (map, cords) => {
    setMapName(map.Name__c);
    let markersToAdd = [];
    let loctions = [];
    cords.forEach((cord) => {
      let loc = [cord.Latitude__c, cord.Longitude__c];
      markersToAdd.push({ location: loc, option: { color: "red" } });
      loctions.push(loc);
    });

    setMarkers(markersToAdd);
    loctions.push([cords[0].Latitude__c, cords[0].Longitude__c]);
    setPolygon({
      location: loctions,
      option: { fillColor: "green", strokeThickness: 2 },
    });
  };

  const addMarker = (loc, callback) => {
    const error = marketValidation(markers, loc, mapID);
    if (error.length > 0) {
      let errorTorender = [];
      error.forEach((currError) => {
        errorTorender.push(<Alert severity="error">{currError}</Alert>);
      });
      setError(errorTorender);
    } else {
        UpdateMap(mapID, null, [loc], null)

      const markersCopy = JSON.parse(JSON.stringify(markers));
      markersCopy.push({ location: loc, option: { color: "red" } });
      setMarkers(markersCopy);

      let polygonCopy = JSON.parse(JSON.stringify(polygon));
      if (polygonCopy.location.length === 0) {
        polygonCopy.location.push(loc);
        polygonCopy.location.push(loc);
      } else
        polygonCopy.location.splice(polygonCopy.location.length - 1, 0, loc);
      setPolygon(polygonCopy);
      callback(true);
    }
  };

  const deleteMarker = (loc) => {
    const markerIndex = isLoctionsAlreadyExists(markers, loc);
    const polyIndex = polygon.location.findIndex(
      (currLoc) =>
        currLoc[consts.lat] === loc[consts.lat] &&
        currLoc[consts.lng] === loc[consts.lng]
    );

    if (markers.length > 1) {
      let markersCopy = JSON.parse(JSON.stringify(markers));
      let polygonCopy = JSON.parse(JSON.stringify(polygon));
      markersCopy.splice(markerIndex, 1);
      polygonCopy.location.splice(polyIndex, 1);
      setMarkers(markersCopy);
      setPolygon(polygonCopy);
    } else {
      setMarkers([]);
      setPolygon({
        location: [],
        option: { fillColor: "green", strokeThickness: 2 },
      });
    }
  };

  return (
    <Grid
      container
      justify="center"
      style={{ height: "100%", position: "fixed" }}
    >
      <div className={classes.myAlerts}>{error}</div>
      <Grid item style={{ width: "50%" }}>
        <Menu
        mapName={mapName} onChangeMapName={onChangeMapName}
        mapID={mapID} setMapID={onChangeMapID} setMapName={setMapName}
          loadMapDetails={loadMapDetails}
          addMarker={addMarker}
          markers={markers}
          deleteMarker={deleteMarker}
        />
      </Grid>
      <Grid item style={{ width: "50%" }}>
        <ReactBingmaps
          center={[13.0827, 80.2707]}
          polyline={polygon}
          pushPins={markers}
          bingmapKey="AiR0htfjEOXr8-HdLNwSi1_RyUMc47OWPZ2OrAjWY_19HDIDudb_8ZTiCCTsWSka"
        ></ReactBingmaps>
      </Grid>
    </Grid>
  );
}
