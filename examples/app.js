#!/usr/bin/env node

var node = process.argv[0],
  self = process.argv[1],
  module_path = process.argv[2] || 'isp-ccdc-settings'; // CHANGEME -- YOUR SETTINGS FILE (without .js)

var sys = require('sys'),
  fs = require('fs'),
  devreg = require('../lib/devreg'),
  Futures = require('../support/futures'),
  settings = require('./' + module_path);

fs.open('/dev/video0', 'r', undefined, function(err, fd) { // CHANGEME -- this open of video0 is only necessary for isp/ccdc stuff
  if (err) {
    throw new Error(err);
  }
  var docs = require('../docs/omap3530/ccdc'); // CHANGEME -- YOUR DOCUMENT FILE (without .js)
  devreg(docs)
    .print()
    //.write(settings[platform][device]); // CHANGEME -- uncomment if you like
    //.verify(settings[platform][device]); // CHANGEME -- uncomment if you like
});
