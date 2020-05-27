
function addListEntry(list, value, text) {
    var optionNode =  document.createElement("option");
    optionNode.value = value;
    optionNode.appendChild(document.createTextNode(text));
    document.getElementById(list).appendChild(optionNode);
}

function getAirports(list, value){
    var xhr = new XMLHttpRequest();
   
    xhr.open("GET", `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${value}`);
    xhr.setRequestHeader("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab");

    // Setup an "event listener".
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400){
            var response = JSON.parse(this.responseText);

            Object.values(response)[0].forEach(element => {
                addListEntry(list, element.PlaceName, "Country: " + element.CountryName);
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