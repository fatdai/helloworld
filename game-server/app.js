var pomelo = require('pomelo');
var game = require('./app/models/game');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'helloworld');

// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pomelo.connectors.hybridconnector,
            heartbeat: 3,
            useDict: true,
            useProtobuf: true
        });
});

app.configure('production|development', 'game', function () {
    var gameId = app.get('curServer').gameId;
    if(!gameId || gameId < 0){
        throw new Error("load game config failed");
    }
    game.init();
});

// start app
app.start();

process.on('uncaughtException', function (err) {
    console.error(' Caught exception: ' + err.stack);
});
