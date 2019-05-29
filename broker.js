var mosca = require('mosca');

var settings = {
  port: Number(process.env.PORT) || 1883
};
console.log(process.env.PORT);
console.log(Number(process.env.PORT));
var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log("Mesaj:",packet.payload.toString());
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}