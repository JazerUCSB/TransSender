inlets = 1;
outlets = 1;

autowatch = 1;

var ports = [];

function portIn(args){
	const exists = ports.indexOf(args);
    if(exists != -1){return};
	ports.push(args);
	var stringIn = this.patcher.getnamed("stringIn");
	var udpRec = this.patcher.newdefault(1500, 50, "udpreceive", args);
	this.patcher.hiddenconnect(udpRec, 0, stringIn, 0);
	
	}