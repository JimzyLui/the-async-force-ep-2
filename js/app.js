const d = document;
const main = d.getElementById("contentContainer");

const h2 = d.createElement("h2");
const p1 = d.createElement("p");
const p2 = d.createElement("p");

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(data) {
    const resData = JSON.parse(data.target.responseText);
    callback(resData);
  });
  oReq.open("GET", url);
  oReq.send();
};

const processObjPlanet = oPlanet => {
  // Name
  h2.innerHTML = "Planet: " + oPlanet.name;

  // Terrain
  p1.innerHTML = "<b>Terrain: </b>" + oPlanet.terrain;

  // Population
  p2.innerHTML = "<b>Population: </b>" + oPlanet.population;

  // FilmList
  const arrFilmUrls = oPlanet.films;
  if (arrFilmUrls.length > 0) {
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
    main.appendChild(ulFilmList);
  }
};

const btnSubmit = d.getElementById("requestResourceButton");
const displayData = () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const resourceType = d.getElementById("resourceType").value;
  console.log("resourceType: ", resourceType);
  const resourceIdValue = d.getElementById("resourceId").value; // what is typed in

  switch (resourceType) {
    case "people":
      request("https://swapi.co/api/people", function(data) {
        console.log("data", data);
        // DOM MANIPULATING CODE HERE
        const arrPerson = data.results.filter(
          o => o.name.toLowerCase().indexOf(resourceIdValue.toLowerCase()) > -1
        );
        if (arrPerson.length > 0) {
          const oPerson = arrPerson.pop();
          // Name
          h2.innerHTML = "Name: " + oPerson.name;

          // Gender
          p1.innerHTML = "<b>Gender: </b>" + oPerson.gender;

          // Species
          request(oPerson.species, function(data) {
            console.log("data", data);
            p2.innerHTML = "<b>Species: </b>" + data.name;
          });
        }
      });
      break;
    case "planets":
      if (!resourceIdValue) return;
      request("https://swapi.co/api/planets", function(data) {
        console.log("data", data);
        const arrPlanets = data.results.filter(
          o => o.name.toLowerCase().indexOf(resourceIdValue.toLowerCase()) > -1
        );
        if (arrPlanets.length > 0) {
          arrPlanets.forEach(o => {
            const c = d.createElement("div");
            c.innerHTML = c.name;
          });
          const oPlanet = arrPlanets.pop();
          processObjPlanet(oPlanet);
        } else {
          // no data
          main.innerHTML = "No planets matched " + resourceIdValue + "!";
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
