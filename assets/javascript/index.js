/**ADDING EVENT LISTENERS ON BUTTONS PLANE AND CAR*/
function openFlightChooseWindow() {
  document.getElementsByClassName('content__choose_car')[0].style.display = "none";
  
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

  let carWrapper = document.createElement('div');
  carWrapper.classList.add('content__choose_car-wrapper');
  carWrapper.setAttribute('data-aos','fade-up');
  carWrapper.setAttribute('data-aos-duration','700');
  document.getElementsByClassName('content__choose')[0].appendChild(carWrapper);
  carWrapper.appendChild(document.getElementsByClassName('content__choose_car')[0])
  document.getElementsByClassName('content__choose_car')[0].style.display = "flex";
}

