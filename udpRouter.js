autowatch = 0;
inlets = 1;

var names = [];
var IPs = [];
var UDPSends = [];


var mainReceive = this.patcher.newdefault(400, 0, "receive", "mainSend");

function addUnique(val, arr) {
    const exists = arr.indexOf(val); 
    if (exists !== -1) return; 
    arr.push(val);
    return arr;
  }

function name(args){
        addUnique(args, names);
        outlet(0, "names" + " " + names.toString());
}

function ip(args){
    const exists = IPs.indexOf(args);
    if(exists != -1) return;
    IPs.push(args);
    udp = this.patcher.newdefault(500, IPs.length*20, "udpsend", args, 7656);
    this.patcher.hiddenconnect(mainReceive, 0, udp, 0);
}

