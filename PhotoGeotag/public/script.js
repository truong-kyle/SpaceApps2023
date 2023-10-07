let lon, lat;

//Load photo preview to website
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    }
});

require(["esri/config", "esri/Map", "esri/views/MapView"], function createMap(esriConfig, Map, MapView) {
    esriConfig.apiKey = "AAPK101c1da92fd04726bf5ae7fe970498b6o2firELRrWuWVf5OCBzJI44u30pM0xMFryOb_l3GvIvA71cneC1K7xHM275jrvhh"; //Personal ArcGIS API Key

    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });
    const view = new MapView({
         map: map,
         center: [-79.418660, 43.678352], // Longitude, latitude
        zoom: 5, // Zoom level
        container: "photoDiv" // Div element
         });
        });

//Upload image to retrieve data
function uploadImage() {
    const formData = new FormData();
    const imageInput = document.getElementById('imageInput');

    formData.append('photo', imageInput.files[0]);

    // Read information from server.js, print coordinates to text.
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

