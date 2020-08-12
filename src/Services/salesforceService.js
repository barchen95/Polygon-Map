const UpdateMap =(mapId, name, cordsToAdd, cordsToDelete) =>{
    window.Visualforce.remoting.Manager.invokeAction(
        "Maps.UpdateMap",
        mapId,
        name,
        cordsToAdd,
        cordsToDelete,
        function (res, e) {}
      );
}

const GetMap = (mapId, callback) => { 
window.Visualforce.remoting.Manager.invokeAction(
    "Maps.GetMap",
    mapId,
    function (res, e) {
        callback(res);
    }
  );
}

const CreateMap  = (mapName, cords) => {
    window.Visualforce.remoting.Manager.invokeAction(
        "Maps.CreateMap",
        mapName,
        cords,
        function (res, e) {}
      );
}

export { UpdateMap, GetMap, CreateMap }