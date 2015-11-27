'use strict';

module.exports = function getCorrectTimeFormat() {
    var dagsetning = new Date();
    var dagur;
    var manudur;
    var klst;
    var min;
    if (dagsetning.getDate() < 10) {
        dagur = "0" + dagsetning.getDate();
    }
    else {
        dagur = dagsetning.getDate();
    }
    if (dagsetning.getMonth() < 10) {
        manudur = "0" + dagsetning.getMonth();
    }
    else {
        manudur = dagsetning.getMonth();
    }
    if (dagsetning.getHours() < 10) {
        klst = "0" + dagsetning.getHours();
    }
    else {
        klst = dagsetning.getHours();
    }
    if (dagsetning.getMinutes() < 10) {
        min = "0" + dagsetning.getMinutes();
    }
    else {
        min = dagsetning.getMinutes();
    }
    var ar = dagsetning.getFullYear();
    var temp = parseInt(manudur);
    temp += 1;
    manudur = temp.toString();
    var ret = dagur + "." + manudur + "." + ar + " " + klst + ":" + min;
    return ret;
};