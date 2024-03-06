autowatch = 1;
inlets = 1;
outlets = 3;

function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

function addUnique(val, arr) {
    const exists = arr.indexOf(val); 
    if (exists !== -1) return; 
    arr.push(val);
    return arr;
  }

var routArr = [];
var ins = [];
var outs = [];
var gains = [];
var labels = [];
var outlabels = [];
var udps =[];
var qmet, vDict, dIter, rou, indexMaps, strs, strLs, recs, zlgs;

function clearD(){
    ins = [];
    outs = [];
    gains = [];
}
function dictionary(args){
    var d = new Dict(args);
   
    var inny = d.get("in");
    var outty = d.get("out");
    var gainy = d.get("gain");
    ins.push(inny);
    outs.push(outty);
    gains.push(gainy);

}
function oLabClear(){
    gc();
    outlabels = [];
}


function outlabs(args){
    outlabels.push(args);
}

function makeRouting(){
    this.patcher.remove(qmet);
    this.patcher.remove(vDict);
    this.patcher.remove(dIter);
    this.patcher.remove(rou);
    if(indexMaps){
    for(i=0;i<indexMaps.length;i++){
    this.patcher.remove(indexMaps[i]);
    this.patcher.remove(strs[i]);
    this.patcher.remove(strLs[i]);
    this.patcher.remove(recs[i]);
    this.patcher.remove(zlgs[i]);
    this.patcher.remove(preps[i]);
    }
}
    indexMaps = [];
    strs = [];
    strLs = [];
    recs = [];
    zlgs = [];
    preps = [];

    qmet = this.patcher.newdefault(0, 0, "qmetro", 20);
    qmet.setattr("active", 1);


    vDict = this.patcher.newdefault(0, 20, "dict", "vals");
    dIter = this.patcher.newdefault(0, 40, "dict.iter");
    rou = this.patcher.newdefault(0, 60, "route", "values");
   
    this.patcher.connect(qmet, 0, vDict, 0);
    this.patcher.connect(vDict, 0, dIter, 0);
    this.patcher.connect(dIter, 0, rou, 0);


    for(k=0;k<udps.length; k++){
        this.patcher.remove(udps[i]);
    }
    udps = [];
    var uOuts = uniq(outs);
    for(i=0;i<uOuts.length;i++){
    var udp = this.patcher.newdefault(80, 20*i + 160, "udpsend", "localhost", outlabels[uOuts[i]]);
    udps.push(udp);

    var prep = this.patcher.newdefault(80, 20*i + 140, "prepend", "/" + outlabels[uOuts[i]]);
    preps.push(prep);

    var recName = "indexRec" + i;
    var rec = this.patcher.newdefault(80, 20*i + 40, "receive", recName);
    recs.push(rec);
    
    var zlg = this.patcher.newdefault(80, 20*i + 60, "zl.group");
    zlgs.push(zlg);

    var indx = this.patcher.newdefault(80, 20*i + 80, "zl.indexmap");
    indexMaps.push(indx);

    var str = this.patcher.newdefault(80, 20*i + 100, "string");
    strs.push(str);

    var strL = this.patcher.newdefault(80, 20*i + 120, "string.tolist");
    strLs.push(strL);

    
    this.patcher.connect(rec, 0, zlg, 0);
    this.patcher.connect(zlg, 0, indx, 1);
    this.patcher.connect(rou, 0, indx, 0)
    this.patcher.connect(indx, 0, str, 0);
    this.patcher.connect(str, 0, strL, 0);
    this.patcher.connect(strL, 0, prep, 0);
    this.patcher.connect(prep, 0, udp, 0);


    var cons = [];
    for(m=0;m<ins.length;m++){
        if(outs[m]=uOuts[i]){
        cons.push(ins[m]);
        }
     }

    }
    if(cons.length>0){
    for(j=0;j<cons.length;j++){
    messnamed(recName, cons[j]);
   
    }
    messnamed(recName, "bang");
    }


}
function bang(){
    var valDict = new Dict("vals");
    var values = valDict.get("values");

    var labDict = new Dict("labs");
    labels = labDict.get("labels");

    
}


