document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      window.cards = document.querySelectorAll('#cards-wrapper .card');
      window.lanes = document.querySelectorAll('#cards-wrapper .lane');
      addDragAndDropListeners(cards, lanes);
    }
};

function addDragAndDropListeners(cards, lanes) {
  setUpCards(cards);
  setUpLanes(lanes);
};

var setUpCards = function (cards) {
  Array.prototype.forEach.call(cards, function(card) {
    addCardListeners(card);
  });
};

var setUpLanes = function (lanes) {
  Array.prototype.forEach.call(lanes, function(lane) {
    addLaneListeners(lane);
  });
}

var addLaneListeners = function (lane) {
  lane.addEventListener('dragenter', handleDragEnter, false);
  lane.addEventListener('dragleave', handleDragLeave, false);
  lane.addEventListener('drop', handleDrop, false);
  lane.addEventListener('dragover', handleDragOver, false);
}

var addCardListeners = function(card) {
  card.addEventListener('dragstart', handleDragStart, false);
  card.addEventListener('dragend', handleDragEnd, false);
}


function handleDragStart(e) {
  this.style.opacity = '0.4';
  var serializedObj = this.innerHTML;
  e.dataTransfer.setData('text/element', serializedObj);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  this.classList.remove('over');

  // See the section on the DataTransfer object.
  console.log('drop');
  var cardData = e.dataTransfer.getData('text/element')
  moveCard(cardData, this);

  return false;
}

function handleDragEnd(e) {
  this.parentElement.removeChild(this);
}

function moveCard(cardData, lane) {
  var element = document.createElement("div");
  element.classList.add("card");
  element.draggable = true;
  element.innerHTML = cardData;

  addCardListeners(element);
  lane.appendChild(element);
}
