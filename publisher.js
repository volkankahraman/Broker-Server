var mqtt = require('mqtt');
var express = require('express');

var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Sunucu ${port} portunda çalışıyor!`))
    

var client = mqtt.connect("mqtt://1ab76102:8c048afe8b4538e8@broker.shiftr.io",{clientId: 'javascript'});
acik = false;
client.on('connect', function () {
    console.log('client has connected!');
        // TODO: Log the answer in a database
        console.log(`acılıyor`);
        //client.publish('led',"ac");
});
var acik = true;
app.post('/', function (req, res) {
    if(acik){
        client.publish('led',"ac");
        acik=false;
    }else{
        client.publish('led',"kapat");
        acik=true;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(acik);
    res.end();
});