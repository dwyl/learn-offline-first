# Learn offline first
Learn how to build web apps that can be used offline!

## What?

Offline first web applications are websites which make offline functionality a priority.
But what does that actually mean? It means we use the browser's ability to store data on the local device to make your web application work offline.

## Why?

The majority of people using the web are using mobile devices, and mobile devices mean that an internet connection will not always be available. By making web applications that are offline first we can make it so that our users can use our app without worrying about accidentally refreshing the page and getting a 'Sorry you're offline' page from your browser.

Not only that, but it means that the second time someone visits your webpage, it will load instantly! (because the files are cached locally).

This means that even people who aren't using your app offline benefit from its offline first functionality. It means that people with poor or intermittent internet connections (the majority of people in the world) will have a more consistent, and better experience using our applications.

## How?

There are two widely used methods for offline first apps, **Service Workers** and **Application Cache**.

## Application Cache

**Advantages**:
- Supports all modern browsers including Safari (desktop and iOS)
- Easy to set up
- Can be combined with service workers

**Disadvantages**:
- As far as we know there's no way to make operations wait for a connection to be established - even when the website isn't open in browser - before actioning them. With service workers this is achieved using `background sync`.


### Static site

#### Step 1 - appcache
To make a site available offline you have to define which assets are cached in an `.appcache` file, then link the site to the appcache by including a `manifest` attribute in the application html. For example if our app contained three files - `index.html`, `styles.css` and `script.js` - then the `.appcache` and `.html` would look like this:

example.appcache
```
CACHE MANIFEST

CACHE:
index.html
styles.css
script.js

NETWORK:
*
```
index.html
```html
<!DOCTYPE html>
<html lang="en" manifeThe appcachest="example.appcache">
...
</html>
```

#### Step 2 - updating the cache
Really Step 1 is all that's required for an offline first static site.

But there's a big problem! If the site is updated between user visits, they won't get the new version until they refresh the page twice. **Far** from ideal.

To fix this, first you need to update your .appcache manifest file to prompt the browser to recache the files. Any change will force a re-cache even if it's just a comment, so one easy option is to include a version number as a comment in the manifest that can be updated each time the site is published.

**Comments in .appcache files start with a `#`**

The next step is to add some javascript to your app to force it to check for an update to the manifest, and if that update exists, refresh the page:

```js
var appCache = window.applicationCache;
// Only run if the appCache isn't busy
if (appCache.status === appCache.IDLE) {
  // Force the app to check for an update
  appCache.update();
}
// Check for a cache update
if (appCache.status === appCache.UPDATEREADY) {
  // Set the page cache to the new content on page load
  appCache.swapCache();
}
// Listen for updates
appCache.addEventListener('updateready', function(e) {
  // Reload the page when there's an update
  window.location.reload();
});
```

### Storing data
Although the code we've seen so far works **really well** for static sites, it's a lot less useful for apps with dynamic saved data. For this we'll need to access the browser's internal storage.

#### Local storage
As we're using Application Cache (great browser support :tv:) we'll go for Local Storage (great browser support :computer:). [See below](#Options-for-storing-application-state-locally) for more information on the other available options for storing data in the browser.

Local storage has a very simple interface incapsulated in the following snippet of code:

```js
// Sets a key (greeting) and value (hello) to the browser's local storage
localStorage.setItem("greeting", "Hello");
// Retrieves the value of the given key
var greeting = localStorage.getItem("greeting");
console.log(greeting); // Hello
```

#### Options for storing application state locally

In our example we've used localstorage as it has awesome :heart_eyes: browser compatibility and the api is quite straightforward to use. However, there are more modern solutions to storing application state locally.
Local storage is not always the best solution as it can be limited to 1mb of storage on some browsers, it can only store strings (or, anything that you stringify), it's a basic key value storage system so you can only _replace_ a key/value pair and not update the value of a key (inefficient), and it's synchronous, so it blocks the thread (everything else in your code has to wait until local storage has finished its business).

There's also IndexedDB, but browser support for this is patchy :(
A good option is using an API which wraps IndexedDB and local storage together, and where available will use IndexedDB, but in its abscence will use local storage, all with one syntax so you don't have to worry about which to use.

Options for these include:
+ PouchDB
+ LocalForage
+ ydn-db
+ Lawnchair

PouchDB and LocalForage both use [promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises) which still have patchy browser support, so aren't always the best option, ydn-db uses quite confusing syntax which is very SQL-like and can be a bit much when you're getting your head around local storage, and Lawnchair, though focused on simple JSON storage, and nice and tiny, the syntax can be a little much when just starting with offline first apps.

To start with, we'd reccomend using local storage, like we have in our example, and when you're comfortable with that, have a play with some of the APIs to see which you feel fits your needs the best.


```js
// TODO add instructions for adding local storage.
// TODO add further reading resources
// TODO add service worker instructions
// TODO UP THAT TEST COVERAGE
```
