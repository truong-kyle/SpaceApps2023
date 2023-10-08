let lon, lat;
let fireData;
let fireTable;

//Load photo preview to website
document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    }
  });

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/layers/CSVLayer",
  "esri/widgets/FeatureTable",
], function createMap(
  esriConfig,
  Map,
  MapView,
  WebMap,
  CSVLayer,
  FeatureTable
) {
  esriConfig.apiKey =
    "AAPK101c1da92fd04726bf5ae7fe970498b6o2firELRrWuWVf5OCBzJI44u30pM0xMFryOb_l3GvIvA71cneC1K7xHM275jrvhh"; //Personal ArcGIS API Key

  // const map = new WebMap({
  //   portalItem: {
  //     // id for webmap
  //     id: "b7f7248553d84c37b8c823eff8562407",
  //   },
  // });

  const map = new Map({
    basemap: "arcgis-topographic",
  });

  const view = new MapView({
    map: map,
    center: [-79.41866, 43.678352], // Longitude, latitude
    zoom: 5, // Zoom level
    container: "photoDiv",
  });

  fireData = new CSVLayer({
    url: "https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Canada/38d8ba6269c446d2bf9389a265fdd8cb/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_modis_7days&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv",
    copyright: "NASA FIRMS",
  });
  map.add(fireData);

  fireTable = new FeatureTable({
    view: view,
    layer: fireData,
    highlightOnRowSelectEnabled: false,
    fieldConfigs: [
      {
        name: "longitude",
        label: "Longitude",
      },
      {
        name: "latitude",
        label: "Latitude",
      },
    ],
    container: document.getElementById("tableDiv"),
    
    // visible: false
  });


});

  
function getcoords() {
  console.log(lon);
  console.log(lat);
  console.log(fireData.FeatureTable(isTable())) ;
}

//Upload image to retrieve data
function uploadImage() {
  const formData = new FormData();
  const imageInput = document.getElementById("imageInput");

  formData.append("photo", imageInput.files[0]);

  // Read information from server.js, print coordinates to text.
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "result"
      ).textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
      lon = data.longitude;
      lat = data.latitude;
      getcoords();
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").textContent = "No geotag data found";
    });
}
