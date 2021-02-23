# otl-neighborhood-change
Side-by-side aerial views of Connecticut neighborhood change, 1934-present. Leaflet synchronized dual maps to display basemaps of same location over time, with geosearch and permalink features

## Live map
https://ontheline.github.io/otl-neighborhood-change/index-caption.html

## Credits
Leaflet map developed by Ilya Ilyankou and Jack Dougherty for On The Line, http://OnTheLine.trincoll.edu, Trinity College, Hartford CT

Replaces 2012 UConn MAGIC Google Map http://magic.lib.uconn.edu/otl/dualcontrol_aerialchange.html

## Sources
1934 Connecticut Aerial Photography provided by the Connecticut State Library, on MAGIC Web Mapping Service (WMS), http://magic.lib.uconn.edu/help/help_WMS.htm

1990, 2004 imagery provided by the Connecticut Ecological Conditions Online (CT ECO) Web Map Services, http://cteco.uconn.edu/help/faq_map_service.htm#wms

## Dependencies
- Leaflet https://leafletjs.com
- jQuery https://jquery.com/
- Esri Leaflet for Esri imagery and labels https://github.com/Esri/esri-leaflet/
- L.Map.Sync v0.2.4 to synchronize map movements https://github.com/turban/Leaflet.Sync

## Known issues
- Console warning: Mixed content (http served over https). Asked UConn MAGIC about future https support for WMS server or alternate map source.
