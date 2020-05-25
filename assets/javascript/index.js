
function getAirports(value){
   
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "cf75ecbd7dmsh76f1f68906a6bd8p1f9fccjsndbf26ec289ab"
        }
    })
    .then(response => response.json().then((data) => console.log(data)))
    .catch(err => {
        console.log(err);
    });

}

let input = document.getElementsByClassName('content__choose_plane_dest-from')[0];
input.addEventListener('keypress', function(){
    getAirports(input.value);
});

document.getElementsByClassName('content__transport_btn-plane')[0].addEventListener('click', function(){
    document.getElementsByClassName('content__choose')[0].style.display = "flex";
    document.getElementsByClassName('content__choose_car')[0].style.display = "none";
    document.getElementsByClassName('content__choose_plane')[0].style.display = "flex";
})
document.getElementsByClassName('content__transport_btn-car')[0].addEventListener('click', function(){
    document.getElementsByClassName('content__choose')[0].style.display = "flex";
    document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
    document.getElementsByClassName('content__choose_car')[0].style.display = "flex";
})