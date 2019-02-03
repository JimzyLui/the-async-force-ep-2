const d = document;
const resourceIdValue = d.getElementById("resourceId").value;
const btnSubmit = d.getElementById("requestResourceButton");
const displayData = () => {
  const main = d.getElementById("contentContainer");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const resourceType = d.getElementById("resourceType").value;
  console.log("resourceType: ", resourceType);

  const h2 = d.createElement("h2");
  const p1 = d.createElement("p1");
  const p2 = d.createElement("p2");
  switch (resourceType) {
    case "people":
      // Name
      h2.innerHTML = "people";
      // Gender
      p1.innerHTML = "Gender";
      // Species
      p2.innerHTML = "Species";
      break;
    case "planets":
      // Name
      h2.innerHTML = "planets";
      // Terrain
      p1.innerHTML = "Terrain";
      // Population
      p2.innerHTML = "Population";
      // FilmList
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
