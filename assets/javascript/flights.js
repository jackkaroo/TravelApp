const apiKey = 'be557a4761msh859fb1ff66181e9p123d2ajsn9940bf7444e0';


const airportFromInput = document.getElementsByClassName('content__choose_plane_dest-from')[0];
airportFromInput.addEventListener('keypress', function(){
  if(airportFromInput.value.length>2)
      getAirports('destination-from', airportFromInput.value);
});

const airportToInput = document.getElementsByClassName('content__choose_plane_dest-to')[0];
airportToInput.addEventListener('keypress', function(){
  if(airportToInput.value.length>2)
      getAirports('destination-to',airportToInput.value);
});

function getAirports(list, value){
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let response = JSON.parse(this.responseText);
      /*console.log(response);*/
      response.forEach(element => {
        addListEntry(list, element)
      })
    }
  });

  xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=${value}`);
  xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", apiKey);

  xhr.send();
}

function addListEntry(list, element) {
  if(!checkOptionUnic(element)) return 0;
  let optionNode =  document.createElement("option");

  if(element.display_sub_title && element.display_sub_title.substring(0,3).toLowerCase()==='all'){
      optionNode.value = element.city_name + ' (All airports)';
  } else 
    optionNode.value = element.city_name + ' ' + element.name;

  optionNode.setAttribute('data-id',`${element.code}`)
  optionNode.setAttribute('data-city',`${element.city_name}`)
  optionNode.appendChild(document.createTextNode(element.time_zone_name + ' Country: ' +element.country_code));
  document.getElementById(list).appendChild(optionNode);
}

function checkOptionUnic(element){
  let option = document.getElementsByTagName('option');

  for(let i=0;i<option.length;i++){
    if(option[i].getAttribute('data-id')===element.code) return 0;
  }
  return 1;
}



/**ADDING EVENT LISTENERS ON BUTTON SEARCH FLIGHTS*/
function openFlightSearchWindow() {
    updateSearchFlightDom();
  
    flightCreateSession();
  }
  
  function updateSearchFlightDom(){
    /*document.getElementsByClassName('content__choose')[0].style.display = "flex";
    document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
    document.getElementsByClassName('content__choose_car')[0].style.display = "none";
    document.getElementsByClassName('content-title')[0].style.display = "none";
    document.getElementsByClassName('content-subtitle')[0].style.display = "none";
    document.getElementsByClassName('content__transport_btns')[0].style.display="none";*/

    document.getElementsByClassName('content__response')[0].style.display = "block";
    document.getElementsByClassName('content__response_flight')[0].style.display = "block";

  }
   
  function getInfoAirportFrom() {
    const airportFrom = {};
    let option = document.getElementsByTagName('option');
  
    for(let i=0;i<option.length;i++){
      if (option[i].value===airportFromInput.value) {
        airportFrom.id = option[i].getAttribute('data-id');
        airportFrom.placeName = option[i].getAttribute('data-city');
        airportFrom.date = document.getElementById('date_picker_start').value;
      }
    }
  
    return airportFrom;
  }
  
  function getInfoAirportTo() {
    const airportTo = {};
    let option = document.getElementsByTagName('option');
  
    for(let i=0;i<option.length;i++){
      if (option[i].value===airportToInput.value) {
        airportTo.id = option[i].getAttribute('data-id');
        airportTo.placeName = option[i].getAttribute('data-city');
        airportTo.date = document.getElementById('date_picker_end').value;
      }
    }
  
    return airportTo;
  }

  function flightCreateSession() {
 