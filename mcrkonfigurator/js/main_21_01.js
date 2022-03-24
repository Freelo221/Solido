// neu 19.01.2022 passiveIfSupported 
/* Feature detection */
let passiveIfSupported = false;
try {
    window.addEventListener("test", null,
        Object.defineProperty({},
            "passive", {
                get: function() { passiveIfSupported = { passive: true }; }
            }
        )
    );
} catch (err) {}


var mixcolor = function(color_1, color_2, weight) {
    function d2h(d) { return d.toString(16); } // convert a decimal value to hex
    function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal 

    weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

    var color = "";

    for (var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
        var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
            v2 = h2d(color_2.substr(i, 2)),

            // combine the current pairs from each source color, according to the specified weight
            val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

        while (val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit

        color += val; // concatenate val to our new color string
    }

    return color; // PROFIT!
};





import * as THREE from './build/three.module.js';

// import Stats from './build/jsm/libs/stats.module.js';
import { GUI } from './build/jsm/libs/dat.gui.module.js';

import { OrbitControls, orbitSetRestrictions } from './build/jsm/controls/OrbitControls.js';



import { LightProbeGenerator } from './build/jsm/lights/LightProbeGenerator.js';

import { FBXLoader } from './build/jsm/loaders/FBXLoader.js';
// import { GLTFLoader } from './build/jsm/loaders/GLTFLoader.js';
// import { TDSLoader } from './build/jsm/loaders/TDSLoader.js';
// import { OBJLoader } from './build/jsm/loaders/OBJLoader.js';



import { EffectComposer } from './build/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './build/jsm/postprocessing/RenderPass.js';
// import { SAOPass } from './build/jsm/postprocessing/SAOPass.js';
import { SSAOPass } from './build/jsm/postprocessing/SSAOPass.js';

import { ShaderPass } from './build/jsm/postprocessing/ShaderPass.js';

import { FXAAShader } from './build/jsm/shaders/FXAAShader.js';

import { GammaCorrectionShader } from './build/jsm/shaders/GammaCorrectionShader.js';

// import { BokehPass } from './js/build/jsm/postprocessing/BokehPass.js'; // nicht sicher ob das was macht

import { RectAreaLightHelper } from './build/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from './build/jsm/lights/RectAreaLightUniformsLib.js';

import * as fbxCollection from "./fbxloader.js";
import { CheckConfiguration } from "./dynamic.js";
var terrassendachcol;
export var isInitialized = false;


var cameraLookAtTargetVector = new THREE.Vector3(20, 4, -22); // initial camera lookat target - always updated every frame

const fbxloader = new FBXLoader();


const gridsizeW = 7.9;
var terrassendachWidthElementsArr = [];

export var desiredWidthElements = 8;
export function UpdateDWEExtern(_value) { desiredWidthElements = _value; }
var prevWidthElements = 0;

export var currentPolePositionIsEingerueckt = true;
var poleXOffset = 7.2;
export var FilesLoaded = false;
var metallsparrenPivotYOffset = 27.059;
var metallsparrenPivotZOffset = 3.281;

var holzsparrenPivotYOffset = 25.347;
var holzsparrenPivotZOffset = 2.722;


var hiddenMeshPoolYOffset = 3000;

const intialSizeZeroToWall = 36.98;

var currentGlobalScale = 1;

var schiebeGlasSelected = false;
var dachueberstandSelected = false;
var wandstuetzeSelected = false;

var stoffbahnenSelected = false;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let mesh;

let renderer, scene, camera, stats;
let composer, renderPass, saoPass, ssaoPass, fxaaPass;


let lightProbe;
let directionalLight, directionalLighttargetObject;
let light1, light2, light3, light4;
const clock = new THREE.Clock();

// variablen für GUI
const API = {
    lightProbeIntensity: 0.3,
    envMapIntensity: 0.4,
    directionalLightIntensity: 0.5,
    directionalLightHeight: 57,
    directionalLightDistance: 44,
    directionalLightRotation: 0.2,
    directionalLightColor: 0xffffff,


    gammaFactor: 2.2,

    light1x: -12,
    light1y: 35,
    light1z: 25,
    light1color: 0xffe4b5,
    light1intensity: 0.69,
    light1distance: 71,

    light2x: 74,
    light2y: 45,
    light2z: -3,
    light2color: 0x477aff,
    light2intensity: 0.69,
    light2distance: 90,

    light3x: 77,
    light3y: 67,
    light3z: -11,
    light3color: 0xd5dbfb,
    light3intensity: 0.20,
    light3distance: 100,

    light4x: 26,
    light4y: 26,
    light4z: -81,
    light4color: 0xf7e052,
    light4intensity: 0.62,
    light4distance: 100,




    materialTerrassendachColor: 0xF1F0EA,
    materialTerrassendachMetalness: 0,
    materialTerrassendachRoughness: 0.95,
    materialTerrassendachEmissive: 0, // 0.15,

    materialMetallColor: 0xbfbfbf,
    materialMetallMetalness: 0.605, // 0.26
    materialMetallRoughness: 0.39, // 0.86
    materialMetallEmissive: 0.0,

    materialMetallDarkColor: 0x333333,
    materialMetallDarkMetalness: 0.26,
    materialMetallDarkRoughness: 0.86,
    materialMetallDarkEmissive: 0.15,

    materialRinneColor: 0xe0e0e0,
    materialRinneMetalness: 0.87,
    materialRinneRoughness: 0.48,




    materialBodenColor: 0xffffff,
    materialBodenMetalness: 0,
    materialBodenRoughness: 0.6,

    materialGrassColor: 0xc7ffad,
    materialGrassMetalness: 0,
    materialGrassRoughness: 1,



    materialGlassColor: 0xffffff,
    materialGlassMetalness: 0.1,
    materialGlassRoughness: 0.0,
    materialGlassTransmission: 0.9,


    materialGlassBorderColor: 0x6dfcfc,
    materialGlassBorderMetalness: 0.2,
    materialGlassBorderRoughness: 0.1,
    materialGlassBorderTransmission: 0.8,



    materialHauswandColor: 0xcecece,
    materialHauswandMetalness: 0,
    materialHauswandRoughness: 0.975,
    materialHauswandEmissive: 0, // 0.15,

    materialHausinnenColor: 0x2b2b2b,
    materialHausinnenMetalness: 0,
    materialHausinnenRoughness: 0.975,
    materialHausinnenEmissive: 0, // 0.15,

    materialHausdachziegelColor: 0x000000,
    materialHausdachziegelMetalness: 0,
    materialHausdachziegelRoughness: 0.7,

    materialHausblechColor: 0xffffff,
    materialHausblechMetalness: 0.982,
    materialHausblechRoughness: 0.684,

    materialHausfensterrahmenColor: 0x232323,
    materialHausfensterrahmenMetalness: 0,
    materialHausfensterrahmenRoughness: 0.79,

    materialHausfensterglasColor: 0xffffff,
    materialHausfensterglasMetalness: 0.1,
    materialHausfensterglasRoughness: 0.077,
    materialHausfensterglasEmissive: 0.05,
    materialHausfensterglasTransmission: 0.82,


    materialHausholzColor: 0xffffff,
    materialHausholzMetalness: 0,
    materialHausholzRoughness: 1,

    materialHausfundamentColor: 0x474747,
    materialHausfundamentMetalness: 0,
    materialHausfundamentRoughness: 0.95,

    materialHausvorhangColor: 0xffffff,
    materialHausvorhangMetalness: 0,
    materialHausvorhangRoughness: 0.95,







    materialDullColor: 0x939393,
    materialDullMetalness: 0,
    materialDullRoughness: 0.5,


    materialCityColor: 0xcccccc,
    materialCityMetalness: 0,
    materialCityRoughness: 0.85,

    materialSkysphereColor: 0xffffff,
    materialSkysphereMetalness: 0,
    materialSkysphereRoughness: 1,
    materialSkysphereenvMapIntensity: 1,
    materialSkysphereEmissive: 0.5,


    materialHedgeColor: 0x939393,
    materialHedgeMetalness: 0,
    materialHedgeRoughness: 0.78,



};


let mixer; // fbx loader ex ani mixer


let materialBoden, materialHauswand, materialHausinnen, materialHausdachziegel, materialHausblech, materialHausfensterrahmen, materialHausfensterglas, materialHausholz, materialHausfundament, materialHausvorhang, materialGlass, materialGlassBorder, materialGlassArr, materialMetall, materialRinne, materialEmissive, materialDull, materialSkysphere;
let materialTerrassendach, diffuseMapTerrassendach, roughnessMapTerrassendach, normalMapTerrassendach, diffuseMapTerrassendachGlatt, roughnessMapTerrassendachGlatt, normalMapTerrassendachGlatt;
let materialGrass;
let materialHedge;
let materialCity;
let materialStoffbahnArr, materialStoffbahn;
let materialMetallDark;

let controls;







var diffuseMapHausinnen;

var diffuseMapHauswandKlinkerRot, roughnessMapHauswandKlinkerRot, normalMapHauswandKlinkerRot;
var diffuseMapHauswandKlinkerGrau;
var diffuseMapHauswandPutzWeiss, roughnessMapHauswandPutzWeiss, normalMapHauswandPutzWeiss;
// var diffuseMapHauswandPutzGrau;

var diffuseMapHausdachziegelRot, roughnessMapHausdachziegelRot, normalMapHausdachziegelRot;

var diffuseMapBodenDielen, roughnessMapBodenDielen, normalMapBodenDielen;
var diffuseMapBodenFliesen, roughnessMapBodenFliesen, normalMapBodenFliesen;

var diffuseMapGrass, roughnessMapGrass, normalMapGrass;
var diffuseMapHedge, opacityMapHedge, normalMapHedge;


let cubemapTextureWithLightprobe, getCubemapTextureUrls;
const textureLoader = new THREE.TextureLoader();


function init() {


    // let x = fbxCollection.InitFBXFiles(fbxloader);






    isInitialized = true;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;



    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xB5E4FB); // hellblau
    // scene.fog = new THREE.Fog( 0xB5E4FB, 20, 300 );		
    // scene.fog = new THREE.FogExp2( 0xB5E4FB, 0.0015 );		







    // // // // overwrite shadowmap code
    // // // let shader = THREE.ShaderChunk.shadowmap_pars_fragment;
    // // // shader = shader.replace(
    // // // '#ifdef USE_SHADOWMAP',
    // // // '#ifdef USE_SHADOWMAP' +
    // // // document.getElementById( 'PCSS' ).textContent
    // // // );
    // // // shader = shader.replace(
    // // // '#if defined( SHADOWMAP_TYPE_PCF )',
    // // // document.getElementById( 'PCSSGetShadow' ).textContent +
    // // // '#if defined( SHADOWMAP_TYPE_PCF )'
    // // // );
    // // // THREE.ShaderChunk.shadowmap_pars_fragment = shader;



    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winWidth, winHeight);

    // renderer.setClearColor( scene.fog.color )

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap		// PCFSoftShadowMap		// VSMShadowMap // BasicShadowMap

    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // renderer an DOM anfügen
    var threecontainer = document.getElementById("threecontainer");
    threecontainer.appendChild(renderer.domElement);

    threecontainer.style.opacity = 0.33; // loadingscreenloadingscreen init
    threecontainer.style.filter = "blur(20px)"; // loadingscreen done

    // tone mapping
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 0.85;



    function onMouseWheelScrollTest(event) {
        // event.preventDefault();
        // //console.log(event);
        // if ( event.deltaY < 0 ) {
        // //console.log(event.deltaY)
        // } else if ( event.deltaY > 0 ) {
        // //console.log(event.deltaY)
        // }
        var x = $(".menu-option").scrollTop();
        $(".menu-option").scrollTop(x + event.deltaY);
    }
    // renderer.domElement.addEventListener( 'wheel', onMouseWheelScrollTest, { passive: false } );
    renderer.domElement.addEventListener('wheel', onMouseWheelScrollTest, passiveIfSupported); // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners





    // stats = new Stats();
    // document.body.appendChild( stats.dom );

    // camera
    // camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera = new THREE.PerspectiveCamera(40, winWidth / winHeight, 1, 3000);
    camera.position.set(50, 45, 100); // initial camera position



    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 1;
    controls.maxDistance = 180;
    controls.enablePan = true;
    controls.target = new THREE.Vector3(0, 0, 0); // initial camera lookat position


    // probe
    lightProbe = new THREE.LightProbe();
    scene.add(lightProbe);



    // directionallight
    directionalLight = new THREE.DirectionalLight(API.directionalLightColor, API.directionalLightIntensity);
    // directionalLight.position.set( 100, 100, 50 );
    directionalLight.position.set(34.38147887003194, 57, 51.864379979997324);
    // directionalLight.color.setHSL( 0.1, 0.7, 0.5 );
    directionalLight.castShadow = true; // default false
    scene.add(directionalLight);
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 300;
    // directionalLight.shadow.bias = 0.0001; 
    // directionalLight.shadow.radius = 1; /* blur .. was 3 */ // no effect on PCFSoftShadowMap
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;

    directionalLighttargetObject = new THREE.Object3D();
    // directionalLighttargetObject.position.set( 25, 0, 25 );
    directionalLighttargetObject.position.set(0, 0, 0);
    scene.add(directionalLighttargetObject);
    directionalLight.target = directionalLighttargetObject;

    // const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
    // scene.add( helper );





    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight(0xfffbf7, 1, 10.8, 22); // THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight1.position.set(11.4, 11.7, -38.5); // 17 0 35
    rectLight1.lookAt(11.4, 11.7, 0);
    scene.add(rectLight1);
    // scene.add( new RectAreaLightHelper( rectLight1 ) );	

    const rectLight2 = new THREE.RectAreaLight(0xfffbf7, 1, 10.8, 22); // THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight2.position.set(29.5, 11.7, -38.5); // 17 0 35
    rectLight2.lookAt(29.5, 11.7, 0);
    scene.add(rectLight2);
    // scene.add( new RectAreaLightHelper( rectLight2 ) );	

    const rectLight3 = new THREE.RectAreaLight(0xfffbf7, 1, 11, 11.5); // THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight3.position.set(-18.2, 16.9, -38.5); // 17 0 35
    rectLight3.lookAt(-18.2, 16.9, 0);
    scene.add(rectLight3);
    // scene.add( new RectAreaLightHelper( rectLight3 ) );		

    const rectLight4 = new THREE.RectAreaLight(0xfffbf7, 1, 11, 11.5); // THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight4.position.set(-43.2, 16.9, -38.5); // 17 0 35
    rectLight4.lookAt(-43.2, 16.9, 0);
    scene.add(rectLight4);
    // scene.add( new RectAreaLightHelper( rectLight4 ) );				




    const sphereshapelight = new THREE.SphereGeometry(0.5, 16, 8);



    // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    light1 = new THREE.PointLight(API.light1color, API.light1intensity, API.light1distance);
    // light1.add(new THREE.Mesh(sphereshapelight, new THREE.MeshBasicMaterial({ color: API.light1color })));
    light1.position.set(API.light1x, API.light1y, API.light1z);
    light1.castShadow = false;
    scene.add(light1);
    light1.shadow.mapSize.width = 512;
    light1.shadow.mapSize.height = 512;
    light1.shadow.camera.near = 0.5;
    light1.shadow.camera.far = 500;

    light2 = new THREE.PointLight(API.light2color, API.light2intensity, API.light2distance);
    // light2.add(new THREE.Mesh(sphereshapelight, new THREE.MeshBasicMaterial({ color: API.light2color })));
    light2.position.set(API.light2x, API.light2y, API.light2z);
    light2.castShadow = false;
    scene.add(light2);
    light2.shadow.mapSize.width = 512;
    light2.shadow.mapSize.height = 512;
    light2.shadow.camera.near = 0.5;
    light2.shadow.camera.far = 500;

    // light3 = new THREE.PointLight( API.light3color, API.light3intensity, API.light3distance );
    // light3.add( new THREE.Mesh( sphereshapelight, new THREE.MeshBasicMaterial( { color: API.light3color } ) ) );
    // light3.position.set(  API.light3x, API.light3y, API.light3z );
    // light3.castShadow = true;
    // scene.add( light3 );
    // light3.shadow.mapSize.width = 512;
    // light3.shadow.mapSize.height = 512;
    // light3.shadow.camera.near = 0.5;
    // light3.shadow.camera.far = 500;	

    // light4 = new THREE.PointLight( API.light4color, API.light4intensity, API.light4distance );
    // light4.add( new THREE.Mesh( sphereshapelight, new THREE.MeshBasicMaterial( { color: API.light4color } ) ) );
    // light4.position.set(  API.light4x, API.light4y, API.light4z );
    // light4.castShadow = true;
    // scene.add( light4 );
    // light4.shadow.mapSize.width = 512;
    // light4.shadow.mapSize.height = 512;
    // light4.shadow.camera.near = 0.5;
    // light4.shadow.camera.far = 500;	










    const getCubemapTextureUrls_helper_genCubeUrls = function(prefix, postfix) {
        return [
            prefix + 'px' + postfix, prefix + 'nx' + postfix,
            prefix + 'py' + postfix, prefix + 'ny' + postfix,
            prefix + 'pz' + postfix, prefix + 'nz' + postfix
        ];
    };


    // envmap
    // https://polyhaven.com/a/lilienstein
    // equirectangular img to slices - https://jaxry.github.io/panorama-to-cubemap/
    // const getCubemapTextureUrls_helper_genCubeUrls = function(prefix, postfix) {
    //     return [
    //         prefix + 'px' + postfix, prefix + 'nx' + postfix,
    //         prefix + 'py' + postfix, prefix + 'ny' + postfix,
    //         prefix + 'pz' + postfix, prefix + 'nz' + postfix
    //     ];
    // };
    // const getCubemapTextureUrls = getCubemapTextureUrls_helper_genCubeUrls( 'textures/cube/pisa/', '.png' );
    const getCubemapTextureUrls = getCubemapTextureUrls_helper_genCubeUrls('textures/maderos/lilienstein/', '.jpg');
    const cubemapTextureWithLightprobe = new THREE.CubeTextureLoader().load(getCubemapTextureUrls, function(cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture));
    });









    scene.background = cubemapTextureWithLightprobe; // cubemap als background der scene setzen	

















    LoadJpgTextures();
    LoadMaterials();

    const meshGround = new THREE.Mesh(new THREE.PlaneGeometry(450, 450), materialGrass);
    meshGround.rotation.x = -Math.PI / 2;
    meshGround.receiveShadow = true;
    scene.add(meshGround);

    LoadEnvirnomentObjects().then((e) => {
        console.log(e)
        Promise.all(e).then(() => {
            EnvObjectsAll.forEach((e) => {
                console.log(scene.add(e))
                console.log(e)
            })
            threecontainer.style.opacity = 1; // loadingscreen done
            threecontainer.style.filter = "blur(0)"; // loadingscreen done
            console.log(scene.children)

        })

    })


    buildTerrassendachObjects().then(() => {
        isInitialized = true;
        CheckConfiguration();
    })












    composer = new EffectComposer(renderer);
    renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // const bokehPass = new BokehPass( scene, camera, {
    // focus: 1.0,
    // aperture: 0.025,
    // maxblur: 0.01,
    // width: winWidth,
    // height: winHeight
    // });
    // composer.addPass( bokehPass );

    // saoPass = new SAOPass( scene, camera, false, true );
    // saoPass.params.saoIntensity = 0.02;
    // saoPass.params.saoScale = 15;
    // saoPass.params.saoKernelRadius = 32;
    // saoPass.params.saoMinResolution = 0.001;
    // composer.addPass( saoPass );


    ssaoPass = new SSAOPass(scene, camera, winWidth, winHeight);
    ssaoPass.kernelRadius = 0.3;
    composer.addPass(ssaoPass);


    const pixelRatio = renderer.getPixelRatio();
    fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.x = 1 / (winWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (winHeight * pixelRatio);
    composer.addPass(fxaaPass);
    composer.addPass(new ShaderPass(GammaCorrectionShader));
















    // Init gui
    //const gui = new GUI();
    //gui.width = 600;
    //gui.domElement.style.userSelect = 'none';				
    var gui = new GUI({ autoPlace: false });
    gui.width = 400;
    gui.domElement.id = 'gui';

    gui.closed = true;
    document.getElementById("gui_container").appendChild(gui.domElement);



    // const folderssao = gui.addFolder( 'SSAO' );
    // folderssao.add( saoPass.params, 'output', {
    // 'Beauty': SAOPass.OUTPUT.Beauty,
    // 'Beauty+SAO': SAOPass.OUTPUT.Default,
    // 'SAO': SAOPass.OUTPUT.SAO,
    // 'Depth': SAOPass.OUTPUT.Depth,
    // 'Normal': SAOPass.OUTPUT.Normal
    // } ).onChange( function ( value ) {
    // saoPass.params.output = parseInt( value );
    // });
    // folderssao.add( saoPass.params, 'saoBias', - 1, 1 );
    // folderssao.add( saoPass.params, 'saoIntensity', 0, 1 );
    // folderssao.add( saoPass.params, 'saoScale', 0, 20 );
    // folderssao.add( saoPass.params, 'saoKernelRadius', 1, 100 );
    // folderssao.add( saoPass.params, 'saoMinResolution', 0, 1 );
    // folderssao.add( saoPass.params, 'saoBlur' );
    // folderssao.add( saoPass.params, 'saoBlurRadius', 0, 200 );
    // folderssao.add( saoPass.params, 'saoBlurStdDev', 0.5, 150 );
    // folderssao.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1 );


    const folderssao = gui.addFolder('SSAO');

    folderssao.add(ssaoPass, 'output', {
        'Default': SSAOPass.OUTPUT.Default,
        'SSAO Only': SSAOPass.OUTPUT.SSAO,
        'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
        'Beauty': SSAOPass.OUTPUT.Beauty,
        'Depth': SSAOPass.OUTPUT.Depth,
        'Normal': SSAOPass.OUTPUT.Normal
    }).onChange(function(value) {

        ssaoPass.output = parseInt(value);

    });
    folderssao.add(ssaoPass, 'kernelRadius').min(0.0).max(4);
    folderssao.add(ssaoPass, 'minDistance').min(0.001).max(0.02);
    folderssao.add(ssaoPass, 'maxDistance').min(0.01).max(0.3);






    const folderdirectionallight = gui.addFolder('directionallight');

    folderdirectionallight.add(API, 'lightProbeIntensity', 0, 1, 0.02).onChange(function() {
        lightProbe.intensity = API.lightProbeIntensity;
        render();
    });
    folderdirectionallight.add(API, 'envMapIntensity', 0, 1, 0.02).onChange(function() {
        // directionalLight.material.envMapIntensity = API.envMapIntensity; 
        materialTerrassendach.envMapIntensity = API.envMapIntensity;
        materialBoden.envMapIntensity = API.envMapIntensity;
        materialGrass.envMapIntensity = API.envMapIntensity;

        materialHedge.envMapIntensity = API.envMapIntensity;

        materialHausinnen.envMapIntensity = API.envMapIntensity;
        materialHauswand.envMapIntensity = API.envMapIntensity;
        materialHausdachziegel.envMapIntensity = API.envMapIntensity;
        materialHausblech.envMapIntensity = API.envMapIntensity;
        materialHausfensterrahmen.envMapIntensity = API.envMapIntensity;
        materialHausfensterglas.envMapIntensity = API.envMapIntensity;
        materialHausholz.envMapIntensity = API.envMapIntensity;
        materialHausfundament.envMapIntensity = API.envMapIntensity;
        materialHausvorhang.envMapIntensity = API.envMapIntensity;

        materialMetall.envMapIntensity = API.envMapIntensity;
        materialRinne.envMapIntensity = API.envMapIntensity;
        materialCity.envMapIntensity = API.envMapIntensity;
        materialDull.envMapIntensity = API.envMapIntensity;
        materialGlass.envMapIntensity = API.envMapIntensity;
        materialGlassBorder.envMapIntensity = API.envMapIntensity;
        materialEmissive.envMapIntensity = API.envMapIntensity;
        render();
    });


    folderdirectionallight.add(API, 'directionalLightIntensity', 0, 2, 0.02).onChange(function() {
        directionalLight.intensity = API.directionalLightIntensity;
        render();
    });



    folderdirectionallight.add(API, 'directionalLightHeight', 10, 100, 1).onChange(function() {
        ////console.log("rot: " + API.directionalLightRotation + " dist: " + API.directionalLightDistance);
        var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
        var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
        // ////console.log( tempPositionToRotate );
        ////console.log(tempResult);
        directionalLight.position.x = tempResult[0];
        directionalLight.position.y = tempResult[1];
        directionalLight.position.z = tempResult[2];
        render();
    });
    folderdirectionallight.add(API, 'directionalLightDistance', 10, 500, 1).onChange(function() {
        ////console.log("rot: " + API.directionalLightRotation + " dist: " + API.directionalLightDistance);
        var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
        var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
        // ////console.log( tempPositionToRotate );
        ////console.log(tempResult);
        directionalLight.position.x = tempResult[0];
        directionalLight.position.y = tempResult[1];
        directionalLight.position.z = tempResult[2];
        render();
    });
    folderdirectionallight.add(API, 'directionalLightRotation', 0, 6.5, 0.001).onChange(function() {
        ////console.log("rot: " + API.directionalLightRotation + " dist: " + API.directionalLightDistance);
        var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
        var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
        // ////console.log( tempPositionToRotate );
        ////console.log(tempResult);
        directionalLight.position.x = tempResult[0];
        directionalLight.position.y = tempResult[1];
        directionalLight.position.z = tempResult[2];
        render();
    });


    folderdirectionallight.addColor(API, 'directionalLightColor').onChange(function(val) {
        directionalLight.color.setHex(val);
        render();
    });
    folderdirectionallight.add(API, 'gammaFactor', 0, 10, 0.1).onChange(function(val) {
        renderer.gammaFactor = API.gammaFactor;
        render();
    });
    // folderdirectionallight.open();


    // const bokehfolder = gui.addFolder( 'Bokeh' );
    // bokehfolder.add( API, "bokehfocus", 1.0, 3000.0, 10 ).onChange( function ( val ) {
    // bokehPass.uniforms[ "focus" ].value = API.bokehfocus; render();
    // });
    // bokehfolder.add( API, "bokehaperture", 0, 50, 0.1 ).onChange( function ( val ) {
    // bokehPass.uniforms[ "aperture" ].value = API.bokehaperture * 0.00001; render();
    // });
    // bokehfolder.add( API, "bokehmaxblur", 0.0, 0.01, 0.001 ).onChange( function ( val ) {
    // bokehPass.uniforms[ "maxblur" ].value = API.bokehmaxblur; render();
    // });



    // // // // // // const folderrectlight = gui.addFolder( 'rectLight3' )
    // // // // // // folderrectlight.add(rectLight3.position, 'x', -100, 100, 0.1).listen().onChange( function(){
    // // // // // // ////console.log(rectLight3.position.x)
    // // // // // // });	
    // // // // // // folderrectlight.add(rectLight3.position, 'y', -100, 100, 0.1).listen().onChange( function(){
    // // // // // // ////console.log(rectLight3.position.y)
    // // // // // // });
    // // // // // // folderrectlight.add(rectLight3.position, 'z', -100, 100, 0.1).listen().onChange( function(){
    // // // // // // ////console.log(rectLight3.position.z)
    // // // // // // });
    // // // // // // folderrectlight.add(rectLight3, 'width', 0, 100, 0.1).listen().onChange( function(){
    // // // // // // ////console.log(rectLight3.width)
    // // // // // // });	
    // // // // // // folderrectlight.add(rectLight3, 'height', 0, 100, 0.1).listen().onChange( function(){
    // // // // // // ////console.log(rectLight3.height)
    // // // // // // });




    const flight1 = gui.addFolder('light1')
    flight1.add(light1.position, 'x', -100, 100).listen().onChange(function() {
        ////console.log(light1.position.x)
    });
    flight1.add(light1.position, 'y', -100, 100).listen().onChange(function() {
        ////console.log(light1.position.y)
    });
    flight1.add(light1.position, 'z', -100, 100).listen().onChange(function() {
        ////console.log(light1.position.z)
    })
    flight1.add(API, 'light1intensity', 0, 5, 0.01).onChange(function() {
        ////console.log(light1.intensity)
        light1.intensity = API.light1intensity;
        render();
    });
    flight1.add(API, 'light1distance', 0, 500, 0.1).onChange(function() {
        ////console.log(light1.distance)
        light1.distance = API.light1distance;
        render();
    });
    flight1.addColor(API, 'light1color').onChange(function(val) {
        light1.color.setHex(val);
        render();
    });
    // flight1.open();






    const flight2 = gui.addFolder('light2')
    flight2.add(light2.position, 'x', -100, 100).listen().onChange(function() {
        ////console.log(light2.position.x)
    });
    flight2.add(light2.position, 'y', -100, 100).listen().onChange(function() {
        ////console.log(light2.position.y)
    });
    flight2.add(light2.position, 'z', -100, 100).listen().onChange(function() {
        ////console.log(light2.position.z)
    })
    flight2.add(API, 'light2intensity', 0, 5, 0.01).onChange(function() {
        ////console.log(light2.intensity)
        light2.intensity = API.light2intensity;
        render();
    });
    flight2.add(API, 'light2distance', 0, 500, 0.1).onChange(function() {
        ////console.log(light2.distance)
        light2.distance = API.light2distance;
        render();
    });
    flight2.addColor(API, 'light2color').onChange(function(val) {
        light2.color.setHex(val);
        render();
    });




    // const flight3 = gui.addFolder( 'light3' )
    // flight3.add(light3.position, 'x', -100, 100).listen().onChange( function(){
    // ////console.log(light3.position.x)
    // });	
    // flight3.add(light3.position, 'y', -100, 100).listen().onChange( function(){
    // ////console.log(light3.position.y)
    // });
    // flight3.add(light3.position, 'z', -100, 100).listen().onChange( function(){
    // ////console.log(light3.position.z)
    // } )
    // flight3.add( API, 'light3intensity', 0, 5, 0.01 ).onChange( function () {
    // ////console.log(light3.intensity)
    // light3.intensity = API.light3intensity; render();
    // });
    // flight3.add( API, 'light3distance', 0, 500, 0.1 ).onChange( function () {
    // ////console.log(light3.distance)
    // light3.distance = API.light3distance; render();
    // });
    // flight3.addColor( API, 'light3color' ).onChange( function ( val ) {
    // light3.color.setHex( val ); render();
    // });




    // const flight4 = gui.addFolder( 'light4' )
    // flight4.add(light4.position, 'x', -100, 100).listen().onChange( function(){
    // ////console.log(light4.position.x)
    // });	
    // flight4.add(light4.position, 'y', -100, 100).listen().onChange( function(){
    // ////console.log(light4.position.y)
    // });
    // flight4.add(light4.position, 'z', -100, 100).listen().onChange( function(){
    // ////console.log(light4.position.z)
    // } )
    // flight4.add( API, 'light4intensity', 0, 5, 0.01 ).onChange( function () {
    // ////console.log(light4.intensity)
    // light4.intensity = API.light4intensity; render();
    // });
    // flight4.add( API, 'light4distance', 0, 500, 0.1 ).onChange( function () {
    // ////console.log(light4.distance)
    // light4.distance = API.light4distance; render();
    // });
    // flight4.addColor( API, 'light4color' ).onChange( function ( val ) {
    // light4.color.setHex( val ); render();
    // });



    const foldermaterialsrest = gui.addFolder('MaterialsRest')

    foldermaterialsrest.addColor(API, 'materialGrassColor').onChange(function(val) {
        materialGrass.color.setHex(val);
        render();
    });
    foldermaterialsrest.add(API, 'materialGrassMetalness', 0, 1, 0.001).onChange(function() {
        materialGrass.metalness = API.materialGrassMetalness;
        render();
    });
    foldermaterialsrest.add(API, 'materialGrassRoughness', 0, 1, 0.001).onChange(function() {
        materialGrass.roughness = API.materialGrassRoughness;
        render();
    });


    foldermaterialsrest.addColor(API, 'materialCityColor').onChange(function(val) {
        materialCity.color.setHex(val);
        render();
    });
    foldermaterialsrest.add(API, 'materialCityMetalness', 0, 1, 0.001).onChange(function() {
        materialCity.metalness = API.materialCityMetalness;
        render();
    });
    foldermaterialsrest.add(API, 'materialCityRoughness', 0, 1, 0.001).onChange(function() {
        materialCity.roughness = API.materialCityRoughness;
        render();
    });





    foldermaterialsrest.addColor(API, 'materialSkysphereColor').onChange(function(val) {
        materialSkysphere.color.setHex(val);
        render();
    });
    foldermaterialsrest.add(API, 'materialSkysphereMetalness', 0, 1, 0.001).onChange(function() {
        materialSkysphere.metalness = API.materialSkysphereMetalness;
        render();
    });
    foldermaterialsrest.add(API, 'materialSkysphereRoughness', 0, 1, 0.001).onChange(function() {
        materialSkysphere.roughness = API.materialSkysphereRoughness;
        render();
    });
    foldermaterialsrest.add(API, 'materialSkysphereenvMapIntensity', 0, 1, 0.001).onChange(function() {
        materialSkysphere.envMapIntensity = API.materialSkysphereenvMapIntensity;
        render();
    });
    foldermaterialsrest.add(API, 'materialSkysphereEmissive', 0, 10, 0.1).onChange(function() {
        materialSkysphere.emissiveIntensity = API.materialSkysphereEmissive;
        render();
    });




    const foldermaterials = gui.addFolder('Materials')

    foldermaterials.addColor(API, 'materialTerrassendachColor').onChange(function(val) {
        materialTerrassendach.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialTerrassendachMetalness', 0, 1, 0.001).onChange(function() {
        materialTerrassendach.metalness = API.materialTerrassendachMetalness;
        render();
    });
    foldermaterials.add(API, 'materialTerrassendachRoughness', 0, 1, 0.001).onChange(function() {
        materialTerrassendach.roughness = API.materialTerrassendachRoughness;
        render();
    });
    foldermaterials.add(API, 'materialTerrassendachEmissive', 0, 1, 0.001).onChange(function() {
        materialTerrassendach.emissiveIntensity = API.materialTerrassendachEmissive;
        render();
    });


    foldermaterials.addColor(API, 'materialBodenColor').onChange(function(val) {
        materialBoden.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialBodenMetalness', 0, 1, 0.001).onChange(function() {
        materialBoden.metalness = API.materialBodenMetalness;
        render();
    });
    foldermaterials.add(API, 'materialBodenRoughness', 0, 1, 0.001).onChange(function() {
        materialBoden.roughness = API.materialBodenRoughness;
        render();
    });



    foldermaterials.addColor(API, 'materialMetallColor').onChange(function(val) {
        materialMetall.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialMetallMetalness', 0, 1, 0.001).onChange(function() {
        materialMetall.metalness = API.materialMetallMetalness;
        render();
    });
    foldermaterials.add(API, 'materialMetallRoughness', 0, 1, 0.001).onChange(function() {
        materialMetall.roughness = API.materialMetallRoughness;
        render();
    });


    foldermaterials.addColor(API, 'materialRinneColor').onChange(function(val) {
        materialRinne.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialRinneMetalness', 0, 1, 0.001).onChange(function() {
        materialRinne.metalness = API.materialRinneMetalness;
        render();
    });
    foldermaterials.add(API, 'materialRinneRoughness', 0, 1, 0.001).onChange(function() {
        materialRinne.roughness = API.materialRinneRoughness;
        render();
    });


    foldermaterials.addColor(API, 'materialDullColor').onChange(function(val) {
        materialDull.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialDullMetalness', 0, 1, 0.001).onChange(function() {
        materialDull.metalness = API.materialDullMetalness;
        render();
    });
    foldermaterials.add(API, 'materialDullRoughness', 0, 1, 0.001).onChange(function() {
        materialDull.roughness = API.materialDullRoughness;
        render();
    });








    foldermaterials.addColor(API, 'materialGlassColor').onChange(function(val) {
        materialGlass.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialGlassMetalness', 0, 1, 0.001).onChange(function() {
        materialGlass.metalness = API.materialGlassMetalness;
        render();
    });
    foldermaterials.add(API, 'materialGlassRoughness', 0, 1, 0.001).onChange(function() {
        materialGlass.roughness = API.materialGlassRoughness;
        render();
    });
    foldermaterials.add(API, 'materialGlassTransmission', 0, 1, 0.001).onChange(function() {
        materialGlass.transmission = API.materialGlassTransmission;
        render();
    });


    foldermaterials.addColor(API, 'materialGlassBorderColor').onChange(function(val) {
        materialGlassBorder.color.setHex(val);
        render();
    });
    foldermaterials.add(API, 'materialGlassBorderMetalness', 0, 1, 0.001).onChange(function() {
        materialGlassBorder.metalness = API.materialGlassBorderMetalness;
        render();
    });
    foldermaterials.add(API, 'materialGlassBorderRoughness', 0, 1, 0.001).onChange(function() {
        materialGlassBorder.roughness = API.materialGlassBorderRoughness;
        render();
    });
    foldermaterials.add(API, 'materialGlassBorderTransmission', 0, 1, 0.001).onChange(function() {
        materialGlassBorder.transmission = API.materialGlassBorderTransmission;
        render();
    });








    const foldermaterialshaus = gui.addFolder('Materials Haus')

    foldermaterialshaus.addColor(API, 'materialHauswandColor').onChange(function(val) {
        materialHauswand.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHauswandMetalness', 0, 1, 0.001).onChange(function() {
        materialHauswand.metalness = API.materialHauswandMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHauswandRoughness', 0, 1, 0.001).onChange(function() {
        materialHauswand.roughness = API.materialHauswandRoughness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHauswandEmissive', 0, 1, 0.001).onChange(function() {
        materialHauswand.emissiveIntensity = API.materialHauswandEmissive;
        render();
    });


    foldermaterialshaus.addColor(API, 'materialHausinnenColor').onChange(function(val) {
        materialHausinnen.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausinnenMetalness', 0, 1, 0.001).onChange(function() {
        materialHausinnen.metalness = API.materialHausinnenMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausinnenRoughness', 0, 1, 0.001).onChange(function() {
        materialHausinnen.roughness = API.materialHausinnenRoughness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausinnenEmissive', 0, 20, 0.001).onChange(function() {
        materialHausinnen.emissiveIntensity = API.materialHausinnenEmissive;
        render();
    });




    foldermaterialshaus.addColor(API, 'materialHauswandColor').onChange(function(val) {
        materialHauswand.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHauswandMetalness', 0, 1, 0.001).onChange(function() {
        materialHauswand.metalness = API.materialHauswandMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHauswandRoughness', 0, 1, 0.001).onChange(function() {
        materialHauswand.roughness = API.materialHauswandRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausdachziegelColor').onChange(function(val) {
        materialHausdachziegel.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausdachziegelMetalness', 0, 1, 0.001).onChange(function() {
        materialHausdachziegel.metalness = API.materialHausdachziegelMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausdachziegelRoughness', 0, 1, 0.001).onChange(function() {
        materialHausdachziegel.roughness = API.materialHausdachziegelRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausblechColor').onChange(function(val) {
        materialHausblech.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausblechMetalness', 0, 1, 0.001).onChange(function() {
        materialHausblech.metalness = API.materialHausblechMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausblechRoughness', 0, 1, 0.001).onChange(function() {
        materialHausblech.roughness = API.materialHausblechRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausfensterrahmenColor').onChange(function(val) {
        materialHausfensterrahmen.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterrahmenMetalness', 0, 1, 0.001).onChange(function() {
        materialHausfensterrahmen.metalness = API.materialHausfensterrahmenMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterrahmenRoughness', 0, 1, 0.001).onChange(function() {
        materialHausfensterrahmen.roughness = API.materialHausfensterrahmenRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausfensterglasColor').onChange(function(val) {
        materialHausfensterglas.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterglasMetalness', 0, 1, 0.001).onChange(function() {
        materialHausfensterglas.metalness = API.materialHausfensterglasMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterglasRoughness', 0, 1, 0.001).onChange(function() {
        materialHausfensterglas.roughness = API.materialHausfensterglasRoughness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterglasEmissive', 0, 100, 0.001).onChange(function() {
        materialHausfensterglas.emissiveIntensity = API.materialHausfensterglasEmissive;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfensterglasTransmission', 0, 1, 0.001).onChange(function() {
        materialHausfensterglas.transmission = API.materialHausfensterglasTransmission;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausholzColor').onChange(function(val) {
        materialHausholz.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausholzMetalness', 0, 1, 0.001).onChange(function() {
        materialHausholz.metalness = API.materialHausholzMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausholzRoughness', 0, 1, 0.001).onChange(function() {
        materialHausholz.roughness = API.materialHausholzRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausfundamentColor').onChange(function(val) {
        materialHausfundament.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfundamentMetalness', 0, 1, 0.001).onChange(function() {
        materialHausfundament.metalness = API.materialHausfundamentMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausfundamentRoughness', 0, 1, 0.001).onChange(function() {
        materialHausfundament.roughness = API.materialHausfundamentRoughness;
        render();
    });

    foldermaterialshaus.addColor(API, 'materialHausvorhangColor').onChange(function(val) {
        materialHausvorhang.color.setHex(val);
        render();
    });
    foldermaterialshaus.add(API, 'materialHausvorhangMetalness', 0, 1, 0.001).onChange(function() {
        materialHausvorhang.metalness = API.materialHausvorhangMetalness;
        render();
    });
    foldermaterialshaus.add(API, 'materialHausvorhangRoughness', 0, 1, 0.001).onChange(function() {
        materialHausvorhang.roughness = API.materialHausvorhangRoughness;
        render();
    });

    // foldermaterialshaus.open();	
    // render();




    // listener für gui
    window.addEventListener('resize', onWindowResize);

    isInitialized = true;


} // init Ende


