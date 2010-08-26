var ccdc = {
  "base_addr" : "0x480BC600",
  "registers" : {
    "pid": "0x00",
    "pcr": "0x04",
    "syn_mode": "0x08", 
    "hd_vd_wid": "0x0c",
    "pix_lines": "0x10",
    "horz_info": "0x14",
    "vert_start": "0x18",
    "vert_lines": "0x1c",
    "culling": "0x20",
    "hsize_off": "0x24",
    "sdofst": "0x28",
    "sdr_addr": "0x2c",
    "clamp": "0x30",
    "dcsub": "0x34",
    "colptn": "0x38",
    "blkcmp": "0x3c",
    "fpc": "0x40",
    "fpc_addr": "0x44",
    "vdint": "0x48",
    "alaw": "0x4c",
    "rec656if": "0x50",
    "cfg": "0x54",
    "fmtcfg": "0x58",
    "fmt_horz": "0x5c",
    "fmt_vert": "0x60",
    "fmt_addr_i": "0x64",
    "prgeven0": "0x84",
    "prgeven1": "0x88",
    "prgodd0": "0x8c",
    "prgodd1": "0x90",
    "vp_out": "0x94",
    "lsc_config": "0x98",
    "lsc_initial": "0x9c",
    "lsc_table_base": "0xa0",
    "lsc_table_offset": "0xa4"
  },
  "fields": {
    "pid": {
      "reserved-0": [31,24],
      "tid": [31,16],
      "cid": [15,8],
      "prev": [7,0],
    },
    "pcr": {
      "reserved-0": [31,4],
      "reserved-1": [3],
      "reserved-2": [2],
      "busy": [1],
      "enable": [0],
    },
    "syn_mode": {
      "reserved-0": [31,20],
      "sdr2rsz": [19],
      "vp2sdr": [18],
      "wen" : [17],
      "vdhden": [16],
      "fldstat": [15],
      "lpf": [14],
      "inpmod": [13,12],
      "pack8": [11],
      "datsiz": [10,8],
      "fldmode": [7],
      "datapol": [6],
      "exwen": [5],
      "fldpol": [4],
      "hdpol": [3],
      "vdpol": [2],
      "fldout": [1],
      "vdhdout": [0]
    }, 
    "hd_vd_wid": {
      "reserved-0": [31,28],
      "hdw": [27,16],
      "reserved-1": [15,12],
      "vdw": [11,0]
    }, 
    "pix_lines": {
      "ppln": [31,16],
      "hlprf": [15,0]
    }, 
    "horz_info": {
      "reserved-0": [31],
      "sph": [30,16],
      "reserved-1": [15],
      "nph": [14,0]
    }, 
    "vert_start": {
      "reserved-0": [31],
      "slv0": [30,16],
      "reserved-1": [15],
      "slv1": [14,0]
    }, 
    "vert_lines": {
      "reserved-0": [31,15],
      "nlv": [14,0],
    },
    "culling": {
      "culhevn": [31,24],
      "culhodd": [23,16],
      "reserved-0": [15,8],
      "culv": [7,0]
    }, 
    "hsize_off": {
      "reserved-0": [31,16],
      "lnofst": [15,0]
    }, 
    "sdofst": {
      "reserved-0": [31,15],
      "fiinv": [14],
      "fofst": [13,12],
      "lofst0": [11,9],
      "lofst1": [8,6],
      "lofst2": [5,3],
      "lofst3": [2,0]
    }, 
    "sdr_addr": {
      "addr": [31,0]
    }, 
    "clamp": {
      "clampen": [31],
      "obslen": [30,28],
      "obsln": [27,25],
      "obst": [24,10],
      "reserved-0": [9,5],
      "obgain": [4,0]
    }, 
    "dcsub": {
      "reserved-0": [31,14],
      "dcsub": [13,0]
    }, 
    "colptn": {
      "cp3lpc3": [31,30],
      "cp3lpc2": [29,28],
      "cp3lpc1": [27,26],
      "cp3lpc0": [25,24],
      "cp2plc3": [23,22],
      "cp2plc2": [21,20],
      "cp2plc1": [19,18],
      "cp2plc0": [17,16],
      "cp1plc3": [15,14],
      "cp1plc2": [13,12],
      "cp1plc1": [11,10],
      "cp1plc0": [9,8],
      "cp0plc3": [7,6],
      "cp0plc2": [5,4],
      "cp0plc1": [3,2],
      "cp0plc0": [1,0]
    }, 
    "blkcmp": {
      "r_ye": [31,24],
      "gr_cy": [23,16],
      "gb_g": [15,8],
      "b_mg": [7,0]
    }, 
    "fpc": {
      "reserved-0": [31,17],
      "fperr": [16],
      "gb_g": [15],
      "b_mg": [14,0]
    }, 
    "fpc_addr": {
      "addr": [31,0]
    }, 
    "vdint": {
      "reserved-0": [31],
      "vdint0": [30,16],
      "reserved-1": [15],
      "vdint1": [14,0]
    }, 
    "alaw": {
      "reserved-0": [31,4],
      "ccdtbl": [3],
      "gwdi": [2,0]
    }, 
    "rec656if": {
      "reserved-0": [31,2],
      "eccfvh": [1],
      "r656on": [0]
    }, 
    "cfg": {
      "reserved-0": [31,16],
      "vdlc": [15], 
      "reserved-1": [14],
      "msbinvi": [13],
      "bswd": [12],
      "y8pos": [11],
      "reserved-2": [10,9],
      "wenlog": [8],
      "fidmd": [7,6],
      "bw656": [5],
      "reserved-3": [4],
      "reserved-4": [3],
      "reserved-5": [2],
      "reserved-6": [1,0]
    }, 
    "fmtcfg": {
      "reserved-0": [31,19],
      "vpif_frq": [18,16],
      "vpen": [15],
      "vpin": [14,12],
      "plen_even": [11,8],
      "plen_odd": [7,4],
      "lnum": [3,2],
      "lnalt": [1],
      "fmten": [0]
    }, 
    "fmt_horz": {
      "reserved-0": [31,29],
      "fmtsph": [28,16],
      "reserved-1": [15,13],
      "fmtlnh": [12,0]
    }, 
    "fmt_vert": {
      "reserved-0": [31,29],
      "fmtslv": [28,16],
      "reserved-1": [15,13],
      "fmtlnv": [12,0]
    }, 
    "fmt_addr_i": {
      "reserved-0": [31,26],
      "line": [25,24],
      "reserved-1": [23,13],
      "init": [12,0]
    }, 
    "prgeven0": {
      "even7": [31,28],
      "even6": [27,24],
      "even5": [23,20],
      "even4": [19,16],
      "even3": [15,12],
      "even2": [11,8],
      "even1": [7,4],
      "even0": [3,0]
    }, 
    "prgeven1": {
      "even15": [31,28],
      "even14": [27,24],
      "even13": [23,20],
      "even12": [19,16],
      "even11": [15,12],
      "even10": [11,8],
      "even9": [7,4],
      "even8": [3,0]
    }, 
    "prgodd0": {
      "odd7": [31,28],
      "odd6": [27,24],
      "odd5": [23,20],
      "odd4": [19,16],
      "odd3": [15,12],
      "odd2": [11,8],
      "odd1": [7,4],
      "odd0": [3,0]
    }, 
    "prgodd1": {
      "odd15": [31,28],
      "odd14": [27,24],
      "odd13": [23,20],
      "odd12": [19,16],
      "odd11": [15,12],
      "odd10": [11,8],
      "odd09": [7,4],
      "odd08": [3,0]
    }, 
    "vp_out": {
      "reserved-0": [31],
      "vert_num": [30,17],
      "horz_num": [16,4],
      "horz_st": [3,0]
    }, 
    "lsc_config": {
      "reserved-0": [31,15],
      "gain_mode_m": [14,12],
      "reserved-1": [11],
      "gain_mode_n": [10,8],
      "busy": [7],
      "after_reform": [6],
      "reserved-2": [5,4],
      "gain_format": [3,1],
      "enable": [0]
    }, 
    "lsc_initial": {
      "reserved-0": [31,22],
      "y": [21,16],
      "reserved-1": [15,6],
      "x": [5,0]
    }, 
    "lsc_table_base": {
      "base": [31,0]
    }, 
    "lsc_table_offset": {
      "reserved-0": [31,16],
      "offset": [15,0]
    }
  }
}
module.exports = ccdc;
