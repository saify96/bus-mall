let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let leftIndex;
let middletIndex;
let rightIndex;
let attempts = 1;
let arrOfnames=[];
let arrOfShown=[];
let arrOfVotes=[];
let productsArr=[];
Products.array = [];

function Products (prodName,path){
  this.prodName=prodName;
  this.path=path;
  this.counter=0;
  this.numbers=0;
  productsArr.push(this);
  arrOfnames.push(this.prodName);
  Products.array.push(this);
//   console.log(this);
}

new Products('bag','../Images/bag.jpg' );
new Products('banana','../Images/banana.jpg' );
new Products('bathroom','../Images/bathroom.jpg' );
new Products('boots','../Images/boots.jpg' );
new Products('bubblegum','../Images/bubblegum.jpg' );
new Products('chair','../Images/chair.jpg' );
new Products('cthulhu','../Images/cthulhu.jpg' );
new Products('dog-duck','../Images/dog-duck.jpg' );
new Products('dragon','../Images/dragon.jpg' );
new Products('pet-sweep','../Images/pet-sweep.jpg' );
new Products('scissors','../Images/scissors.jpg' );
new Products('shark','../Images/shark.jpg' );
new Products('sweep','../Images/sweep.png' );
new Products('tauntaun','../Images/tauntaun.jpg' );
new Products('unicorn','../Images/unicorn.jpg' );
new Products('usb','../Images/usb.gif' );
new Products('water-can','../Images/water-can.jpg' );
new Products('wine-glass','../Images/wine-glass.jpg' );


function genrateRandomIndex(){
  return Math.floor(Math.random() * productsArr.length);
}
let index =[];
function renderThreeImages(){
  leftIndex =genrateRandomIndex();
  middletIndex =genrateRandomIndex();
  rightIndex =genrateRandomIndex();
  while (leftIndex === middletIndex || leftIndex === rightIndex || middletIndex === rightIndex || index.includes(leftIndex) || index.includes(rightIndex) || index.includes(middletIndex)){
    leftIndex =genrateRandomIndex();
    middletIndex =genrateRandomIndex();
    rightIndex =genrateRandomIndex();
  }
  index =[leftIndex,middletIndex,rightIndex];

  // for ( let i =0 ; i<index.length;i++){
  //   while ( leftIndex === index[i] || middletIndex === index[i] || rightIndex === index[i]){
  //     leftIndex =genrateRandomIndex();
  //     middletIndex =genrateRandomIndex();
  //     rightIndex =genrateRandomIndex();
  //   }
  // }
  // console.log(index);
  productsArr[leftIndex].counter++;
  productsArr[middletIndex].counter++;
  productsArr[rightIndex].counter++;

  leftImageElement.setAttribute('src', productsArr[leftIndex].path );
  middleImageElement.src = productsArr[middletIndex].path ;
  rightImageElement.src = productsArr[rightIndex].path ;
}


let imgs = document.getElementById('images');
imgs.addEventListener('click',counts);
// leftImageElement.addEventListener('click', counts );
// middleImageElement.addEventListener('click' , counts );
// rightImageElement.addEventListener('click' , counts);


let button;
function counts(event){
  console.log(event);
  if (event.target.id === 'left-image' ){
    productsArr[leftIndex].numbers++;
  }
  else if (event.target.id === 'middle-image' ){
    productsArr[middletIndex].numbers++;
  }
  else if(event.target.id === 'right-image' ){
    productsArr[rightIndex].numbers++;
  }
  else {
    prompt('press on one of the images');
  }

  if (attempts <5){
    renderThreeImages();
    attempts++;
  }
  else {
    leftImageElement.removeEventListener('click', counts );
    middleImageElement.removeEventListener('click' , counts );
    rightImageElement.removeEventListener('click' , counts);
    button = document.getElementById('results');
    button.addEventListener('click', results );
    // console.log(productsArr);

  }

}

function results(){
  let view = document.getElementById('view');
  let ul = document.createElement('ul');
  view.appendChild(ul);
  for ( let i=0 ; i<productsArr.length ; i++){
    arrOfShown.push(productsArr[i].counter);
    arrOfVotes.push(productsArr[i].numbers);
    saveToLocalStorage ();
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent= `${productsArr[i].prodName} had ${productsArr[i].numbers} votes, and was seen ${productsArr[i].counter} times.` ;
  }
  button.removeEventListener('click', results );
  barChart();
}

function barChart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrOfnames,
      datasets: [{
        label: 'Number Of votes',
        data: arrOfVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1
      },{
        label:'Number of shown',
        data: arrOfShown,
        backgroundColor:[
          'rgb(192,192,192)'
        ],
        borderWidth: 1
      }]
    }
  });
}

renderThreeImages();


function saveToLocalStorage (){
  let storageArr = JSON.stringify(Products.array);
  localStorage.setItem('productsData' , storageArr);
}


function gettingFromLocal (){
  let data = localStorage.getItem('productsData');
  let votes = JSON.parse(data);
  console.log(data);

  if(votes !== null){
  Products.array= votes;
  }
}
gettingFromLocal ();
