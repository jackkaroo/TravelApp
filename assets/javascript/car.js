let google_api_key = "AIzaSyBo1lmywIKGe9S2a_X9KDY9k37dfHGo3AQ";
 
function openMapSearchWindow(){
  updateSearchCarDom();

  calculateAndDisplayRoute();
}

function updateSearchCarDom() {
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content-title')[0].style.display = "none";
  document.getElementsByClassName('content-subtitle')[0].style.display = "none";
  document.getElementsByClassName('content__transport_btns')[0].style.display="none";

  let mapDiv = document.createElement('div');
  mapDiv.classList.add('content__response_car-map');
  mapDiv.id = ('map');
  document.getElementsByClassName('content__wrapper')[0].appendChild(mapDiv)
}

function calculateAndDisplayRoute() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 50.27, lng: 30.31}
  });

  var totalDistance = 0;
  var totalDuration = 0;
  
  directionsDisplay.setMap(map);
  
  directionsService.route({
    origin: document.getElementsByClassName('content__choose_car_dest-from')[0].value,
    destination: document.getElementsByClassName('content__choose_car_dest-to')[0].value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  //console.log(directionsResult)
    
  var legs = directionsResult.routes[0].legs;
  for(var i=0; i<legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
  }
  console.log($('#distance').text(totalDistance));
  console.log($('#duration').text(totalDuration));
}
