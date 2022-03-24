import { FBXLoader } from './build/jsm/loaders/FBXLoader.js';
import * as THREE from './build/three.module.js';
const fbxloader = new FBXLoader();

var dachglas_fest_repeat;
var dachglas_repeat;
var dachglas_schiebeglas_repeat;

var dachsparren_end;
var dachsparren_repeat;
var dachsparren_start;

var dachueberstand_end;
var dachueberstand_start;

var frontbalken_end;
var frontbalken_repeat;
var frontbalken_start;

var rinne_eingerueckt_end;
var rinne_end;
var rinne_repeat;
var rinne_start;

var hausCol;
var skysphere;
var smBoden;
var smCity;
var smDeko;
var smZaun;
var led_row;
var smUserimage;
// var hausCol;


var sparrenmetall_repeat;



var stoffbahn_repeat;
var stuetze;
var terrassendachcol;
var wandbalken_end;
var wandbalken_repeat;
var wandbalken_start;
var wandmetall_end;
var wandmetall_repeat;
var wandmetall_start;
var wandstuetze;


var sparrenfestglas_start;
var sparrenfestglas_repeat;
var sparrenfestglas_end;

var sparrenschiebeglas_start;
var sparrenschiebeglas_repeat;
var sparrenschiebeglas_end;


var isLoaded = false;
// var fbxloader_e
export const LoadFBXFile = (file) => {
    return new Promise(function(resolve, reject) {
        fbxloader.load("models/maderos/" + file, (file) => resolve(file));

    });

}






// export function InitFBXFiles(_fbxloader_e) {
//     var promises = [];
//     promises.push(LoadFBXFile('models/maderos/dachglas_fest_repeat.FBX', (e) => { dachglas_fest_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/dachglas_repeat.FBX', (e) => { dachglas_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/dachglas_schiebeglas_repeat.FBX', (e) => { dachglas_schiebeglas_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/dachsparren_end.FBX', (e) => { dachsparren_end = e }));
//     promises.push(LoadFBXFile('models/maderos/dachsparren_repeat.FBX', (e) => { dachsparren_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/dachsparren_start.FBX', (e) => { dachsparren_start = e }));
//     promises.push(LoadFBXFile('models/maderos/dachueberstand_end.FBX', (e) => { dachueberstand_end = e }));
//     promises.push(LoadFBXFile('models/maderos/dachueberstand_start.FBX', (e) => { dachueberstand_start = e }));
//     promises.push(LoadFBXFile('models/maderos/frontbalken_end.FBX', (e) => { frontbalken_end = e }));
//     promises.push(LoadFBXFile('models/maderos/frontbalken_repeat.FBX', (e) => { frontbalken_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/frontbalken_start.FBX', (e) => { frontbalken_start = e }));
//     promises.push(LoadFBXFile('models/maderos/rinne_eingerueckt_end.FBX', (e) => { rinne_eingerueckt_end = e }));
//     promises.push(LoadFBXFile('models/maderos/rinne_end.FBX', (e) => { rinne_end = e }));
//     promises.push(LoadFBXFile('models/maderos/rinne_repeat.FBX', (e) => { rinne_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/rinne_start.FBX', (e) => { rinne_start = e }));
//     promises.push(LoadFBXFile('models/maderos/sparrenfestglas_repeat.FBX', (e) => { sparrenfestglas_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/sparrenmetall_repeat.FBX', (e) => { sparrenmetall_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/sparrenschiebeglas_end.FBX', (e) => { sparrenschiebeglas_end = e }));
//     promises.push(LoadFBXFile('models/maderos/sparrenschiebeglas_repeat.FBX', (e) => { sparrenschiebeglas_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/sparrenschiebeglas_start.FBX', (e) => { sparrenschiebeglas_start = e }));
//     promises.push(LoadFBXFile('models/maderos/stoffbahn_repeat.FBX', (e) => { stoffbahn_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/stuetze.FBX', (e) => { stuetze = e }));
//     promises.push(LoadFBXFile('models/maderos/terrassendachcol.FBX', (e) => { terrassendachcol = e }));
//     promises.push(LoadFBXFile('models/maderos/wandbalken_end.FBX', (e) => { wandbalken_end = e }));
//     promises.push(LoadFBXFile('models/maderos/wandbalken_repeat.FBX', (e) => { wandbalken_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/wandbalken_start.FBX', (e) => { wandbalken_start = e }));
//     promises.push(LoadFBXFile('models/maderos/wandmetall_end.FBX', (e) => { wandmetall_end = e }));
//     promises.push(LoadFBXFile('models/maderos/wandmetall_repeat.FBX', (e) => { wandmetall_repeat = e }));
//     promises.push(LoadFBXFile('models/maderos/wandmetall_start.FBX', (e) => { wandmetall_start = e }));
//     promises.push(LoadFBXFile('models/maderos/wandstuetze.FBX', (e) => { wandstuetze = e }));

