// Store application cache as a handy short variable
var appCache = window.applicationCache;
// Only run if the appCache isn't busy
if (appCache.status === appCache.IDLE) {
  // Force check for an update
  appCache.update();
}
// Check for an available cache update
if (appCache.status === appCache.UPDATEREADY) {
  // Save the new content to the cache
  appCache.swapCache();
}
// Listen for updates
appCache.addEventListener('updateready', function(e) {
  // Reload the page when the cache is updated
  window.location.reload();
});

// ----- Counter stuff

// Get the buttons and the count display
var incDom = document.querySelector('.increment');
var decDom = document.querySelector('.decrement');
var count = document.querySelector('.count');
// Initialise the counter
var model = 0;

var storedModel = window.localStorage.getItem('model');
// Check if there's a storedModel
if (storedModel) {
  // Variables coming from localStorage are always strings so we'll need to
  // turn it into a number if we want to use it with our counter
  model = Number(storedModel);
  // Update the counter
  update(model, count);
}

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
  window.localStorage.setItem('model', model);
}

// Increment the counter when there's a click event on the + button
incDom.addEventListener('click', function() {
  update(inc(model), count);
});

// decrement the counter when there's a click event on the - button
decDom.addEventListener('click', function() {
  update(dec(model), count);
});

// get the online status element from the DOM
var onlineStatusDom = document.querySelector('.online-status');
// navigator.onLine will be true when online and false when offline. We update the text in the online status element in the dom to reflect the online status from navigator.onLine
if (navigator.onLine) {
  onlineStatusDom.textContent = 'online';
} else {
  onlineStatusDom.textContent = 'offline';
}

// we use the 'online' and 'offline' events to update the online/offline notification to the user
// in IE8 the offline/online events exist on document.body rather than window, so make sure to reflect that in your code!
window.addEventListener('offline', function(e) {
  onlineStatusDom.textContent = 'offline';
});

window.addEventListener('online', function(e) {
  onlineStatusDom.textContent = 'online';
});

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    inc: inc,
    dec: dec,
    update: update,
  };
}
