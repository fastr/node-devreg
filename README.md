Read, Write, and Compare registers using JavaScript

Examples
====

    #!/usr/env node
    var devreg = require('./lib/devreg'),
      my_registers = require('./registers_to_check');

    // All documented registers are in `./docs/`
    var docs = {
      "omap3530" : ['ccdc', 'isp']
    };

    function print(data) {
      sys.puts(JOSN.stringify(data));
    }

    devreg(docs).read(print).check(my_registers);
    node devreg.js read omap3530/ccdc

TODO
====

  * BigInt.js for registers > 31-bit registers
  * Use `node-mmap` rather than Gumstix's `devmem2`
