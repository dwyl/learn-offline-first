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
// Initialise the counter model
var model = 0;

var storedModel = window.localStorage.getItem('model');

if (storedModel) {
  model = Number(storedModel);
  update(model, count);
}

function inc(model) {
  return model + 1;
}

function dec(model) {
  return model - 1;
}

function update(newModel, element) {
  model = newModel;
  element.innerText = model;
}

incDom.addEventListener('click', function() {
  update(inc(model), count);
  window.localStorage.setItem('model', model);
});

decDom.addEventListener('click', function() {
  update(dec(model), count);
  window.localStorage.setItem('model', model);
});
