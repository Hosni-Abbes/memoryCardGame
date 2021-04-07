window.onload = function (){
  let personName = prompt("Create Your Name");
  if (personName == "" || personName == null) {
    document.querySelector(".upper_bar span").textContent = "Uknown";
  } else {
    document.querySelector(".upper_bar span").textContent = personName;
  }
}

let gameContainer = document.querySelector('.game_container'),
    images = Array.from(gameContainer.children),  //array of images blocks
    order = [...Array(images.length).keys()];   //array from 0 to 11
    
    
    //call function shuffle and pass the order array into it
    shuffle(order);

//add order to images..
images.forEach((image, index) => {
  image.style.order = order[index];

  //add event click
  image.addEventListener("click", function () {
    //trigger function flipCards
    flipCards(image);
  });


});

//create function shuffle elements in array 
function shuffle(array){
  let length = array.length;

  while(length > 0) {
    let random = Math.floor(Math.random() * length);  //get random number from array
    length--;
    //shuffle indexes
    let temp = array[length];
    array[length] = array[random];
    array[random] = temp;
  }

  //return array
  return array;
}


//create function to flipp cards
function flipCards(clickedCard){
  //add class clicked 
  clickedCard.classList.add('clicked');
  //check flipped cards
  let flippedCards = images.filter(flippedCard => flippedCard.classList.contains('clicked'));
  //check if 2 images flipped
  if(flippedCards.length === 2) {
    //stop clicking on images 
    stopClick(); 
    //function check
    check(flippedCards[0], flippedCards[1]); 


  }
}

//create function to stop clicking o,n images
function stopClick(){
  //add claass stop_click on images container div
  gameContainer.classList.add('stop_click');
  //add timeout function to remove class stop click after 1 second
  setTimeout( () => {
    gameContainer.classList.remove('stop_click'); //remove classs stop click
  }, 1000); //1000 millisecond = 1 second
}

//create function to compare between two fliped images 
function check(firstImg, secondImg){
  if (firstImg.dataset.cards === secondImg.dataset.cards) { //check with the dataset 
    //remove claass clicked from the two images 
    firstImg.classList.remove('clicked');
    secondImg.classList.remove('clicked');
    //add class similar to these Two images
    firstImg.classList.add('similar');
    secondImg.classList.add('similar');    //similar class will take the same css property as clicked
  } else {
    //add time out then remove the class clicked to return the 2 cards on back face
    setTimeout(() => {
      firstImg.classList.remove('clicked');
      secondImg.classList.remove('clicked');
    }, 1000); //1second
  }
}