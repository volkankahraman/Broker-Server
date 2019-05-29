var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.174')
client.on('connect', function () {
    client.subscribe('kule')
})
client.on('message', function (topic, message) {
context = message.toString();
console.log(context)
})