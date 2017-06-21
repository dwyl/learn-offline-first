// ----- Counter stuff

// Get the buttons and the count display
var incDom = document.querySelector('.increment');
var decDom = document.querySelector('.decrement');
var count = document.querySelector('.count');

// Increment the counter when there's a click event on the + button
incDom.addEventListener('click', function() {
  update(inc(model), count);
});

// decrement the counter when there's a click event on the - button
decDom.addEventListener('click', function() {
  update(dec(model), count);
});

// Initialise the counter
var model = 0;

// Increment the counter
function inc(model) {
  return model + 1;
}

// Decrement the counter
function dec(model) {
  return model - 1;
}

// Update both the counter and the model
function update(newModel, element) {
  model = newModel;
  element.textContent = model;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    inc: inc,
    dec: dec,
    update: update,
  };
}
