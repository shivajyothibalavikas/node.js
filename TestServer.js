var express = require('express');
var app = express();

app.all('/user[s]?/:username' , function(request,response) {
	response.end("Hello The user name is: " + request.params.username + "\n");
});

app.listen(8080);