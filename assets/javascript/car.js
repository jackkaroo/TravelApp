const google_api_key = "AIzaSyBo1lmywIKGe9S2a_X9KDY9k37dfHGo3AQ";
 let map;
 let directionsRenderer ;

const placeFromInput = document.getElementsByClassName('content__choose_car_dest-from')[0];
placeFromInput.addEventListener('keypress', function(){
  if(placeFromInput.value.length>1)
      getPlaces('destination-from-car', placeFromInput.value);
});

const placeToInput = document.getElementsByClassName('content__choose_car_dest-to')[0];
placeToInput.addEventListener('keypress', function(){
  if(placeToInput.value.length>1)
      getPlaces('destination-to-car',placeToInput.value);
});

function getPlaces(list, query){ 
  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(query, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
        addListEntry(list,results[i]);
        console.log(results[i])
    }
  }
});}


function addListEntry(list, element) {
  if(!checkOptionUnic(element)) return 0;
  let optionNode =  document.createElement("option");

  if(element.display_sub_title && element.display_sub_title.substring(0,3).toLowerCase()==='all'){
      optionNode.value = element.city_name + ' (All)';
  } else 
    optionNode.value = element.city_name + ' ' + element.name;

  optionNode.setAttribute('data-id',`${element.code}`)
  optionNode.setAttribute('data-city',`${element.city_name}`)
  optionNode.appendChild(document.createTextNode(element.time_zone_name + ' Country: ' +element.country_code));
  document.getElementById(list).appendChild(optionNode);
}


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
let directionsResult;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsRenderer = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 50.27, lng: 30.31}
  });

  var totalDistance = 0;
  var totalDuration = 0;
  
  let legs;


  directionsDisplay.setMap(map);
  directionsRenderer.setMap(map);


  directionsService.route({
    origin: document.getElementsByClassName('content__choose_car_dest-from')[0].value,
    destination: document.getElementsByClassName('content__choose_car_dest-to')[0].value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      directionsRenderer.setDirections(response);
      legs = response.routes[0].legs; 
      console.log(response);
  for(var i=0; i<legs.length; ++i) {
      totalDistance += legs[i].distance.value;
      totalDuration += legs[i].duration.value;
  }
  console.log((totalDistance));
  console.log((totalDuration));
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
    

}


