// GLOBALS:
var map;

$(document).on("ready", function main() {
  initMap();
  ajaxQuakeSearch();
}); //closes main function



// FUNCTIONS LIBRARY BELOW

function ajaxQuakeSearch() {
  var monthly_quakes_endpoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: monthly_quakes_endpoint,
    success: onSuccess,
    error: onError
  }); //closes ajax function
} //closes ajaxQuakeSearch

function onSuccess(results) {
  var features = results.features;

  features.forEach(function (feature){
    var time = feature.properties.time; //milliseconds (convert)
    var timeSince = Math.round((new Date().getTime() - time)/(60*60*24*365));
    var title = feature.properties.title; //string
    var mag = feature.properties.mag; //number
    var lng = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];

    setMarkers(lat, lng);
    var magColor;
    if ( mag >= 6  ) {
      magColor = 'red';
    } else if ( mag < 6 && mag >= 5 ) {
      magColor = 'blue';
    } else {
      magColor = 'green';
    } //closes else statement
    $('#quakes').append('<li class="' + magColor+ '"><span>' + title + ' / ' + timeSince +' hours ago</span></li>');
  }); // closes forEach function
} //closes success function



function initMap(lat, lng) {
  var myLatLng = { lat: 37.78, lng: -122.44 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 2
  }); //closes map function
} //closes initMap function

function setMarkers(lat, lng) {
  var featureLL = { lat: lat, lng: lng };
  var marker = new google.maps.Marker({
    position: featureLL,
    map: map,
  }); // closes marker function
} //closes setMarkers function

function onError(xhr, status, errorThrown) {
  alert('There was an error!');
} //closes error function
