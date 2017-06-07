var http = require('http');
var url = require("url");

var host;
var count;
var path;
var port;

callback = function(response) {
  var str = '';

  try{
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
  } catch( err) {
      console.log(err);
    }

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    //console.log(str);
  });
}

function curl(options, callback) {
    process.argv;
    http.get(options, callback).on('error', function (err) {
        //console.log(err.code)
    }).end()
    //console.log("end");
}

function usage() {
    console.log("Usage: ./ab-cache-breaker -c <count> <url>");
}

function parseArguments() {
    arg = process.argv;
    if (arg.length <= 4) {
        usage();
        process.exit(-1);
    }

    if(arg[2] != "-c") {
        usage()
        process.exit(-1);
    }

    var parts = url.parse(arg[4], true);
    this.host = parts.hostname;
    this.port = (parts.port != null)? parts.port : 80;
    this.path = parts.path;
    this.count= arg[3];
}

function abCacheBraker() {
    parseArguments();
    for(i=0; i< this.count; i++) {
        this.options = {
            host: this.host,
            port: this.port,
            path: this.path +"?a"+Math.floor(Math.random()*10)+"=" + Math.floor(Math.random()*100000),
            headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Mobile Safari/537.36'}
        };
        curl(options, callback);

        if(this.count < 5 && i > 0)
            console.log("Completed " + i + " requests.");
        else
        if(i%10 == 0 && i<100)
            console.log("Completed " + i + " requests.");
        else
        if(i%100 == 0 && this.count>100)
            console.log("Completed " + i + " requests.");
    }
}

abCacheBraker()