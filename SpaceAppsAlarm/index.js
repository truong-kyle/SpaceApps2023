const { SerialPort } = require('serialport');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');


const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});

port.open((err) => {});

setTimeout(function(){

    port.write("1");

}, 3000);

var app = http.createServer(function(req, res){
   
    res.writeHead(404, { 'Content-Type': 'index.html' });
    res.end(index);

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


