var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost:27017/realm');

//require('./config/database.js')('mongodb://localhost:27017/contatooh');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server escutando a porta ' + app.get('port'));
});