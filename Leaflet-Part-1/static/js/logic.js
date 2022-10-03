//Earthquake GeoJSON data
const dataSource = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Create map object
let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
  });

//Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Get the data from the JSON
d3.json(dataSource).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
});

//Function to create circle and add to map
function addEarthquate(depth, magnitude, lat, long){
    let color = chooseColor(depth)
    let size = calcSize(magnitude)
    L.circle([lat, long], {
        color: color,
        fillColor: color,
        fillOpacity: 0.75,
        radius: size
    }).addTo(myMap);
}

//Function to chose the color for the earthquake marker
function chooseColor(depth) {
    if (depth <= 10 ) return "green";
    else if (depth <= 30) return "lightgreen";
    else if (depth <= 50) return "yellow";
    else if (depth <= 70) return "orange";
    else if (depth <= 90) return "darkorange";
    else return "red";
  }

//Function to calculate the size for the earthquake marker
function calcSize(magnitude) {
    let size = magnitude * 1.5;
    return size;
  }