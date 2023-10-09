const { SerialPort } = require('serialport');

const config = {
    path: 'COM3',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
};


port.on('data', (data) => {

    console.log(data.toString() + '\n');

})
