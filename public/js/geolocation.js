let userLocation;
var nearbyThings;
let searchLocation;

function setUserLoc(position) {
    userLocation = position.coords;
    placeFinder(userLocation);
};

function getLocation(cb) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cb);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function placeFinder(locationName) {
    $.post('./api/places', { location: locationName }, function (response) {
        nearbyThings = response;
    })
};