import {lat,lng} from "./../Constant/consts";
const isNumber = (number) => {
  var float = /^[-+]?[0-9]+\.[0-9]+$/;
  var int = /^-?[0-9]+$/;
  return float.test(number) || int.test(number);
};

const isLoctionsAlreadyExists = (loctions, loc) => {
  return loctions.findIndex(
    (currLoc) =>
      currLoc.location[lat] === loc[lat] && currLoc.location[lng] === loc[lng]
  );
};

const marketValidation = (loctions, loc, mapID) => {
  let error = [];
  if (isLoctionsAlreadyExists(loctions, loc) !== -1) {
    error.push("this location already exists");
  }
  if (loc[lat] === 0 || loc[lng] === 0 ) {
    error.push("The location cant be empty");
  }
  if (!isNumber(loc[lat]) || !isNumber(loc[lng])) {
    error.push("The location must be a number");
    if (loc[lat] < 0 || loc[lng] < 0)
      error.push("The location must be positive number");
  }

  return error
};

export { isLoctionsAlreadyExists, marketValidation };
