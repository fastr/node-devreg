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
exports.devmem = devmem;
