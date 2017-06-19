var appCache = window.applicationCache;

appCache.update();

if (appCache.status === appCache.UPDATEREADY) {
  appCache.swapCache();
}
appCache.addEventListener('updateready', function(e) {
  window.location.reload();
});
