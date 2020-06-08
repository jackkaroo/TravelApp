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


