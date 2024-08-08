# SpaceApps2023
## <a href="https://github.com/truong-kyle/PhotoGeoV2">**UPDATE: THIS BRANCH IS OUTDATED AND IS BROKEN. PLEASE CLICK HERE TO VIEW THE UPDATED PROJECT.</a> 
Team SpaceNinja's repository for the Toronto 2023 SpaceApps Challenge

### Team Members
Farees Ahmed, Hajer Al Obeidli, Giuliano De Francesco, Kyle Truong, Mishal Vellani
## Project Summary
Our proposal is currently divided into two parts: The client upload side (PhotoGeotag) and the alert side (SpaceAppsAlarm). 

PhotoGeotag takes a photo and extracts the location data embedded within file. It then compares the location data to the live database provided by NASA FIRMS. If the photo was taken within a certain coordinate range, the app returns the location of the hotspot reported by NASA FIRMS.

SpaceAppsAlarm is a proof of concept, connecting Arduino and Serial Monitoring to a JavaScript program. We plan to use this concept to build an alarm system that will alert officials that there is a hotspot/fire report in a given area, provided by the PhotoGeotag application. 

## How To Use
### PhotoGeotag:
1. Run command `node server.js` inside command line
2. Open server (`localhost:3000`) and upload photo
3. Press "Upload and Get Location"
4. Photo will return longitude and lattitude and add point to map
### SpaceAppsAlarm:
1. Download the `.ino` to the Arduino
2. Run `node index.js` inside the command line
3. Serial data will be printed to the terminal


