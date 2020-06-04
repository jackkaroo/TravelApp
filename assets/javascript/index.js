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
      console.log(response);
      response.forEach(element => {
        addListEntry(list, element)
      })
    }
  });

  xhr.open("GET", `https://tripadvisor1.p.rapidapi.com/airports/search?locale=en_US&query=${value}`);
  xhr.setRequestHeader("x-rapidapi-host", "tripadvisor1.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

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

