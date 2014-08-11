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


function handleDragStart(e) {
  this.style.opacity = '0.4';
  var serializedObj = this.innerHTML;
  e.dataTransfer.setData('text/element', serializedObj);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  console.log('drop');

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  this.classList.remove('over');

  var cardData = e.dataTransfer.getData('text/element')
  moveCard(cardData, this);

  return false;
}

function handleDragEnd(e) {
  this.parentElement.removeChild(this);
}

var moveCard = function(cardData, lane) {
  var element = document.createElement("div");
  element.classList.add("card");
  element.draggable = true;
  element.innerHTML = cardData;

  addCardListeners(element);
  lane.appendChild(element);
}

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
