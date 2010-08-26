// IT OMAP ISP -- SPRUF98G p1494
var ispccdc = { // a group of devices
  "isp": {
    "base_address": "0x480BC000",
    "size": "256B",
    "registers": {
      "revision": {
        "read": "true",
        "write": "false",
        "width": "32",
        "offset": "0x00",
        "description": "ISP REVISION REGISTER This register contains the IP revision code in binary coded digital. For example, we have: 0x01 = revision 0.1 and 0x21 = revision 2.1",
        "fields": {
          "reserved": {
            "bits": [31,8],
            "description": "Write 0s for future compatibility.",
            "reset": "0x000000"
          },
          "rev": {
            "bits": [7,0],
            "description": "IP revision. [7:4] major revision [3:0] minor revision"
          },
        }
      },
      "sysconfig": {
        "read": "true",
        "write": "true",
        "width": "32",
        "offset": "0x04", // 0x004 TODO parse and and with offset
        "description": "ISP SYSTEM CONFIGURATION REGISTER",
        "fields": {
          "reserved-0": {
            "bits": [31,14],
            "description": "Write 0s for future compatibility. Reads returns 0.",
            "reset": "0x00000",
          },
          "midle_mode": {
            "bits": [13,12],
            "description": "Master interface power management, MSTANDBY/WAIT protocol.",
            "reset": "0x0",
            "enumerable" : {
              "0x0": "Force-standby: the MSTANDBY signal is only asserted to the power and reset clock manager when the module is disabled.",
              "0x1": "No-standby: the MSTANDBY signal is never asserted to the power and reset clock manager.",
              "0x2": "Smart-standby: the MSTANDBY signal is asserted to the power and reset clock manager based on the internal activity of the module. The ISP clocks are not disabled during smart standby."
            }
          },
          "reserved-1": {
            "bits": [11,2],
            "description": "Write 0s for future compatibility. Reads returns 0.",
            "reset": "0x000",
          },
          "soft_reset": {
            "bits": [1],
            "description": "Software reset. Set the bit to 1 to trigger the module reset. The bit is automatically reset be the HW. During reads return 0.",
            "reset": "0x0",
            "enumerable": {
              "0x0": "Normal mode.",
              "0x1": "The module is reset."
            }
          },
          "auto_idle": {
            "bits": [0],
            "description": "Internal interconnect and functional clock gating strategy",
            "reset": "0x1",
            "enumerable": {
              "0x0": "Interconnect and functional clock is free running",
              "0x1": "Automatic interface clock gating strategy is applied based on the Interconnect interface activity for interface clock and on the functional activity for functional clocks."
            }
          }
        }
      },
      "sysstatus": {},
      "irq0enable": {},
      "irq0status": {},
      "irq1enable": {},
      "irq1status": {},
      "tctrl_greset_length": {
        "description": "TIMING CONTROL - GLOBAL SHUTTER LENGTH REGISTER This register is used by the TIMING CTRL module to generate the cam_global_reset signal."
      },
      "tctrl_pstrb_replay": {
        "desription": "TIMING CONTROL - PRESTROBE REPLAY REGISTER This register is used by the TIMING CTRL module to generate the prestrobe signal."
      },
      "isp_ctrl": {
        "read": "true",
        "write": "false",
        "width": "32",
        "offset": "0x40",
        "description": "CONTROL REGISTER After reset, the parallel interface is selected and only the CCDC module data write port is enabled.",
        "fields" : {
          "flush": { // Look into this more
            "bits": [31],
            "description" : "CCDC memory flush. Writing 1 in this bit flushes the CCDC memories in the central resource SBL. The SBL memories are always flushed by the end of frame. However, there are cases where the end of frame cannot be detected.",
            "reset": "0x0"
          },
          "jpeg_flush": [30], // TODO add information as needed
          "ccdc_wen_pol": {
            "bits": [29],
            "descrpition": "Sets the polarity of the CCDC WEN bit.",
            "enumerable": {
              "0x0": "Active low",
              "0x1": "Active high"
            }
          },
          "sbl_shared_rportb": [28], //"Controls SBL shared read port B access",
          "sbl_shared_rporta": [27],
          "reserved-0": [26],
          "cbuff1_bcf_ctrl": {
            "bits": [25,24],
            "description": "Bandwidth control feedback loop configuration register",
            "reset": "0x0",
          },
          "cbuff0_bcf_ctrl": [23,22],
          "sbl_autoidle": [21],
          "sbl_wr0_ram_en": [20],
          "sbl_wr1_ram_en": [19],
          "sbl_rd_ram_en": [18], // Look into this more
          "prev_ram_en": [17],
          "ccdc_ram_en": {
            "bits": [16],
            "description": "This bit controls the CCDC module RAM. If the CCDC module is not used, the bit should be set to 0 to save power.",
            "reset": 0, // TODO allow int or array
            "enumerable": {
              "0x0": "RAM is disabled",
              "0x1": "RAM is enabled"
            }
          },
          "sync_detect": [15,14], // Look into this more
          "rsz_clk_en": [13],
          "prv_clk_en": [12],
          "hist_clk_en": [11],
          "h3a_clk_en": [10],
          "cbuff_autogating": {
            "bits": 9,
            "description": "CBUFF module autogating feature control",
            "reset": "0x1",
            "enumerable": {
              "0x0": "CBUFF autogating feature is disabled. The CBUFF internal clock is free running.",
              "0x1": "CBUFF autogating feature is enabled. The CBUFF internal clock is only enabled when it is requested by the CBUFF module."
            }
          },
          "ccdc_clk_en": {
            "bits": 8,
            "description": "CCDC module clock enable. This bit controls the clock distribution to the CCDC module.",
            "reset": "0x0",
            "enumerable": {
              "0x0": "Disable clock. The module is not active. However, accesses on the module slave port to configure it are still possible.",
              "0x1": "Enable clock. The module is fully functional."
            }
          },
          "shift": [7,6], // should be 0
          "reserved-1": [5],
          "par_clk_pol": [4],
          "par_bridge": [3,2], // should be 0
          "par_ser_clk_sel": [1,0] // should be 0
        }
      },
      "tctrl_ctrl": {},
      "tctrl_frame": {},
      "tctrl_pstrb_delay": {},
      "tctrl_strb_delay": {},
      "tctrl_shut_delay": {},
      "tctrl_pstrb_length": {},
      "tctrl_strb_length": {},
      "tctrl_shut_length": {}
    }
  },
  "sbl": {
    "offset": "",
    "registers": {
      "sbl_pid": {},
      "sbl_pcr": {},
      "sbl_glb_x": {},
      "sbl_ccdc_x": {},
      "sbl_sdr_req_exp": {}
    }
  }
}
exports.isp = ispccdc.isp;
//exports.ccdc = ispccdc.ccdc;
//exports.sbl = ispccdc.sbl;
