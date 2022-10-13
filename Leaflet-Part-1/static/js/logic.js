//Earthquake GeoJSON data
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data); 
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3>
    <hr>
    <p>Magnitude: ${feature.properties.mag}
    <br>Date: ${new Date(feature.properties.time)}
    <br>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: calcSize(feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }
        );
    },
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquakes]
  });

  // add legend
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    // define what is in the legend
    div.innerHTML += "<h4>Depth of Earthquake</h4>";
    div.innerHTML += '<i style="background: #133d0d"></i><span>Less than 0</span><br>';
    div.innerHTML += '<i style="background: #48a13b"></i><span>0 - 10</span><br>';
    div.innerHTML += '<i style="background: #b8db7f"></i><span>10 - 20</span><br>';
    div.innerHTML += '<i style="background: #edf283"></i><span>20 - 30</span><br>';
    div.innerHTML += '<i style="background: #a7b33e"></i><span>30 - 50</span><br>';
    div.innerHTML += '<i style="background: #f5c938"></i><span>50 - 70</span><br>';
    div.innerHTML += '<i style="background: #b37846"></i><span>70 - 90</span><br>';
    div.innerHTML += '<i style="background: #9e4e44"></i><span>Over 90</span><br>';

    return div;
  };

legend.addTo(myMap);

    
}

//Function to chose the color for the earthquake marker
function chooseColor(depth) {
    if (depth < 0 ) return "#133d0d";
    else if (depth <= 10) return "#48a13b";
    else if (depth <= 20) return "#b8db7f";
    else if (depth <= 30) return "#edf283";
    else if (depth <= 50) return "#a7b33e";
    else if (depth <= 70) return "#f5c938";
    else if (depth <= 90) return "#b37846";
    else return "#9e4e44";
  }

//Function to calculate the size for the earthquake marker
function calcSize(magnitude) {
    let size = Math.sqrt(magnitude) * 10;
    return size;
  }