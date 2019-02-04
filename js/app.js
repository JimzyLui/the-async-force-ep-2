const d = document;
const main = d.getElementById("contentContainer");

let h2 = d.createElement("h2");
let p1 = d.createElement("p");
let p2 = d.createElement("p");
let searchResults = d.createElement("div");
searchResults.id = "searchResults";
searchResults.classList.add("container");

const clearScreen = () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  h2.innerHTML = "";
  p1.innerHTML = "";
  p2.innerHTML = "";
};
const clearSearch = () => {
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }
};

const cResourceType = d.getElementById("resourceType");
cResourceType.addEventListener("change", clearScreen);
arrPlanets = [];
arrPersons = [];
arrStarships = [];

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(data) {
    const resData = JSON.parse(data.target.responseText);
    callback(resData);
  });
  oReq.open("GET", url);
  oReq.send();
};

const processObjPersonById = function(event) {
  processObjPerson(arrPersons[event.target.id]);
};

const processObjPerson = oPerson => {
  clearSearch();
  // Name
  h2.innerHTML = "Name: " + oPerson.name;

  // Gender
  p1.innerHTML = "<b>Gender: </b>" + oPerson.gender;

  // Species
  request(oPerson.species, function(data) {
    console.log("data", data);
    p2.innerHTML = "<b>Species: </b>" + data.name;
  });
};

const processObjPlanetById = function(event) {
  processObjPlanet(arrPlanets[event.target.id]);
};

const processObjPlanet = oPlanet => {
  clearSearch();
  // Name
  h2.innerHTML = "Planet: " + oPlanet.name;

  // Terrain
  p1.innerHTML = "<b>Terrain: </b>" + oPlanet.terrain;

  // Population
  p2.innerHTML = "<b>Population: </b>" + oPlanet.population;

  // FilmList
  const arrFilmUrls = oPlanet.films;
  if (arrFilmUrls.length > 0) {
    const pFilmsHeading = d.createElement("div");
    pFilmsHeading.id = "pFilmsHeading";
    pFilmsHeading.classList.add("heading");
    pFilmsHeading.innerHTML = "Films: ";
    const ulFilmList = d.createElement("ul");
    arrFilmUrls.forEach(function(url) {
      request(url, function(data) {
        console.log("film Data", data);
        const liFilm = d.createElement("li");
        liFilm.classList.add("film");
        const h2FilmTitle = d.createElement("div");
        h2FilmTitle.classList.add("filmTitle");
        h2FilmTitle.innerHTML = data.title;

        liFilm.appendChild(h2FilmTitle);
        ulFilmList.appendChild(liFilm);
      });
    });
    main.appendChild(pFilmsHeading);
    main.appendChild(ulFilmList);
  }
};

const btnSubmit = d.getElementById("requestResourceButton");
const displayData = () => {
  clearScreen();
  clearSearch();
  arrPersons = [];
  arrPlanets = [];
  searchResults = d.createElement("div");
  searchResults.id = "searchResults";
  searchResults.classList.add("container");
  main.appendChild(searchResults);
  const resourceType = d.getElementById("resourceType").value;
  console.log("resourceType: ", resourceType);
  const resourceIdValue = d.getElementById("resourceId").value; // what is typed in

  switch (resourceType) {
    case "people":
      request("https://swapi.co/api/people", function(data) {
        console.log("data", data);
        // DOM MANIPULATING CODE HERE
        arrPersons = data.results.filter(
          o => o.name.toLowerCase().indexOf(resourceIdValue.toLowerCase()) > -1
        );

        switch (arrPersons.length) {
          case 0:
            // no data
            main.innerHTML = "No persons matched " + resourceIdValue + "!";
            break;
          case 1:
            const oPerson = arrPersons.pop();
            processObjPerson(oPerson);
            break;
          default:
            const divSearchHeading = d.createElement("div");
            divSearchHeading.id = "divSearchHeading";
            divSearchHeading.classList.add("heading");
            divSearchHeading.innerHTML = "Search Results: ";
            searchResults.appendChild(divSearchHeading);

            arrPersons.forEach((o, idx) => {
              const c = d.createElement("div");
              c.innerHTML = o.name;
              c.id = idx;
              c.classList.add("searchResult");
              c.addEventListener("click", processObjPersonById);
              console.log(c);
              searchResults.appendChild(c);
            });
        }
      });
      break;
    case "planets":
      if (!resourceIdValue) return;
      request("https://swapi.co/api/planets", function(data) {
        console.log("data", data);
        arrPlanets = data.results.filter(
          o => o.name.toLowerCase().indexOf(resourceIdValue.toLowerCase()) > -1
        );
        switch (arrPlanets.length) {
          case 0:
            // no data
            main.innerHTML = "No planets matched " + resourceIdValue + "!";
            break;
          case 1:
            const oPlanet = arrPlanets.pop();
            processObjPlanet(oPlanet);
            break;
          default:
            const divSearchHeading = d.createElement("div");
            divSearchHeading.id = "divSearchHeading";
            divSearchHeading.classList.add("heading");
            divSearchHeading.innerHTML = "Search Results: ";
            searchResults.appendChild(divSearchHeading);
            arrPlanets.forEach((o, idx) => {
              const c = d.createElement("div");
              c.innerHTML = o.name;
              c.id = idx;
              c.classList.add("searchResult");
              c.addEventListener("click", processObjPlanetById);
              console.log(c);
              searchResults.appendChild(c);
            });
            break;
        }
      });
      break;
    case "starships":
      // Name
      h2.innerHTML = "starships";
      // Manufacturer
      p1.innerHTML = "Manufacturer";
      // Starship Class
      p2.innerHTML = "Starship";
      // FilmList
      break;
  }
  main.appendChild(h2);
  main.appendChild(p1);
  main.appendChild(p2);
  console.log("appended");
};

btnSubmit.addEventListener("click", displayData);
