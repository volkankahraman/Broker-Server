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
var status = {
    'bool':true
}

app.get('/', function (req, res) {
    if(status.bool){
        client.publish('led',"ac");
        status.bool=false;
    }else{
        client.publish('led',"kapat");
        status.bool=true;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(status));
});
app.post('/', function (req, res) {
    if(status.bool){
        client.publish('led',"ac");
        status.bool=false;
    }else{
        client.publish('led',"kapat");
        status.bool=true;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(status));
});