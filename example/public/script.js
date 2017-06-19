var appCache = window.applicationCache;

if (appCache) {
  appCache.update();
}
if (appCache.status === appCache.UPDATEREADY) {
  appCache.swapCache();
}
appCache.addEventListener('updateready', function(e) {
  window.location.reload();
});

// ----- Counter stuff

var incDom = document.querySelector('.increment');
var decDom = document.querySelector('.decrement');
var count = document.querySelector('.count');
var model = 0;

var storedModel = window.localStorage.getItem('model');

if (storedModel) {
  model = storedModel;
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
