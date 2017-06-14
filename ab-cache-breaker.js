#!/usr/bin/env node
var fetch = require('node-fetch');
var url = require("url");

var host;
var count;
var concurrency;
var device = "desktop";

function sum(a,b) {
    return parseInt(a) + parseInt(b);
}

function mean(array) {
    return array.reduce(function (p, c) {
            return sum(p , c);
        }) / array.length;
}


function curl(url, options) {
    process.argv;
    let curTime = (new Date()).getTime();
    return fetch(url, options).then(() => {
        return (new Date()).getTime() - curTime;
    }).catch(function (err) {
        console.log("process has stopped: " + err);
        process.exit(-1);
    });
}

function usage() {
    console.log("Usage: ./ab-cache-breaker -n <requests> -c <concurrency> <url>");
    console.log("Options are:");
    console.log("    -n requests     number of requests to perform");
    console.log("    -c concurrency  number of multiple requests to make at a time");
    console.log("    -d              device input can be 'desktop' or 'mobile'")

}

function parseArguments() {
    arg = process.argv;
    if (arg.length <= 4) {
        usage();
        process.exit(-1);
    }

    if (arg[2] !== "-n") {
        usage();
        process.exit(-1);
    }

    if (arg[4] !== "-c" || parseInt(arg[3]) < parseInt(arg[5])) {
        usage();
        process.exit(-1);
    }

    if ((res = arg.findIndex((val) => {
            return (val === "-d")
        })) !== -1) {
        this.device = arg[res + 1];
        console.log("*****" + this.device);
    }

    this.host = arg[6];
    this.count = arg[3];
    this.concurrency = arg[5];
    ;

}

function getFlattenPromises() {
    let proms = [];
    let j = 0;
    let options = {};
    for (i = 0; i < this.count; i++) {
        if (this.device === "mobile")
            options = {
                headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Mobile Safari/537.36'}
            };
        let url_breaker = "?a" + Math.floor(Math.random() * 10) + "=" + Math.floor(Math.random() * 100000);
        proms[j++] = curl(this.host + url_breaker, options);
    }
    return proms
};

function run(proms, i, step) {
    return new Promise( (resolve, reject ) => {
        resolve(i);
        Promise.all(proms.slice(i,sum(i,step))).catch(function (e) {
            console.log(e);
        }).then((response) => {
            console.log("Completed " + ((sum(i, step) > proms.length)? proms.length : sum(i ,step)) + " requests in " + mean(response).toFixed(2) + "ms.");
            if( sum(i, step) < proms.length)
                run(proms, sum(i,step), (sum(i, step) > proms.length)? proms.length -i: step );
        });

    })
}

function abCacheBraker() {
    parseArguments();
    let proms = getFlattenPromises();
    run(proms,0,this.concurrency);
}

abCacheBraker()
