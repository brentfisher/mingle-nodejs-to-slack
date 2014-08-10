document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      window.cards = document.querySelectorAll('#cards-wrapper .card');
      window.lanes = document.querySelectorAll('#cards-wrapper .lane');
      addDragAndDropListeners(cards, lanes);
    }
};

function addDragAndDropListeners(cards, lanes) {
  addCardListeners(cards);
  addLaneListeners(lanes);
};

var addCardListeners = function (cards) {
  Array.prototype.forEach.call(cards, function(card) {
    card.addEventListener('dragstart', handleDragStart, false);
    card.addEventListener('dragover', handleDragOver, false);
    card.addEventListener('drop', handleDrop, false);
    card.addEventListener('dragend', handleDragEnd, false);
  });
};

var addLaneListeners = function (lanes) {
  Array.prototype.forEach.call(lanes, function(lane) {
    lane.addEventListener('dragenter', handleDragEnter, false);
    lane.addEventListener('dragleave', handleDragLeave, false);
  });
};

function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
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

  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.style.opacity = '1.0';
}

