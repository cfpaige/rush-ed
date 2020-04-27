//NOTE THIS CODE WAS UNUSED LEFT HERE INCASE WE WANT TO ADD GEOLOCATION LATER

let userLocation;
var nearbyThings;
let searchLocation;

function setUserLoc(position) {
    // sets position coordinates for using them in other functions

    userLocation = position.coords;
    placeFinder(userLocation);
};

function getLocation(cb) {
    // gets the users location

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cb);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function placeFinder(locationName) {
    // sends the location to the back end to retreive nearby places

    $.post('./api/places', { location: locationName }, function (response) {
        nearbyThings = response;
    })
};