Read, Write, and Compare registers using JavaScript

Examples
====

Reading ISP / CCDC registers on OMAP3530

    cd ./examples
    node isp-ccdc-tester.js isp-ccdc-settings

TODO
====

  * BigInt.js for registers > 31-bit registers [this](http://github.com/whatgoodisaroad/Big-js) or [that](http://github.com/jhs/bigdecimal.js) or crypto.js in the tests
  * Use `node-mmap` rather than Gumstix's `devmem2`
  * Preserve order by using arrays
  * Print correctly, even in a loop
