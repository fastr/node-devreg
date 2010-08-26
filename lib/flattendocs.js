var sys = require('sys'),
  parseNumber = require('./parse_number').parseNumber;

/*

  The JSON documentation string is parsed in a progressive manner:
  The more interest you have in a particular device, register, or
  field, the more information you can provide and the more information
  you will get back when running devreg.

  {
    // A full documentation string would look something like this:
    "arbitrary_register_name": {
      "offset": "0x12",
      "fields": {
        "arbitrary_fieldname": {
          "bits": 0,
          "reset": 0
        },
        "another_arbitrary_fieldname": {
          "bits": [31,1],
          "reset": 127
        }
      }
    },

    // But you can omit registers you're not interested in
    // or choose to only see the register as a whole without
    // the field breakdown or descriptions
    "arb_reg_name0": "0x04",
    "arb_reg_name1": {
      "offset": "0x08",
      "description": "arbitrary text about how arb_reg_name1 does such and such",
      "fields": {
        "arb_fieldname1": 0,
        "arb_fieldname2": [31,1]
      }
    },
  }

  // TODO allow array for strict ordering.
  // i.e. { fields: [{ name: "arb_fieldname1", bits: [31,16] }] }

*/

// The idea behind this is that you give as much information as you'd like to get
// graceful degredation of information
function flattenDocs(device) { // such as ispccdc.isp
  var dev = {
    base_addr: undefined,
    registers: {},
    fields: {}, // TODO rename to fields
    reg_docs: {},
    field_docs: {}
  };

  function getOffset(register) {
    return ('string' === typeof register) ? register : register.offset;
  }

  function getFields(register) {
    var fields = {};

    if (!register.fields) {
      return;
    }
    Object.keys(register.fields).forEach(function (fieldName, i, arr) {
      var field, slice;
      field = register.fields[fieldName];
      slice = field.bits || field;
      slice = (slice instanceof Array) ? slice : [parseNumber(slice)];
      if (isNaN(slice[0])) {
        return;
        //throw new Error('no bits to register field \'' + fieldName + '\'');
      }
      fields[fieldName] = slice;
    });

    return fields;
  }
  
  dev.base_addr = device.base_address;
  Object.keys(device.registers).forEach(function (registerName, i, arr) {
    var register = device.registers[registerName],
      fields;
    if ('undefined' === typeof register) {
      return;
    }
    
    dev.registers[registerName] = getOffset(register);
    if ('object' === typeof register) {
      //sys.puts('registerName: ' + registerName);
      fields = getFields(register);
      if (fields) {
        dev.fields[registerName] = fields;
      }
    }
  });
  return dev;
}

exports.flattenDocs = flattenDocs;
