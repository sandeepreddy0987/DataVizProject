
mapboxgl.accessToken = 'pk.eyJ1Ijoic3ItdGFuZHJhIiwiYSI6ImNrY2NiaGJ6bTAzMTQyem1qc3RydGt4NDkifQ.YSHftnk-ziifBvYf6xY7wA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/sr-tandra/ckcxzk15h1cxr1hnq6jf1qahm',
center: [-97.2591,68.8929],
minZoom: 1,
attributionControl: false,
zoom: 2
});

 var stateLegendEl = document.getElementById('state-legend');

map.on('load', function() {
map.addSource('states', {
'type': 'geojson',
'data': 'mapgeo.json'


});
map.addLayer({
'id': 'states-layer',
'type': 'fill',
'source': 'states',
'paint': {
'fill-color': [
'interpolate',
['linear'],
['get', 'Cases'],
0,
'#F2F12D',
1000,
'#EED322',
5000,
'#E6B71E',
10000,
'#DA9C20',
15000,
'#CA8323',
20000,
'#B86B25'
],
'fill-opacity': 0
}
},
'waterway-label'
);

var popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
// When a click event occurs on a feature in the states layer, open a popup at the
// location of the click, with description HTML from its properties.
map.on('mousemove', 'states-layer', function(e) {
popup
.setLngLat(e.lngLat)
.setHTML([e.features[0].properties.name,'Cases',e.features[0].properties.Cases])
.addTo(map);

});
map.on('click', 'states-layer', function(e) {
    popup
    .setLngLat(e.lngLat)
    .setHTML([e.features[0].properties.name,'Cases',e.features[0].properties.Cases])
    .addTo(map);
    show(e.features[0].properties.name)
    });
map.on('mouseleave', 'states-layer', function() {
map.getCanvas().style.cursor = '';
popup.remove();
});
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'states-layer', function() {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'states-layer', function() {
map.getCanvas().style.cursor = '';
});
})
