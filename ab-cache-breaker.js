#!/usr/bin/env node
var fetch = require('node-fetch');
var url = require("url");

var host;
var count;
var concurrency;


function curl(url, options) {
    process.argv;
    fetch(url,options).catch(function(err) {
        console.log("process has stopped: "+err);
        process.exit(-1);
    });
}

function usage() {
    console.log("Usage: ./ab-cache-breaker -n <requests> -c <concurrency> <url>");
    console.log("Options are:");
    console.log("    -n requests     Number of requests to perform" );
    console.log("    -c concurrency  Number of multiple requests to make at a time");
    console.log("    -device         inputcan be 'desktop' or 'mobile'")

}

function parseArguments() {
    arg = process.argv;
    if (arg.length <= 4) {
        usage();
        process.exit(-1);
    }

    if(arg[2] != "-n") {
        usage()
        process.exit(-1);
    }

    if(arg[4] != "-c" || parseInt(arg[3]) < parseInt(arg[5])) {
        usage()
        process.exit(-1);
    }
    this.host = arg[6]
    this.count= arg[3];
    this.concurrency = arg[5];

}

function abCacheBraker() {
    parseArguments();
    var proms = [];
    var j = 0;
    for (i = 0; i < this.count; i++) {
        this.options = {
            headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Mobile Safari/537.36'}
        };

        proms[j++] = new Promise((resolve, reject) => {
            let url_breaker = "?a" + Math.floor(Math.random() * 10) + "=" + Math.floor(Math.random() * 100000);
            curl(this.host + url_breaker, options);
            resolve();
        });

        if (i % this.concurrency == 0 && i > 0) {
            Promise.all(proms).catch(function (e) {
                console.log(e);
            });
            console.log("Completed " + i + " requests.");
            j = 0;
        } else if (i == this.count - 1) {
            Promise.all(proms).catch(function (e) {
                console.log(e);
            });
            console.log("Completed " + (i + 1) + " requests.");
            j = 0;
        }
    }
}

abCacheBraker()