var counterX = 0;
const LoadFBXFile = (file) => {
    return new Promise(function(resolve, reject) {
        //console.log(counterX + " - " + file)
        counterX++;
        fbxloader.load('models/maderos/' + file, (dummy) => resolve(dummy));

    });
    // const fbxLoader = new FBXLoader();

    // const gltfLoader = new GLTFLoader();
    // const dummyPath = "models/maderos/hauscol.glb";
    // gltfLoader.load(dummyPath, (dummy) => resolve(dummy));
}


function LoadJpgTextures() {
    diffuseMapTerrassendach = textureLoader.load("textures/maderos/terrassendach_gebuerstet_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 12);
        texture.encoding = THREE.sRGBEncoding;
    })
    roughnessMapTerrassendach = textureLoader.load("textures/maderos/terrassendach_gebuerstet_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 12);;
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapTerrassendach = textureLoader.load("textures/maderos/terrassendach_gebuerstet_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 12);
    })

    diffuseMapTerrassendachGlatt = textureLoader.load("textures/maderos/terrassendach_glatt_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 8);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapTerrassendachGlatt = textureLoader.load("textures/maderos/terrassendach_gebuerstet_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 8);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapTerrassendachGlatt = textureLoader.load("textures/maderos/terrassendach_gebuerstet_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(8, 8);
    });
    diffuseMapBodenDielen = textureLoader.load("textures/maderos/woodfloor_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapBodenDielen = textureLoader.load("textures/maderos/woodfloor_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapBodenDielen = textureLoader.load("textures/maderos/woodfloor_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
    });

    diffuseMapBodenFliesen = textureLoader.load("textures/maderos/stonetile_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapBodenFliesen = textureLoader.load("textures/maderos/stonetile_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapBodenFliesen = textureLoader.load("textures/maderos/stonetile_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 2);
    });
    diffuseMapGrass = textureLoader.load("textures/maderos/grass_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(20, 20);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapGrass = textureLoader.load("textures/maderos/grass_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(20, 20);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapGrass = textureLoader.load("textures/maderos/grass_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(20, 20);
    });
    diffuseMapHausinnen = textureLoader.load("textures/maderos/gradient.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(1, 1);
        texture.encoding = THREE.sRGBEncoding;
    });

    diffuseMapHauswandPutzWeiss = textureLoader.load("textures/maderos/stucco_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapHauswandPutzWeiss = textureLoader.load("textures/maderos/stucco_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapHauswandPutzWeiss = textureLoader.load("textures/maderos/stucco_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(4, 4);
    });


    diffuseMapHauswandKlinkerRot = textureLoader.load("textures/maderos/brick_red_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapHauswandKlinkerRot = textureLoader.load("textures/maderos/brick_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapHauswandKlinkerRot = textureLoader.load("textures/maderos/brick_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
    });
    diffuseMapHauswandKlinkerGrau = textureLoader.load("textures/maderos/brick_grey_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;
    });
    diffuseMapHausdachziegelRot = textureLoader.load("textures/maderos/roof_albedo.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;
    });
    roughnessMapHausdachziegelRot = textureLoader.load("textures/maderos/roof_roughness.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;
    });
    normalMapHausdachziegelRot = textureLoader.load("textures/maderos/roof_normal.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(5, 5);
    });
}