//     return promises;





// }


// export async function GetFBXObject(_objName) {
//     let tries = 30;
//     let willFail = true;
//     return new Promise(function cb(resolve, reject) {
//         //console.log(tries + ' remaining');
//         if (GetInternFile(_objName) == null || GetInternFile(_objName) == undefined) {
//             willFail = true;
//         } else {
//             willFail = false
//         }
//         if (--tries > 0) {
//             setTimeout(function() {
//                 cb(resolve, reject);
//             }, 500);
//         } else {
//             if (willFail) {
//                 reject('Failure');
//             } else {
//                 resolve(GetInternFile(_objName));
//             }
//         }
//     });
// }



// export function GetFBXObject(_objName) {
//     // return GetInternFile(_objName);
//     return new Promise(function(resolve, reject) {
//         // do {

//         // }
//         // while (!GetInternFile(_objName))
//         // if (GetInternFile(_objName) == null || GetInternFile(_objName) == undefined) {


//         // } else {
//         resolve(GetInternFile(_objName));
//         // }
//         // GetInternFile(_objName, (file) => resolve(file));
//     });

// }
let counter = 0;




let value;
export function GetInternFile(_objName) {

    //console.log(counter);
    counter++;

    let objName = _objName.toLowerCase();
    return new Promise((resolve, reject) => {

        //console.log(objName)

        if (objName == "dachglas_fest_repeat.fbx") {
            if (dachglas_fest_repeat != null && dachglas_fest_repeat != undefined) {
                value = dachglas_fest_repeat;
                resolve(value);
            } else {
                LoadFBXFile('dachglas_fest_repeat.FBX').then((e) => {
                    dachglas_fest_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachglas_repeat.fbx") {
            if (dachglas_repeat != null && dachglas_repeat != undefined) {
                value = dachglas_repeat;
                resolve(value);
            } else {
                LoadFBXFile('dachglas_repeat.FBX').then((e) => {
                    dachglas_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachglas_schiebeglas_repeat.fbx") {
            if (dachglas_schiebeglas_repeat != null && dachglas_schiebeglas_repeat != undefined) {
                value = dachglas_schiebeglas_repeat;
                resolve(value);
            } else {
                LoadFBXFile('dachglas_schiebeglas_repeat.FBX').then((e) => {
                    dachglas_schiebeglas_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachsparren_end.fbx") {
            if (dachsparren_end != null && dachsparren_end != undefined) {
                value = dachsparren_end;
                resolve(value);
            } else {
                LoadFBXFile('dachsparren_end.FBX').then((e) => {
                    dachsparren_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachsparren_repeat.fbx") {
            if (dachsparren_repeat != null && dachsparren_repeat != undefined) {
                value = dachsparren_repeat;
                resolve(value);
            } else {
                LoadFBXFile('dachsparren_repeat.FBX').then((e) => {
                    dachsparren_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachsparren_start.fbx") {
            if (dachsparren_start != null && dachsparren_start != undefined) {
                value = dachsparren_start;
                resolve(value);
            } else {
                LoadFBXFile('dachsparren_start.FBX').then((e) => {
                    dachsparren_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachueberstand_end.fbx") {
            if (dachueberstand_end != null && dachueberstand_end != undefined) {
                value = dachueberstand_end;
                resolve(value);
            } else {
                LoadFBXFile('dachueberstand_end.FBX').then((e) => {
                    dachueberstand_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "dachueberstand_start.fbx") {
            if (dachueberstand_start != null && dachueberstand_start != undefined) {
                value = dachueberstand_start;
                resolve(value);
            } else {
                LoadFBXFile('dachueberstand_start.FBX').then((e) => {
                    dachueberstand_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "frontbalken_end.fbx") {
            if (frontbalken_end != null && frontbalken_end != undefined) {
                value = frontbalken_end;
                resolve(value);
            } else {
                LoadFBXFile('frontbalken_end.FBX').then((e) => {
                    frontbalken_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "frontbalken_repeat.fbx") {
            if (frontbalken_repeat != null && frontbalken_repeat != undefined) {
                value = frontbalken_repeat;
                resolve(value);
            } else {
                LoadFBXFile('frontbalken_repeat.FBX').then((e) => {
                    frontbalken_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "frontbalken_start.fbx") {
            if (frontbalken_start != null && frontbalken_start != undefined) {
                value = frontbalken_start;
                resolve(value);
            } else {
                LoadFBXFile('frontbalken_start.FBX').then((e) => {
                    frontbalken_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "rinne_eingerueckt_end.fbx") {
            if (rinne_eingerueckt_end != null && rinne_eingerueckt_end != undefined) {
                value = rinne_eingerueckt_end;
                resolve(value);
            } else {
                LoadFBXFile('rinne_eingerueckt_end.FBX').then((e) => {
                    rinne_eingerueckt_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "rinne_end.fbx") {
            if (rinne_end != null && rinne_end != undefined) {
                value = rinne_end;
                resolve(value);
            } else {
                LoadFBXFile('rinne_end.FBX').then((e) => {
                    rinne_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "rinne_repeat.fbx") {
            if (rinne_repeat != null && rinne_repeat != undefined) {
                value = rinne_repeat;
                resolve(value);
            } else {
                LoadFBXFile('rinne_repeat.FBX').then((e) => {
                    rinne_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "rinne_start.fbx") {
            if (rinne_start != null && rinne_start != undefined) {
                value = rinne_start;
                resolve(value);
            } else {
                LoadFBXFile('rinne_start.FBX').then((e) => {
                    rinne_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "sparrenfestglas_repeat.fbx") {
            if (sparrenfestglas_repeat != null && sparrenfestglas_repeat != undefined) {
                value = sparrenfestglas_repeat;
                resolve(value);
            } else {
                LoadFBXFile('sparrenfestglas_repeat.FBX').then((e) => {
                    sparrenfestglas_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "sparrenfestglas_start.fbx") {
            if (sparrenfestglas_start != null && sparrenfestglas_start != undefined) {
                value = sparrenfestglas_start;
                resolve(value);
            } else {
                LoadFBXFile('sparrenfestglas_start.FBX').then((e) => {
                    sparrenfestglas_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "sparrenfestglas_end.fbx") {
            if (sparrenfestglas_end != null && sparrenfestglas_end != undefined) {
                value = sparrenfestglas_end;
                resolve(value);
            } else {
                LoadFBXFile('sparrenfestglas_end.FBX').then((e) => {
                    sparrenfestglas_end = e;
                    value = e;
                    resolve(value);
                });


            }
        }
        // resolve(value);
        else if (objName == "sparrenmetall_repeat.fbx") {
            if (sparrenmetall_repeat != null && sparrenmetall_repeat != undefined) {
                value = sparrenmetall_repeat;
                resolve(value);
            } else {
                LoadFBXFile('sparrenmetall_repeat.FBX').then((e) => {
                    sparrenmetall_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        }
        // // else if (objName == "hauscol.fbx") value = hauscol;
        else if (objName == "sparrenschiebeglas_end.fbx") {
            if (sparrenschiebeglas_end != null && sparrenschiebeglas_end != undefined) {
                value = sparrenschiebeglas_end;
                resolve(value);
            } else {
                LoadFBXFile('sparrenschiebeglas_end.FBX').then((e) => {
                    sparrenschiebeglas_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "sparrenschiebeglas_repeat.fbx") {
            if (sparrenschiebeglas_repeat != null && sparrenschiebeglas_repeat != undefined) {
                value = sparrenschiebeglas_repeat;
                resolve(value);
            } else {
                LoadFBXFile('sparrenschiebeglas_repeat.FBX').then((e) => {
                    sparrenschiebeglas_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "sparrenschiebeglas_start.fbx") {
            if (sparrenschiebeglas_start != null && sparrenschiebeglas_start != undefined) {
                value = sparrenschiebeglas_start;
                resolve(value);
            } else {
                LoadFBXFile('sparrenschiebeglas_start.FBX').then((e) => {
                    sparrenschiebeglas_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "stoffbahn_repeat.fbx") {
            if (stoffbahn_repeat != null && stoffbahn_repeat != undefined) {
                value = stoffbahn_repeat;
                resolve(value);
            } else {
                LoadFBXFile('stoffbahn_repeat.FBX').then((e) => {
                    stoffbahn_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "stuetze.fbx") {
            if (stuetze != null && stuetze != undefined) {
                value = stuetze;
                resolve(value);
            } else {
                LoadFBXFile('stuetze.FBX').then((e) => {
                    stuetze = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "terrassendachcol.fbx") {
            if (terrassendachcol != null && terrassendachcol != undefined) {
                value = terrassendachcol;
                resolve(value);
            } else {
                LoadFBXFile('terrassendachcol.FBX').then((e) => {
                    terrassendachcol = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandbalken_end.fbx") {
            if (wandbalken_end != null && wandbalken_end != undefined) {
                value = wandbalken_end;
                resolve(value);
            } else {
                LoadFBXFile('wandbalken_end.FBX').then((e) => {
                    wandbalken_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandbalken_repeat.fbx") {
            if (wandbalken_repeat != null && wandbalken_repeat != undefined) {
                value = wandbalken_repeat;
                resolve(value);
            } else {
                LoadFBXFile('wandbalken_repeat.FBX').then((e) => {
                    wandbalken_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandbalken_start.fbx") {
            if (wandbalken_start != null && wandbalken_start != undefined) {
                value = wandbalken_start;
                resolve(value);
            } else {
                LoadFBXFile('wandbalken_start.FBX').then((e) => {
                    wandbalken_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandmetall_end.fbx") {
            if (wandmetall_end != null && wandmetall_end != undefined) {
                value = wandmetall_end;
                resolve(value);
            } else {
                LoadFBXFile('wandmetall_end.FBX').then((e) => {
                    wandmetall_end = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandmetall_repeat.fbx") {
            if (wandmetall_repeat != null && wandmetall_repeat != undefined) {
                value = wandmetall_repeat;
                resolve(value);
            } else {
                LoadFBXFile('wandmetall_repeat.FBX').then((e) => {
                    wandmetall_repeat = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandmetall_start.fbx") {
            if (wandmetall_start != null && wandmetall_start != undefined) {
                value = wandmetall_start;
                resolve(value);
            } else {
                LoadFBXFile('wandmetall_start.FBX').then((e) => {
                    wandmetall_start = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "wandstuetze.fbx") {
            if (wandstuetze != null && wandstuetze != undefined) {
                value = wandstuetze;
                resolve(value);
            } else {
                LoadFBXFile('wandstuetze.FBX').then((e) => {
                    wandstuetze = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "hauscol.fbx") {
            if (hausCol != null && hausCol != undefined) {
                value = hausCol;
                resolve(value);
            } else {
                LoadFBXFile('hauscol.FBX').then((e) => {
                    hausCol = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "skysphere.fbx") {
            if (skysphere != null && skysphere != undefined) {
                value = skysphere;
                resolve(value);
            } else {
                LoadFBXFile('skysphere.FBX').then((e) => {
                    skysphere = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "smboden.fbx") {
            if (smBoden != null && smBoden != undefined) {
                value = smBoden;
                resolve(value);
            } else {
                LoadFBXFile('smBoden.FBX').then((e) => {
                    smBoden = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "smdeko.fbx") {
            if (smDeko != null && smDeko != undefined) {
                value = smDeko;
                resolve(value);
            } else {
                LoadFBXFile('smDeko.FBX').then((e) => {
                    smDeko = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "smcity.fbx") {
            if (smCity != null && smcity != undefined) {
                value = smCity;
                resolve(value);
            } else {
                LoadFBXFile('smCity.FBX').then((e) => {
                    smCity = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "smzaun.fbx") {
            if (smZaun != null && smZaun != undefined) {
                value = smZaun;
                resolve(value);
            } else {
                LoadFBXFile('smZaun.FBX').then((e) => {
                    smZaun = e;
                    value = e;
                    resolve(value);
                });


            }
        } else if (objName == "led_row.fbx") {
            if (led_row != null && led_row != undefined) {
                value = led_row;
                resolve(value);
            } else {
                LoadFBXFile('led_row.FBX').then((e) => {
                    led_row = e;
                    value = e;
                    resolve(value);
                });
            }
        } else if (objName == "smuserimage.fbx") {
            if (smUserimage != null && smUserimage != undefined) {
                value = smUserimage;
                resolve(value);
            } else {
                LoadFBXFile('smUserimage.FBX').then((e) => {
                    smUserimage = e;
                    value = e;
                    resolve(value);
                });
            }
        }




        // else if (objName == "wandbalken_start.fbx") value = wandbalken_start;
        // if (objName == "wandmetall_end.fbx") value = wandmetall_end;
        // if (objName == "wandmetall_repeat.fbx") value = wandmetall_repeat;

        // // //console.log(value)
        // if (value == null || value == undefined) {

        //     // return
        // }
        // //console.log(value);
        // if (value != null && value != undefined) {
        //     resolve(value);

        // } else {
        //     reject("e")
        // }
        // return value;

    });



}