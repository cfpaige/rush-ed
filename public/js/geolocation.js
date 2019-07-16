let userLocation;
var itemLocation;
let locationName = 'University of Washington';

function setUserLoc(position) {
    userLocation = position.coords
    console.log(userLocation);
}

function getLocation(cb) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cb);//think i need a function here
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

$.post('./api/places', {location: locationName} ,function(response) {
    itemLocation = response;
    console.log(itemLocation);
})

getLocation(setUserLoc);