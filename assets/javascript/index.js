
function addListEntry(list, place, name, id) {
  let optionNode =  document.createElement("option");
  optionNode.value = place;
  optionNode.setAttribute('data-id',`${id}`)
  optionNode.appendChild(document.createTextNode(name));
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
          addListEntry(list, element.PlaceName, "Country: " + element.CountryName, element.PlaceId);
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

document.getElementsByClassName('content__transport_btns-plane')[0].addEventListener('click', function(){
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "flex";
})
document.getElementsByClassName('content__transport_btns-car')[0].addEventListener('click', function(){
  document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content__choose_car')[0].style.display = "flex";
})


document.getElementsByClassName('content__choose_plane-btn')[0].addEventListener('click', function(){
  
  
  /*document.getElementsByClassName('content__choose')[0].style.display = "flex";
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";*/


  /*let idFrom="";
  let idTo="";
  let option = document.getElementsByTagName('option');
  
  for(let i=0;i<=10;i++){
    if (option[i].value===airportFrom.value) console.log(idFrom=option[i].getAttribute('data-id'));
    else if (option[i].value===airportTo.value) console.log(idTo=option[i].getAttribute('data-id'));
  }

  let data = null;

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        let response = JSON.parse(this.responseText);
        console.log(response)
      }
  });


  xhr.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/%7Boriginplace%7D/JFK-sky/2020-12-01?inboundpartialdate=2020-12-03");
  xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

  xhr.send(data);*/

  let idFrom="";
  let idTo="";
  let dateFrom=document.getElementById('date_timepicker_start').value;
  let dateTo=document.getElementById('date_timepicker_end').value;
  let option = document.getElementsByTagName('option');

  console.log(dateFrom)

  
  for(let i=0;i<option.length;i++){
    if (option[i].value===airportFrom.value) idFrom = option[i].getAttribute('data-id').toLowerCase();
    if (option[i].value===airportTo.value) idTo = option[i].getAttribute('data-id').toLowerCase();
  }

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let response = JSON.parse(this.responseText);
      console.log(response)
    }
  });

  xhr.open("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/UA/uah/en-US/${idFrom}/${idTo}/2020-09-17`);
  xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

  xhr.send();



})

