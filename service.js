var http = require("http");
	fs = require("fs");
	path = require('path');
	express = require('express');
	album_handler = require('./handlers/album.js');


app = express();


app.get('/albums.json', album_handler.load_directories);
app.get('/albums/:album_name.json',album_handler.load_photos);
app.get('/pages/:page_name',serve_page);
app.get('/content/:file_name',function(request,response) {
	serve_static_content('content/' , request , response)
});
app.get('/templates/:file_name', function(request,response){
	serve_static_content('templates/',request,response)
});
app.get('*', function(request,response) {
	response.writeHead(404 , { "Conten-Type" : "application/json"});
		response.end(JSON.stringify({error: "unknown_resource"}) + "\n");
});


function serve_page(request,response) {
	var page_name = request.params.page_name;
	fs.readFile('pages/basic.html','utf8', function(error,content) {
		if(error) {
			response.writeHead(503,{ "Content-Type" : "text/plane" });
			response.end("coud't read the file properly!!! sorry!!!");
			return;
		}
		response.writeHead(200,{"Content-Type" : "text/html"});
		response.end(content.replace("{{PAGE_NAME}}",page_name));
	});
}


function serve_static_content(folder,request,response) {
	var file = request.params.file_name;
	var folder_name = folder + file;
		var rs = fs.createReadStream(folder_name);
		var ct = get_content_type(file);
		response.writeHead(200 , { "contenType" : ct});
		rs.on(
			"error",
			function(err) {
				response.writeHead(404, {"Content-Type" : "application/json"});
				response.end(JSON.stringify({error:"resource not found",
										message:"what was that?"}) + "\n");
			}
		);
		rs.pipe(response);
}



function get_content_type(file_name) {
	var ext = path.extname(file_name).toLowerCase();
	switch(ext) {
		case '.jgp' :
		case '.jpeg': {
			return "image/jpeg";
			break;
		}
		case '.gif': { 
			return "image/gif";
			break;
		}
		case '.png':{ 
			return "image/png";
			break;
		}
		case '.js': { 
			return "text/javascript";
			break;
		}
		case '.css': {
			return "text/css";
			break;
		}
		case '.html': {
			return "text/html";
			break;
		}
		default: {
			return "text/plane";
		}
	}
}







app.listen(8080);