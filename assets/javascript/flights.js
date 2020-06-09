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
        airportFrom.date = document.getElementById('date_timepicker_start').value;
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
        airportTo.date = document.getElementById('date_timepicker_end').value;
      }
    }
  
    return airportTo;
  }

  /**
   *  
   * WORK WITH API STARTS!!!!!!!!!!!!!!!!!
   * 
   */
  function flightCreateSession() {
    const flightFrom = getInfoAirportFrom();
    const flightTo = getInfoAirportTo();
  
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let response = JSON.parse(this.responseText);
        flightPoll(response);
        //createFlights(response,flightFrom.placeName,flightTo.placeName)
      }
    });
  
    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?dd2=2020-09-15&currency=UAH&ta=1&c=0&d1=VIE&o1=LON&dd1=2020-09-12`);
    //xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?dd2=${flightTo.date}&currency=UAH&ta=1&c=0&d1=${flightTo.id}&o1=${flightFrom.id}&dd1=${flightFrom.date}`);
  
    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiKey);
  
    xhr.send();
  }

  function flightPoll(response){
    console.log(response)

    let xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let responsePoll = JSON.parse(this.responseText);
            console.log(responsePoll);
            createFlightsOption(responsePoll);
            //getBookData(responsePoll);
        }
    });
    
    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/poll?currency=UAH&n=15&ns=NON_STOP%252CONE_STOP&so=PRICE&o=0&sid=${response.search_params.sid}`);
    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiKey);
    
    xhr.send();
  }

  function getBookData(responsePoll, responseId){
    
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let responseBook = JSON.parse(this.responseText);
        console.log(responseBook.partner_url);
      }
    });

    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/get-booking-url?searchHash=${responsePoll.summary.sh}&Dest=VIE&id=${responseId}&Orig=KBP&searchId=${responsePoll.search_params.sid}`);
    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiKey);

    xhr.send();
    return 1;
  }

  
  function createFlightsOption(response) {
    let itineraries = response.itineraries;
    if(!itineraries) return 0;
    let airportMap = getResponseFlightAirportMap(response);
    let planeMap = getResponseFlightPlaneMap(response);
    let carriersMap = getResponseFlightCarriersMap(response);

    for(let i=0;i<itineraries.length;i++){
      
      let obj = itineraries[i];
      
      let originPlace = obj.f[0].l[0].da; //id but we can use abbr
      let destinationPlace = obj.f[0].l[0].aa;
      let originDate = obj.f[0].l[0].dd; //split on day and time
      let destinationDate = obj.f[0].l[0].ad;

      let carrierPlaneId = obj.f[0].l[0].e; //can be empty

      let carrierAirCompanyId = obj.f[0].l[0].m; //find by id name and image
      let carrierCompany = obj.l[0].s; //always cheap one



      let price = obj.l[0].pr.p; //in usd
      

      let optionWrapper = document.createElement('div');
      optionWrapper.classList.add('content__response_flight_item')
      document.getElementsByClassName('content__response_flight_items')[0].appendChild(optionWrapper)

      let optionTicket = document.createElement('div');
      optionTicket.classList.add('content__response_flight_item_ticket')
      optionTicket.insertAdjacentHTML('beforeend', 
      `<div class="content__response_flight_item_ticket--wrapper">
        <div class="content__response_flight_item_ticket--date">${getResponseFlightDate(originDate)}
        </div>
        <div class="content__response_flight_item_ticket--flight">
          <div class="content__response_flight_item_ticket--flight-time">${getResponseFlightTime(originDate)}</div>
          <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(originPlace)[0]} <abbr title="${airportMap.get(originPlace)[1]}">(${originPlace})</abbr> </div>
        </div>
        <div class="content__response_flight_item_ticket--flight content__response_flight_item_ticket--flight-1">
          <div class="content__response_flight_item_ticket--flight-time">${getResponseFlightTime(destinationDate)}</div>
          <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(destinationPlace)[0]} <abbr title="${airportMap.get(destinationPlace)[1]}">(${destinationPlace})</abbr></div>
        </div>
        <div class="content__response_flight_item_ticket--carrier">${carriersMap.get(carrierAirCompanyId)[0]}
        </div>
        <div class="content__response_flight_item_ticket--price"> <span>from</span><br> ${price} <span>uah</span></div>
      </div>`);
      optionWrapper.appendChild(optionTicket);

      /**<!--<div class="content__response_flight_item_ticket--carrier-plane">${carriersMap.get(carrierPlaneId)[0]}</div>
          <div class="content__response_flight_item_ticket--carrier-company">${carrierCompany}</div>--> */


      let optionButton = document.createElement('div');
      optionButton.classList.add('content__response_flight_item_button')
      // getBookData(response).then(console.log(link));
      optionButton.addEventListener('click', function () {
        getBookData(response, obj.l[0].id);
      })
      optionButton.insertAdjacentHTML('beforeend', `<button class="button">BUY</button>`);
      optionWrapper.appendChild(optionButton);

    }
  }

  function getResponseFlightDate(baseDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat",
    "Sun"];

    let date = new Date(baseDate)
    let newDate = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    
    return newDate;
  }

  function getResponseFlightTime(baseDate) {
    let date = new Date(baseDate)

    return date.toLocaleTimeString().substring(0,5)
  }

  function getResponseFlightAirportMap(response) { 
    let map = new Map();
    response.airports.forEach(element => {
      map.set(element.c,[element.cn,element.n])
    })
    return map;
  }

  function getResponseFlightCarriersMap(response) { 
    let map = new Map();
    response.carriers.forEach(element => {
      map.set(element.c,[element.n,element.l])
    })
    return map;
  }

  function getResponseFlightPlaneMap(response) { 
    let map = new Map();
    response.equipment.forEach(element => {
      map.set(element.i,element.n)
    })
    return map;
  }




  /*function createFlightsd(response,placeNameFrom,placeNameTo){
    console.log(response)
    let mapCarriers = getCarriersMapId(response);
    let mapPlaces = getPlacesMapId(response);
   
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
  }*/