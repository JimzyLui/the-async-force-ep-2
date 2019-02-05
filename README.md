# The-Async-Force-Ep-2

An **async** Exercise using **client side** XHR accessing the swapi API at https://swapi.co

## Excercise

_Remember to commit after each step._

A. Make a `/js` folder and create an `app.js` file in it.
B. In the `index.html` file, load `app.js` via script tags.
C. Use live-server to serve up the files to your browser.
D. Construct your XHR requests in the `app.js` file by scraping the value from the input field.
E. A request to the SWAPI api should be initiated when the button is clicked.
Information that comes back from the API should be displayed in
the body of the html. Additional html elements should be created to properly parse,
display and format the data in a presentable way.

1. If a `person` is requested, display the following information:
   - Name, in an `<h2>` tag
   - Gender, in an `<p>` tag
   - Species (only get the first species if there are multiple) (only display the name), in an `<p>` tag
2. If a `planet` is requested, display the following information:
   - Name, in an `<h2>` tag
   - Terrain, in an `<p>` tag
   - Population, in an `<p>` tag
   - a list of all Film names that this planet appeared in `<li>` tags wrapped in `<ul>`
3. If a `starship` is requested, display the following information:
   - Name, in an `<h2>` tag
   - Manufacturer, in an `<p>` tag
   - Starship Class, in an `<p>` tag
   - a list of all Film names that this starship appeared in `<li>` tags wrapped in `<ul>`

F. Display any xhr errors in the dom, so the user can see. For example, if a user inputs `99999` as an id, or `potato`. Display the error on the page.

Note: Go to https://swapi.co to preview the data that you will be requesting

### Demo

![demo](https://cloud.githubusercontent.com/assets/132562/21257053/d42ed6ac-c319-11e6-84e0-277f56342f20.gif)

## Hints

i. URL Fragments are the parts of a URL that an API Endpoint parses to tell the server what resource to retrieve.
ii. Slides on Async HTTP Request with XHR: http://slides.com/sgnl/xhr#/
iii. Documentation on 'XMLHttpRequest' method:
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
iv. Remember that this is a **client side** excercise which means that all the code will be executed via the browser's javascript runtime, which means that our global context is the 'window' object. Go ahead and type in 'window' in the browser console to inspect the methods on the 'window' object. In there you will find a method named 'XMLHttpRequest' which you will be using for this excercise.
