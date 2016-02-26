exports.send_failure = function(response, http_code, err) {
	var code = err.code ? err.code:err.name;
	response.write(http_code, {"Content-Type":"application/json"});
	response.end(JSON.stringify({error: code, message:err.message}) + "\n");
};


exports.send_success = function(response, data) {
	response.write(200, {"Content-Type":"application/json"});
	response.end(JSON.stringify({error: null, data:data}) + "\n");
};