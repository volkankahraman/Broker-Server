var mqtt = require('mqtt');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
  


var port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Sunucu ${port} portunda çalışıyor!`))
    

var client = mqtt.connect("mqtt://1ab76102:8c048afe8b4538e8@broker.shiftr.io",{clientId: 'javascript'});
client.on('connect', function () {
    console.log('client has connected!');
        // TODO: Log the answer in a database
        console.log(`acılıyor`);
        //client.publish('led',"ac");
});

app.get('/', function (req, res) {
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);
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

app.post('/', function (req, res) {
    console.log(req.params);
    console.log(req.body);
    console.log(req.query);
    
    
    client.publish('led',req.body.queryResult.parameters.status);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": req.body.queryResult.parameters.status+"ıyorum"
                  }
                }
              ]
            }
          }
        }
      }));
});