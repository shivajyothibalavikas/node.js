$(function(){
	var templet;
	tdata = {};

	var initPage = function() {
		$.get("/templates/home.html", function(d){
			if(!d) {
				console.log("can not load templet" + error.messgae);
			}
			templet = d;
		});
		$.getJSON("/albums.json", function(d) {
			if(!d) {
				console.log("cant load json response"+error.messgae);
			}
			$.extend(tdata,d.data);
		});

		$(document).ajaxStop(function() {
			var final_data = massage(tdata);
			var render_page = Mustache.to_html(templet, final_data);
			$("body").html(render_page);
		});
	}();
});


function massage(data) {
	console.log("it came");
	if(data.albums && data.albums.length > 0)
		data.have_album = true;
	else 
		data.have_album = false;
	return data;
}