function LoadMaterials() {
    materialTerrassendach = new THREE.MeshStandardMaterial({
        color: API.materialTerrassendachColor,
        metalness: API.materialTerrassendachMetalness,
        roughness: API.materialTerrassendachRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        emissive: API.materialTerrassendachColor,
        emissiveIntensity: API.materialTerrassendachEmissive,
        map: diffuseMapTerrassendach,
        roughnessMap: roughnessMapTerrassendach,
        normalMap: normalMapTerrassendach,
        normalScale: new THREE.Vector2(1, 1)
    });

    materialBoden = new THREE.MeshStandardMaterial({
        color: API.materialBodenColor,
        metalness: API.materialBodenMetalness,
        roughness: API.materialBodenRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        map: diffuseMapBodenDielen,
        roughnessMap: roughnessMapBodenDielen,
        normalMap: normalMapBodenDielen,
        normalScale: new THREE.Vector2(1, 1)
    });


    materialGrass = new THREE.MeshStandardMaterial({
        color: API.materialGrassColor,
        metalness: API.materialGrassMetalness,
        roughness: API.materialGrassRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        map: diffuseMapGrass,
        roughnessMap: roughnessMapGrass,
        normalMap: normalMapGrass,
        normalScale: new THREE.Vector2(1, 1)
    });
    materialHedge = new THREE.MeshStandardMaterial({
        color: API.materialHedgeColor,
        metalness: API.materialHedgeMetalness,
        roughness: API.materialHedgeRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        // map: diffuseMapHedge,	
        // normalMap: normalMapHedge,
        // normalScale: new THREE.Vector2( 1, 1 )
    });
    materialHedge = new THREE.MeshStandardMaterial({
        color: API.materialHedgeColor,
        metalness: API.materialHedgeMetalness,
        roughness: API.materialHedgeRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        // map: diffuseMapHedge,	
        // normalMap: normalMapHedge,
        // normalScale: new THREE.Vector2( 1, 1 )
    });

    materialHauswand = new THREE.MeshStandardMaterial({
        color: API.materialHauswandColor,
        metalness: API.materialHauswandMetalness,
        roughness: API.materialHauswandRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,

        emissive: API.materialHauswandColor,
        emissiveIntensity: API.materialHauswandEmissive,

        // map: diffuseMapHauswandKlinkerRot,
        // roughnessMap: roughnessMapHauswandKlinkerRot,
        // normalMap: normalMapHauswandKlinkerRot,
        // normalScale: new THREE.Vector2( 1, 1 )
    });



    materialHausinnen = new THREE.MeshStandardMaterial({
        color: API.materialHausinnenColor,
        metalness: API.materialHausinnenMetalness,
        roughness: API.materialHausinnenRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        emissive: API.materialHausinnenColor,
        emissiveIntensity: API.materialHausinnenEmissive,
        map: diffuseMapHausinnen,
    });

    materialHausdachziegel = new THREE.MeshStandardMaterial({
        color: API.materialHausdachziegelColor,
        metalness: API.materialHausdachziegelMetalness,
        roughness: API.materialHausdachziegelRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        map: diffuseMapHausdachziegelRot,
        roughnessMap: roughnessMapHausdachziegelRot,
        normalMap: normalMapHausdachziegelRot
    });
    materialHausblech = new THREE.MeshStandardMaterial({
        color: API.materialHausblechColor,
        metalness: API.materialHausblechMetalness,
        roughness: API.materialHausblechRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialHausfensterrahmen = new THREE.MeshStandardMaterial({
        color: API.materialHausfensterrahmenColor,
        metalness: API.materialHausfensterrahmenMetalness,
        roughness: API.materialHausfensterrahmenRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialHausfensterglas = new THREE.MeshPhysicalMaterial({
        color: API.materialHausfensterglasColor,
        metalness: API.materialHausfensterglasMetalness,
        roughness: API.materialHausfensterglasRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        emissive: API.materialHausfensterglasColor,
        emissiveIntensity: API.materialHausfensterglasEmissive,
        transmission: API.materialHausfensterglasTransmission,
        transparent: true,
    });


    materialHausholz = new THREE.MeshStandardMaterial({
        color: API.materialHausholzColor,
        metalness: API.materialHausholzMetalness,
        roughness: API.materialHausholzRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialHausfundament = new THREE.MeshStandardMaterial({
        color: API.materialHausfundamentColor,
        metalness: API.materialHausfundamentMetalness,
        roughness: API.materialHausfundamentRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialHausvorhang = new THREE.MeshStandardMaterial({
        color: API.materialHausvorhangColor,
        metalness: API.materialHausvorhangMetalness,
        roughness: API.materialHausvorhangRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialMetall = new THREE.MeshStandardMaterial({
        color: API.materialMetallColor,
        metalness: API.materialMetallMetalness,
        roughness: API.materialMetallRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialMetallDark = new THREE.MeshStandardMaterial({
        color: API.materialMetallDarkColor,
        metalness: API.materialMetallDarkMetalness,
        roughness: API.materialMetallDarkRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialRinne = new THREE.MeshStandardMaterial({
        color: API.materialRinneColor,
        metalness: API.materialRinneMetalness,
        roughness: API.materialRinneRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialDull = new THREE.MeshStandardMaterial({
        color: API.materialDullColor,
        metalness: API.materialDullMetalness,
        roughness: API.materialDullRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialCity = new THREE.MeshStandardMaterial({
        color: API.materialCityColor,
        metalness: API.materialCityMetalness,
        roughness: API.materialCityRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialSkysphere = new THREE.MeshStandardMaterial({
        color: API.materialSkyspherelColor,
        metalness: API.materialSkysphereMetalness,
        roughness: API.materialSkysphereRoughness,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.materialSkysphereenvMapIntensity,
        emissive: API.materialSkyspherelColor,
        emissiveIntensity: API.materialSkysphereEmissive,
    });


    materialGlass = new THREE.MeshPhysicalMaterial({
        color: API.materialGlassColor,
        metalness: API.materialGlassMetalness,
        roughness: API.materialGlassRoughness,
        transmission: API.materialGlassTransmission,
        // color: 0xffffff, 
        // metalness: 0, 
        // roughness: 0.1, 
        // transmission: 0.9, 
        transparent: true,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });
    materialGlassBorder = new THREE.MeshPhysicalMaterial({
        color: API.materialGlassBorderColor,
        metalness: API.materialGlassBorderMetalness,
        roughness: API.materialGlassBorderRoughness,
        transmission: API.materialGlassBorderTransmission,
        transparent: true,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
        //side: THREE.DoubleSide,
    });





    materialStoffbahn = new THREE.MeshStandardMaterial({
        color: '#0xfffad6',
        metalness: 0,
        roughness: 0.92,
        envMap: cubemapTextureWithLightprobe,
        envMapIntensity: API.envMapIntensity,
    });

    materialEmissive = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0,
        emissive: 0xffffff,
        emissiveIntensity: 10
    });

    materialGlassArr = [];
    materialGlassArr.push(materialGlass);
    materialGlassArr.push(materialGlassBorder);
    materialGlassArr.push(materialMetall);

    materialStoffbahnArr = [];
    materialStoffbahnArr.push(materialStoffbahn);
    materialStoffbahnArr.push(materialDull);
    materialStoffbahnArr.push(materialMetallDark);

}


// ###1
const EnvObjectsAll = [];

async function LoadEnvirnomentObjects() {




    return new Promise((resolve, reject) => {
        let EnvObjects = [];

        EnvObjects.push(fbxCollection.GetInternFile("smBoden.fbx").then((object) => {


            // const smBoden = fbxloader.load('models/maderos/smBoden.fbx', function(object) {
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material = materialBoden;
                    child.castShadow = true;
                    child.receiveShadow = true;

                }
            });
            object.isFbxMesh = true;
            object.matrixAutoUpdate = false;
            // scene.add(object);
            EnvObjectsAll.push(object);
            // EnvObjects.push(object);
        }));

        EnvObjects.push(fbxCollection.GetInternFile("smDeko.fbx").then((object) => {
            // const smDeko = fbxloader.load('models/maderos/smDeko.FBX', function(object) {
            // fbxCollection.GetFBXObject("smDeko.fbx").then((object) => {
            // fbxCollection.GetFBXObject("smDeko.fbx").then((object) => {
            object.traverse(function(child) {
                // alert("");
                if (child.isMesh) {
                    child.material = materialDull;
                    child.castShadow = true;
                    child.receiveShadow = true;

                }
            });
            object.isFbxMesh = true;
            object.matrixAutoUpdate = false;
            // scene.add(object);
            EnvObjectsAll.push(object);
            // EnvObjects.push(object);
        }));

        EnvObjects.push(fbxCollection.GetInternFile("skysphere.fbx").then((object) => {
            // const smSkydome = fbxloader.load('models/maderos/skysphere.FBX', function(object) {
            // fbxCollection.GetFBXObject("skysphere.fbx").then((object) => {
            ////console.log(object);
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material = materialSkysphere;
                    child.castShadow = false;
                    child.receiveShadow = false;

                }
            });
            object.isFbxMesh = true;
            object.isSkydome = true;
            object.matrixAutoUpdate = false;
            // scene.add(object);
            EnvObjectsAll.push(object);
            // EnvObjects.push(object);
        }))


        EnvObjects.push(fbxCollection.GetInternFile("smZaun.fbx").then((object) => {
            // const smHedge = fbxloader.load('models/maderos/smZaun.FBX', function(object) {
            // fbxCollection.GetFBXObject("smZaun.fbx").then((object) => {
            object.traverse(function(child) {
                if (child.isMesh) {
                    // // child.material = materialHedge;
                    // // // child.material.transparent = true;
                    // // child.castShadow = true;
                    // // child.receiveShadow = true;
                    child.material = materialDull;
                    child.castShadow = true;
                    child.receiveShadow = true;

                }
            });
            object.isFbxMesh = true;
            object.matrixAutoUpdate = false;
            // scene.add(object);
            EnvObjectsAll.push(object);
            // EnvObjects.push(object);
        }));

        EnvObjects.push(fbxCollection.GetInternFile("smCity.fbx").then((object) => {
            // const smCity = fbxloader.load('models/maderos/smCity.FBX', function(object) {
            // fbxCollection.GetFBXObject("smCity.fbx").then((object) => {
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material = materialCity;
                    child.castShadow = false;
                    child.receiveShadow = false;
                }
            });
            object.isFbxMesh = true;
            object.matrixAutoUpdate = false;
            // scene.add(object);
            EnvObjectsAll.push(object);
            // EnvObjects.push(object);
        }));

        EnvObjects.push(fbxCollection.GetInternFile("hausCol.fbx").then((object) => {
            // const house = fbxloader.load('models/maderos/hausCol.FBX', function(object) {
            // fbxCollection.GetFBXObject("smCity.fbx").then((object) => {
            // object.traverse(function(child) {
            //     if (child.isMesh) {
            //         child.material = materialCity;
            //         child.castShadow = false;
            //         child.receiveShadow = false;
            //     }
            // });
            object.traverse(configureMaterials);
            //     //assuming your scene doesn't need to wait for the textures, add it straight way
            // scene.add(object); //assumes scene is a global variable or whatever
            //console.log("hausMesh added");
            // EnvObjects.push(object);
            EnvObjectsAll.push(object);
        }));
        resolve(EnvObjects);
    });
    // resolve(EnvObjects)
    // })
    // fbxCollection.GetFBXObject("smBoden.fbx").then((object) => {

}

// async function




async function setupHausMesh() {
    ////console.log("setupHausMesh");
    //load in the dummy fbx model here, "wait" until it's done
    const dummy = await new Promise(loadHausMesh);
    //do your material setup here like normal
    dummy.traverse(configureMaterials);
    //assuming your scene doesn't need to wait for the textures, add it straight way
    scene.add(dummy); //assumes scene is a global variable or whatever
    //console.log("hausMesh added");

    threecontainer.style.opacity = 1; // loadingscreen done
    threecontainer.style.filter = "blur(0)"; // loadingscreen done

}

async function configureMaterials(child) {
    if (child instanceof THREE.Mesh) {
        if (child.isMesh) {
            if (child.name == "hauscol_wand") {
                child.material = materialHauswand;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_dachziegel") {
                child.material = materialHausdachziegel;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_blech") {
                child.material = materialHausblech;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_fensterrahmen") {
                child.material = materialHausfensterrahmen;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_fensterglas") {
                child.material = materialHausfensterglas;
                child.castShadow = false;
                child.receiveShadow = false;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_fundament") {
                child.material = materialHausfundament;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_rinne") {
                child.material = materialRinne;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_holz") {
                child.material = materialHausholz;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_inside") {
                child.material = materialHausinnen;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
            if (child.name == "hauscol_vorhang") {
                child.material = materialHausvorhang;
                child.castShadow = true;
                child.receiveShadow = true;
                child.matrixAutoUpdate = false;
            }
        }
    }
}

//helper function to load-in the dummy model
function loadHausMesh(resolve, reject) {
    const fbxLoader = new FBXLoader();
    const dummyPath = "models/maderos/hauscol.FBX";
    fbxLoader.load(dummyPath, (dummy) => resolve(dummy));
    // const gltfLoader = new GLTFLoader();
    // const dummyPath = "models/maderos/hauscol.glb";
    // gltfLoader.load(dummyPath, (dummy) => resolve(dummy));
}





function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
    object.rotation.set((-Math.PI / 2), 0, 0)
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
}

function getTanFromDegrees(degrees) {
    return Math.tan(degrees * Math.PI / 180);
}

function loadTerrassendachTeilMesh(meshfile, materialname, castShadowBool, recieveShadowBool, xoffset, yoffset, zoffset, gridnum = 0, startrepeatlast = "single", objecttype = "readymesh", scaleDepthBool, rotateRoofStuffBool, ignoreZScalingPosBool, hiddenBool) {
    if (typeof gridnum === "undefined") { gridnum = 0; }
    if (typeof startrepeatlast === "undefined") { startrepeatlast = "single"; }
    if (typeof objecttype === "undefined") { objecttype = "single"; }


    // existiert genau diese kombination schon in der scene - z.b. aus dem sichtfeld geschoben?
    var existiertschon = false;
    for (var i = scene.children.length - 1; i >= 0; i--) {
        var obj = scene.children[i];
        if (obj.isFbxMesh && obj.meshfile == meshfile && obj.gridnum == gridnum && obj.startrepeatlast == startrepeatlast && obj.objecttype == objecttype) {
            //console.log("genau dieses mesh existiert schon.... " + meshfile);


            obj.position.set(obj.position.x, (obj.position.y - hiddenMeshPoolYOffset), obj.position.z); // wieder 3000 units runter schieben
            existiertschon = true;

            // //console.log("Test");


            /* skalierungs kram start - von load neues model kopiert*/

            ////console.log("position is: ");
            ////console.log(obj.position);


            var existingX = obj.position.x;
            var existingY = obj.position.y;
            var existingZ = obj.position.z;

            ////console.log("existiert scale: ");
            ////console.log(obj.scale);

            var initialScale = 0.1;
            var repositionedByScaleZOffset = (zoffset * currentGlobalScale) + (intialSizeZeroToWall * currentGlobalScale - intialSizeZeroToWall);
            // pivotpunkt weiter oben wegen skalieren und drehen um 5 grad
            if (scaleDepthBool == true) {
                var newScale = initialScale * currentGlobalScale;
                obj.scale.set(initialScale, newScale, initialScale); // ////console.log( obj.scale );  // länge - yes
            }

            // // grade dach teile rotieren
            // if(rotateRoofStuffBool == true){
            // rotateObject(obj, 5, 0, 0); // yes! - 5 grad rotieren. 5 grad ist immer fest eingestellt
            // }

            // wandbalken und wandmetall
            // endstücke an der Wand sind eh immer direkt da dran. Skalierung hat auf Z Achse keine einfluss, nur Y Achse durch neue Dach Hühe wegen Neigung 5 grad
            if (ignoreZScalingPosBool == true) {
                repositionedByScaleZOffset = zoffset;
                var tan5 = Math.tan(5 * Math.PI / 180);
                var defaultkathete = tan5 * (intialSizeZeroToWall - zoffset);
                var skaliertkathete = tan5 * ((intialSizeZeroToWall - zoffset) * currentGlobalScale)
                var differenzkathete = skaliertkathete - defaultkathete;
                yoffset += differenzkathete; // neuer offset dazu

            }
            // // obj.position.set( xoffset, (yoffset - hiddenMeshPoolYOffset),repositionedByScaleZOffset );

            ////console.log("zoffset: " + zoffset);
            ////console.log("repositionedByScaleZOffset: " + repositionedByScaleZOffset);
            ////console.log("yoffset: " + yoffset);



            if (hiddenBool == true) {
                obj.isHidden = true;
                yoffset += hiddenMeshPoolYOffset
            }
            if (hiddenBool == false) {
                obj.isHidden = false;
                // yoffset += hiddenMeshPoolYOffset
            }



            obj.position.set(existingX, yoffset, repositionedByScaleZOffset);
            // obj.updateMatrix();
            // obj.position.set( existingX, existingY ,zoffset );


            /* skalierungs kram ende */





        }
    }

    if (existiertschon == false) {

        // LoadFBXFile(meshfile).then((object) => {
        fbxCollection.GetInternFile(meshfile).then((object) => {
            // object = fbxCollection.GetFBXObject(meshfile);


            // //console.log(object)

            // //console.log(object)
            // //console.log(fbxCollection.dachglas_fest_repeat);
            // if (!object) {

            //     fbxloader.load('models/maderos/' + meshfile + '', (_object) => { object = _object });
            // }
            // return;
            // terrassendachcol = fbxloader.load('models/maderos/' + meshfile + '', function(object) {
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.material = materialname;
                    child.castShadow = castShadowBool;
                    child.receiveShadow = recieveShadowBool;
                    child.matrixAutoUpdate = true;
                }
            });

            if (objecttype == "stuetze" && startrepeatlast == "start") {
                var isAlreadyEingerueckt = currentPolePositionIsEingerueckt;
                object.isAlreadyEingerueckt = isAlreadyEingerueckt;
                if (isAlreadyEingerueckt == true) {
                    xoffset = xoffset + poleXOffset
                }
            }
            if (objecttype == "stuetze" && startrepeatlast == "end") {
                var isAlreadyEingerueckt = currentPolePositionIsEingerueckt;
                object.isAlreadyEingerueckt = isAlreadyEingerueckt;
                if (isAlreadyEingerueckt == true) {
                    xoffset = xoffset - poleXOffset
                }
            }

            // meine custom attribute
            object.isFbxMesh = true;
            object.meshfile = meshfile;
            object.gridnum = gridnum;
            object.startrepeatlast = startrepeatlast;
            object.objecttype = objecttype;
            // object.matrixAutoUpdate = false;

            var initialScale = 0.1;
            var repositionedByScaleZOffset = (zoffset * currentGlobalScale) + (intialSizeZeroToWall * currentGlobalScale - intialSizeZeroToWall);


            // max z 27.059 == three y
            // max y -3.281 == three z
            // Haus startet max y -36.98
            // in three xoffset, 27.059, 3.281

            // ////console.log( meshfile ); // sparrenschiebeglas_start.FBX
            // ////console.log( object.rotation ); // Object { _x: -1.5707963267948963, _y: 0, _z: 0, _order: "XYZ", _onChangeCallback: onRotationChange() }
            // object.rotation.set( -1.5707963267948963,1,1 ); // rotation ist in radians

            // var metallsparrenPivotYOffset = 27.059;
            // var metallsparrenPivotZOffset = 3.281;

            // var xoffset = (i-1) * gridsizeW;	// links rechts
            // var yoffset = 0;					// hoch runter
            // var zoffset = 0;					// vor zurück


            // pivotpunkt weiter oben wegen skalieren und drehen um 5 grad
            if (scaleDepthBool == true) {
                var newScale = initialScale * currentGlobalScale;
                object.scale.set(initialScale, newScale, initialScale); // ////console.log( object.scale );  // länge - yes
            }

            // grade dach teile rotieren
            if (rotateRoofStuffBool == true) {
                rotateObject(object, 5, 0, 0); // yes! - 5 grad rotieren. 5 grad ist immer fest eingestellt
            }
            // wandbalken und wandmetall
            // endstücke an der Wand sind eh immer direkt da dran. Skalierung hat auf Z Achse keine einfluss, nur Y Achse durch neue Dach Hühe wegen Neigung 5 grad
            if (ignoreZScalingPosBool == true) {
                repositionedByScaleZOffset = zoffset;
                // // // tangenz( alpha ) * ankethete
                // ////console.log("meshfile: "+meshfile);
                var tan5 = Math.tan(5 * Math.PI / 180);
                // ////console.log("tan 5 "+  tan5  );
                // ////console.log("länge  "+  (intialSizeZeroToWall-zoffset)  );
                var defaultkathete = tan5 * (intialSizeZeroToWall - zoffset);
                // ////console.log("default wert kathete "+ defaultkathete   );
                // ////console.log("länge skaliert "+  (intialSizeZeroToWall-zoffset)*currentGlobalScale  );
                var skaliertkathete = tan5 * ((intialSizeZeroToWall - zoffset) * currentGlobalScale)
                    // ////console.log("skalierter wert kathete "+   skaliertkathete );
                var differenzkathete = skaliertkathete - defaultkathete;
                // ////console.log("differenz skaliertkathete - defaultkathete --- neuer offset: "+differenzkathete);
                // ////console.log("------------------");
                yoffset += differenzkathete; // neuer offset dazu
            }

            // wenn hiddenBool gegeben, starte 3000 unis weiter oben und isthidden // var schiebeGlasSelected = false; <-- default wert
            if (hiddenBool == true) {
                object.isHidden = true;
                yoffset += hiddenMeshPoolYOffset; // neuer offset dazu
            } else {
                object.isHidden = false;
            }

            // object.position.set(xoffset, yoffset, repositionedByScaleZOffset);
            // //console.log("x: " + xoffset)
            // //console.log("y: " + yoffset)
            object.position.set(xoffset, yoffset, repositionedByScaleZOffset);
            // //console.log("###smg");
            // object.updateMatrix();
            scene.add(object);

        }).catch(e => {
            //console.log(e);
        });

    }; // fbxloader end

}






// function loadTerrassendachTeilMesh end









async function buildTerrassendachObjects() {

    //console.log("buildTerrassendachObjects");
    // //console.log(schiebeGlasSelected);
    // const gridsizeW = 7.9;
    // var terrassendachWidthElementsArr = [];
    // var desiredWidthElements = 5;

    for (let i = 1; i <= desiredWidthElements; i++) {
        // // // // // if( i <= prevWidthElements-1 ){ 
        // // // // // // dieses element existiert bereits von vorher
        // // // // // ////console.log("i is "+i+" prevWidthElements is "+prevWidthElements+" desiredWidthElements is "+desiredWidthElements+" action 1 - skip this");
        // // // // // } else {
        // // // // // // bauen
        // // // // // ////console.log("i is "+i+" prevWidthElements is "+prevWidthElements+" desiredWidthElements is "+desiredWidthElements+" action 2 - build");
        // // // // // }

        // alle durchlaufen da wir schon existierende nur noch bewegen und nicht neu erstellen
        var xoffset = (i - 1) * gridsizeW; // links rechts
        var yoffset = 0; // hoch runter
        var zoffset = 0; // vor zurück					


        if (i == 1) {
            // ////console.log(i+" first ");
            loadTerrassendachTeilMesh("dachsparren_start.FBX", materialTerrassendach, true, true, xoffset, holzsparrenPivotYOffset, holzsparrenPivotZOffset, i, "start", "dachsparren", true, true, false, false);
            loadTerrassendachTeilMesh("dachglas_schiebeglas_repeat.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_schiebeglas", true, true, false, !schiebeGlasSelected);
            loadTerrassendachTeilMesh("dachglas_fest_repeat.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_fest", true, true, false, schiebeGlasSelected);
            loadTerrassendachTeilMesh("sparrenschiebeglas_start.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "start", "sparrenschiebeglas", true, true, false, !schiebeGlasSelected);
            loadTerrassendachTeilMesh("sparrenfestglas_start.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "start", "sparrenfestglas", true, true, false, schiebeGlasSelected);
            loadTerrassendachTeilMesh("frontbalken_start.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "start", "frontbalken", false, false, false, false);
            loadTerrassendachTeilMesh("stuetze.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "start", "stuetze", false, false, false, false); // poleXOffset wird beim placement berücksichtigt
            loadTerrassendachTeilMesh("wandstuetze.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "start", "wandstuetze", false, false, true, !wandstuetzeSelected);
            loadTerrassendachTeilMesh("wandbalken_start.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "start", "wandbalken", false, false, true, false);
            loadTerrassendachTeilMesh("wandmetall_start.FBX", materialMetall, true, true, xoffset, yoffset, zoffset, i, "start", "wandmetall", false, false, true, false);
            loadTerrassendachTeilMesh("rinne_start.FBX", materialRinne, true, true, xoffset, yoffset, zoffset, i, "start", "rinne", true, false, false, false);
            loadTerrassendachTeilMesh("dachueberstand_start.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "start", "dachueberstand", true, true, false, !dachueberstandSelected);
            loadTerrassendachTeilMesh("stoffbahn_repeat.FBX", materialStoffbahnArr, true, true, xoffset, holzsparrenPivotYOffset, holzsparrenPivotZOffset, i, "repeat", "stoffbahn", true, true, false, !stoffbahnenSelected);
        } else {
            loadTerrassendachTeilMesh("dachsparren_repeat.FBX", materialTerrassendach, true, true, xoffset, holzsparrenPivotYOffset, holzsparrenPivotZOffset, i, "repeat", "dachsparren", true, true, false, false);
            loadTerrassendachTeilMesh("dachglas_schiebeglas_repeat.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_schiebeglas", true, true, false, !schiebeGlasSelected);
            loadTerrassendachTeilMesh("dachglas_fest_repeat.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_fest", true, true, false, schiebeGlasSelected);
            loadTerrassendachTeilMesh("sparrenschiebeglas_repeat.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "sparrenschiebeglas", true, true, false, !schiebeGlasSelected);
            loadTerrassendachTeilMesh("sparrenfestglas_repeat.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "sparrenfestglas", true, true, false, schiebeGlasSelected);
            loadTerrassendachTeilMesh("frontbalken_repeat.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "repeat", "frontbalken", false, false, false, false);
            loadTerrassendachTeilMesh("wandbalken_repeat.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "repeat", "wandbalken", false, false, true, false);
            loadTerrassendachTeilMesh("wandmetall_repeat.FBX", materialMetall, true, true, xoffset, yoffset, zoffset, i, "repeat", "wandmetall", false, false, true, false);
            loadTerrassendachTeilMesh("rinne_repeat.FBX", materialRinne, true, true, xoffset, yoffset, zoffset, i, "start", "rinne", true, false, false, false);
            loadTerrassendachTeilMesh("stoffbahn_repeat.FBX", materialStoffbahnArr, true, true, xoffset, holzsparrenPivotYOffset, holzsparrenPivotZOffset, i, "repeat", "stoffbahn", true, true, false, !stoffbahnenSelected);
        }

        if (i == desiredWidthElements) {
            // ////console.log(i+" last ");
            if (currentPolePositionIsEingerueckt) {
                loadTerrassendachTeilMesh("rinne_eingerueckt_end.FBX", materialRinne, true, true, xoffset, yoffset, zoffset, i, "end", "rinneeingerueckt", true, false, false, false);
            } else {
                loadTerrassendachTeilMesh("rinne_end.FBX", materialRinne, true, true, xoffset, yoffset, zoffset, i, "end", "rinne", true, false, false, false);
            }

            // // nach letzten nochmal etwas mehr dran
            loadTerrassendachTeilMesh("dachsparren_end.FBX", materialTerrassendach, true, true, xoffset, holzsparrenPivotYOffset, holzsparrenPivotZOffset, i, "end", "dachsparren", true, true, false, false);
            xoffset = i * gridsizeW - 1.009;
            loadTerrassendachTeilMesh("stuetze.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "end", "stuetze", false, false, false, false); // poleXOffset wird beim placement berücksichtigt
            loadTerrassendachTeilMesh("wandstuetze.FBX", materialTerrassendach, true, true, xoffset, yoffset, zoffset, i, "end", "wandstuetze", false, false, true, !wandstuetzeSelected);
            xoffset = i * gridsizeW - 0.35;
            loadTerrassendachTeilMesh("sparrenschiebeglas_end.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "end", "sparrenschiebeglas", true, true, false, !schiebeGlasSelected);
            loadTerrassendachTeilMesh("sparrenfestglas_end.FBX", materialMetall, true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "end", "sparrenfestglas", true, true, false, schiebeGlasSelected);
            xoffset = i * gridsizeW;
            loadTerrassendachTeilMesh("dachueberstand_end.FBX", materialGlassArr, false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "end", "dachueberstand", true, true, false, !dachueberstandSelected);



        }

    } // for loop end

    // bei Breite 8 extra Stütze in die Mitte
    if (desiredWidthElements == 8) {
        if (currentPolePositionIsEingerueckt) {
            console.log("is eingerückt");
        } else {
            console.log("not eingerückt");
            loadTerrassendachTeilMesh("stuetze.FBX", materialTerrassendach, true, true, (4 * gridsizeW), 0, 0, 4, "repeat", "stuetze", false, false, false, false);
        }
    }



} // buildTerrassendachObjects ende










function onWindowResize() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(winWidth, winHeight);

    composer.setSize(winWidth, winHeight);

}




function animate(time) {
    if (isInitialized) {
        requestAnimationFrame(animate);
        TWEEN.update(time);

        // var camLookAtVector = 0;
        // ////console.log( "camLookAtVector " + camLookAtVector ); // camLookAtVector; // pos of lookAtTargetCube
        // ////console.log( cameraLookAtTargetVector );
        // controls.target = new THREE.Vector3(0, 0, 0); // works 
        controls.target = cameraLookAtTargetVector;

        controls.update();
        render();
        // stats.update();
    }
}







// Rotate shape around the z-axis
function rotateAroundY(thetaAngleInDeg, vec3ToRotate) {
    var sinTheta = Math.sin(thetaAngleInDeg);
    var cosTheta = Math.cos(thetaAngleInDeg);

    var node = vec3ToRotate;
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
    return node;
};
// var tempPositionToRotate = [-10, -10, -10];
// ////console.log( rotateAroundY(30, tempPositionToRotate) );





function render() {

    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();


    // Lichter bewegen
    // light1.position.x = Math.sin( time * 0.7 ) * 60;
    // light1.position.y = Math.cos( time * 0.5 ) * 80;
    // light1.position.z = Math.cos( time * 0.3 ) * 60;

    // light2.position.x = Math.cos( time * 0.3 ) * 60;
    // light2.position.y = Math.sin( time * 0.5 ) * 80;
    // light2.position.z = Math.sin( time * 0.7 ) * 60;

    // light3.position.x = Math.sin( time * 0.7 ) * 60;
    // light3.position.y = Math.cos( time * 0.3 ) * 80;
    // light3.position.z = Math.sin( time * 0.5 ) * 60;

    // light4.position.x = Math.sin( time * 0.3 ) * 60;
    // light4.position.y = Math.cos( time * 0.7 ) * 80;


    // renderer.render( scene, camera );
    composer.render();

}












const positions = [
    [
        [50, 45, 100],
        [20, 4, -22]
    ], // cam pos, lookat pos
    [
        [12, 18, -32],
        [12, 18, -31]
    ],
];

function tweenCamera(camera, position, duration) {
    new TWEEN.Tween(camera.position).to({
            x: position[0],
            y: position[1],
            z: position[2]
        }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

function tweenObjectVectorPosition(vectorObject, targetpositionObj, duration) {
    new TWEEN.Tween(vectorObject).to({
            x: targetpositionObj[0],
            y: targetpositionObj[1],
            z: targetpositionObj[2]
        }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}



function action_camposition_1() {
    ////console.log("action_camposition_1");
    ////console.log(camera);
    ////console.log(controls);
    orbitSetRestrictions(true); // disable 360degree movement

    tweenCamera(camera, positions[0][0], 1000);
    // controls.target = new THREE.Vector3(0, 0, 0); // works 
    // controls.target = lookAtTargetCube.position;
    tweenObjectVectorPosition(cameraLookAtTargetVector, positions[0][1], 1000);
    // cameraLookAtTargetVector = new THREE.Vector3(20, 0, 20);
    // ////console.log( controls.target );
}

function action_camposition_2() {
    ////console.log("action_camposition_2");
    orbitSetRestrictions(false); // enable 360degree movement
    tweenCamera(camera, positions[1][0], 1000);
    tweenObjectVectorPosition(cameraLookAtTargetVector, positions[1][1], 1000);
}






export function Action_ChangeLight(_state) {
    if (_state == "morgen") {
        action_moodlight_1()
    } else if (_state == "mittag") {
        action_moodlight_2()
    } else if (_state == "abend") {
        action_moodlight_3()
    }
}



var cachedGlobalCurrentDirectionalLightColor = "ffffff";

function action_moodlight_1() {
    ////console.log("action_moodlight_1");
    API.lightProbeIntensity = 0.3; // 0.5
    API.envMapIntensity = 0.2; // 0.4

    // ////console.log(directionalLight.color);

    API.directionalLightIntensity = 0.5;
    API.directionalLightHeight = 21;
    API.directionalLightDistance = 38;
    API.directionalLightRotation = 0.2;
    //API.directionalLightColor = 0xf98070;
    var newColor = 'f98070';

    lightProbe.intensity = API.lightProbeIntensity;
    directionalLight.intensity = API.directionalLightIntensity;
    directionalLight.color.setHex(API.directionalLightColor);


    var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
    var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
    // ////console.log( tempPositionToRotate );
    // ////console.log( tempResult );
    tweenObjectVectorPosition(directionalLight.position, tempResult, 1000);
    // directionalLight.position.x = tempResult[0];
    // directionalLight.position.y = tempResult[1];
    // directionalLight.position.z = tempResult[2];


    var tweenpercent = { x: 0, y: 0 };
    var tween = new TWEEN.Tween(tweenpercent);
    tween.to({ x: 100 }, 1000);
    tween.start();
    tween.onUpdate(function(object) {
        // ////console.log(object.x);
        var mixed = mixcolor(newColor, cachedGlobalCurrentDirectionalLightColor, object.x); // returns #bf002e
        // ////console.log(mixed);
        API.directionalLightColor = "0x" + mixed;
        directionalLight.color.setHex(API.directionalLightColor);
    });
    tween.onComplete(function() {
        ////console.log('tween done!')
        cachedGlobalCurrentDirectionalLightColor = newColor;
    });

    render();
    // API.materialTerrassendachColor = 0x383E42;
    // API.materialMetallColor = 0x383E42;
    // materialTerrassendach.color.setHex( API.materialTerrassendachColor ); 
    // materialMetall.color.setHex( API.materialMetallColor ); 
    // render();
}


function action_moodlight_2() {
    // //console.log("action_moodlight_2");
    API.lightProbeIntensity = 0.6; // 0.5
    API.envMapIntensity = 0.4; // 0.4

    API.directionalLightIntensity = 0.5;
    API.directionalLightHeight = 57;
    API.directionalLightDistance = 44;
    API.directionalLightRotation = 0.2;
    // API.directionalLightColor = 0xffffff;
    var newColor = 'ffffff';

    lightProbe.intensity = API.lightProbeIntensity;
    directionalLight.intensity = API.directionalLightIntensity;
    directionalLight.color.setHex(API.directionalLightColor);
    var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
    var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
    // ////console.log( tempPositionToRotate );
    // ////console.log( tempResult );
    tweenObjectVectorPosition(directionalLight.position, tempResult, 1000);
    // directionalLight.position.x = tempResult[0];
    // directionalLight.position.y = tempResult[1];
    // directionalLight.position.z = tempResult[2];


    var tweenpercent = { x: 0, y: 0 };
    var tween = new TWEEN.Tween(tweenpercent);
    tween.to({ x: 100 }, 1000);
    tween.start();
    tween.onUpdate(function(object) {
        // ////console.log(object.x);
        var mixed = mixcolor(newColor, cachedGlobalCurrentDirectionalLightColor, object.x); // returns #bf002e
        // ////console.log(mixed);
        API.directionalLightColor = "0x" + mixed;
        directionalLight.color.setHex(API.directionalLightColor);
    });
    tween.onComplete(function() {
        ////console.log('tween done!')
        cachedGlobalCurrentDirectionalLightColor = newColor;
    });


    render();
}


function action_moodlight_3() {
    ////console.log("action_moodlight_3");
    API.lightProbeIntensity = 0.1; // 0.5
    API.envMapIntensity = 0.1; // 0.4

    API.directionalLightIntensity = 0.2;
    API.directionalLightHeight = 17;
    API.directionalLightDistance = 35;
    API.directionalLightRotation = 1.25;
    // API.directionalLightColor = 0xffffff;
    var newColor = '83a4f9';

    lightProbe.intensity = API.lightProbeIntensity;
    directionalLight.intensity = API.directionalLightIntensity;
    directionalLight.color.setHex(API.directionalLightColor);
    var tempPositionToRotate = [API.directionalLightDistance, API.directionalLightHeight, API.directionalLightDistance];
    var tempResult = rotateAroundY(API.directionalLightRotation, tempPositionToRotate);
    // ////console.log( tempPositionToRotate );
    // ////console.log( tempResult );
    tweenObjectVectorPosition(directionalLight.position, tempResult, 1000);
    // directionalLight.position.x = tempResult[0];
    // directionalLight.position.y = tempResult[1];
    // directionalLight.position.z = tempResult[2];


    var tweenpercent = { x: 0, y: 0 };
    var tween = new TWEEN.Tween(tweenpercent);
    tween.to({ x: 100 }, 1000);
    tween.start();
    tween.onUpdate(function(object) {
        // ////console.log(object.x);
        var mixed = mixcolor(newColor, cachedGlobalCurrentDirectionalLightColor, object.x); // returns #bf002e
        // ////console.log(mixed);
        API.directionalLightColor = "0x" + mixed;
        directionalLight.color.setHex(API.directionalLightColor);
    });
    tween.onComplete(function() {
        ////console.log('tween done!')
        cachedGlobalCurrentDirectionalLightColor = newColor;
    });


    render();
}



export function Action_ChangeRoofGlas(_state) {
    //console.log(_state);
    if (_state == "fest") {
        schiebeGlasSelected = false;
        widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(null), 150);
    } else if (_state == "schiebe") {
        schiebeGlasSelected = true;
        widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(null), 150);
    }
}



// Schiebeglas oder Festverglasung
function action_festverglasung() {
    ////console.log("action_festverglasung");
    schiebeGlasSelected = false;
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}

function action_schiebedach() {
    ////console.log("action_schiebedach");
    schiebeGlasSelected = true;
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}




let roofOverhangState = false;
export function Action_RoofOverhang() {
    roofOverhangState = !roofOverhangState;

    // ////console.log("action_dachueberstand_aktiv");
    if (roofOverhangState) {
        // ////console.log("activate");
        dachueberstandSelected = true;
    } else {
        // ////console.log("deactivate");
        dachueberstandSelected = false;
    }
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(null), 150); // minimales delay
}



function action_dachueberstand_toggle() {
    ////console.log("action_dachueberstand_aktiv");
    if ($("#click-dachueberstand-toggle    .kat-select").hasClass("isActive")) {
        ////console.log("activate");
        dachueberstandSelected = true;
    } else {
        ////console.log("deactivate");
        dachueberstandSelected = false;
    }
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}
// Dachueberstand
// function action_dachueberstand_aktiv() { 
// ////console.log("action_dachueberstand_aktiv");

// widhtDepthSliderTimer = setTimeout( clickHideShowTerrassendachElements, 150); // minimales delay
// }	
// function action_dachueberstand_inaktiv() { 
// ////console.log("action_dachueberstand_inaktiv");
// dachueberstandSelected = false;
// widhtDepthSliderTimer = setTimeout( clickHideShowTerrassendachElements, 150); // minimales delay
// }		

let wallSupportState = false;
export function Action_RoofExtension() {

    //console.log(wallSupportState)
    wallSupportState = !wallSupportState;

    if (wallSupportState) {
        //console.log("activate");
        wandstuetzeSelected = true;
    } else {
        //console.log("deactivate");
        wandstuetzeSelected = false;
    }
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(null), 150); // minimales delay
}


function action_wandstuetze_toggle() {
    ////console.log("action_wandstuetze_toggle");
    if ($("#click-wandstuetze-toggle    .kat-select").hasClass("isActive")) {
        ////console.log("activate");
        wandstuetzeSelected = true;
    } else {
        ////console.log("deactivate");
        wandstuetzeSelected = false;
    }
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}





export function Action_SwitchFassde(_state) {
    if (_state == "neutral") {
        action_fassadefarbe_1();
    } else if (_state == "KlinkerGrau") {
        action_fassadefarbe_2();
    } else if (_state == "KlinkerRot") {
        action_fassadefarbe_3();
    } else if (_state == "PutzWeiß") {
        action_fassadefarbe_4();
    } else if (_state == "PutzGrau") {
        action_fassadefarbe_5();
    }
}



// fassade neutral
function action_fassadefarbe_1() {
    ////console.log("action_fassadefarbe_1");
    materialHauswand.map = null;
    materialHauswand.roughnessMap = null;
    materialHauswand.normalMap = null;
    API.materialHauswandColor = 0xcecece;
    materialHauswand.color.setHex(API.materialHauswandColor);
    materialHauswand.needsUpdate = true;
    // map: diffuseMapHauswandKlinkerRot,
    // roughnessMap: roughnessMapHauswandKlinkerRot,
    // normalMap: normalMapHauswandKlinkerRot,
    // normalScale: new THREE.Vector2( 1, 1 )
    render();
}
// fassade klinker grau
function action_fassadefarbe_2() {
    ////console.log("action_fassadefarbe_2");
    materialHauswand.map = diffuseMapHauswandKlinkerGrau;
    materialHauswand.roughnessMap = roughnessMapHauswandKlinkerRot;
    materialHauswand.normalMap = normalMapHauswandKlinkerRot;
    API.materialHauswandColor = 0xffffff;
    materialHauswand.color.setHex(API.materialHauswandColor);
    materialHauswand.needsUpdate = true;
    render();
}
// fassade klinker rot
function action_fassadefarbe_3() {
    ////console.log("action_fassadefarbe_3");
    materialHauswand.map = diffuseMapHauswandKlinkerRot;
    materialHauswand.roughnessMap = roughnessMapHauswandKlinkerRot;
    materialHauswand.normalMap = normalMapHauswandKlinkerRot;
    API.materialHauswandColor = 0xffffff;
    materialHauswand.color.setHex(API.materialHauswandColor);
    materialHauswand.needsUpdate = true;
    render();
}
// fassade putz weiss
function action_fassadefarbe_4() {
    ////console.log("action_fassadefarbe_4");
    materialHauswand.map = diffuseMapHauswandPutzWeiss;
    materialHauswand.roughnessMap = roughnessMapHauswandPutzWeiss;
    materialHauswand.normalMap = normalMapHauswandPutzWeiss;
    API.materialHauswandColor = 0xffffff;
    materialHauswand.color.setHex(API.materialHauswandColor);
    materialHauswand.needsUpdate = true;
    render();
}
// fassade putz grau
function action_fassadefarbe_5() {
    ////console.log("action_fassadefarbe_5");
    materialHauswand.map = diffuseMapHauswandPutzWeiss;
    materialHauswand.roughnessMap = roughnessMapHauswandPutzWeiss;
    materialHauswand.normalMap = normalMapHauswandPutzWeiss;
    API.materialHauswandColor = 0x212121;
    materialHauswand.color.setHex(API.materialHauswandColor);
    materialHauswand.needsUpdate = true;
    render();
}


export function Action_SwitchColor(colorHex) {
    ////console.log("Colorswitch " + colorHex);
    API.materialTerrassendachColor = colorHex;
    // API.materialMetallColor = colorHex;
    materialTerrassendach.color.setHex(API.materialTerrassendachColor);
    // materialMetall.color.setHex(API.materialMetallColor);
    render();
}

// function action_terrassendachfarbe_1() {
//     ////console.log("action_terrassendachfarbe_1");
//     API.materialTerrassendachColor = 0xF1F0EA;
//     API.materialMetallColor = 0xF1F0EA;
//     materialTerrassendach.color.setHex(API.materialTerrassendachColor);
//     materialMetall.color.setHex(API.materialMetallColor);
//     render();
// }

// function action_terrassendachfarbe_2() {
//     ////console.log("action_terrassendachfarbe_2");
//     API.materialTerrassendachColor = 0xA1A1A0;
//     API.materialMetallColor = 0xA1A1A0;
//     materialTerrassendach.color.setHex(API.materialTerrassendachColor);
//     materialMetall.color.setHex(API.materialMetallColor);
//     render();
// }

// function action_terrassendachfarbe_3() {
//     ////console.log("action_terrassendachfarbe_3");
//     API.materialTerrassendachColor = 0x383E42;
//     API.materialMetallColor = 0x383E42;
//     materialTerrassendach.color.setHex(API.materialTerrassendachColor);
//     materialMetall.color.setHex(API.materialMetallColor);
//     render();
// }



export function Action_FloorColor(_state) {
    if (_state == "DielenHell") {
        action_bodenfarbe_1();
    } else if (_state == "DielenDunkel") {
        action_bodenfarbe_2();
    } else if (_state == "FliesenGrau") {
        action_bodenfarbe_3();
    }
}



// boden dielen hell
function action_bodenfarbe_1() {
    ////console.log("action_bodenfarbe_1");
    materialBoden.map = diffuseMapBodenDielen;
    materialBoden.roughnessMap = roughnessMapBodenDielen;
    materialBoden.normalMap = normalMapBodenDielen;
    API.materialBodenColor = 0xffffff;
    API.materialBodenRoughness = 0.6;
    materialBoden.color.setHex(API.materialBodenColor);
    materialBoden.roughness = API.materialBodenRoughness;
    materialBoden.needsUpdate = true;
    render();
}
// boden dielen dunkel
function action_bodenfarbe_2() {
    ////console.log("action_bodenfarbe_2");
    materialBoden.map = diffuseMapBodenDielen;
    materialBoden.roughnessMap = roughnessMapBodenDielen;
    materialBoden.normalMap = normalMapBodenDielen;
    API.materialBodenColor = 0x6b5454;
    API.materialBodenRoughness = 0.6;
    materialBoden.color.setHex(API.materialBodenColor);
    materialBoden.roughness = API.materialBodenRoughness;
    materialBoden.needsUpdate = true;
    render();
}
// boden Fliesen
function action_bodenfarbe_3() {
    ////console.log("action_bodenfarbe_2");
    materialBoden.map = diffuseMapBodenFliesen;
    materialBoden.roughnessMap = roughnessMapBodenFliesen;
    materialBoden.normalMap = normalMapBodenFliesen;
    API.materialBodenColor = 0xffffff;
    API.materialBodenRoughness = 0.966;
    materialBoden.color.setHex(API.materialBodenColor);
    materialBoden.roughness = API.materialBodenRoughness;
    materialBoden.needsUpdate = true;
    render();
}




export function Action_ChangeRinColor(_color) {
    if (_color == "alu") {
        action_rinnefarbe_4();
    } else {
        API.materialRinneColor = _color;
        API.materialRinneMetalness = 0.17;
        API.materialRinneRoughness = 0.289;
        materialRinne.color.setHex(API.materialRinneColor);
        materialRinne.metalness = API.materialRinneMetalness;
        materialRinne.roughness = API.materialRinneRoughness;
    }
}


// kunststoff weiss
function action_rinnefarbe_1() {
    API.materialRinneColor = 0xffffff;
    API.materialRinneMetalness = 0.17;
    API.materialRinneRoughness = 0.289;
    materialRinne.color.setHex(API.materialRinneColor);
    materialRinne.metalness = API.materialRinneMetalness;
    materialRinne.roughness = API.materialRinneRoughness;
}
// kunststoff braun
function action_rinnefarbe_2() {
    API.materialRinneColor = 0x260a05;
    API.materialRinneMetalness = 0.17;
    API.materialRinneRoughness = 0.289;
    materialRinne.color.setHex(API.materialRinneColor);
    materialRinne.metalness = API.materialRinneMetalness;
    materialRinne.roughness = API.materialRinneRoughness;
}
// kunststoff anthrazit
function action_rinnefarbe_3() {
    API.materialRinneColor = 0x50505;
    API.materialRinneMetalness = 0.17;
    API.materialRinneRoughness = 0.289;
    materialRinne.color.setHex(API.materialRinneColor);
    materialRinne.metalness = API.materialRinneMetalness;
    materialRinne.roughness = API.materialRinneRoughness;
}
// alu
function action_rinnefarbe_4() {
    API.materialRinneColor = 0xe0e0e0;
    API.materialRinneMetalness = 0.87;
    API.materialRinneRoughness = 0.48;
    materialRinne.color.setHex(API.materialRinneColor);
    materialRinne.metalness = API.materialRinneMetalness;
    materialRinne.roughness = API.materialRinneRoughness;
}













var widhtDepthSliderTimer;

export function Action_ChangeHeight(_height) {
    clearTimeout(widhtDepthSliderTimer);
    ////console.log(1 / 3955 * Math.floor(_height));
    currentGlobalScale = 1 / 3955 * Math.floor(_height);
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(null), 150); // minimales delay
}

export function Action_ChangeWidth(_width) {
    clearTimeout(widhtDepthSliderTimer);
    ////console.log(Math.floor(_width / 790));
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements(_width), 150); // minimales delay
}

function action_uiobjdepth() {
    clearTimeout(widhtDepthSliderTimer);
    ////console.log(1 / 3955 * Math.floor(document.getElementById("ui-obj-height").value));
    currentGlobalScale = 1 / 3955 * Math.floor(document.getElementById("ui-obj-height").value);
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}

function action_uiobjwidth() {
    clearTimeout(widhtDepthSliderTimer);
    ////console.log(Math.floor(document.getElementById("ui-obj-width").value / 790));
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}









var repositionPolesTimer;
// document.getElementById("clickHideShowTerrassendachElements").addEventListener( 'click', clickHideShowTerrassendachElements );
function clickHideShowTerrassendachElements(_width) {
    // ////console.log(scene.children);
    if (_width != null) {
        prevWidthElements = desiredWidthElements; // cache - wie viele hatten wir vor dem neu aufbau
        desiredWidthElements = Math.floor(_width / 790);
    }

    // ////console.log("clickHideShowTerrassendachElements -  prevWidthElements is " + prevWidthElements + " desiredWidthElements is " + desiredWidthElements + " ");


    for (var i = scene.children.length - 1; i >= 0; i--) {
        var object = scene.children[i];

        if (object.isFbxMesh) {
            // ////console.log( "i: "+ i +" name: "+object.name +" meshfile: "+object.meshfile+" gridnum: "+object.gridnum+" startrepeatlast: "+object.startrepeatlast+" objecttype: "+object.objecttype);


            // if( object.gridnum > 0 && object.gridnum > prevWidthElements-1 ) { // einen mehr löschen wegen end teilen
            if (object.gridnum > 0) { // alle wegbewegen da wir ja nicht mehr löschen sondern nur aus dem sichtfeld bewegen

                // ////console.log("removing gridnum "+object.gridnum);
                // removeObject3D(object);


                if (object.position.y > (hiddenMeshPoolYOffset - 200)) {
                    // ist wohl schon "hidden" weil mindestsns 2800 units weit oben...
                    //object.position.set( object.position.x, object.position.y, object.position.z );
                } else {
                    object.position.set(object.position.x, object.position.y + hiddenMeshPoolYOffset, object.position.z);
                }

            }
        }

    }

    buildTerrassendachObjects();
    // stützen eingerückt status setzen nach neubau
    clearTimeout(repositionPolesTimer);
    repositionPolesTimer = setTimeout(repositionPoles, 500, currentPolePositionIsEingerueckt); // == repositionPoles(currentPolePositionIsEingerueckt)

}






export function Action_ChangePoleState(_state) {
    if (_state == "eingerückt") {
        repositionPoles(true);
    } else if (_state == "bündig") {
        repositionPoles(false);
    }
    widhtDepthSliderTimer = setTimeout(clickHideShowTerrassendachElements, 150); // minimales delay
}


function action_pfostenbtn_1() {
    ////console.log("action_pfostenbtn_1 - eingerückt");
    repositionPoles(true);
}

function action_pfostenbtn_2() {
    ////console.log("action_pfostenbtn_2 - bündig");
    repositionPoles(false);
}

function repositionPoles(isEingerueckt = false) {
    ////console.log("fire repositionPoles");
    if (typeof isEingerueckt === "undefined") { isEingerueckt = false; }


    var newOffset_start = 0;
    var newOffset_end = 0;

    if (isEingerueckt == true) {
        // von bündig nach eingerückt bewegen
        newOffset_start = 0 + poleXOffset;
        newOffset_end = 0 - poleXOffset;
    }
    if (isEingerueckt == false) {
        // von eingerückt nach bündig bewegen
        newOffset_start = 0 - poleXOffset;
        newOffset_end = 0 + poleXOffset;
    }

    // ////console.log("newOffset_start "+newOffset_start+" newOffset_end "+newOffset_end);

    for (var i = scene.children.length - 1; i >= 0; i--) {
        var object = scene.children[i];
        if (object.isFbxMesh) {


            if (object.objecttype == "stuetze" && object.startrepeatlast == "start") {
                if (typeof object.isAlreadyEingerueckt === "undefined") { object.isAlreadyEingerueckt = false; } // set default value
                ////console.log("objecttype " + object.objecttype + " startrepeatlast: " + object.startrepeatlast + " isAlreadyEingerueckt: " + object.isAlreadyEingerueckt + " isEingerueckt should be: " + isEingerueckt);

                if (object.isAlreadyEingerueckt != isEingerueckt) {
                    object.isAlreadyEingerueckt = isEingerueckt;
                    object.position.set((object.position.x + newOffset_start), object.position.y, object.position.z);
                }
            }

            if (object.objecttype == "stuetze" && object.startrepeatlast == "end") {
                if (typeof object.isAlreadyEingerueckt === "undefined") { object.isAlreadyEingerueckt = false; } // set default value
                ////console.log("objecttype " + object.objecttype + " startrepeatlast: " + object.startrepeatlast + " isAlreadyEingerueckt: " + object.isAlreadyEingerueckt + " isEingerueckt should be: " + isEingerueckt);

                if (object.isAlreadyEingerueckt != isEingerueckt) {
                    object.isAlreadyEingerueckt = isEingerueckt;
                    object.position.set((object.position.x + newOffset_end), object.position.y, object.position.z);
                }
            }
            /*
			loadTerrassendachTeilMesh("dachglas_schiebeglas_repeat.FBX",materialGlassArr, 		false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_schiebeglas",						true, true, false);
			loadTerrassendachTeilMesh("dachglas_fest_repeat.FBX", 		materialGlassArr, 		false, false, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "repeat", "dachglas_fest", 								true, true, false);
			
			loadTerrassendachTeilMesh("sparrenschiebeglas_start.FBX", 	materialMetall, 		true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "start", "sparrenschiebeglas", 							true, true, false); 
			loadTerrassendachTeilMesh("sparrenfestglas_repeat.FBX", 	materialMetall, 		true, true, xoffset, metallsparrenPivotYOffset, metallsparrenPivotZOffset, i, "start", "sparrenfestglas", 								true, true, false); 
				*/

            // if(object.objecttype == "dachglas_schiebeglas") {
            // if (typeof object.isHidden === "undefined") {object.isHidden = false;} // set default value

            // if(schiebeGlasSelected == true) {
            // if(object.isHidden == true) {
            // // soll sichtbar sein und ist hidden/oben
            // object.position.set( object.position.x, (object.position.y - hiddenMeshPoolYOffset) ,object.position.z ); // wieder 3000 nach unten
            // }else {
            // // soill sichtbar sein und ist bereits unten
            // }
            // }else{
            // if(object.isHidden == true) {
            // // soll unsichtbar sein und bereits hidden/oben
            // }else {
            // // soill unsichtbar sein und ist unten
            // object.position.set( object.position.x, (object.position.y + hiddenMeshPoolYOffset) ,object.position.z ); // 3000 nach oben
            // }
            // }
            // }	
        }
    }

    currentPolePositionIsEingerueckt = isEingerueckt;
}





export function Action_StoffbahnenToggle() {
    stoffbahnenSelected = !stoffbahnenSelected;
    clickHideShowTerrassendachElements(null);
}


export function Action_SwitchRoofMaterial(_state) {
    if (_state == "gebuerstet") {
        action_terrassendachmainmaterial_gebuerstet();
    } else if (_state == "glatt") {
        action_terrassendachmainmaterial_glatt();
    }
}


function action_terrassendachmainmaterial_gebuerstet() {
    //console.log("action_terrassendachmainmaterial_gebuerstet");
    materialTerrassendach.map = diffuseMapTerrassendach;
    materialTerrassendach.roughnessMap = roughnessMapTerrassendach;
    materialTerrassendach.normalMap = normalMapTerrassendach;
    materialTerrassendach.needsUpdate = true;
    render();
}

function action_terrassendachmainmaterial_glatt() {
    //console.log("action_terrassendachmainmaterial_glatt");
    materialTerrassendach.map = diffuseMapTerrassendachGlatt;
    materialTerrassendach.roughnessMap = roughnessMapTerrassendachGlatt;
    materialTerrassendach.normalMap = normalMapTerrassendachGlatt;
    materialTerrassendach.needsUpdate = true;
    render();
}









// helper - remove object
function removeObject3D(object) {
    if (!(object instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (object.geometry) {
        object.geometry.dispose();
    }
    if (object.material) {
        if (object.material instanceof Array) {
            // for better memory management and performance
            object.material.forEach(material => material.dispose());
        } else {
            // for better memory management and performance
            object.material.dispose();
        }
    }
    if (object.parent) {
        object.parent.remove(object);
    }
    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
}




//! document.getElementById("ui-obj-height").addEventListener('click', action_uiobjdepth);
//! document.getElementById("ui-obj-width").addEventListener('click', action_uiobjwidth);

document.getElementById("click-campositionbtn-1").addEventListener('click', action_camposition_1);
document.getElementById("click-campositionbtn-2").addEventListener('click', action_camposition_2);

//! document.getElementById("click-terrassendachfarbebtn-1").addEventListener('click', action_terrassendachfarbe_1);
//! document.getElementById("click-terrassendachfarbebtn-2").addEventListener('click', action_terrassendachfarbe_2);
//! document.getElementById("click-terrassendachfarbebtn-3").addEventListener('click', action_terrassendachfarbe_3);

//! document.getElementById("click-fassadefarbebtn-1").addEventListener('click', action_fassadefarbe_1);
//! document.getElementById("click-fassadefarbebtn-2").addEventListener('click', action_fassadefarbe_2);
//! document.getElementById("click-fassadefarbebtn-3").addEventListener('click', action_fassadefarbe_3);
//! document.getElementById("click-fassadefarbebtn-4").addEventListener('click', action_fassadefarbe_4);
//! document.getElementById("click-fassadefarbebtn-5").addEventListener('click', action_fassadefarbe_5);

// document.getElementById("click-moodlight-1").addEventListener('click', action_moodlight_1);
// document.getElementById("click-moodlight-2").addEventListener('click', action_moodlight_2);
// document.getElementById("click-moodlight-3").addEventListener('click', action_moodlight_3);

//! document.getElementById("click-pfostenbtn-1").addEventListener('click', action_pfostenbtn_1);
//! document.getElementById("click-pfostenbtn-2").addEventListener('click', action_pfostenbtn_2);

//! document.getElementById("click-dachueberstand-toggle").addEventListener('click', action_dachueberstand_toggle);

//! document.getElementById("click-wandstuetze-toggle").addEventListener('click', action_wandstuetze_toggle);




//! document.getElementById("click-bodenfarbebtn-1").addEventListener('click', action_bodenfarbe_1);
//! document.getElementById("click-bodenfarbebtn-2").addEventListener('click', action_bodenfarbe_2);
//! document.getElementById("click-bodenfarbebtn-3").addEventListener('click', action_bodenfarbe_3);

//! document.getElementById("click-rinnefarbebtn-1").addEventListener('click', action_rinnefarbe_1);
//! document.getElementById("click-rinnefarbebtn-2").addEventListener('click', action_rinnefarbe_2);
//! document.getElementById("click-rinnefarbebtn-3").addEventListener('click', action_rinnefarbe_3);
//! document.getElementById("click-rinnefarbebtn-4").addEventListener('click', action_rinnefarbe_4);

//! document.getElementById("click-festverglasung").addEventListener('click', action_festverglasung);
//! document.getElementById("click-schiebedach").addEventListener('click', action_schiebedach);

// document.getElementById("click-stoffbahnen-toggle").addEventListener('click', action_stoffbahnen_toggle);
// document.getElementById("click-terrassendachmainmaterial-gebuerstet").addEventListener('click', action_terrassendachmainmaterial_gebuerstet);
// document.getElementById("click-terrassendachmainmaterial-glatt").addEventListener('click', action_terrassendachmainmaterial_glatt);



// init();
init();
animate();
// menuBuilder.LoadMenu();





function checkFlag() {
    if (FilesLoaded === false) {
        window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        /* do something*/
    }
}
// const $ = require('./jquery.js');
var cube;
var scrollTrigger;

var priceSum = 0;
var constPrice = 0;

var MenuItems;
var ScrollElem1, ScrollElem2, ScrollElem3, ScrollElem4;

var jsonTest = "";
// var jsonTest = "{\"width\":6390,\"height\":3955,\"roof\":1,\"pole\":1,\"optionRoof\":1,\"color\":1,\"surface\":1,\"fassade\":1,\"floor\":1,\"glas\":1,\"optionGlas\":1,\"light\":1,\"optionLight\":\"13\",\"water\":1,\"antrag\":1,\"montage\":1,\"fundament\":1,\"profile\":1}";

var Config;
//variables for Json Output/Input   + base Values
var data_width = 4510,
    data_height = 3457,
    data_roof = 0,
    data_pole = 1,
    data_option_roof = 0,
    data_color = 1,
    data_surface = 1,
    data_fassade = 1,
    data_floor = 1,
    data_glas = 1,
    data_option_glas = 0,
    data_light = 0,
    data_light_count = 8,
    data_water = 1,
    data_antrag = 0,
    data_montage = 0,
    data_fundament = 0,
    data_profile = 0,
    data_shipping = 1;


//Try to load Json 
if (jsonTest != "") {
    Config = JSON.parse(jsonTest);
    data_width = Config["width"];
    data_height = Config["height"];
    data_roof = Config["roof"];
    data_pole = Config["pole"];
    data_option_roof = Config["optionRoof"];
    data_color = Config["color"];
    data_surface = Config["surface"];
    data_fassade = Config["fassade"];
    data_floor = Config["floor"];
    data_glas = Config["glas"];
    data_option_glas = Config["optionGlas"];
    data_light = Config["light"];
    data_light_count = Config["optionLight"];
    data_water = Config["water"];
    data_antrag = Config["antrag"];
    data_montage = Config["montage"];
    data_fundament = Config["fundament"];
    data_profile = Config["profile"];
} else {
    Config = {
        width: data_width,
        height: data_height,
        roof: data_roof,
        pole: data_pole,
        optionRoof: data_option_roof,
        color: data_color,
        surface: data_surface,
        fassade: data_fassade,
        surface: data_fassade,
        floor: data_floor,
        glas: data_glas,
        optionGlas: data_option_glas,
        light: data_light,
        optionLight: data_light_count,
        water: data_water,
        antrag: data_antrag,
        montage: data_montage,
        fundament: data_fundament,
        profile: data_profile
    };
}





export function Ready() {
    ////console.log("test1");
    // RecalcMenu(); //Scroll Menu Setup
    MenuItems = $(".menuItem ");

    // PreSelectItems();
    // CalcPrice();
    // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    //     return new bootstrap.Tooltip(tooltipTriggerEl)
    // })

    /*
    $(".visual").on('wheel', function(e) { //enable Fullscreen Scroll on sitemenu
        e.preventDefault();
        var x = $(".menu-option").scrollTop();
        $(".menu-option").scrollTop(x + e["originalEvent"].deltaY);
    });
	*/

    //info Icon Modal
    // $(".info").click(function() {
    //     $(".modalOption").show();
    // })

    $(".info").click(function() {
        $(".modalOption").show();

    })

    $("#modalOptionBox_btn").click(function() {
        // CheckOptions($(this).parent().parent().children(".kat-visual"));
        let temp = $(this).attr("value");
        let elem = $("#" + temp).parent();
        CheckOptions(elem);
        $(".modalOption").hide();
    })


    $(".closeBtn-modal").click(function() {
        $(".modalOption").hide();
    })

    //Menu animations
    $(".menuItem").click(function(e) {
        $(".menu-option").show();
        $(".menu-option").animate({
            left: "140",
            opacity: 1
        }, 500, function() {
            $(".blurBG").show();
        });
        $(".closeMenu").show();
        $(".closeMenu").animate({
            left: "605",

        }, 500, function() {
            // Animation complete.
        });
    })

    $(".closeMenu").click(function(e) {
        $(".blurBG").hide();
        $(".menu-option").animate({
            left: "-500",
            opacity: 0
        }, 500, function() {
            $(".menu-option").hide();
            $(".openMenu").show();
        });

        $(".closeMenu").animate({
            left: "-140",
        }, 500, function() {
            // Animation complete.
            $(".closeMenu").hide();
        });
    })

    $(".openMenu").click(function(e) {
        $(".menu-option").show();
        $(".menu-option").animate({
            left: "140",
            opacity: 1
        }, 500, function() {
            $(".blurBG").show();
        });
        $(".closeMenu").show();
        $(".closeMenu").animate({
            left: "605",
        }, 500, function() {});
    })




    // // Calc menu Scroll height to trigger nav menu
    // $(".menu-option").on('scroll', (function() {
    //     if ($(this).scrollTop() < ScrollElem1) {
    //         UpdateActiveMenu(0)
    //     } else if ($(this).scrollTop() < ScrollElem2 + ScrollElem1) {
    //         UpdateActiveMenu(1)
    //     } else if ($(this).scrollTop() < ScrollElem3 + ScrollElem2 + ScrollElem1) {
    //         UpdateActiveMenu(2)
    //     } else
    //         UpdateActiveMenu(3)

    //     scrollTrigger = (GetElementContentHeight($(".menu-option")) - $(window).height()) - (GetElementHeight($(".opt-item-last")) * 2);
    //     if ($(this).scrollTop() >= scrollTrigger) {
    //         $(".bottomElement").fadeOut(300);
    //     } else {
    //         $(".bottomElement").fadeIn(300);
    //     }
    // }));


    //Slider Change functions
    $("#ui-obj-width").on("change", function() {
        $("#obj-width-text").text($(this).val() + " mm")
        SetData("width", $(this).val());
        CalcPrice();
    })

    $("#ui-obj-height").on("change", function() {
        $("#obj-height-text").text($(this).val() + " mm")
        SetData("height", $(this).val());
        CalcPrice();
    })


    $("#ui-obj-led").on("change", function() {
        $("#obj-led-text").text($(this).val())
        SetData("light_count", $(this).val());
    })

    //Checkbox like function trigger
    $(".kat-visual").click(function(e) {
        // CheckOptions($(this));
        // CalcPrice();
    })


    $(".naviconmenu").click(function() {

        var elem = $(".naviconmenu");
        $(elem).each(function() {
            $(this).toggleClass('activeBtn')
        })
    })

    //recalc site menu
    // $(window).resize(function() {
    //     RecalcMenu();
    // })


};

// function RecalcMenu() {
//     ScrollElem1 = $("#scroll-section-0").height();
//     ScrollElem2 = $("#scroll-section-1").height();
//     ScrollElem3 = $("#scroll-section-2").height();
// }


// var GetElementContentHeight = function(elem) { //add height of all child elements
//     var cc = 0;
//     $(elem).children().each(function() {
//         cc += $(this).outerHeight();
//     });
//     return cc;
// }


// var GetElementHeight = function(elem) { //get height of single  elemnt
//     return $(elem).outerHeight(true);
// }

// changeColor = function(_color) {
//     cube.material = new THREE.MeshBasicMaterial({ color: _color });
// }


// var UpdateActiveMenu = function(i) {
//     $(MenuItems).each(function(index) {
//         $(this).removeClass('active');
//         if (index == i) {
//             $(this).addClass('active');
//         }
//     })
// }

export function CheckOptions(elem) {
    var Options = $(elem).children(".kat-select");
    if ($(Options).hasClass('isFixed')) return
    if ($(Options).hasClass('isSingle') && !$(Options).hasClass('isActive')) {
        var items = $(elem).parent().parent().children(".kat-item").children(".kat-visual").children(".kat-select");
        $(items).each(function(index) {
            if ($(this).hasClass('isFixed')) {
                return
            } else {
                $(this).removeClass('isActive');
            }
        })
        $(elem).children(".kat-select").addClass('isActive');
        SetData($(elem).children(".kat-select").attr("type"), $(elem).children(".kat-select").attr("dataValue"));
    } else {
        if ($(Options).hasClass("isUpgrade") && $(Options).hasClass("isActive")) {
            $(elem).children(".kat-select").removeClass('isActive');
            SetData($(elem).children(".kat-select").attr("type"), 0);
        } else {
            $(elem).children(".kat-select").addClass('isActive');
            SetData($(elem).children(".kat-select").attr("type"), $(elem).children(".kat-select").attr("dataValue"));
        }
    }

}

// function GetConstPrice(width, height) {

//     // alert(width);
//     // alert(height);

//     if (width == "4020") {
//         if (height == "2959") {
//             return 6450;
//         } else if (height == "3457") {
//             return 6900;
//         } else if (height == "3955") {
//             return 7300;
//         }
//     } else if (width == "4810") {
//         if (height == "2959") {
//             return 7300;
//         } else if (height == "3457") {
//             return 7750;
//         } else if (height == "3955") {
//             return 8250;
//         }
//     } else if (width == "5600") {
//         if (height == "2959") {
//             return 8150;
//         } else if (height == "3457") {
//             return 8700;
//         } else if (height == "3955") {
//             return 9250;
//         }
//     } else if (width == "6390") {
//         if (height == "2959") {
//             return 8950;
//         } else if (height == "3457") {
//             return 9600;
//         } else if (height == "3955") {
//             return 10200;
//         }
//     }



//     return 0;
// }


var globalHeightSlider;

// export function CalcPrice() {
//     constPrice = GetConstPrice(0, $("#ui-obj-height").val());
//     $("#size-prize").text(constPrice + " €")

//     let elems = $(".kat-visual").children(".kat-select");
//     priceSum = 0;
//     $(elems).each(function(i, obj) {
//         if ($(obj).hasClass("isActive")) {
//             // ////console.log($(obj).attr("price"));
//             let x = parseInt($(obj).attr("price"));
//             // ////console.log(x);
//             if (Number.isInteger(x)) {
//                 priceSum = priceSum + x;

//             }
//         }
//     })

//     let x = priceSum + constPrice;
//     $(".sumText").text(x + " €");
//     // ////console.log();


// }


function SetData(type, value) { //Change local variable and apply changes to Config array
    if (type == "width") {
        data_width = value;
        Config["width"] = data_width;
    } else if (type == "height") {
        data_height = value;
        Config["height"] = data_height;
    } else if (type == "roof") {
        data_roof = value;
        Config["roof"] = data_roof;
    } else if (type == "pole") {
        data_pole = value;
        Config["pole"] = data_pole;
    } else if (type == "option-roof") {
        data_option_roof = value;
        Config["optionRoof"] = data_option_roof;
    } else if (type == "color") {
        data_color = value;
        Config["color"] = data_color;
    } else if (type == "surface") {
        data_surface = value;
        Config["surface"] = data_surface;
    } else if (type == "fassade") {
        data_fassade = value;
        Config["fassade"] = data_fassade;
    } else if (type == "floor") {
        data_floor = value;
        Config["floor"] = data_floor;
    } else if (type == "glastype") {
        data_glas = value;
        Config["glas"] = data_glas;
    } else if (type == "option-glas") {
        data_option_glas = value;
        Config["optionGlas"] = data_option_glas;
    } else if (type == "light") {
        data_light = value;
        Config["light"] = data_light;
    } else if (type == "light_count") {
        data_light_count = value;
        Config["optionLight"] = data_light_count;
    } else if (type == "water") {
        data_water = value;
        Config["water"] = data_water;
    } else if (type == "antrag") {
        data_antrag = value;
        Config["antrag"] = data_antrag;
    } else if (type == "montage") {
        data_montage = value;
        Config["montage"] = data_montage;
    } else if (type == "fundament") {
        data_fundament = value;
        Config["fundament"] = data_fundament;
    } else if (type == "profile") {
        data_profile = value;
        Config["profile"] = data_profile;
    } else {
        //error
    }

    // ////console.log(JSON.stringify(Config));
}

// var PreSelectItems = function() {
//     $(".kat-select").each(function() {
//         if ($(this).hasClass("isFixed")) {
//             $(this).addClass("isActive");
//         }
//     })

//     if (data_width != "" && data_width != null) {
//         $("#ui-obj-width").val(data_width);
//         $("#obj-width-text").text(data_width + " mm")
//     }
//     if (data_height != "" && data_height != null) {
//         $("#ui-obj-height").val(data_height);
//         $("#obj-height-text").text(data_height + " mm")
//     }
//     if (data_light_count != "" && data_light_count != null) {
//         $("#ui-obj-led").val(data_light_count);
//         $("#obj-led-text").text(data_light_count)
//     }

//     if (data_roof != "" && data_roof != null) {
//         if (data_roof == "1")
//             $("#ui-obj-roof-1").addClass("isActive");
//         if (data_roof == "2")
//             $("#ui-obj-roof-2").addClass("isActive");
//     }
//     if (data_pole != "" && data_pole != null) {
//         if (data_pole == "1")
//             $("#ui-obj-pole-1").addClass("isActive");
//         if (data_pole == "2")
//             $("#ui-obj-pole-2").addClass("isActive");
//     }
//     if (data_option_roof != "" && data_option_roof != null) {
//         if (data_option_roof == "1")
//             $("#ui-obj-roof-option-1").addClass("isActive");
//     }
//     if (data_color != "" && data_color != null) {
//         if (data_color == "1")
//             $("#ui-obj-color-1").addClass("isActive");
//         if (data_color == "2")
//             $("#ui-obj-color-2").addClass("isActive");
//         if (data_color == "3")
//             $("#ui-obj-color-3").addClass("isActive");
//     }
//     if (data_surface != "" && data_surface != null) {
//         if (data_surface == "1")
//             $("#ui-obj-surface-1").addClass("isActive");
//         if (data_surface == "2")
//             $("#ui-obj-surface-2").addClass("isActive");
//     }
//     if (data_fassade != "" && data_fassade != null) {
//         if (data_fassade == "1")
//             $("#ui-obj-fassade-1").addClass("isActive");
//         if (data_fassade == "2")
//             $("#ui-obj-fassade-2").addClass("isActive");
//         if (data_fassade == "3")
//             $("#ui-obj-fassade-3").addClass("isActive");
//         if (data_fassade == "4")
//             $("#ui-obj-fassade-4").addClass("isActive");
//         if (data_fassade == "5")
//             $("#ui-obj-fassade-5").addClass("isActive");
//     }
//     if (data_floor != "" && data_floor != null) {
//         if (data_floor == "1")
//             $("#ui-obj-floor-1").addClass("isActive");
//         if (data_floor == "2")
//             $("#ui-obj-floor-2").addClass("isActive");
//         if (data_floor == "3")
//             $("#ui-obj-floor-3").addClass("isActive");
//     }
//     if (data_glas != "" && data_glas != null) {
//         if (data_glas == "1")
//             $("#ui-obj-glas-1").addClass("isActive");
//         if (data_glas == "2")
//             $("#ui-obj-glas-2").addClass("isActive");
//     }
//     if (data_option_glas != "" && data_option_glas != null) {
//         if (data_option_glas == "1")
//             $("#ui-obj-option-glas-1").addClass("isActive");

//     }
//     if (data_light != "" && data_light != null) {
//         if (data_light == "1")
//             $("#ui-obj-light-1").addClass("isActive");
//     }

//     if (data_water != "" && data_water != null) {
//         if (data_water == "1")
//             $("#ui-obj-water-1").addClass("isActive");
//         if (data_water == "2")
//             $("#ui-obj-water-2").addClass("isActive");
//         if (data_water == "3")
//             $("#ui-obj-water-3").addClass("isActive");
//         if (data_water == "4")
//             $("#ui-obj-water-4").addClass("isActive");
//     }
//     if (data_antrag != "" && data_antrag != null) {
//         if (data_antrag == "1")
//             $("#ui-obj-antrag-1").addClass("isActive");
//     }
//     if (data_montage != "" && data_montage != null) {
//         if (data_montage == "1")
//             $("#ui-obj-montage-1").addClass("isActive");
//     }
//     if (data_fundament != "" && data_fundament != null) {
//         if (data_fundament == "1")
//             $("#ui-obj-fundament-1").addClass("isActive");
//     }
//     if (data_profile != "" && data_profile != null) {
//         if (data_profile == "1")
//             $("#ui-obj-profile-1").addClass("isActive");
//     }
//     if (data_shipping != "" && data_shipping != null) {
//         if (data_shipping == "1")
//             $("#ui-obj-shipping").addClass("isActive");
//         if (data_shipping == "2")
//             $("#ui-obj-shipping2").addClass("isActive");
//     }

// }






var ChangeHeight = function() {
    ////console.log("Change Height to -> " + data_height);
}

var ChangeWidth = function() {
    ////console.log("Change Height to -> " + data_height);
}

var ChangeRoof = function() {
    ////console.log("Change Roof to -> " + data_roof);
}

var ChangePole = function() {
    ////console.log("Change Pole to -> " + data_pole);
}

var ChangeRoofOptions = function() {
    ////console.log("Change Roof Option to -> " + data_option_roof);
}

var ChangeColor = function() {
    ////console.log("Change Color to -> " + data_color);
}

var ChangeSurface = function() {
    ////console.log("Change Surface to -> " + data_surface);
}

var ChangeFassafe = function() {
    ////console.log("Change Fassade to -> " + data_fassade);
}

var ChangeFloor = function() {
    ////console.log("Change Floor to -> " + data_floor);
}

var ChangeGlas = function() {
    ////console.log("Change Glas to -> " + data_glas);
}

var ChangeGlasOptions = function() {
    ////console.log("Change Glas Option to -> " + data_option_glas);
}

var ChangeLight = function() {
    ////console.log("Change Light to -> " + data_light);
}

var ChangeLightCounter = function() {
    ////console.log("Change Light Count to -> " + data_light_count);
}

var ChangeWater = function() {
    ////console.log("Change Water to -> " + data_water);
}