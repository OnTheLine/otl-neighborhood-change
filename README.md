# otl-neighborhood-change
Side-by-side aerial views of Connecticut neighborhood change, 1934-present. Leaflet synchronized dual maps to display basemaps of same location over time, with geosearch and permalink features

## Link
- https://ontheline.github.io/otl-neighborhood-change/index-frame.html

## Embed in [On The Line book](http://OnTheLine.trincoll.edu)
```
<iframe src="https://ontheline.github.io/otl-neighborhood-change/index.html" width=100% height = 450></iframe>
```

## Based on template
- https://github.com/jackdougherty/leaflet-map-sync/

Replaces 2012 UConn MAGIC Google Map http://magic.lib.uconn.edu/otl/dualcontrol_aerialchange.html

## Credits and dependencies
- Thanks @ilyankou for adding basemap switcher control, permalink control, maximum bounds
- jQuery https://jquery.com/
- Esri Leaflet for Esri imagery and labels https://github.com/Esri/esri-leaflet/
- Leaflet control geocoder to search locations https://github.com/perliedman/leaflet-control-geocoder
- L.Map.Sync v0.2.2 to synchronize map movements https://github.com/turban/Leaflet.Sync

## Known issues
- Console warning: Mixed content (http served over https). Asked UConn MAGIC about future https support for WMS server or alternate map source.
