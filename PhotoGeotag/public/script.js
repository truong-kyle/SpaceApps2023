let photoLon,
  photoLat,
  csvVariable,
  fireVar = 0,
  locArray,
  randInt;

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

let FireMap = require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap", 
], function createMap(
  esriConfig,
  Map,
  MapView,
  WebMap,
  CSVLayer,
  FeatureTable
) {
  esriConfig.apiKey =
  gisAPI;

  const map = new WebMap({
    portalItem: {
      // id for webmap
      id: "b7f7248553d84c37b8c823eff8562407",
    },
  });

  // const map = new Map({
  //   basemap: "arcgis-topographic",
  // });

  view = new MapView({
    map: map,
    center: [-79.41866, 43.678352], // Longitude, latitude
    zoom: 5, // Zoom level
    container: "photoDiv",
  });
});

function getcoords() {
  console.log(photoLon);
  console.log(photoLat);
  let dataLat, dataLon;
  fetch(firmsAPI)
    .then((response) => response.text())
    .then((csvData) => {
      // Parse the CSV data
      const rows = csvData.split("\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index];
          return obj;
        }, {});
      });
      // Store the data in a variable for manipulation
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        dataLat = parseFloat(item.latitude);
        dataLon = parseFloat(item.longitude);
        if (
          Math.abs(dataLat - photoLat) < 0.2 &&
          Math.abs(dataLon - photoLon) < 0.2
        ) {
          locArray = `Fire Warning Detected at: ${dataLat}, ${dataLon}`
          console.log(locArray);
          view.goTo({
            center: [dataLon, dataLat],
            zoom: 13
          });
          break;
        }
        locArray = null;
      }
    });
}

//Upload image to retrieve data
function uploadImage() {
  const formData = new FormData();
  const imageInput = document.getElementById("imageInput");
  randInt = Math.floor(Math.random()*11)

  formData.append("photo", imageInput.files[0]);

  // Read information from server.js, print coordinates to text.
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").textContent = `${randInt}: Geotag data stored`;
      photoLon = data.longitude;
      photoLat = data.latitude;
      getcoords();
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").textContent = "No geotag data found";
    });
}

function checkFire(){
  console.log("Checking for Updates...")
  if(locArray){
    document.getElementById("result2").textContent = locArray;
  }
  else{
    document.getElementById("result2").textContent = "No Fire Warning Detected"
  }
}
let intervalID = setInterval(checkFire, 2000);
