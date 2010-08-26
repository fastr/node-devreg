function devreg() {
  // The biggest flaw with this library is that it doesn't currently support BigInt

  var physical_registers = {},
      sys = require('sys'),
      parseNumber = require('./parse_number').parseNumber,
      exec = require('child_process').exec,
      device,
      settings,
      base_addr,
      global_msb = 32 - 1,
      Futures = require('../support/futures');
      // wget http://github.com/coolaj86/futures/raw/v0.9.0/lib/futures.js
      // or
      // npm install futures

  // TODO: put in the 'Zen' enumerate functions, not magic parameters
  function leadWith(string, len, char) {
    char = ('undefined' !== typeof char) ? char : ' ';
    string = string || '';
    string = '' + string;
    while (string.length < len) {
      string = char + string;
    }
    return string;
  }

  function trailWith(string, len, char) {
    char = ('undefined' !== typeof char) ? char : ' ';
    string = string || '';
    string = '' + string;
    while (string.length < len) {
      string += char;
    }
    return string;
  }

  // TODO
  // print '0x    0f1 ' instead of '0x000000f1'
  function format_field(value, shift, len, size) {
    var i = 0, string = ''+value;
    string = leadWith(string, shift+len);
    string = trailWith(string, size);
  }

  function print_nibbles(reg_name, value) {
    var bits = device.fields[reg_name],
      field_name,
      bit,
      slice,
      shift,
      len,
      bin;

    //sys.print(bits + ' ' + reg_name + ' ' + value);
    sys.print("\n");
    sys.print(leadWith('', 22, ' ') + leadWith('-', 12+8+8, '-') + "\n");
    for (field_name in bits) {
      if (!bits.hasOwnProperty(field_name)) return;

      len = 0;
      slice = bits[field_name];
      // interpret correctly no matter the order [0:2] or [3:1] or [4]
      if ('undefined' !== typeof slice[1]) {
        if (slice[1] > slice[0]) {
    shift = slice[1];
    len = slice[1] - slice[0];
        } else {
    shift = slice[0];
    len = slice[0] - slice[1];
        }
      } else {
        shift = slice[0];
      }
      len += 1;

      // TODO allow other byte orders?
      // Because most systems are LSB, if we want to
      // read bit 31:29, from a 32-bit register
      //  we must substr char 0:2
      if (true /* == lsb */) {
        shift = global_msb - shift;
      }

      field_name = trailWith(field_name + ' [' + slice.join(':') + '] ', 20);

      bin = leadWith(value.toString(2), 32, '0');
      nibble = bin.substr(shift, len);

      //sys.print('  ' + field_name + ' bin' + bin + 'slice:' + slice.join(',') + ' ' + len + ' nib:' + nibble + "\n");

      hex = leadWith(parseInt(nibble, 2).toString(16), 8, '0');
      dec = parseInt(nibble, 2).toString(10);

      sys.print('  ' + field_name + " 0x" + hex + " == " + dec + "\n");
    }
    sys.print(leadWith('', 22, ' ') + leadWith('-', 12+8+8, '-') + "\n");
    sys.print("\n\n");
  }

  function print_registers() {
    var reg_name,
      value,
      dec, // decimal
      hex,
      bin;

    for (reg_name in physical_registers) {
      if (!physical_registers.hasOwnProperty(reg_name)) return;

      value = physical_registers[reg_name];
      dec = leadWith(value.toString(10), 12, '0');
      hex = leadWith(value.toString(16), 8, '0');
      bin = leadWith(value.toString(2), 32, '0');
      
      key = trailWith(reg_name + ':', 20);
      sys.print(key.toUpperCase() + '   0x' + hex + ' == ' + dec + ' | 0b' + bin + "\n");
      print_nibbles(reg_name, value);
    }
  }

  // slice example: [3:1]
  function getBinaryFieldData(field_name, slice, register_size, field_value) {
    var len = 0,
      mask = 1,
      last_bit = register_size - 1,
      shift,
      i;

    field_value = field_value || 0; // undefined, null, 0, "", etc

    // interpret correctly no matter the order [0:2] or [3:1] or [4]
    if ('undefined' !== typeof slice[1]) {
      // shift should be the lowest number
      if (slice[1] > slice[0]) {
        shift = slice[0];
        len = slice[1] - slice[0];
      } else {
        shift = slice[1];
        len = slice[0] - slice[1];
      }
    } else {
      shift = slice[0];
    }
    // The length must be at least 1
    len += 1;

    // create a bit mask of all 1s
    // Note: mask is already 1 to start with
    for (i = 1; i < len; i += 1) {
      mask <<= 1;
      mask |= 1;
    }

    // Note: The highest 32-bit number is -1
    // JavaScript can store 52-bit integers and 64-bit floats... but it's messy with > 32-bit ints
    if ((field_value > mask && mask > 0) ||
    (field_value < mask && mask < 0)) { 
      throw new Error('cowardly refusing to set "' + field_name + '" to "' + field_value + '" when the max value is "' + mask + '"');
    }

    // move the mask and the value into the right place
    field_value <<= shift; // 00000011 to 00001100
    mask <<= shift;

    if (mask !== (mask | field_value)) {
      sys.puts('mask: ' + mask.toString(16));
      sys.puts('field_value: ' + field_value.toString(16));
      throw new Error("mask !== (mask | field_value)");
      //throw new Error('Logic error "mask != (mask | field_value)" for "' + field_name  + ':' + mask + ':' + field_value + ':' + mask | field_value  + '"');
    }

    return {
      // consider an 8-bit register
      clear_mask: ~mask, // 11110011 resets the 2nd and 3rd bit
      copy_mask: mask, // 00001100 resets all but the 2nd and 3rd bit
      and_mask: ~mask, // 11110011 resets the 2nd and 3rd bit
      or_value: field_value, // 00001100 ready to be ORed with the full register
      shift: shift, // 2 bits in (right to left), the 2nd and 3rd bit
      length: len, // 2 bits long
      substr_start: last_bit - (shift + (len - 1)) // 4 bits in (left to right) 0000 1100
    };
  }

  function andOrBinaryRegisterValue(reg_name, register) {
    var register_value = physical_registers[reg_name] || 0, 
      field_vals, 
      documentation = device.fields[reg_name];

    if ('undefined' === typeof documentation) {
      throw new Error('"' + reg_name + '" undefined. Please check spelling and/or update the documentation file');
    }

    // The user was only interested it the value as a whole
    if ('number' === typeof register) {
      register_value = register;
      return register_value;
    }
    if ('string' === typeof register) {
      register_value = parseNumber(register);
      return register_value;
    }

    // The user wants to and & or the new value with the old value on a field-by-field basis
    if ('object' === typeof register) {
      Object.keys(register).forEach(function (field_name) {
        var field;
        if ('undefined' === typeof documentation[field_name]) {
    throw new Error('"' + reg_name + ':' + field_name + '" not defined in documentation file. Please check spelling and/or update the documentation file');
        }
        field = getBinaryFieldData(field_name, documentation[field_name], global_msb + 1, register[field_name]);
        register_value &= field.clear_mask; // set the field to 0
        register_value |= field.or_value; // set the field to the value
      });
      return register_value;
    }

    throw new Error('value in "settings:' + reg_name + '" should be in the form "0x00000000", "0b00000000", decimal, or key/value pairs of bits');
    //throw new Error('unexpected type ' + typeof register + ' for "' + JSON.stringify(register) + '"');
  }

  function compare_registers(register_name, expected, actual) {
    var documentation, results = {};

    documentation = device.fields[register_name];
    Object.keys(documentation).forEach(function (field_name) {
      var field_data, value, i;

      field_data = getBinaryFieldData(field_name, documentation[field_name], global_msb + 1);
      results[field_name] = {};

      value = expected & field_data.copy_mask;
      value >>>= field_data.shift;
      results[field_name].expected = value;

      value = actual & field_data.copy_mask;
      value >>>= field_data.shift;
      results[field_name].actual = value;
    });
    return results;
  }

  function write_settings(_settings) {
    settings = _settings;

    Object.keys(settings).forEach(function (reg_name) {
      var register_value;
      if (!settings.hasOwnProperty(reg_name)) return;
      if (!physical_registers.hasOwnProperty(reg_name)) throw new Error("'" + reg_name + "' isn't a known register");

      register_value = andOrBinaryRegisterValue(reg_name, settings[reg_name]);
      devmem(reg_name, '0x' + register_value.toString(16), 'u32').when(function () {
        if (register_value !== physical_registers[reg_name]) {
    sys.puts('ERR: "' + reg_name + '" was written as "' + register_value + '" but read as "' + physical_registers[reg_name]  + '"');
        } else {
    sys.puts('"' + reg_name + '" was written as "' + register_value + '" successfully');
        }
      });
    });
  }

  function assert_settings(_settings) {
    settings = _settings;

    Object.keys(settings).forEach(function (reg_name, index, arr) {
      if (!physical_registers.hasOwnProperty(reg_name)) throw new Error("'" + reg_name + "' hasn't been read from the system (may be missing from the documentation)");

      var register_value,
        comparison;

      //sys.puts(reg_name + ':' + JSON.stringify(settings[reg_name]) + ':' + physical_registers[reg_name].toString(16));
      register_value = andOrBinaryRegisterValue(reg_name, settings[reg_name]);
      if (register_value !== (register_value & physical_registers[reg_name])) {
        sys.puts('ERR: "' + reg_name + '" was expected to be "0x' + ((0.0+register_value).toString(16)) + '" but is actually "0x' + physical_registers[reg_name].toString(16)  + '"');
        comparison = compare_registers(reg_name, register_value, physical_registers[reg_name]);
        Object.keys(comparison).forEach(function (field_name) {
    if (comparison[field_name].expected === comparison[field_name].actual) { return; } 
    sys.puts('  For "' + field_name + '" expected "' + comparison[field_name].expected + '" but got "' + comparison[field_name].actual  + '"');
        });
      }
    });
  }

  // TODO platform abstract and move to devmem.js
  function devmem(reg_name, hex_value, size) {
    var promise = Futures.promise(),
      k, // key
      v, // value
      hexaddr = (parseNumber(base_addr) | parseNumber(device.registers[reg_name])),
      hex,
      bin,
      dec;

    hex_value = ('undefined' !== typeof hex_value) ? hex_value : '';
    exec('devmem2 ' + hexaddr + ' w ' + hex_value + ' | grep : | cut -d":" -f2', function (error, stdout, stderr) {
      //sys.print('devmem2 ' + hexaddr + ' w ' + hex_value + ' | grep : | cut -d":" -f2' + "\n");

      if (stderr) {
        sys.print('stderr: ' + stderr);
        throw new Error("Couldn't access register: " + stderr);
      }

      if (error !== null) {
        console.log('exec error: ' + error);
      }

      // TODO handle other formats?
      stdout = stdout.substr(3); // removing leading ' 0x'
      dec = parseInt(stdout, 16);
      physical_registers[reg_name] = dec;
      promise.fulfill({reg_name : dec});
    });
    return promise;
  }

  // _base_addr for similar devices
  function devreg(device_documentation, _settings) {
    var promise = Futures.promise(),
      promises = [],
      join,
      key,
      value,
      hexaddr;

    device = device_documentation;
    base_addr = device.base_addr;

    //sys.puts(JSON.stringify(device.registers) + "\n");
    for (key in device.registers) {
      if (!device.registers.hasOwnProperty(key)) continue;
      // TODO find out why the `undefined`s exist
      if ('undefined' === typeof device.registers[key]) continue;
      //if ('undefined' === typeof device.registers[key].offset) continue;
      //sys.puts(key + ": " + device.registers[key]);// + value.substr(2) + "\n");
      promises.push(devmem(key));
    }
    join = Futures.join(promises);
    // TODO validate writes
    join
      .when(function (arr) {
        // TODO create phys_regs from array
        promise.fulfill(physical_registers);
      });
    var result = { 
      // shame on me for not using chainify...
      write: function(register_settings) {
        promise.when(function () {
          write_settings(register_settings);
        });
        return result;
      },
      print: function() {
        // TODO move this display logic up and out
        promise.when(print_registers);
        return result;
      },
      verify: function(register_settings) {
        promise.when(function () {
          assert_settings(register_settings);
        });
        return result;
      },
      when: promise.when
    };
    return result;
  }

  return devreg.apply(null, arguments);
}
module.exports = function () {
  var result = devreg.apply(null, arguments);
  return result;
};
