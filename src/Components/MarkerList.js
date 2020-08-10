import React from "react";

import MarkerRow from './MarkerRow'


export default function MarkerList(props) {

    const renderList = () => {  
        return props.markers.map(x=> <MarkerRow loc={x.location} deleteMarker={props.deleteMarker}/>)
    }

    return (
        <>
           {renderList()}
        </>
    );
}
