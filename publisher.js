var mqtt = require('mqtt');
var client = mqtt.connect('ws://akilli-ev-nodejs.herokuapp.com');
acik= false;
client.on('connect', function () {
    setInterval(function () {
        if (!acik) {
            client.publish('led', 'ac');
            console.log('ac');
            acik = true;
        } else {
            client.publish('led', 'kapat');
            console.log('kapat');
            acik= false;
        }

        
    }, 1000);
});
