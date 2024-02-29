autowatch = 0;
inlets = 1;
outlets = 1;

//var names = [];
var IPs = [];
var UDPSends = [];
var UDPReceives = [];

var mainSend = this.patcher.newdefault(100, 60, "send", "mainSend");
var mainReceive = this.patcher.newdefault(400, 0, "receive", "mainSend");

function addUnique(val, arr) {
    const exists = arr.indexOf(val); 
    if (exists !== -1) return; 
    arr.push(val);
    return arr;
  }

//function name(args){
//        addUnique(args, names);
//        outlet(0, "names" + " " + names.toString());
//}

function ip(args){
    const exists = IPs.indexOf(args);
    if(exists != -1){return};
    IPs.push(args);
    var len = IPs.length;
    var newPortIn = 7000 + len;
    var newPortOut = 7200 + len;
    udpReceive = this.patcher.newdefault(50, len*20, "udpreceive", newPortIn);
    udpSend = this.patcher.newdefault(400, len * 20 + 20, "udpsend", args, newPortOut);
    udpPortSend = this.patcher.newdefault(100, len*20 + 250, "udpsend", args, 7656);
    fromSym = this.patcher.newdefault(100, len*20 + 230, "fromsymbol");
    this.patcher.hiddenconnect(this.box, 0, fromSym, 0);
    this.patcher.hiddenconnect(fromSym, 0, udpPortSend, 0);
    outlet(0, "yourPort/" + " " + newPortIn);
    this.patcher.hiddenconnect(udpReceive, 0, mainSend, 0);
    this.patcher.hiddenconnect(mainReceive, 0, udpSend, 0);
}

