mapboxgl.accessToken =
  "pk.eyJ1Ijoia29vcmRpbmF0ZXMiLCJhIjoiMDgzRHJlYyJ9.s6MmnjRMGuaRgRg_efw6Zg";

var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/outdoors-v11",
  center: [175, -41],
  zoom: 6,
});
console.log(map);

//request URL: http://koordinates-tiles-a.global.ssl.fastly.net/services;key=YOUR_API_KEY/tiles/v4/layer=LAYER_ID/EPSG:RS/{z}/{x}/{y}.png

//https://koordinates.com/from/datafinder.stats.govt.nz/layer/92212/

const NZ_STAT_API_KEY = "3d78b0edcb904f298c10ff9d288d550b";
const LAYER_ID = "92212";
// Insert the Koordinates layer *below* the basemap labels + roads
map.on("load", function () {
  // Find the ID of the first symbol layer in the map style
  // We use this to insert our layer beneath roads/pois/labels/etc
  var firstSymbolId = map.getStyle().layers.find((l) => l.type === "symbol").id;

  map.addLayer(
    {
      id: "koordinates-earthquakes",
      type: "raster",
      source: {
        type: "raster",
        tiles: [
          // This is the XYZ template URL from the Koordinates layer
          // services page: https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/webservices/
          `https://koordinates-tiles-a.global.ssl.fastly.net/services;key=${NZ_STAT_API_KEY}/tiles/v4/layer=${LAYER_ID}/EPSG:3857/{z}/{x}/{y}.png`,
        ],
        tileSize: 256,
        maxzoom: 22,
        attribution:
          "<a href='https://labs.koordinates.com/layer/7328-new-zealand-earthquakes/'>New Zealand Earthquakes</a>",
      },
    },
    firstSymbolId // Insert the layer beneath the first symbol layer.
  );

  // When a click event occurs on a feature in the states layer, open a popup at the
  // location of the click, with description HTML from its properties.
  //var quakeMarker;
  // map.on("click", function (e) {
  //   // construct the query url
  //   let queryUrl = new URL(
  //     "https://labs.koordinates.com/services/query/v1/vector.json"
  //   );
  //   // documentation of parameters at https://help.koordinates.com/api/query-api/vector-query/
  //   let queryParams = {
  //     key: "1c6ead7c5174463eab66bcea1005233d", // Koordinates API Key
  //     layer: 7328, // Koordinates Layer ID
  //     x: e.lngLat.lng, // map click location
  //     y: e.lngLat.lat,
  //     max_results: 1, // find the closest result
  //     radius: 1000, // max. search distance 1km
  //     geometry: true, // Include geometry in the response
  //   };
  //   queryUrl.search = new URLSearchParams(queryParams);

  //   // make the API request
  //   fetch(queryUrl)
  //     .then(function (response) {
  //       if (!response.ok) {
  //         throw new Error("HTTP error, status = " + response.status);
  //       }
  //       return response.json();
  //     })
  //     .then(function (response) {
  //       // extract the first feature from the response
  //       const feature = response.vectorQuery.layers["7328"].features[0];
  //       console.log("Feature:", feature);

  //       if (feature === undefined) {
  //         // no features within 1km
  //         if (quakeMarker) {
  //           // remove marker from map
  //           quakeMarker.remove();
  //           quakeMarker = null;
  //         }
  //         return;
  //       }

  //       // position map marker
  //       if (!quakeMarker) {
  //         // add marker
  //         quakeMarker = new mapboxgl.Marker()
  //           .setLngLat(feature.geometry.coordinates)
  //           .addTo(map);
  //       } else {
  //         // move existing marker
  //         quakeMarker.setLngLat(feature.geometry.coordinates);
  //       }

  //       // create popup content
  //       let popupTemplate = document.getElementById("popup-template");
  //       let popupContent = document.importNode(popupTemplate.content, true);
  //       popupContent.querySelector(".origintime").textContent =
  //         feature.properties.origintime;
  //       popupContent.querySelector(".magnitude").textContent =
  //         feature.properties.magnitude;
  //       popupContent.querySelector(".depth").textContent =
  //         feature.properties.depth;

  //       // open map popup
  //       let popup = new mapboxgl.Popup({ anchor: "left", offset: 10 })
  //         .setDOMContent(popupContent)
  //         .setLngLat(feature.geometry.coordinates)
  //         .addTo(map);
  //     });
  // });
});
