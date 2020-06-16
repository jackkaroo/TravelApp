/**ADDING EVENT LISTENERS ON BUTTONS PLANE AND CAR*/
function openFlightChooseWindow() {
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";
  document.getElementsByClassName('content__response')[0].style.display = "none";

  if(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0]) {
    document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0]);
    // if(document.getElementsByClassName('button-text')[0]) {
    //   document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('button-text')[1])
    // }
  }
  if(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]) {
    document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]);
  }
  
  if(document.getElementsByClassName('content__response_car-wrapper')[0]) {
    document.getElementsByClassName('content__response_car')[0].removeChild(document.getElementsByClassName('content__response_car-wrapper')[0])
  }

  if(document.getElementsByClassName('content__choose_plane-wrapper')[0]) {
    document.getElementsByClassName('content__choose')[0].appendChild(document.getElementsByClassName('content__choose_plane')[0]);
    document.getElementsByClassName('content__choose')[0].removeChild(document.getElementsByClassName('content__choose_plane-wrapper')[0]);
  }

  let planeWrapper = document.createElement('div');
  planeWrapper.classList.add('content__choose_plane-wrapper');
  planeWrapper.setAttribute('data-aos','fade-up');
  planeWrapper.setAttribute('data-aos-duration','700');
  document.getElementsByClassName('content__choose')[0].appendChild(planeWrapper);
  planeWrapper.appendChild(document.getElementsByClassName('content__choose_plane')[0])
  document.getElementsByClassName('content__choose_plane')[0].style.display = "flex";
 
}

function openCarChooseWindow() {
  document.getElementsByClassName('content__choose_plane')[0].style.display = "none";
  document.getElementsByClassName('content__response')[0].style.display = "none";

  if(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0]) {
    document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-first')[0]);
    // if(document.getElementsByClassName('button-text')[0]) {
    //   document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('button-text')[1])
    // }
  }
  if(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]) {
    document.getElementsByClassName('content__response_flight_items')[0].removeChild(document.getElementsByClassName('content__response_flight_items--wrapper-second')[0]);
  }
  
  if(document.getElementsByClassName('content__response_car-wrapper')[0]) {
    document.getElementsByClassName('content__response_car')[0].removeChild(document.getElementsByClassName('content__response_car-wrapper')[0])
  }
  
  if(document.getElementsByClassName('content__choose_car-wrapper')[0]) {
    document.getElementsByClassName('content__choose')[0].appendChild(document.getElementsByClassName('content__choose_car')[0]);
    document.getElementsByClassName('content__choose')[0].removeChild(document.getElementsByClassName('content__choose_car-wrapper')[0]);
  }

  let carWrapper = document.createElement('div');
  carWrapper.classList.add('content__choose_car-wrapper');
  carWrapper.setAttribute('data-aos','fade-up');
  carWrapper.setAttribute('data-aos-duration','700');
  document.getElementsByClassName('content__choose')[0].appendChild(carWrapper);
  carWrapper.appendChild(document.getElementsByClassName('content__choose_car')[0])
  document.getElementsByClassName('content__choose_car')[0].style.display = "flex";
}

function openLoginPage() {
  document.location.href = 'localhost:3000/auth/login-page';
}

