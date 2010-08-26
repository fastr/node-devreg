Read, Write, and Compare registers using JavaScript

Examples
====

Reading ISP / CCDC registers on OMAP3530

    cd ./examples
    node isp-ccdc-tester.js isp-ccdc-settings

TODO
====

  * BigInt.js for registers > 31-bit registers
  * Use `node-mmap` rather than Gumstix's `devmem2`
  * Preserve order by using arrays
  * Print correctly, even in a loop
