#!/usr/bin/env node
var sys = require('sys'),
  devreg = require('./devreg').devreg,
  devices = require('./ispccdc'),
  flattenDocs = require('./flattendocs').flattenDocs,
  ccdc_registers = require('./ccdc_register_values').settings,
  Futures = require('./futures'),
  registers = {};

registers.ccdc = ccdc_registers;
var ccdc_device = require('./ccdc').ccdc;

  devreg(ccdc_device, ccdc_registers)
    .verify(ccdc_registers)
