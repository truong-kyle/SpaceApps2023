const { SerialPort } = require('serialport');

const config = {
    path: 'COM3',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
};

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});

port.open((err) => {

    if(err){
        console.log("Error opening the port" + err.messages);
    }
    
});

port.on('data', (data) => {

    console.log(data.toString());

})