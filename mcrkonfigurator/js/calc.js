let sparrenKlaueOffset = 8.5;

let schiebeGlasOffset = 2.2;
let glasBaseHeight = 2.78;
let komischesDreieckBaseHeight = 5.74;

let frontBalkenHeightEingerückt = { "4020": 135, "4810": 215, "5600": 215, "6390": 270 }
let frontBalkenHeightBuendig = { "4020": 215, "4810": 270, "5600": 300, "6390": 215 }
let sparrenBaseHeight = { "3955": 17.75, "3457": 15.56, "2959": 11.54 }

let sparrenHeight = 0;
let frontBalkenHeight = 0;
let glasHeight = 0;
let komischesDreieckHeight = 0;


export const GetRoofMaxHeight = (props) => {

    let useSparrenklaue = props.sparrenklaue;
    let useSchiebeglas = props.schiebeGlas;
    let useEingerueckt = props.eingerueckt;

    let durchgangsHeight = props.durchgangsHeight;
    let roofHeight = 0;
    let roofMaxHeight = 0;
    let roofDepth = props.roofDepth;
    let roofWidth = props.roofWidth;

    let additionalOffset = GetAdditionalOffset({ "roofDepth": roofDepth })

    useSparrenklaue ? sparrenHeight = sparrenBaseHeight[roofDepth] - sparrenKlaueOffset : sparrenHeight = sparrenBaseHeight[roofDepth]
    useSchiebeglas ? glasHeight = glasBaseHeight + schiebeGlasOffset : glasHeight = glasBaseHeight
    useSchiebeglas ? komischesDreieckHeight = komischesDreieckBaseHeight + schiebeGlasOffset : komischesDreieckHeight = komischesDreieckBaseHeight
    useEingerueckt ? frontBalkenHeight = frontBalkenHeightEingerückt[roofWidth] : frontBalkenHeight = frontBalkenHeightBuendig[roofWidth]

    roofMaxHeight = durchgangsHeight + frontBalkenHeight + sparrenHeight + glasHeight + komischesDreieckHeight + additionalOffset;
    roofHeight = roofMaxHeight - sparrenHeight - glasHeight - komischesDreieckHeight

    return { "maxHeight": parseInt(roofMaxHeight), "roofHeight": parseInt(roofHeight) }

}

export const GetDurchgangsHeight = (props) => {
    let useSparrenklaue = props.sparrenklaue;
    let useSchiebeglas = props.schiebeGlas;
    let useEingerueckt = props.eingerueckt;

    let durchgangsHeight = 0;
    let roofHeight = 0;
    let roofMaxHeight = props.roofMaxHeight;

    let roofDepth = props.roofDepth;
    let roofWidth = props.roofWidth;

    let additionalOffset = GetAdditionalOffset({ "roofDepth": roofDepth })

    useSparrenklaue ? sparrenHeight = sparrenBaseHeight[roofDepth] - sparrenKlaueOffset : sparrenHeight = sparrenBaseHeight[roofDepth]
    useSchiebeglas ? glasHeight = glasBaseHeight + schiebeGlasOffset : glasHeight = glasBaseHeight
    useSchiebeglas ? komischesDreieckHeight = komischesDreieckBaseHeight + schiebeGlasOffset : komischesDreieckHeight = komischesDreieckBaseHeight
    useEingerueckt ? frontBalkenHeight = frontBalkenHeightEingerückt[roofWidth] : frontBalkenHeight = frontBalkenHeightBuendig[roofWidth]

    roofHeight = roofMaxHeight - sparrenHeight - glasHeight - komischesDreieckHeight
    durchgangsHeight = roofMaxHeight - sparrenHeight - glasHeight - komischesDreieckHeight - frontBalkenHeight - additionalOffset

    return { "durchgangsHeight": parseInt(durchgangsHeight), "roofHeight": parseInt(roofHeight) }
}






const GetAdditionalOffset = (props) => {
    var tan5 = Math.tan(5 * Math.PI / 180);
    var defaultkathete = tan5 * (props.roofDepth);

    return defaultkathete;
}