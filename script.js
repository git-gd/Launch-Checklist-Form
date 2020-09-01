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
      return name.value.trim().length < 1 || !name.value.match(/^[A-Za-z]+$/);
  }
  
  function invalidNum(num){
      return isNaN(num.value) || num.value.trim().length < 1;
  }

   function validateShuttle(){
      faultyItems.style.visibility = "visible";
      if (fuelLevel.value < 10000 || cargoMass.value > 10000 || invalidNum(cargoMass) || invalidNum(fuelLevel) || invalidName(pilot) || invalidName(copilot)) {
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      } else {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";

      }
  };

   pilot.addEventListener("change", function(){
      if (invalidName(pilot)){
         pilotStatus.innerHTML = `Pilot "${pilot.value}" is not a valid name`;
      } else {
         pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
      }
      validateShuttle();
   });

   copilot.addEventListener("change", function(){
      if (invalidName(copilot)){
         copilotStatus.innerHTML = `Co-Pilot "${copilot.value}" is not a valid name`;
      } else {
         copilotStatus.innerHTML = `Co-Pilot ${copilot.value} is ready for launch`;
      }
      validateShuttle();
   });

   fuelLevel.addEventListener("change", function(){
      if (invalidNum(fuelLevel)) {
         fuelStatus.innerHTML = "The fuel level is not valid";
      } else if (fuelLevel.value < 10000) {
         fuelStatus.innerHTML = "There is not enough fuel for the journey";
      } else {
         fuelStatus.innerHTML = "Fuel level is high enough for launch";
      }
      validateShuttle();
   });

   cargoMass.addEventListener("change", function(){
      if (invalidNum(cargoMass)){
         cargoStatus.innerHTML = "The cargo mass is not valid";
      } else if (cargoMass.value > 10000) {
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
      } else {
         cargoStatus.innerHTML = "Cargo mass is low enough for launch";
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
   
   // if any field has been set, validate the fields (this will happen if you reload the window)
   if (pilot.value.length > 0 || copilot.value.length > 0 || fuelLevel.value.length > 0 || cargoMass.value.length > 0 ){
      let event = new Event("change");

      pilot.dispatchEvent(event);
      copilot.dispatchEvent(event);
      fuelLevel.dispatchEvent(event);
      cargoMass.dispatchEvent(event);
   } else {
      // validating on change rather than submit means the default initialized text doesn't make sense
      pilotStatus.innerHTML = `Pilot "${pilot.value}" is not a valid name`;
      copilotStatus.innerHTML = `Co-Pilot "${copilot.value}" is not a valid name`;
      fuelStatus.innerHTML = "The fuel level is not valid";
      cargoStatus.innerHTML = "The cargo mass is not valid";
   }
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
