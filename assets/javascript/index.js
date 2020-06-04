/**ADDING EVENT LISTENERS ON BUTTONS PLANE AND CAR*/
function openFlightChooseWindow() {
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "flex";
}

function openCarChooseWindow() {
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content__choose_car')[0].style.display = "flex";
}

/*if(document.getElementsByClassName('content__response-menubtn')[0]) {
  document.getElementsByClassName('content__response-menubtn')[0].addEventListener('click',function(){
    document.getElementsByClassName('content__transport_btns')[0].style.display = "flex";

    document.getElementsByClassName('content__wrapper')[0].removeChild(document.getElementsByClassName('content__response')[0])
  })
}*/


function addListEntry(list, element) {
  let optionNode =  document.createElement("option");
  optionNode.value = element.PlaceName;
  optionNode.setAttribute('data-id',`${element.PlaceId}`)
  optionNode.setAttribute('data-city',`${element.PlaceName}`)
  optionNode.appendChild(document.createTextNode("Country: " + element.CountryName));
  document.getElementById(list).appendChild(optionNode);
}

function getAirports(list, value){
  let xhr = new XMLHttpRequest();
  
  xhr.open("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${value}`);
  xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400){
      let response = JSON.parse(this.responseText);
      Object.values(response)[0].forEach(element => {
          addListEntry(list, element);
      });
    }
  };
  xhr.send();
}

let airportFrom = document.getElementsByClassName('content__choose_plane_dest-from')[0];
airportFrom.addEventListener('keypress', function(){
  if(airportFrom.value.length>1)
      getAirports('destination-from', airportFrom.value);
});

let airportTo = document.getElementsByClassName('content__choose_plane_dest-to')[0];
airportTo.addEventListener('keypress', function(){
  if(airportTo.value.length>1)
      getAirports('destination-to',airportTo.value);
});


/**ADDING EVENT LISTENERS ON BUTTON SEARCH FLIGHTS*/
function openFlightSearchWindow() {
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";
  document.getElementsByClassName('content-title')[0].style.display = "none";
  document.getElementsByClassName('content-subtitle')[0].style.display = "none";
  document.getElementsByClassName('content__transport_btns')[0].style.display="none";

  let idAirportFrom ="";
  let idAirportTo ="";
  let placeNameFrom = "";
  let placeNameTo = "";
  let dateFrom=document.getElementById('date_timepicker_start').value;
  let dateTo=document.getElementById('date_timepicker_end').value;
  let option = document.getElementsByTagName('option');

  for(let i=0;i<option.length;i++){
    if (option[i].value===airportFrom.value) {
      idAirportFrom = option[i].getAttribute('data-id').toLowerCase();
      placeNameFrom = option[i].getAttribute('data-city')
    }
    if (option[i].value===airportTo.value) {
      idAirportTo = option[i].getAttribute('data-id').toLowerCase();
      placeNameTo = option[i].getAttribute('data-city')
    } 
  }

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let response = JSON.parse(this.responseText);
      createFlights(response,placeNameFrom,placeNameTo)
    }
  });

  // xhr.open("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/UA/uah/en-US/${idAirportFrom}/${idAirportTo}/${dateFrom}/${dateTo}`);
  xhr.open("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/UA/uah/en-US/kiev/pari/2020-12-12`);

  xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

  xhr.send();
}

function createFlights(response,placeNameFrom,placeNameTo){
  console.log(response)
  let mapCarriers = getCarriersMapId(response);
  let mapPlaces = getPlacesMapId(response);

  let menuBtn = document.createElement('button');
  menuBtn.classList.add('content__response-menubtn')
  menuBtn.innerHTML = 'Menu'
  document.getElementsByClassName('content__wrapper')[0].appendChild(menuBtn)
 
  let responseWrapper =  document.createElement('div');
  responseWrapper.classList.add('content__response')
  document.getElementsByClassName('content__wrapper')[0].appendChild(responseWrapper)

  let responseTitle = document.createElement('div');
  responseTitle.classList.add('content__response-title');
  responseTitle.insertAdjacentHTML('afterbegin',`<h2>${placeNameFrom}Kyiv --- ${placeNameTo}Warshaw</h2>`)
  responseWrapper.appendChild(responseTitle)

  let responseQuotesWrapper = document.createElement('div');
  responseQuotesWrapper.classList.add('content__response_quotes-wrapper');
  responseWrapper.appendChild(responseQuotesWrapper)

  for(let i=0;i<response.Quotes.length;i++){
    let responseQuotesItem = document.createElement('div');
    responseQuotesItem.classList.add('content__response_quotes-item');
    responseQuotesItem.insertAdjacentHTML('afterbegin',`${i+1}) DepartureDate: ${getDate(response.Quotes[i].OutboundLeg.DepartureDate)}, MinPrice: ${response.Quotes[i].MinPrice}, Carrier: ${mapCarriers.get(response.Quotes[i].OutboundLeg.CarrierIds[0])}, Place: from ${mapPlaces.get(response.Quotes[i].OutboundLeg.OriginId)} to ${mapPlaces.get(response.Quotes[i].OutboundLeg.DestinationId)}`)
    responseQuotesWrapper.appendChild(responseQuotesItem)
  }
}

function getCarriersMapId(response){
  let map = new Map();
  response.Carriers.forEach(element => {
    map.set(element.CarrierId,element.Name)
  })
  return map;
}

function getPlacesMapId(response){
  let map = new Map();
  response.Places.forEach(element => {
    map.set(element.PlaceId,element.Name)
  })
  return map;
}

function getDate(baseDate){
  let tempDate = baseDate.substring(0,10)
  let year = tempDate.substring(0,4);
  let month = tempDate.substring(5,7);
  let date = tempDate.substring(8,10);
  let newDate= `${date}.${month}.${year}`

  return newDate;
}