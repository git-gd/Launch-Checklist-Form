// Write your JavaScript code here!
function init(){
   const form      = document.querySelector("form");

   const pilot     = document.getElementById("pilotName");
   const copilot   = document.querySelector("input[name=copilotName]");
   const fuelLevel = document.querySelector("input[name=fuelLevel]");
   const cargoMass = document.querySelector("input[name=cargoMass]");

   const faultyItems   = document.getElementById("faultyItems");
   const pilotStatus   = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus    = document.getElementById("fuelStatus");
   const cargoStatus   = document.getElementById("cargoStatus");
   const launchStatus  = document.getElementById("launchStatus");

   const missionTarget = document.getElementById("missionTarget");

   let index = 0;

   function invalidName(name){
      return !name.value || !name.value.match(/^[A-Za-z]+$/);
  }
  
  function invalidNum(num){
      return isNaN(num.value) || !num.value;
  }

   function validateShuttle(){
      if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
          launchStatus.innerHTML = "Shuttle is ready for launch";
          launchStatus.style.color = "green";
      } else {
          launchStatus.innerHTML = "Shuttle not ready for launch";
          launchStatus.style.color = "red";
      }
  };

   pilot.addEventListener("change", function(){
      if (invalidName(pilot)){
         pilotStatus.innerHTML = `${pilot.value} is not a valid name`;
      } else {
         pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
      }
   });

   copilot.addEventListener("change", function(){
      if (invalidName(copilot)){
         copilotStatus.innerHTML = `${copilot.value} is not a valid name`;
      } else {
         copilotStatus.innerHTML = `Co-Pilot ${copilot.value} is ready for launch`;
      }
   });

   fuelLevel.addEventListener("change", function(){
      if (fuelLevel.value < 10000) {
         fuelStatus.innerHTML = "There is not enough fuel for the journey";
         faultyItems.style.visibility = "visible";
      } else {
         fuelStatus.innerHTML = "Fuel level high enough for launch";
      }
      validateShuttle();
   });

   cargoMass.addEventListener("change", function(){
      if (cargoMass.value > 10000) {
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         faultyItems.style.visibility = "visible";
      } else {
         cargoStatus.innerHTML = "Cargo mass low enough for launch";
      }
      validateShuttle();
   });

   form.addEventListener("submit", function(event){
      if (invalidName(pilot)){
         alert("A valid pilot name is required.");
         event.preventDefault();
      } else if (invalidName(copilot)){
         alert("A valid co-pilot name is required.");
         event.preventDefault();
      } else if (invalidNum(fuelLevel)){
         alert("Fuel Level must be a valid number.");
         event.preventDefault();
      } else if (invalidNum(cargoMass)){
         alert("Cargo Mass must be a valid number.")
         event.preventDefault();
      } else {
         if (launchStatus.style.color !== "green"){
            event.preventDefault();
         }
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const planets = json;

         missionTarget.innerHTML = `
         <ol id="planetOL">
         <li>Name: ${planets[index].name}</li>
         <li>Diameter: ${planets[index].diameter}</li>
         <li>Star: ${planets[index].star}</li>
         <li>Distance from Earth: ${planets[index].distance}</li>
         <li>Number of moons: ${planets[index].moons}</li>
         </ol>
         <img src=${planets[index].image} id="planetImg"></img>
         `;

         const planetOL  = document.getElementById("planetOL");
         const planetImg = document.getElementById("planetImg");

         planetImg.addEventListener("click", function(){
            index = (index + 1) % planets.length;
            planetOL.innerHTML = `
               <ol id="planetOL">
               <li>Name: ${planets[index].name}</li>
               <li>Diameter: ${planets[index].diameter}</li>
               <li>Star: ${planets[index].star}</li>
               <li>Distance from Earth: ${planets[index].distance}</li>
               <li>Number of moons: ${planets[index].moons}</li>
               </ol>`;
            planetImg.src = planets[index].image;
         });
   
      });
   });
}

window.onload = init;
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
