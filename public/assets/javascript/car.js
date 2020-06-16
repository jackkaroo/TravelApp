const google_api_key = "AIzaSyBo1lmywIKGe9S2a_X9KDY9k37dfHGo3AQ";
let map;

//____CONNECT__TO__GOOGLE_MAPS_API___AND__ENABLE__SEARCH FIELEDS 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBo1lmywIKGe9S2a_X9KDY9k37dfHGo3AQ&libraries=places&callback=initMap&language=en&region=UA";
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  const placeFromInput = document.getElementsByClassName('content__choose_car_dest-from')[0];
  const placeToInput = document.getElementsByClassName('content__choose_car_dest-to')[0];
this.searchBox(placeToInput);
this.searchBox(placeFromInput);

};
document.head.appendChild(script);
//___________________________________________________________________________

function searchBox(input){
  var searchBox = new google.maps.places.SearchBox(input);
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) return;

    // For each place, get the icon, name and location.
    //var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
    });
  });
}

function openMapSearchWindow(){
  updateSearchCarDom();
  calculateAndDisplayRoute();
}

function updateSearchCarDom() {
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";

  document.getElementsByClassName('content__response')[0].style.display = "block";
  document.getElementsByClassName('content__response_car')[0].style.display = "block";

  if(document.getElementsByClassName('content__response_car-wrapper')[0]) {
    document.getElementsByClassName('content__response_car')[0].removeChild(document.getElementsByClassName('content__response_car-wrapper')[0])
  }

  let carWrapper = document.createElement('div');
  carWrapper.classList.add('content__response_car-wrapper');
  document.getElementsByClassName('content__response_car')[0].appendChild(carWrapper)

  let mapDiv = document.createElement('div');
  mapDiv.classList.add('content__response_car_map');
  mapDiv.id = ('map');
  document.getElementsByClassName('content__response_car-wrapper')[0].appendChild(mapDiv)
}

function calculateAndDisplayRoute() {
  let directionsResult;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 50.27, lng: 30.31}
  });

  let totalDistance = 0;
  let totalDuration = 0;
  let legs;
  directionsDisplay.setMap(map);

  directionsService.route({
    origin: document.getElementsByClassName('content__choose_car_dest-from')[0].value,
    destination: document.getElementsByClassName('content__choose_car_dest-to')[0].value,
    travelMode: 'DRIVING'
  }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          legs = response.routes[0].legs; 
          console.log(response);
          for(var i=0; i<legs.length; ++i) {
          totalDistance += legs[i].distance.value;
          totalDuration += legs[i].duration.value;
          }
          addResponseCarDetails(Math.round((totalDistance/1000 + Number.EPSILON) * 100) / 100,Math.round((totalDuration/3600 + Number.EPSILON) * 100) / 100);
      } else {
      // window.alert('Directions request failed due to ' + status);
      addResponseCarError()
      }
  });
}

function addResponseCarDetails(totalDistance, totalDuration) {

  let carDetailsWrapper = document.createElement('div');
  carDetailsWrapper.classList.add('content__response_car_details-wrapper')
  carDetailsWrapper.insertAdjacentHTML('beforeend',
    `<div class="content__response_car_details-item">Distance......${totalDistance} km</div>
     <div class="content__response_car_details-item content__response_car_details-item-2">Duration......${totalDuration} hours</div>
    `);
  document.getElementsByClassName('content__response_car-wrapper')[0].appendChild(carDetailsWrapper)

}

function addResponseCarError() {

  let carDetailsWrapper = document.createElement('div');
  carDetailsWrapper.classList.add('content__response_car_details-wrapper');
  carDetailsWrapper.insertAdjacentHTML('beforeend',`Directions request returned no results.`);
  document.getElementsByClassName('content__response_car-wrapper')[0].appendChild(carDetailsWrapper)

}


