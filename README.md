# Visualizations of Earthquakes in the last 7 days

## Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

I have used the avialable GeoJson files on [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to create a visualization of all of the earthquakes in the last 7 days using leaflet.


## Visualizations

### Part 1: Basic Earthquake visualization
The visualization loads centered on the United States with circles representing the locations of earthquakes in the past 7 days.  It contains the following features and data points:

* The color of each circle represents the depth of the earthquake (see the legend on the visualization)

* The size of the circle represents the magnitude of the earthquake

* When you click on one of the circles a popup boxs displays providing the location, date, magnitude and depth of the selected earthquake.


### Part 2: Earthquake visualization with added features
The visualization loads centered on the United States with circles representing the locations of earthquakes in the past 7 days and the tectonic plates outlined in red.  It contains the following features and data points:

* The color of each circle represents the depth of the earthquake (see the legend on the visualization)

* The size of the circle represents the magnitude of the earthquake

* The tectonic plates of the earth's crust are drawn in red on the map

* When you click on one of the circles a popup boxs displays providing the location, date, magnitude and depth of the selected earthquake.

* There are multiple layers to the map that you can click on or off in the control in the upper right of the screen.

    *  Street Layer - this sets the underlying map to show the map in a street map style
    *  Topographic Layer - this sets the underlying map to show the map in a topographic map style
     *  Earthquake Layer - this allows the user to toggle on/off the earthqauke ciricles
    *  Tectonic Plate Layer - this allows the user to toggle on/off the outline of the tectonic plates


## References
* GeoJson for tectonic plates:  <https://github.com/fraxen/tectonicplates>.
* GeoJson for earthquake data: [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) 
