#!/usr/bin/env node

var node = process.argv[0],
  self = process.argv[1],
  module_path = process.argv[2] || 'isp-ccdc-settings';

var sys = require('sys'),
  fs = require('fs'),
  devreg = require('../lib/devreg'),
  Futures = require('../support/futures'),
  settings = require('./' + module_path);

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

        fs.open('/dev/video0', 'r', undefined, function(err, fd) {
          if (err) {
            throw new Error(err);
          }
          // BUG improper scoping means that this will only run once
          devreg(docs)
            .print()
            //.read(callback) // TODO
            //.check(settings)
            .write(settings[platform][device]);
        });
      }); 
    });
  });
});
