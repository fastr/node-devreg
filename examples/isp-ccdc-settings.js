// All the registers I care to set have values
// All the registers I care to read are present
// Registers that don't have valid values will not be changed

var ccdc = {
  "pid": { // Read-only Peripheral ID Register
    "reserved-0": "",
    "tid": "", // Peripheral identification: CCDC module
    "cid": "", // Class identification: Camera ISP
    "prev": "", // Peripheral revision number
  },
  "pcr": {
    "reserved-0": "",
    "reserved-1": "",
    "reserved-2": "",
    "busy": "0", // CCDC busy
    "enable": "0", // must be set after all other bits are set
  },
  "syn_mode": {
    "reserved-0": "",
    "sdr2rsz": "0x0", // Memory port output into the RESIZER input.
    "vp2sdr": "0x0", // Video port output enable to the output formatter.
    "wen" : "0x1", // Data write enable.
    "vdhden": "0x1", // Timing generator enable.
    "fldstat": "0x0", // cam_fld is odd or even, only for interlaced mode
    "lpf": "0x0", // Three-tap low pass (antialiasing) filter enable.
    "inpmod": "0x0", // RAW mode cam_d format in SYNC mode.
    "pack8": "", // ??? Data packing. 16bits/pixel or 8b/px
    "datsiz": "0x4", // 12 bits. cam_d signal width in SYNC mode.
    "fldmode": "0x0", // Progressive mode. cam_fld signal mode. 
    "datapol": "0x0", // cam_d signal polarity
    "exwen": "0x1", // External write enable selection. (depends cam_hs, cam_vs)
    "fldpol": "", // cam_fld signal polarity
    "hdpol": "", // Sets the cam_hs signal polarity
    "vdpol": "", // Sets the cam_vs signal polarity
    "fldout": "", // ??? cam_fld signal direction 0x0 In, 0x1 Out
    "vdhdout": "0x1" // 0x1 Input. cam_hs and cam_vs signal directions
  }, 
  "hd_vd_wid": { // Not used when HS/VS sync pulses are input signals.
    "reserved-0": "",
    "hdw": "", // Sets the width of the HS sync pulse if set as output. The width of the pulse is (HDW+1) pixel clocks.
    "reserved-1": "",
    "vdw": "" // Sets the width of the VS sync pulse is set as output. The width of the pulse is (VDW+1) lines.
  }, 
  "pix_lines": {
    "ppln": "128", // Pixels per line
    "hlprf": "32001" // ?? why the trailing 1?? Twice the horizontal line length. Half line per field or frame
  }, 
  "horz_info": {
    "reserved-0": "",
    "sph": "1", // Start pixel horizontal
    "reserved-1": "",
    "nph": "127" // Number of pixels horizontal
  }, 
  "vert_start": {
    "reserved-0": "",
    "slv0": "1", // Start line vertical - field0
    "reserved-1": "",
    "slv1": "1" // Start line vertical - field1
  }, 
  "vert_lines": {
    "reserved-0": "",
    "nlv": "15999", // Number of lines - vertical direction
  },
  "culling": { // Cull control (cull or retain lines)
    "culhevn": "255",
    "culhodd": "255",
    "reserved-0": "0x0",
    "culv": "255"
  }, 
  "hsize_off": {
    "reserved-0": "",
    "lnofst": ""
  }, 
  "sdofst": { // Memory offset register
    "reserved-0": "",
    "fiinv": "0x0", // Field identification signal inverse
    "fofst": "0x0", // Line offset value
    "lofst0": "0x0", // Line offset values of even lines and even fields
    "lofst1": "0x0",
    "lofst2": "0x0",
    "lofst3": "0x0"
  }, 
  "sdr_addr": {
    "addr": "0x82800000" // ?? why this address?
  }, 
  "clamp": {
    "clampen": "0",
    "obslen": "0",
    "obsln": "0",
    "obst": "0",
    "reserved-0": "0",
    "obgain": "0" // not the default value
  }, 
  "dcsub": {
    "reserved-0": "",
    "dcsub": "0" // DC value to subtract from the data.
  }, 
  "colptn": { // 0xbb11bb11 // 0x3 0x1 0x3 0x1 0x0 0x1 0x0 0x1 // does this even matter?
    "cp3lpc3": "",
    "cp3lpc2": "",
    "cp3lpc1": "",
    "cp3lpc0": "",
    "cp2plc3": "",
    "cp2plc2": "",
    "cp2plc1": "",
    "cp2plc0": "",
    "cp1plc3": "",
    "cp1plc2": "",
    "cp1plc1": "",
    "cp1plc0": "",
    "cp0plc3": "",
    "cp0plc2": "",
    "cp0plc1": "",
    "cp0plc0": ""
  }, 
  "blkcmp": { // BLACK COMPENSATION REGISTER
    "r_ye": "0x0",
    "gr_cy": "0x0",
    "gb_g": "0x0",
    "b_mg": "0x0"
  }, 
  "fpc": { // FAULT PIXEL CORRECTION REGISTER
    "reserved-0": "",
    "fperr": "0x0",
    "gb_g": "0x0",
    "b_mg": "0x0"
  }, 
  "fpc_addr": { // FAULT PIXEL CORRECTION MEMORY ADDRESS
    "addr": "0x0"
  }, 
  "vdint": { // 
    "reserved-0": "",
    "vdint0": "1", // VD0 interrupt timing
    "reserved-1": "",
    "vdint1": "8001" // VD1 interrupt timing
  }, 
  "alaw": { // Alaw settings
    "reserved-0": "",
    "ccdtbl": "0",
    "gwdi": "0"
  }, 
  "rec656if": {
    "reserved-0": "",
    "eccfvh": "0", // FVH error correction enable
    "r656on": "0" // ITU-R BT656 interface enable
  }, 
  "cfg": { // CONFIGURATION REGISTER
    "reserved-0": "0",
    "vdlc": "1", // 0x1 Disable latching function registers on the internal VS sync pulse.
    "reserved-1": "0",
    "msbinvi": "0",
    "bswd": "0", // Byte swap data stored to memory.
    "y8pos": "0",
    "reserved-2": "0",
    "wenlog": "0", // Valid area settings
    "fidmd": "0", // Settings of field identification detection function
    "bw656": "0", // The data width in ITU-R BT656 input mode.
    "reserved-3": "0",
    "reserved-4": "0",
    "reserved-5": "0",
    "reserved-6": "0"
  }, 
  "fmtcfg": {
    "reserved-0": "0x0000",
    "vpif_frq": "0x0", // preview, h3a, hist, etc
    "vpen": "0", // ditto
    "vpin": "0x4",
    "plen_even": "0x0",
    "plen_odd": "0x0",
    "lnum": "0x0",
    "lnalt": "0",
    "fmten": "0"
  }, 
  "fmt_horz": { // DATA REFORMATTER HORIZ INFO REGISTER
    "reserved-0": "0",
    "fmtsph": "1", // Start pixel horizontal from start of the HS sync pulse.
    "reserved-1": "0",
    "fmtlnh": "128" // Number of pixels in horizontal direction to use for the data reformatter (minimum is 2 pixels)
  }, 
  "fmt_vert": { // DATA REFORMATTER VERT INFO REGISTER
    "reserved-0": "0",
    "fmtslv": "1", // Start line from start of VS sync pulse for the data reformatter
    "reserved-1": "0",
    "fmtlnv": "7808" // Number of lines in vertical direction for the data reformatter
  }, 
  "fmt_addr_i": { // DATA REFORMATTER ADDR PTR x SETUP REGISTER
    "reserved-0": "0",
    "line": "0",
    "reserved-1": "0",
    "init": "0"
  }, 
  "prgeven0": { // PROGRAM ENTRIES 0-7 FOR EVEN LINES REGISTER
    "even7": "0",
    "even6": "0",
    "even5": "0",
    "even4": "0",
    "even3": "0",
    "even2": "0",
    "even1": "0",
    "even0": "0"
  }, 
  "prgeven1": { // PROGRAM ENTRIES 8-15 FOR EVEN LINES REGISTER
    "even15": "0",
    "even14": "0",
    "even13": "0",
    "even12": "0",
    "even11": "0",
    "even10": "0",
    "even9": "0",
    "even8": "0"
  }, 
  "prgodd0": { // PROGRAM ENTRIES 0-7 FOR ODD LINES REGISTER
    "odd7": "0",
    "odd6": "0",
    "odd5": "0",
    "odd4": "0",
    "odd3": "0",
    "odd2": "0",
    "odd1": "0",
    "odd0": "0"
  }, 
  "prgodd1": { // PROGRAM ENTRIES 8-15 FOR ODD LINES REGISTER
    "odd15": "0",
    "odd14": "0",
    "odd13": "0",
    "odd12": "0",
    "odd11": "0",
    "odd10": "0",
    "odd09": "0",
    "odd08": "0"
  }, 
  "vp_out": { // VIDEO PORT OUTPUT REGISTER
    "reserved-0": "0",
    "vert_num": "15999",
    "horz_num": "128",
    "horz_st": "1"
  }, 
  "lsc_config": { // LENS SHADING COMPENSATION CONTROL AND STATUS REGISTER
    "reserved-0": "",
    "gain_mode_m": "",
    "reserved-1": "",
    "gain_mode_n": "",
    "busy": "",
    "after_reform": "",
    "reserved-2": "",
    "gain_format": "",
    "enable": "0"
  }, 
  "lsc_initial": { // LENS SHADING COMPENSATION INITIAL X/Y REGISTER
    "reserved-0": "",
    "y": "",
    "reserved-1": "",
    "x": ""
  }, 
  "lsc_table_base": { // LENS SHADING COMPENSATION TABLE BASE ADDRESS REGISTER
    "base": ""
  }, 
  "lsc_table_offset": { // LENS SHADING COMPENSATION TABLE OFFSET REGISTER
    "reserved-0": "",
    "offset": ""
  }
};

exports.omap3530 = {};
//exports.omap3530.isp = {};
exports.omap3530.ccdc = ccdc;
