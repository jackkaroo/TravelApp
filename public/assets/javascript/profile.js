
console.log(isAuth)
document.getElementsByClassName('header__nav-logout')[0].style.display = 'none'
document.getElementsByClassName('header__nav-cab')[0].style.display = 'none'


getFavoriteSid()

function getFavoriteSid() {

  fetch(`/bookmark/${isAuth}`,
  //fetch(`/bookmark/1`,
      {
        method: "GET"
      }

    ).then((res) => {
      res.json().then((data) => flightCreateSessionProfile(data))

    }).catch(function () {
      console.log('Error occurred, please try again')
    })
}

function flightCreateSessionProfile(data) {

  for(let i=0;i<data.length;i++){
    let favItem = document.createElement('div');
    favItem.innerHTML = data[i].sid
    favItem.addEventListener('click', function() {
      flightPollProfile(data[i].sid)
    })
    document.getElementsByClassName('profile__favorite')[0].appendChild(favItem)
  }
}

function flightPollProfile(response){
  console.log(response)

  let xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let responsePoll = JSON.parse(this.responseText);
        console.log(responsePoll);
        addFavoriteToDomv(responsePoll)
      }
  });

  xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/poll?currency=UAH&n=15&ns=NON_STOP%252C%20ONE_STOP&so=PRICE&o=0&sid=${response}`);

  xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", '14007f756cmsha513cd718cddc77p1a562ajsn089728438c48');
  
  xhr.send();
}

function addFavoriteToDomv(response) {

  let price = response.itineraries[0].l[0].pr.p;

  let optionTicket = document.createElement('div');
  optionTicket.classList.add('content__response_flight_item_ticket')
//   optionTicket.insertAdjacentHTML('beforeend', 
// ` <div class="content__response_flight_item_ticket--wrapper">
//     <div class="content__response_flight_item_ticket--date">${getResponseFlightDate(originDate)}
//   </div>
//   <div class="content__response_flight_item_ticket--flight">
//     <div class="content__response_flight_item_ticket--flight-time">${getResponseFlightTime(originDate)}</div>
//     <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(originPlace)[0]} <abbr title="${airportMap.get(originPlace)[1]}">(${originPlace})</abbr> </div>
//   </div>
//   <div class="content__response_flight_item_ticket--flight content__response_flight_item_ticket--flight-1">
//     <div class="content__response_flight_item_ticket--flight-time">${getResponseFlightTime(destinationDate)}</div>
//     <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(destinationPlace)[0]} <abbr title="${airportMap.get(destinationPlace)[1]}">(${destinationPlace})</abbr></div>
//   </div>
//   <div class="content__response_flight_item_ticket--carrier">${carriersMap.get(carrierAirCompanyId)[0]}
//   </div>
//   <div class="content__response_flight_item_ticket--price"> <span>from</span><br> ${price} <span>uah</span></div>
//   </div>`);
  document.getElementsByClassName('profile__favorite')[0].appendChild(optionTicket);
}
