var fs = require('fs');
	helpers = require('./helpers.js')





exports.load_directories =  function(request, response) {
	get_directories(function (error, album) {
		if(error) {
			helpers.send_failure(response, 503 , error);
		}
		helpers.send_success(response,album);
	});
}

exports.load_photos = function (request,response) {
	var album_name = request.params.album_name;
	get_photos(album_name,function (error, files_list) {
	if(error) {
		helpers.send_failure(response, 503, error);	
	}
	helpers.send_success(response,{album:{album_name: album_name,photos: files_list}});
	});
}


function get_directories(callback) {
	fs.readdir("/home/vikas/Desktop/js_examples/app/albums/", function(error, album_list) {
		if(error) {
			callback(error);
			return;
		}
		var dir_only = [];
		(function iterator(i) {
		if (i >= album_list.length) {
			callback(null, dir_only);
			return;
		}

		fs.stat('albums/'+ album_list[i], function(err,stats) {
			if(err)	{
				callback(err);
				return;
			}
			if (stats.isDirectory()) {
				dir_only.push({album_name:album_list[i],
								title:album_list[i]});
			}
			iterator(i + 1);
			
		});
	})(0); 
		
	});
}


function get_photos(album_name,callback) {
	fs.readdir("/home/vikas/Desktop/js_examples/app/albums/" + album_name, function(error, files_list) {
		if(error) {
			callback(error);
			return;
		}
		var files_only = [];
		(function iterator(i) {
		if (i >= files_list.length) {
			callback(null, files_only);
			return;
		}

		fs.stat('albums/' + album_name + '/' + files_list[i], function(err,stats) {
			if(err)	{
				callback(err);
				return;
			}
			if (stats.isFile()) {
				files_only.push(files_list[i]);
			}
			iterator(i + 1);
			
		});
	})(0); 
		
	});
}
