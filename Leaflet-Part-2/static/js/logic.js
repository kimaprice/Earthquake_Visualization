//Earthquake GeoJSON data
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Plate GeoJson data
const link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

// get the earthquake geojson
d3.json(queryUrl).then(function (data) {
  // Getting the tectonic plate GeoJSON data
  d3.json(link).then(function(platedata) {
  // call the function to create the map layers and map
  createFeatures(data.features, platedata.features);
  });
});

function createFeatures(earthquakeData, platedata) {

  // create the popup for each feature
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3>
    <hr>
    <p>Magnitude: ${feature.properties.mag}
    <br>Date: ${new Date(feature.properties.time)}
    <br>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  // create the earthquake later with circle markers for features
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          // call function to set size of the feature marker
          radius: calcSize(feature.properties.mag),
          // call function to set color of the feature marker
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

    // techtonic plate style object
    let plateStyle = {
      color: "red",
      fillOpacity:0,
      weight: 1.5
    };
  
    // create the tectonic plate layer
    let plates = L.geoJson(platedata, {
      // Passing in our style object
      style: plateStyle
    });

  // Send earthquakes and tectonic plates layers to the createMap function
  createMap(earthquakes, plates);
}

function createMap(earthquakes, plates) {

  // Create the street map base layer
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // create the topographic map base layer
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });



  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": plates
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, plates, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // add legend
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
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
  //set null values to 0
  size = size || 0;
  return size;
}