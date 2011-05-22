var formidable = require('formidable'),
http = require('http'),
sys = require('sys');
fs = require('fs');

console.log('go');

server = http.createServer(function(req, res) {
	if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
		// parse a file upload
		console.log('/upload')
		var form = new formidable.IncomingForm();
		console.log(form.bytesExpected);
		
		form.uploadDir = './uploads/';
		form.parse(req, function(err, fields, files) {
		console.log('files' + JSON.stringify(files));
		var filelocation = files.upload.path;
		var processfile = function(file){
			// console.log(file);
			console.log('/Users/dpwolf/Dropbox/soundscape_analysis/codegen.Darwin /Users/dpwolf/Dropbox/soundscape_analysis/' + file);
			var util   = require('util'),
				exec  = require('child_process').exec,
				child;
			
				child = exec('/Users/dpwolf/Dropbox/soundscape_analysis/codegen.Darwin /Users/dpwolf/Dropbox/soundscape_analysis/' + file, 
				function (error, stdout, stderr) {
					console.log('stdout: ' + stdout);
					console.log('stderr: ' + stderr);
					if (error !== null) {
						console.log('exec error: ' + error);
					}
				});
		}
		fs.rename(filelocation, filelocation + '.wav', processfile(filelocation + '.wav'));
			
		res.writeHead(200, {'content-type': 'application/json'});
		// res.write('received upload:\n\n');
		res.end(sys.inspect(files));
	});
	return;
	}else{
		// show a file upload form
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(
		'<form action="upload" enctype="multipart/form-data" method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
		);
	}
});

server.listen(8000);