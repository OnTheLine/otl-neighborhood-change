// set initial center point, zoom, and layers
var startCenter = [41.7647179, -72.671771]; // displays "Hartford" Esri label on downtown area
var minLatLng = [40.9301, -73.7238];
var maxLatLng = [42.0248, -71.7792];
var bounds = L.latLngBounds(minLatLng, maxLatLng);
var startZoom = 14;
var minZoom = 9;
var layer1 = 'magic1934';
var layer2 = 'esriPresent';

// define baselayers and insert further below, and also in index.html
// UConn MAGIC WMS settings - see http://geoserver.lib.uconn.edu:8080/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.MapPreviewPage
var magic1934 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1934 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">1934 MAGIC UConn</a> and <a href="http://cslib.org" target="_blank">CSL</a>'
});

var magic1990 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:1990 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">1990 MAGIC UConn</a>'
});

var magic2004 = new L.tileLayer.wms("http://geoserver.lib.uconn.edu:8080/geoserver/MAGIC/wms?", {
  layers: 'MAGIC:2004 Connecticut Aerial Photography',
  format: 'image/png',
  version: '1.1.0',
  transparent: true,
  attribution: '<a href="http://magic.library.uconn.edu" target="_blank">2004 MAGIC UConn</a>'
});

// https://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html
var esriImagery = L.esri.basemapLayer('Imagery');
var esriTransportation = L.esri.basemapLayer('ImageryTransportation');
var esriLabels = L.esri.basemapLayer('ImageryLabels');
var esriPresent = [esriImagery, esriTransportation, esriLabels];

// Check for permalink: If address string contains '#', process parameters after the '#'
var addr = window.location.href;

if (addr.indexOf('#') !== -1) {
  var sep = (addr.indexOf('&amp;') !== -1) ? '&amp;' : '&';
  var params = window.location.href.split('#')[1].split(sep);

  params.forEach(function(k) {
    z = k.split('=');

    switch (z[0]) {
      case 'zoom':
        startZoom = z[1];
        break;
      case 'lat':
        startCenter[0] = z[1];
        break;
      case 'lng':
        startCenter[1] = z[1];
        break;
      case 'layer1':
        layer1 = z[1];
        $('#map1basemaps option[value="' + layer1 + '"]').prop('selected', true);
        $('#map2basemaps option').removeAttr('disabled');
        $('#map2basemaps option[value="' + layer1 + '"]').prop('disabled', true);
        break;
      case 'layer2':
        layer2 = z[1];
        $('#map2basemaps option[value="' + layer2 + '"]').prop('selected', true);
        $('#map1basemaps option').removeAttr('disabled');
        $('#map1basemaps option[value="' + layer2 + '"]').prop('disabled', true);
        break;
      default:
        break;
    }
  });
}

// Insert basemap variables; return layer named s
function pickLayer(s) {
  switch (s) {
    case 'magic1934':
      return magic1934;
    case 'magic1990':
      return magic1990;
    case 'magic2004':
      return magic2004;
    case 'esriPresent':
      return esriPresent;
    default:
      return magic1934;
  }
}

// Create two maps
var map1 = L.map('map1', {
    layers: pickLayer(layer1),
    center: startCenter,
    zoom: startZoom,
    zoomControl: false,
    minZoom: minZoom,
    scrollWheelZoom: false,
    maxBounds: [minLatLng,maxLatLng]
});

var map2 = L.map('map2', {
    layers: pickLayer(layer2),
    center: startCenter,
    zoom: startZoom,
    minZoom: minZoom,
    zoomControl: false,
    scrollWheelZoom: false,
    maxBounds: [minLatLng,maxLatLng]
});

// customize link to view source code; add your own GitHub repository
map1.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/otl-neighborhood-change" target="_blank">code on GitHub</a>');
map2.attributionControl
.setPrefix('');

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map1);
L.control.zoom({position: "topright"}).addTo(map2);

L.control.scale().addTo(map2);

// Get your own free Mapzen search API key and see geocoder options at https://github.com/mapzen/leaflet-geocoder
// modified in style.css as leaflet-pelias-control
/*
L.control.geocoder('search-jBPBt5y', {
  attribution: null,
  bounds: bounds,
  placeholder: 'Search in Connecticut'
}).addTo(map2); */

var geocoder = L.Control.geocoder({
  expand: 'click',
  position: 'topright',
  geocoder: new L.Control.Geocoder.Nominatim({
    geocodingQueryParams: {
      viewbox: [],  // by default, viewbox is empty
      bounded: 0,
    }
  }),
}).addTo(map2);

function updateGeocoderBounds() {
  var bounds = map2.getBounds();
  var mapBounds = [
    bounds._southWest.lat, bounds._northEast.lat,
    bounds._southWest.lng, bounds._northEast.lng,
  ];
  geocoder.options.geocoder.options.geocodingQueryParams.viewbox = mapBounds;
}

// Update search viewbox coordinates every time the map moves
map2.on('moveend', updateGeocoderBounds);

// sync maps using Leaflet.Sync code
map1.sync(map2);
map2.sync(map1);

function changeBasemap(map, basemap) {
  var other_map = (map === 'map1') ? 'map2' : 'map1';
  var map = (map === 'map1') ? map1 : map2;

  // Disable selected layer on the neighbor map
  // (if two maps load the same layer, weird behavior observed)
  $('#' + other_map + 'basemaps option').removeAttr('disabled');
  $('#' + other_map + 'basemaps option[value="' + basemap + '"]').attr('disabled', 'disabled');

  // Remove the old layer(s) -- insert all basemap variables
  [esriImagery,
   esriTransportation,
   esriLabels,
   magic1934,
   magic1990,
   magic2004
 ].forEach(function(v) {
    map.removeLayer(v);
  });

  // Add appropriate new layer -- insert all basemap variables
  switch (basemap) {
    case 'esriPresent':
      map.addLayer(esriImagery);
      map.addLayer(esriTransportation);
      map.addLayer(esriLabels);
      break;
    case 'magic1934':
      map.addLayer(magic1934);
      break;
    case 'magic1990':
      map.addLayer(magic1990);
      break;
    case 'magic2004':
      map.addLayer(magic2004);
      break;
    default:
      break;
  }
}

// Set up to create permalink
$(document).ready(function() {
  $('#map1basemaps select').change(function() {
    changeBasemap('map1', $(this).val());
  });

  $('#map2basemaps select').change(function() {
    changeBasemap('map2', $(this).val());
  });

  // Generate permalink on click
  $('#permalink').click(function() {
    var zoom = map1._zoom;
    var lat = map1.getCenter().lat;
    var lng = map1.getCenter().lng;
    var layer1 = $('#map1basemaps select').val();
    var layer2 = $('#map2basemaps select').val();
    var href = '#zoom=' + zoom + '&lat=' + lat + '&lng=' +
                  lng + '&layer1=' + layer1 + '&layer2=' + layer2;
    // Update URL in browser
    window.location.hash = href;
    window.prompt("Copy with Cmd+C (Mac) or Ctrl+C", window.location.href);
  });

});
