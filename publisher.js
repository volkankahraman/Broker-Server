var mqtt = require('mqtt');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlEncodedParser = bodyParser.urlencoded({
    extended: true
});


var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Sunucu ${port} portunda çalışıyor!`))
    

var client = mqtt.connect("mqtt://1ab76102:8c048afe8b4538e8@broker.shiftr.io",{clientId: 'javascript'});
client.on('connect', function () {
    console.log('client has connected!');
        // TODO: Log the answer in a database
        console.log(`acılıyor`);
        //client.publish('led',"ac");
});

app.get('/',urlEncodedParser, function (req, res) {
    console.log(req.query.status);
    client.publish('led',req.query.status);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": req.query.status+"ımıyorum"
                  }
                }
              ]
            }
          }
        }
      }));
});

app.post('/',urlEncodedParser, function (req, res) {
    console.log(req.query.status);
    client.publish('led',req.query.status);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": req.query.status+"ıyorum"
                  }
                }
              ]
            }
          }
        }
      }));
});