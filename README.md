Read, Write, and Compare registers using JavaScript

Examples
====

Reading ISP / CCDC registers on OMAP3530

    cd ./examples
    node isp-ccdc-tester.js isp-ccdc-settings
    #Note you must have a /dev/video0 for this example to work.

Easy-to-read Register Printouts
------------

    LSC_CONFIG:            0x00006600 == 000000026112 | 0b00000000000000000110011000000000

                          ----------------------------
      reserved-0 [31:15]   0x00000000 == 0
      gain_mode_m [14:12]  0x00000006 == 6
      reserved-1 [11]      0x00000000 == 0
      gain_mode_n [10:8]   0x00000006 == 6
      busy [7]             0x00000000 == 0
      after_reform [6]     0x00000000 == 0
      reserved-2 [5:4]     0x00000000 == 0
      gain_format [3:1]    0x00000000 == 0
      enable [0]           0x00000000 == 0
                          ----------------------------

Checks against expected values and read/write errors
----------

    ERR: "fmt_horz" was expected to be "0x10080" but is actually "0x0"
      For "fmtsph" expected "1" but got "0"
      For "fmtlnh" expected "128" but got "0"

Adding your device
-----------

0. Modify `app.js` for a simpler version of your own.
0. Manually enter in the meta-data about the register - its name, its fields, etc - from the spruf98h.pdf in one of these "document" formats:
  * Simple Format: http://github.com/fastr/node-devreg/blob/master/docs/omap3530/ccdc.js
  * Full Format: http://github.com/fastr/node-devreg/blob/master/docs/omap3530/isp.js
  * And make sure you e-mail it to me or fork me on github so I can add it to the list of documents.
0. Optionally you can define the "settings" you would like to check against or that you would like to set the values to.
Example: http://github.com/fastr/node-devreg/blob/master/examples/isp-ccdc-settings.js

**If you find a machine-readable form of the TI documentation let me know about it.
I could write a script to convert it to the right format and get all of the registers.**

node.js, which is required for this is about to enter OpenEmbedded (I've submitted a patch, but still need to make a few adjustments to the meta data for acceptance).
If you care to get it now you can see my posts on the node.js list.
You can also download it here: http://coolaj86.info/pub/nodejs_0.2.0-r0.5_armv7a.ipk

TODO
====

  * submit patch node-v0.2.1 to openembedded
  * BigInt.js for registers > 31-bit registers [this](http://github.com/whatgoodisaroad/Big-js) or [that](http://github.com/jhs/bigdecimal.js) or crypto.js in the tests
  * Use `node-mmap` rather than Gumstix's `devmem2`
  * Preserve order by using arrays
  * Print correctly, even in a loop
