var http = require('http');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var slides = [{title: "this is the first slide", header: "this is the first header", content: "this is finally the content" },
{title: "this is the second slide", header: "this is the second header", content: "this is second the content" },
{title: "this is the third slide", header: "this is the third header", content: "this is third the content" },
{title: "this is the fourth slide", header: "this is the fourth header", content: "this fourth the content" }, {title: "this is the fourth slide", header: "this is the fourth header", content: "this fifth content" }]


function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response) 
  console.log(request.url);
  var filePath = false;

  if (request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }

  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});

