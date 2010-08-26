#!/usr/bin/env node

var node = process.argv[0],
  self = process.argv[1],
  module_path = process.argv[2];

var sys = require('sys'),
  fs = require('fs'),
  devreg = require('../lib/devreg').devreg,
  Futures = require('../support/futures');
  settings = require(module_path);

var docs,
  flattenDocs = require('../lib/flattendocs').flattenDocs;

Object.keys(settings).forEach(function (platform) {
  fs.readdir('../docs/' + platform, function(err) {
    if (err) {
      sys.puts('platform "' + platform + '" is not yet documented.');
      return;
    }
    Object.keys(settings[platform]).forEach(function(device) {
      fs.stat('../docs/' + platform + '/' + device + '.js', function(err) {
        if (err) {
          sys.puts('device "' + platform + '/' + device + '" is not yet documented.');
          return;
        }
        docs = require('../docs/' + platform + '/' + device);
        registers = flattenDocs(settings[platform][device]);
        sys.puts('DEVICE: ' + registers);
        devreg(docs)
          .read()
          .check(settings)
          .write(settings);
      }); 
    });
  });
});
