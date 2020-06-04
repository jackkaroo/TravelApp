
/**ADDING EVENT LISTENERS ON BUTTON SEARCH FLIGHTS*/
function openFlightSearchWindow() {
    updateSearchFLightDom();
  
    flightCreateSession();
  }
  
  function updateSearchFLightDom(){
    document.getElementsByClassName('content__choose')[0].style.display = "flex";
    document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
    document.getElementsByClassName('content__choose_car')[0].style.display = "none";
    document.getElementsByClassName('content-title')[0].style.display = "none";
    document.getElementsByClassName('content-subtitle')[0].style.display = "none";
    document.getElementsByClassName('content__transport_btns')[0].style.display="none";
  }
  
  function flightCreateSession() {
    const flightFrom = getInfoAirportFrom();
    const flightTo = getInfoAirportTo();
  
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let response = JSON.parse(this.responseText);
        console.log(response)
        //createFlights(response,flightFrom.placeName,flightTo.placeName)
      }
    });
  
    //xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=USD&ta=1&c=0&d1=CNX&o1=DMK&dd1=2020-12-05`);
    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=USD&ta=1&c=0&d1=${flightTo.id}&o1=${flightFrom.id}&dd1=${flightFrom.date}`);
  
    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");
  
    xhr.send();
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