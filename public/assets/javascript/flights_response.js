    /**--------------------------API fucntions---------------------------- */
  
  function flightCreateSession() {
    const flightFrom = getInfoAirportFrom();
    const flightTo = getInfoAirportTo();
  
    let xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
      if(xhr.status === 503) {
        alert('connection error')
      }
      if (this.readyState === this.DONE) {
        let response = JSON.parse(this.responseText);
        if(response.errors) {
          console.log(response.errors[0]);
          addResponseTitleToDom('<h3 class="content__response_flight_title">Please enter valid data</h3>')
          return;
        }

        flightPoll(response);
      }
    });
    console.log(flightFrom.adults)
    //xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=UAH&ta=1&c=0&d1=VIE&o1=LON&dd1=2020-09-12`);
    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/create-session?currency=UAH&ta=${flightFrom.adults}&c=0&d1=${flightTo.id}&o1=${flightFrom.id}&dd1=${flightFrom.date}`);
  
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
    
    if(document.getElementById('direct_flight').checked)
      xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/poll?currency=UAH&n=15&ns=NON_STOP&so=PRICE&o=0&sid=${response.search_params.sid}`);
    else
      xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/poll?currency=UAH&n=15&ns=NON_STOP%252C%20ONE_STOP&so=PRICE&o=0&sid=${response.search_params.sid}`);

    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiKey);
    
    xhr.send();
  }

  function getBookData(responsePoll, responseId, i){
    
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let responseBook = JSON.parse(this.responseText);
        window.open(responseBook.partner_url);
      }
    });

    xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/get-booking-url?searchHash=${responsePoll.summary.sh}&Dest=VIE&id=${responseId}&Orig=KBP&searchId=${responsePoll.search_params.sid}`);
    xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiKey);

    xhr.send();
  }

  /**------------------------------------------------------ */

  
  function createFlightsOption(response) {
    let itineraries = response.itineraries;
    if(!itineraries) {
      addResponseTitleToDom('<h3 class="content__response_flight_title">Flights not found</h3>');
      return 0;
    }

    let wrapperFirst = addResponseTitleToDom('<h3 class="content__response_flight_title">best options</h3>')

    if (itineraries.length>3) addFlightsToDom(0, 3, wrapperFirst, response);
    else addFlightsToDom(0, itineraries.length, wrapperFirst, response);
    
    let buttonShow = document.createElement('a');
    buttonShow.classList.add('button-text');
    buttonShow.innerHTML = "show all";
    document.getElementsByClassName('content__response_flight_items')[0].appendChild(buttonShow)
    
   
    buttonShow.addEventListener('click', function() {
      buttonShow.innerHTML = "hide";
      if(document.getElementsByClassName('content__response_flight_items--wrapper-second').length) {
        document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]);
        buttonShow.innerHTML = "show all";
      } 
      else {
        let wrapperSecond = document.createElement('div');
        wrapperSecond.classList.add('content__response_flight_items--wrapper-second');
        wrapperSecond.setAttribute('data-aos','zoom-in');
        document.getElementsByClassName('content__response_flight_items')[0].appendChild(wrapperSecond);
        addFlightsToDom(3,itineraries.length,wrapperSecond,response );
    }
    })
  }

  function addFlightsToDom(min,max,wrapper,response) {
    let itineraries = response.itineraries;
    if(!itineraries) return 0;
    let airportMap = getResponseFlightAirportMap(response);
    let planeMap = getResponseFlightPlaneMap(response);
    let carriersMap = getResponseFlightCarriersMap(response);
    $('input[type="checkbox"]').click(function(){
      if($(this).is(":checked")){
          console.log('hi')
      }
    });

    for(let i=min;i<max;i++){
      
      let obj = itineraries[i];

      // if(obj.f[0].l.length<2) {
      
        let originPlace = obj.f[0].l[0].da; //id
        let destinationPlace = obj.f[0].l[0].aa;
        let originDate = obj.f[0].l[0].dd;
        let destinationDate = obj.f[0].l[0].ad;

        let carrierPlaneId = obj.f[0].l[0].e; //can be empty
        let carrierAirCompanyId = obj.f[0].l[0].m; //find by id name and image
        let carrierCompany = obj.l[0].s; //always cheap one

        let price = obj.l[0].pr.p;
        
        let optionWrapper = document.createElement('div');
        optionWrapper.classList.add('content__response_flight_item')
        wrapper.appendChild(optionWrapper)

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
        optionButton.addEventListener('click', function () {
          getBookData(response, obj.l[0].id);
        })
        optionButton.insertAdjacentHTML('beforeend', `<button class="button">BUY</button>`);
        optionWrapper.appendChild(optionButton);
     // }
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

  function addResponseTitleToDom(text) {
    if(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0]) {
      document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0])
      // if(document.getElementsByClassName('button-text')[0]) {
      //   document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('button-text')[1])
      // }
    }
    if(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]) {
      document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]);
    }
    
    let wrapperFirst = document.createElement('div');
    wrapperFirst.classList.add('content__response_flight_items--wrapper-first')
    wrapperFirst.setAttribute('data-aos','zoom-in');
    wrapperFirst.insertAdjacentHTML('afterbegin', 
    `${text}`)
    document.getElementsByClassName('content__response_flight_items')[0].appendChild(wrapperFirst);
    
    return wrapperFirst
  }
