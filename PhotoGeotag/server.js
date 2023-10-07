const express = require('express');
const multer = require('multer');
const exif = require('exif').ExifImage;

const app = express();
const port = 3000;

let lat, lon; // Location to be grabbed by EXIF

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(express.static('public'));
//
app.post('/upload', upload.single('photo'), (req, res) => {
    try {
        new exif({ image: req.file.buffer }, function (error, exifData) {
            if (error) {
                res.send('Error: ' + error.message);
            } else {
                const gps = exifData.gps;
                if (gps.GPSLatitude && gps.GPSLongitude) {
                    let lat = gps.GPSLatitude[0] + gps.GPSLatitude[1]/60 + gps.GPSLatitude[2]/3600;
                    let lon = gps.GPSLongitude[0] + gps.GPSLongitude[1]/60 + gps.GPSLongitude[2]/3600;

                    if (gps.GPSLatitudeRef == "S") lat = -lat;
                    if (gps.GPSLongitudeRef == "W") lon = -lon;

                    res.json({ latitude: lat, longitude: lon });

                    console.log(lat);
                    console.log(lon);
                    
                } else {
                    res.send('No geotag data found.');
                }
            }
        });
    } catch (e) {
        res.send('Error processing image.');
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
