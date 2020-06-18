console.log(isAuth)
document.getElementsByClassName('header__nav-logout')[0].style.display = 'none'
document.getElementsByClassName('header__nav-cab')[0].style.display = 'none'


getFavoriteSid()

function getFavoriteSid() {

  fetch(`/bookmark/${isAuth}`,
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

  if(!data.length) document.getElementsByClassName('profile__favorite_title')[0].innerHTML = 'You don`t have favorite roads yet..:('

  for(let i=0;i<data.length;i++){
    let favItem = document.createElement('div');
    flightPollProfile(data[i].sid)

    // let favoriteButton = document.createElement('a');
    // favoriteButton.classList.add('content__response_flight_item_button-delete')
    // favoriteButton.innerHTML = 'delete';
    // favoriteButton.addEventListener('click', function () {
    //   deleteFavorite(data[i]._id);
    // })
    
    // document.getElementsByClassName('profile__favorite')[0].appendChild(favoriteButton);

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
        addFavoriteToDomProfile(responsePoll)
      }
  });

  xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/flights/poll?currency=UAH&n=15&ns=NON_STOP%252C%20ONE_STOP&so=PRICE&o=0&sid=${response}`);

  xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", '5162173576msh4d8a143b4f1bd90p1eeeb1jsncfb9c791e740');
  
  xhr.send();
}

function addFavoriteToDomProfile(response) {

  let airportMap = getResponseFlightAirportMap(response);

  let originPlace = response.itineraries[0].f[0].l[0].da;
  let destinationPlace = response.itineraries[0].f[0].l[0].aa;
  let originDate = response.itineraries[0].f[0].l[0].dd;
  let price = response.itineraries[0].l[0].pr.p;

  let optionTicket = document.createElement('div');
  optionTicket.classList.add('content__response_flight_item_ticket')
  optionTicket.insertAdjacentHTML('beforeend', 
` <div class="content__response_flight_item_ticket--wrapper">
    <div class="content__response_flight_item_ticket--date">${getResponseFlightDate(originDate)}
  </div>
  <div class="content__response_flight_item_ticket--flight">
    <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(originPlace)[0]}</div>
  </div>
  <div class="content__response_flight_item_ticket--flight content__response_flight_item_ticket--flight-1">
    <div class="content__response_flight_item_ticket--flight-airport">${airportMap.get(destinationPlace)[0]}</div>
  </div>
  
  <div class="content__response_flight_item_ticket--price"> <span>from</span><br> ${price} <span>uah</span></div>
  </div>`);
  document.getElementsByClassName('profile__favorite')[0].appendChild(optionTicket);

  
}


function deleteFavorite(bookId) {

  fetch(`/bookmark/${bookId}`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      }

    ).then((res) => {
      console.log('deleted')
    }).catch(function () {
      console.log('Error occurred, please try again')
    })
}