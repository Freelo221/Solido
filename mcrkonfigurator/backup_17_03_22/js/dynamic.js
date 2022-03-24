import * as test from "./main.js";
import {
    Action_ChangeHeight,
    Action_ChangeWidth,
    Action_ChangePoleState,
    Action_SwitchColor,
    Action_RoofOverhang,
    Action_RoofExtension,
    Action_SwitchFassde,
    Action_FloorColor,
    Action_ChangeRinColor,
    Action_ChangeRoofGlas,
    Action_ChangeLight,
    Action_StoffbahnenToggle,
    Action_SwitchRoofMaterial,
    Action_LedStateToggle,
    Action_RafterStateToggle,
    desiredWidthElements,
    currentPolePositionIsEingerueckt,
    UpdateDWEExtern,
    isInitialized,
    selectedCamMode,
    action_camposition_1,
    action_camposition_2,
    action_camposition_3,
    action_camposition_4


} from "./main.js";

import { MenuElement, ParentElement, MainMenuElement } from "./ElementClasses.js";

function readTextFile(file) {
    var allText;
    var rawFile = new XMLHttpRequest(); // XMLHttpRequest (often abbreviated as XHR) is a browser object accessible in JavaScript that provides data in XML, JSON, but also HTML format, or even a simple text using HTTP requests.
    rawFile.open("GET", file, false); // open with method GET the file with the link file ,  false (synchronous)
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) // readyState = 4: request finished and response is ready
        {
            if (rawFile.status === 200) // status 200: "OK"
            {
                allText = rawFile.responseText; //  Returns the response data as a string
                // console.log(allText); // display text on the console
            }
        }
    }
    rawFile.send(null); //Sends the request to the server Used for GET requests with param null
    return allText;
}

const jsonNew = readTextFile('./js/test.json');
const siteMenuMap = new Map();
const MenuMap = new Map();
const OptionMap = new Map();
const ItemInfoMap = new Map();

// const ConfigurationString = 

let configuration = [];

var ElementMapper = new Map();
var ParentMapper = new Map();
var MenuMapper = new Map();

let LEDOption;
let LEDCount = 1;

var gHeight;
var gWidth;


function checkFlag() {
    if (FilesLoaded === false) {
        // console.log(FilesLoaded)
        window.setTimeout(checkFlag, 100);
        return false; /* this checks the flag every 100 milliseconds*/
    } else {
        return true;
        /* do something*/
    }
}
let ttElem, ttElemText;

let UserImagePreButton,
    UserImageZoomButton,
    UserImageSettingsContainer,
    UserImageZoomContainer,
    UserImageSettingsContainerStateChanger,
    UserImageZoomContainerStateChanger,
    userImage_isUploaded = false;

$(document).ready(function() {
    const obj = JSON.parse(jsonNew);
    // while (!checkFlag()) {

    // }
    ttElem = document.querySelector(".tooltip");
    ttElemText = document.querySelector(".tooltipText");
    ttElem.style.display = "none";
    // return;

    // configuration = 
    // console.log(obj.optionItems);
    let tempBElem = document.querySelector(".bottomElement");
    let tempBElem2 = document.querySelector("#sec15");

    $(".icon-save").click(function() {
        SaveConfiguration();
    })
    $(".icon-redo").click(function() {
        LoadConfiguration();
    })

    obj.menuItems.forEach(element => {
        // console.log(element.name);
        AddNewMenuItem(element);

    });


    let aussenansicht = document.querySelector("#click-campositionbtn-1")
    let innenansicht = document.querySelector("#click-campositionbtn-2")
    AddToolTipToElement(aussenansicht, "Außenansicht");
    AddToolTipToElement(innenansicht, "Innenansicht");



    obj.optionItems.forEach(element2 => {
        AddNewOptionItem(element2);
        element2.childs.forEach(element3 => {
                // console.log(element3.priceTable);
                AddNewElementItem(element3, element2);
            })
            // CalcPrice();
    });

    // obj.Optionitems.forEach(element1 => {
    //     element1.Option.forEach(element2 => {
    //         AddNewOptionItem(element2);
    //         element2.Element.forEach(element3 => {
    //             AddNewElementItem(element3, element2);
    //         })
    //     })
    // });

    test.Ready();

    RecalcMenu();
    CalcPrice();
    updateLedOption();
    // console.log(ItemInfoMap);
    // console.log(MenuMapper);
    // console.log(ParentMapper);


    // while (!isInitialized) {

    // }


    // CheckConfiguration() ? LoadConfiguration() : null;
    console.log(ElementMapper);
    CreateConfiguration()

    UserImagePreButton = document.querySelector("#imageUploaderPre");
    // UserImagePreButton = document.querySelector("#enableUserImageMode_Pre")
    // UserImageZoomButton = document.querySelector("#enableUserImageZoomSettings")

    // UserImageSettingsContainer = document.querySelector(".imgUploadContainer")
    // UserImageZoomContainer = document.querySelector(".zoomRangeSliderContainer")

    // UserImageSettingsContainerStateChanger = document.querySelector(".closeMenu_imgUpload")
    // UserImageZoomContainerStateChanger = document.querySelector(".closeMenu_zoomSlider")

    UserImagePreButton.addEventListener('click', (e) => {
        document.querySelector("#userImage").click();
    })

    document.querySelector("#userImage").addEventListener("change", () => {
        document.querySelector("#enableUserImageMode").click();
    })
    document.querySelector("#imagedelete").addEventListener("click", () => {
            document.querySelector("#disableUserImageMode").click();
        })
        // UserImagePreButton.addEventListener('click', (e) => {
        //     console.log(e.target);
        //     console.log("first");
        //     if (!userImage_isUploaded) {

    //         document.querySelector("#enableUserImageMode").click();
    //         //switch class
    //         userImage_isUploaded = true;
    //         UserImageSettingsContainer.style.display = "flex";
    //         UserImageZoomContainer.style.display = "flex";
    //     } else {
    //         document.querySelector("#disableUserImageMode").click();
    //         //switch class
    //         userImage_isUploaded = false;
    //         UserImageSettingsContainer.style.display = "none";
    //         UserImageZoomContainer.style.display = "none";
    //     }
    // })

    // UserImageZoomButton.addEventListener('click', () => {
    //     //open zoom menu
    //     UserImageZoomContainer.style.display = "flex";
    // })

    // UserImageSettingsContainerStateChanger.addEventListener('click', () => {
    //     AnimateBlockHeight(UserImageZoomContainer, 0, 2000);
    //     AnimateBlockHeight(UserImageSettingsContainer, 0, 2000);
    //     // UserImageZoomContainer.style.display = "none";
    //     // UserImageSettingsContainer.style.display = "none";
    //     //close zoom menu
    //     //close settings menu
    // })

    // UserImageZoomContainerStateChanger.addEventListener('click', () => {
    //     UserImageZoomContainer.style.display = "none";
    //     //close zoom menu
    // })


})


function AddNewMenuItem(item) {
    // console.log(`create menuItem ${item.name} ${item.icon}`);
    MenuMapper.set(`${item.id}`, new MainMenuElement(item));
    let MenuItem = MenuMapper.get(`${item.id}`);

    const MenuContainer = document.querySelector("#list-example");
    const OptionList = document.querySelector("#OptionList");

    //Create Menu element
    let outer_a = document.createElement("a");
    outer_a.classList.add("menuItem");
    outer_a.classList.add("list-group-item");
    outer_a.classList.add("list-group-item-action");
    outer_a.setAttribute("href", "#scroll-section-" + item.id);

    let innerWrapDiv = document.createElement("div");

    let innerIconDiv = document.createElement("div");
    innerIconDiv.classList.add("menu-icon");
    innerIconDiv.classList.add("menu-icon-" + item.icon);

    let innerText = document.createElement("p");
    innerText.innerText = item.name;

    innerWrapDiv.appendChild(innerIconDiv);
    innerWrapDiv.appendChild(innerText);
    outer_a.appendChild(innerWrapDiv);

    //Create Option Scroll Element
    let scrollElement = document.createElement("div");
    scrollElement.setAttribute("id", "scroll-section-" + item.id)

    siteMenuMap.set(item.id, outer_a);

    if (OptionList != null)
        OptionList.insertBefore(scrollElement, document.querySelector("#sec15"));
    // OptionList.appendChild(scrollElement);

    if (MenuContainer != null)
        MenuContainer.appendChild(outer_a);

    if (!MenuMap.has(item.name)) {
        MenuMap.set(item.name, scrollElement);
    }

    MenuItem.element = scrollElement;

}

function AddNewOptionItem(item) {
    // console.log(`${item.menuType}`);
    // console.log(`${item.name}`);
    // console.log(`${item.type}`);
    // console.log(`${item.menuType}`);
    ParentMapper.set(`${item.id}`, new ParentElement(item))
    let ParentItem = ParentMapper.get(`${item.id}`);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("opt-item");
    if (item.isShippingElement) itemContainer.classList.add("shippingElement");

    let itemHeadline = document.createElement("h3");
    itemHeadline.innerText = item.name;




    let elementWrapper = document.createElement("div");
    elementWrapper.classList.add("kat-wrapper");

    itemContainer.appendChild(itemHeadline);


    if (item.subline != "") {
        let itemHeadLineSubline = document.createElement("p");
        itemHeadLineSubline.innerText = item.subline;
        itemHeadLineSubline.classList.add("headlineSubline");
        itemContainer.appendChild(itemHeadLineSubline);
    }


    itemContainer.appendChild(elementWrapper);

    // alert(item.menuType);
    MenuMap.get(item.menuType).appendChild(itemContainer);
    OptionMap.set(item.name, elementWrapper);

    ParentItem.element = itemContainer;

}


function AddNewElementItem(item, parent) {
    // console.log(item.id + "  " + item.priceTable);
    ElementMapper.set(`${item.id}`, new MenuElement(item));
    let ElementItem = ElementMapper.get(`${item.id}`);
    // if (parent.id == "Fertigstellung") {
    //     let container = document.createElement("div");
    //     container.classList.add("kat-item");
    //     container.setAttribute("id", item.id);
    //     OptionMap.get(parent.name).appendChild(container);
    //     container = (Temp_CreateCheckbox(container))
    //     ElementItem.element = container;
    //     return;
    // }

    // console.log(item.type);
    if (item.type == "x-slider") {
        // console.log("object");
        let container = createCustomSlider(item);
        OptionMap.get(parent.name).appendChild(container);
        // let ElementItem = ElementMapper.get(`${item.id}`);
        ElementItem.element = container
        return;
    } else if (item.type == "x-LED") {
        let container = CreateCustomLedBlock(item, OptionMap.get(parent.name));
        ElementItem.element = container
            // OptionMap.get(parent.name).appendChild(container);
        return;
    }


    // console.log("%c Item: " + item.infoHeadline, "color: green");
    // console.log("%c Item: " + item.infoText, "color: green");
    // console.log("%c Item: " + item.infoImage, "color: green");

    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_imgPath`, item.infoImage);
    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_infoText`, item.infoText);
    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_Headline`, item.infoHeadline);


    let container = document.createElement("div");
    container.classList.add("kat-item");
    if (item.isCheckbox) container.classList.add("weirdCheckboxStyle")
    if (item.fixed) { container.classList.add("noPointer") }
    container.setAttribute("id", item.id);
    let xtraContainer;
    if (item.type == "1col" && item.extra == true) {
        // console.log("object");
        container.classList.add("kat-item-col1-flex");

        xtraContainer = document.createElement("div");
        xtraContainer.classList.add("kat-item-col1");

        let xtraTextElement = document.createElement("p");
        xtraTextElement.innerText = `${item.name}`;
        xtraTextElement.classList.add("text-bold");
        xtraTextElement.classList.add("heading");


        if (item.info) {
            let infoElement = document.createElement("span");
            infoElement.classList.add("info");
            xtraTextElement.appendChild(infoElement);
            infoElement.addEventListener("click", () => { UpdateModalBox(`ui-obj-${parent.name}-${item.id}`) });
        }


        let xtraPriceElement = document.createElement("p");
        xtraPriceElement.innerText = `${item.price} €`;

        let xtraInfoList = document.createElement("ul");

        // console.log("%c" + item.extra.length, "color:red")

        let listItem;
        if (item.extraText1 != "") {
            listItem = document.createElement("li");
            listItem.innerText = item.extraText1;
            xtraInfoList.appendChild(listItem);
        } else {
            listItem = document.createElement("li");
            listItem.innerText = "";
            listItem.style.height = "24.5px";
            listItem.style.listStyle = "none";
            xtraInfoList.appendChild(listItem);
        }

        if (item.extraText2 != "") {
            listItem = document.createElement("li");
            listItem.innerText = item.extraText2;
            xtraInfoList.appendChild(listItem);
        } else {
            listItem = document.createElement("li");
            listItem.innerText = "";
            listItem.style.height = "24.5px";
            listItem.style.listStyle = "none";
            xtraInfoList.appendChild(listItem);
        }

        if (item.extraText3 != "") {
            listItem = document.createElement("li");
            listItem.innerText = item.extraText3;
            xtraInfoList.appendChild(listItem);
        } else {
            listItem = document.createElement("li");
            listItem.innerText = "";
            listItem.style.height = "24.5px";
            listItem.style.listStyle = "none";
            xtraInfoList.appendChild(listItem);
        }


        // for (var i = 0; i < 3; i++) {
        //     let listItem = document.createElement("li");

        //     if (item.extra.length > i) {
        //         console.log(i);
        //         if (item.extra[i].text) {
        //             listItem.innerText = item.extra[i].text;
        //         }
        //     } else {
        //         listItem.innerText = "";
        //         listItem.style.height = "24.5px";
        //         listItem.style.listStyle = "none";
        //     }

        //     xtraInfoList.appendChild(listItem);
        // }


        xtraContainer.appendChild(xtraTextElement);
        xtraContainer.appendChild(xtraPriceElement);
        xtraContainer.appendChild(xtraInfoList);
        ElementItem.priceElement = xtraPriceElement;

    } else if (item.type == "2col") {
        container.classList.add("kat-item-col2");
    } else if (item.type == "3col") {
        container.classList.add("kat-item-col3");
    }

    let visualElement = document.createElement("div");
    visualElement.classList.add("kat-visual");
    if (item.type == "1col" && item.extra != null) {
        visualElement.classList.add("kat-item-col1");
    }
    if (!item.hover) {
        visualElement.classList.add("noHover");

    }


    if (item.toggleExtraPrice) {
        visualElement.addEventListener('click', () => {
            ActiveExtraPrice = !ActiveExtraPrice;

            if (ActiveExtraPrice) {
                extraPoleCount = 2;
            } else {
                extraPoleCount = 0;
            }
            // console.log("object")
        })
    }

    if (item.tooltipText != "" && item.tooltipText != undefined) {
        visualElement.addEventListener('mouseover', (e) => {
            // let ttElem = document.querySelector(".tooltip");
            // let ttElemText = document.querySelector(".tooltipText");
            ttElemText.innerText = item.tooltipText;
            ttElem.style.display = "block";
            let targetWidth = e.target.offsetWidth;
            let ttWidth = ttElem.offsetWidth;

            let pos = GetScreenCordinates(e.target)
                // + full widht/2   +ownwidth/2
            pos.left += ((targetWidth / 2) - (ttWidth / 2));
            pos.top -= ttElem.offsetHeight;

            document.querySelector(".tooltip").style.top = `${pos.top}px`;
            document.querySelector(".tooltip").style.left = `${pos.left}px`;


            console.log(GetScreenCordinates(e.target));
        })

        visualElement.addEventListener('mouseleave', (e) => {
            let targetWidth = e.target

            let ttElem = document.querySelector(".tooltip");
            // let ttElemText = document.querySelector(".tooltipText");
            // let pos = GetScreenCordinates(e.target)
            // document.querySelector(".tooltip").style.top = `${pos.top}px`;
            // document.querySelector(".tooltip").style.left = `${pos.left}px`;
            ttElem.style.display = "none";
            // ttElemText.innerText = item.name;
            // console.log(GetScreenCordinates(e.target));
        })
    }


    visualElement.addEventListener("click", () => {
        test.CheckOptions(visualElement);

        CalcPrice();
        ElementItem.isSelected = !ElementItem.isSelected
        CreateConfiguration()

    })


    if (item.img != "") {
        let imageElement = document.createElement("img")
        imageElement.setAttribute("src", `${item.img}`);
        visualElement.appendChild(imageElement);
    } else {
        visualElement.style.background = item.background;
    }

    let checkElement = document.createElement("div");
    checkElement.classList.add("kat-select");
    if (item.fixed) checkElement.classList.add("isFixed");
    if (item.upgrade) checkElement.classList.add("isUpgrade");
    if (item.single) checkElement.classList.add("isSingle");
    if (item.selected) {
        checkElement.classList.add("isActive");
        ElementItem.isSelected = true
    }
    checkElement.setAttribute("id", `ui-obj-${parent.name}-${item.id}`);
    checkElement.setAttribute("type", `${parent.name}`);
    checkElement.setAttribute("dataValue", `${item.id}`);
    checkElement.setAttribute("price", `${item.price}`);
    checkElement.setAttribute("disc", `0`);



    let textElement = document.createElement("p");
    textElement.innerText = `${item.name}`;



    if (item.info) {
        let infoElement = document.createElement("span");
        infoElement.classList.add("info");
        textElement.appendChild(infoElement);
        infoElement.addEventListener("click", () => { UpdateModalBox(`ui-obj-${parent.name}-${item.id}`) });
    }

    textElement.classList.add("text-bold");
    textElement.classList.add("heading");

    let priceElement = document.createElement("p");
    priceElement.innerText = `${item.price} €`;
    priceElement.classList.add("priceTagElement");
    item.showPrice ? priceElement.style.display = "block" : priceElement.style.display = "none";


    visualElement.appendChild(checkElement);
    container.appendChild(visualElement);



    if (item.type != "1col") {
        container.appendChild(textElement);
        container.appendChild(priceElement);
        ElementItem.priceElement = container.querySelector(".priceTagElement");
    }



    if (item.function != "" || item.function != null) {
        visualElement = AddEventToElement(visualElement, item.function, item.functionParam);
    }



    OptionMap.get(parent.name).appendChild(container);
    ElementItem.element = container;
    ParentMapper.get(`${parent.id}`).childs.push(ElementItem);
    if (item.type == "1col" && item.extra != null) {
        container.appendChild(xtraContainer);
    }
    // OptionMap.set(item.name, elementWrapper);


}

const sliderMap = new Map();

function createCustomSlider(item) {
    let container = document.createElement("div");
    container.classList.add("kat-item");
    container.classList.add("fullWidth");
    container.classList.add(item.id)

    for (let i = 0; i < item.slider.length; i++) {
        let row_1 = document.createElement("div");
        row_1.classList.add("row");
        if (i != 0) row_1.classList.add("mt-4");

        let textBox_1 = document.createElement("div");
        textBox_1.classList.add("col-12");
        textBox_1.classList.add("col-sm-2");

        let text_1 = document.createElement("p");
        text_1.classList.add("text-bold");
        // text_1.classList.add("text-center");
        text_1.classList.add("text-sm-left");
        text_1.innerText = item.slider[i].text;

        let output_1 = document.createElement("div");
        output_1.classList.add("col-6", "col-sm-3", "text-center", "transform-numbers");
        output_1.innerText = `${item.slider[i].start} ${item.slider[i].unit}`;

        let sliderBox1 = document.createElement("div");
        sliderBox1.classList.add("col-6", "col-sm-7", "mt-0", "mt-sm-0")

        let slider_1 = document.createElement("input");
        slider_1.classList.add("w-100");
        slider_1.setAttribute("type", "range");
        // slider_1.setAttribute("value", item.slider[i].min);
        slider_1.setAttribute("min", item.slider[i].min);
        slider_1.setAttribute("max", item.slider[i].max);
        slider_1.setAttribute("step", item.slider[i].step);
        slider_1.setAttribute("id", `ui-obj-${item.slider[i].text}`);
        slider_1.value = item.slider[i].start;
        configuration[i] = item.slider[i].start;
        slider_1.addEventListener("change", () => {
            output_1.innerText = `${slider_1.value} ${item.slider[i].unit}`;

            UpdatePrices();
            CalcPrice();
            // CalcPrice();
        })
        sliderMap.set(item.slider[i].text, slider_1);





        AddEventToElement(slider_1, item.slider[i].function, "");
        slider_1.addEventListener("click", () => { LEDOption != null ? updateLedOption() : null });

        textBox_1.appendChild(text_1);
        row_1.appendChild(textBox_1);
        row_1.appendChild(output_1);
        sliderBox1.appendChild(slider_1);
        row_1.appendChild(sliderBox1);

        container.appendChild(row_1);
    }

    let priceText = document.createElement("p");
    priceText.innerText = "8.700 €";
    priceText.classList.add("mt-3", "ps-1");
    priceText.setAttribute("id", "size-prize");
    priceText.classList.add("priceTagElement");
    container.appendChild(priceText);

    return container;

}


function CreateCustomLedBlock(item, parent) {

    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_imgPath`, item.infoImage);
    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_infoText`, item.infoText);
    ItemInfoMap.set(`ui-obj-${parent.name}-${item.id}_Headline`, item.infoHeadline);

    let mainContainer = document.createElement("div");

    let container = document.createElement("div");
    container.classList.add("kat-item");
    container.classList.add(item.id)
    container.classList.add("sadasd")

    let visualElement = document.createElement("div");
    visualElement.classList.add("kat-visual");
    visualElement.addEventListener("click", () => {
        Action_LedStateToggle();
        test.CheckOptions(visualElement);
        CalcPrice();
        GetCurrentConfiguration(visualElement);
    })
    let visualContainer = document.createElement("img");
    visualContainer.setAttribute("src", item.img)

    if (item.tooltipText) {


        if (item.tooltipText != undefined && item.tooltipText != "") {
            visualContainer.addEventListener('mouseover', (e) => {
                // let ttElem = document.querySelector(".tooltip");
                // let ttElemText = document.querySelector(".tooltipText");
                ttElemText.innerText = item.tooltipText;
                ttElem.style.display = "block";
                let targetWidth = e.target.offsetWidth;
                let ttWidth = ttElem.offsetWidth;

                let pos = GetScreenCordinates(e.target)
                    // + full widht/2   +ownwidth/2
                pos.left += ((targetWidth / 2) - (ttWidth / 2));
                pos.top -= ttElem.offsetHeight;

                document.querySelector(".tooltip").style.top = `${pos.top}px`;
                document.querySelector(".tooltip").style.left = `${pos.left}px`;


                // console.log(GetScreenCordinates(e.target));
            })

            visualContainer.addEventListener('mouseleave', (e) => {
                let targetWidth = e.target

                let ttElem = document.querySelector(".tooltip");
                // let ttElemText = document.querySelector(".tooltipText");
                // let pos = GetScreenCordinates(e.target)
                // document.querySelector(".tooltip").style.top = `${pos.top}px`;
                // document.querySelector(".tooltip").style.left = `${pos.left}px`;
                ttElem.style.display = "none";
                // ttElemText.innerText = item.name;
                // console.log(GetScreenCordinates(e.target));
            })
        }
    }
    let checkElement = document.createElement("div");
    checkElement.classList.add("kat-select");
    if (item.fixed) checkElement.classList.add("isFixed");
    if (item.upgrade) checkElement.classList.add("isUpgrade");
    if (item.single) checkElement.classList.add("isSingle");
    if (item.selected) checkElement.classList.add("isActive");
    checkElement.setAttribute("id", `ui-obj-${item.name}`);
    checkElement.setAttribute("type", `${item.name}`);
    checkElement.setAttribute("dataValue", `${item.id}`);
    checkElement.setAttribute("price", `${item.price}`);
    checkElement.setAttribute("disc", `0`);



    visualElement.appendChild(visualContainer);
    visualElement.appendChild(checkElement);
    container.appendChild(visualElement);

    let container2 = document.createElement("div");
    container2.classList.add("kat-item");

    let textElement = document.createElement("p");
    textElement.innerText = `${item.name}, 2x je Sparren`;
    textElement.classList.add("text-bold", "heading");

    if (item.info) {
        let infoElement = document.createElement("span");
        infoElement.classList.add("info");
        textElement.appendChild(infoElement);
        infoElement.addEventListener("click", () => { UpdateModalBox(`ui-obj-${parent.name}-${item.id}`) });
    }

    let containerInfo2 = document.createElement("p");
    containerInfo2.innerText = `${item.LED[0].info1}`;

    let containerInfo3 = document.createElement("p")
    containerInfo3.innerText = `${item.price}  €`;
    containerInfo3.classList.add("priceTagElement");
    item.showPrice ? containerInfo3.style.display = "block" : containerInfo3.style.display = "none";


    container2.append(textElement);
    container2.append(containerInfo2);
    container2.append(containerInfo3);


    let bottomRow = document.createElement("div")
    bottomRow.classList.add("row", "mt-3", "w-100");

    let bottomTextBox = document.createElement("div")
    bottomTextBox.classList.add("col-4", "pe-0");

    let bottomText = document.createElement("p")
    bottomText.classList.add("text-bold");
    bottomText.innerText = `${item.LED[0].unit}`;

    let bottomOutputBox = document.createElement("div")
    bottomOutputBox.classList.add("col-2", "text-center");

    let bottomOutput = document.createElement("div")
    bottomOutput.classList.add("text-center", "transform-numbers");
    bottomOutput.setAttribute("id", `obj-${item.name}-text`);
    bottomOutput.innerText = Math.round(desiredWidthElements / 2);

    let bottomSliderBox = document.createElement("div")
    bottomSliderBox.classList.add("col-6");

    let bottomSlider = document.createElement("input")
    bottomSlider.classList.add("rangeSlider");
    bottomSlider.addEventListener("change", (e) => {
        // console.log("asdsadsadsadsadhsadsadsad")
        LEDCount = e.target.value;
        bottomOutput.innerText = e.target.value;
        containerInfo3.innerText = (e.target.value * item.price) + " €";
        checkElement.setAttribute("price", `${(e.target.value * item.price)}`);
        checkElement.setAttribute("disc", `0`);
        configuration[2] = bottomSlider.value;
        console.log(configuration[2])
        CalcPrice();

    })
    bottomSlider.setAttribute("type", "range");
    bottomSlider.setAttribute("min", `${item.LED[0].min}`);
    bottomSlider.setAttribute("max", `${desiredWidthElements + 1}`);
    bottomSlider.setAttribute("step", `${item.LED[0].step}`);
    bottomSlider.setAttribute("id", `obj-ui-${item.name}`);
    bottomSlider.value = Math.round(desiredWidthElements / 2);
    configuration[2] = Math.round(desiredWidthElements / 2);

    bottomSliderBox.appendChild(bottomSlider);
    bottomOutputBox.appendChild(bottomOutput);
    bottomTextBox.appendChild(bottomText);

    bottomRow.appendChild(bottomTextBox);
    bottomRow.appendChild(bottomOutputBox);
    bottomRow.appendChild(bottomSliderBox);


    parent.appendChild(container);
    parent.appendChild(container2);
    parent.appendChild(bottomRow);

    LEDOption = bottomSlider;

    return container

}



function countProperties(obj) {
    var prop;
    var propCount = 0;
    for (prop in obj) {
        propCount++;
    }
    return propCount;
}





function AddEventToElement(elem, elemFunc, elemParam) {
    // console.log(elem)




    if (elemFunc == "SwitchColor") {
        elem.addEventListener("click", () => { Action_SwitchColor(`${elemParam}`) });
    } else if (elemFunc == "ChangeWidth") {
        elem.addEventListener("click", () => { Action_ChangeWidth(`${elem.value}`); });
    } else if (elemFunc == "ChangeHeight") {
        elem.addEventListener("click", () => { Action_ChangeHeight(`${elem.value}`) });
    } else if (elemFunc == "ChangePoleState") {
        elem.addEventListener("click", () => { Action_ChangePoleState(`${elemParam}`) });
    } else if (elemFunc == "ChangeOverhangState") {
        elem.addEventListener("click", () => { Action_RoofOverhang() })
    } else if (elemFunc == "ChangeRoofExtensionState") {
        elem.addEventListener("click", () => { Action_RoofExtension() })
    } else if (elemFunc == "ChangeFassade") {
        elem.addEventListener("click", () => { Action_SwitchFassde(`${elemParam}`) })
    } else if (elemFunc == "ChangeFloor") {
        elem.addEventListener("click", () => { Action_FloorColor(`${elemParam}`) })
    } else if (elemFunc == "ChangeRin") {
        elem.addEventListener("click", () => { Action_ChangeRinColor(`${elemParam}`) })
    } else if (elemFunc == "ChangeRoofGlas") {
        elem.addEventListener("click", () => { Action_ChangeRoofGlas(`${elemParam}`) })
    } else if (elemFunc == "ChangeLight") {
        elem.addEventListener("click", () => { Action_ChangeLight(`${elemParam}`) })
    } else if (elemFunc == "ChangeStoffbahn") {
        elem.addEventListener("click", () => { Action_StoffbahnenToggle() })
    } else if (elemFunc == "ChangeRoofMaterial") {
        elem.addEventListener("click", () => { Action_SwitchRoofMaterial(`${elemParam}`) })
    } else if (elemFunc == "RafterStateToggle") {
        elem.addEventListener("click", () => { Action_RafterStateToggle(`${elemParam}`) })
    } else if (elemFunc == "LedStateToggle") {
        elem.addEventListener("click", () => { Action_LedStateToggle(`${elemParam}`) })
    } else if (elemFunc == "ToggleLED") {
        elem.addEventListener("click", () => { Action_LedStateToggle() })
    } else if (elemFunc == "ChangeShippingState") {
        elem.addEventListener("click", () => { Action_ToggleVersand(`${elemParam}`) })
    }


    elem.addEventListener('click', () => {
        if (elem.getAttribute("id") === "ui-obj-Breite") {
            configuration[0] = elem.value;
            // elem.dispatchEvent(new Event('change'));
            return;
        }
        if (elem.getAttribute("id") === "ui-obj-Tiefe") {
            configuration[1] = elem.value;
            // elem.dispatchEvent(new Event('change'));
            return;
        }

        GetCurrentConfiguration(elem);
    })

    return elem;
}

var ActiveExtraPrice = false;

var extraPoleCount = 0;
//Calc Stuff
function SetNewPrices() {
    let elems = document.querySelectorAll(".kat-item");


    elems.forEach((e) => {
        if (e.getAttribute("id") != "") {
            let curElem = ElementMapper.get(e.getAttribute("id"));
            // PriceTableArray[0][2959][0][4020]
            let ExtraPrice = 0;
            // if (curElem.extraPrice > 0) { ExtraPrice = curElem.extraPrice } else { ExtraPrice = 0; }

            // console.log(curElem);
            if (curElem) {
                try {
                    if (curElem.extraPrice > 0) { ExtraPrice = curElem.extraPrice * extraPoleCount } else { ExtraPrice = 0; }
                } catch {}
                try {

                    let price = curElem.priceTable[0][height][0][width];
                    let disc = curElem.discountTable[0][height][0][width];
                    if (price == "" || price <= 0) {
                        price = curElem.price;
                    }
                    ActiveExtraPrice ? price = parseFloat(price) + parseFloat(ExtraPrice) : "";
                    curElem.priceElement.innerText = price + " €"
                    curElem.element.querySelector(".kat-visual").querySelector(".kat-select").setAttribute("price", price)
                    curElem.element.querySelector(".kat-visual").querySelector(".kat-select").setAttribute("disc", disc)
                } catch {
                    let price = curElem.price;
                    // console.log(price);
                    // console.log(ExtraPrice)
                    ActiveExtraPrice ? price = parseFloat(price) + parseFloat(ExtraPrice) : "";
                    curElem.priceElement.innerText = price + " €";
                    curElem.element.querySelector(".kat-visual").querySelector(".kat-select").setAttribute("price", price)
                    try {
                        let disc = curElem.discountTable[0][height][0][width];
                        curElem.element.querySelector(".kat-visual").querySelector(".kat-select").setAttribute("disc", disc)
                    } catch {}
                }
            }

        }

    })
}


let height;
let width;

function CalcPrice() {
    height = sliderMap.get("Tiefe").value;
    width = sliderMap.get("Breite").value;
    SetNewPrices();

    let constPrice = GetConstPrice(width, height);
    let constDisc = GetConstDiscount(width, height);
    $("#size-prize").text(constPrice + "  €")


    // console.log(ElementMapper.get("Pfosten-0"));

    let elems = $(".kat-visual").children(".kat-select");
    let priceSum = 0;
    let discountSum = 0;
    $(elems).each(function(i, obj) {
        if ($(obj).hasClass("isActive")) {
            let x = parseInt($(obj).attr("price"));
            let y = parseInt($(obj).attr("disc"));
            if (Number.isInteger(x) && Number.isInteger(y)) {
                priceSum = priceSum + x;
                discountSum = discountSum + y;

            }
        }
    })

    let x = priceSum + constPrice;
    let y = discountSum + constDisc;
    $(".sumText").text(x + "  €");
    $(".discText").text("Sie sparen: " + y + " €");

}


function GetConstPrice(width, height) {

    let sliderPrices = ElementMapper.get("Slider-0").priceTable;
    // let sliderDiscounts = ElementMapper.get("Slider-0").discountTable;

    // console.log(sliderPrices[0][height][0][width]);
    return parseInt(sliderPrices[0][height][0][width]);

}

function GetConstDiscount(width, height) {

    // let sliderPrices = ElementMapper.get("Slider-0").priceTable;
    let sliderDiscounts = ElementMapper.get("Slider-0").discountTable;

    // console.log(discountPrices[0][height][0][width]);
    return parseInt(sliderDiscounts[0][height][0][width]);

}


function UpdateModalBox(id) {
    console.log("sadsadsadsd");
    document.querySelector("#modalOptionBox_img").setAttribute("src", ItemInfoMap.get(id + "_imgPath"));
    document.querySelector("#modalOptionBox_text").innerText = ItemInfoMap.get(id + "_infoText");
    document.querySelector("#modalOptionBox_headline").innerText = ItemInfoMap.get(id + "_Headline");

    document.querySelector("#modalOptionBox_btn").setAttribute("value", id);

    $(".modalOption").show();
}


function UpdatePriceList(width, height, elem) {
    switch (height) {
        case 2959:
            switch (width) {
                case 4020:

                    break;
                case 4810:

                    break;
                case 5600:

                    break;
                case 6390:

                    break;
                default:
                    break;
            }
        case 3457:
            switch (width) {
                case 4020:

                    break;
                case 4810:

                    break;
                case 5600:

                    break;
                case 6390:

                    break;
                default:
                    break;
            }
        case 3955:
            switch (width) {
                case 4020:

                    break;
                case 4810:

                    break;
                case 5600:

                    break;
                case 6390:

                    break;
                default:
                    break;
            }
        default:
            break;
    }

}



function UpdatePrices() {




}


function updateLedOption() {
    LEDOption.setAttribute("max", desiredWidthElements + 1);
    if (LEDOption.value > LEDOption.getAttribute("max")) { LEDOption.value = LEDOption.getAttribute("max") }
    LEDOption.dispatchEvent(new Event('change'));
    // configuration[2] = LEDOption.value;
}

// $("#OptionList").on("scroll", function() {
//     if ($(this).scrollTop() > $(this).height() - 200) {
//         console.log("now")
//         document.querySelector(".bottomElement").style.display = "none"
//     } else {
//         document.querySelector(".bottomElement").style.display = "block"
//     }
// })

const GetElementContentHeight = function(elem) { //add height of all child elements
    var cc = 0;
    $(elem).children().each(function() {
        cc += $(this).outerHeight();
    });
    return cc;
}
let camPos = "normal"


$(".menu-option").on('scroll', (function() {
    var OptionHeight = GetElementContentHeight($(this));
    // $(this).height())
    // console.log(GetElementContentHeight($(this)));
    // console.log($(this).scrollTop())
    // console.log(OptionHeight)
    if ($(this).scrollTop() > (OptionHeight - 200 - $(this).height())) {
        // console.log("NSADSADSADSA")
        document.querySelector(".bottomElement").style.display = "none"
    } else {
        document.querySelector(".bottomElement").style.display = "flex"
    }
    const sum = sizearray.reduce((partial_sum, a) => partial_sum + a, 0);
    let tempCounter = 0;
    sizearray.forEach((item, index) => {
        tempCounter += item;
        if ($(this).scrollTop() <= (tempCounter) && $(this).scrollTop() + item > tempCounter) {
            UpdateActiveMenu(index);
            return;
        } else {
            return;
        }
    })

    // action_camposition_3
    // action_camposition_4

    let roofGlasElement = document.querySelector("#Dachverglasung-0")
    let ledElement = document.querySelector(".Beleuchtung-0")
    if ($(this).scrollTop() > roofGlasElement.offsetTop - screen.height / 4 && $(this).scrollTop() < roofGlasElement.offsetTop + 30 + screen.height / 4) {
        if (camPos != "topDown") {
            test.action_camposition_3()
            console.log("Cam 3")
            camPos = "topDown"
            return
        }
    } else if ($(this).scrollTop() > ledElement.offsetTop - screen.height / 4 && $(this).scrollTop() < ledElement.offsetTop) {
        if (camPos != "innerLed") {
            test.action_camposition_4()
            console.log("Cam 4")
            camPos = "innerLed"
            return
        }

    } else {

        if (camPos != "normal") {
            if (test.selectedCamMode == "outside") {
                console.log("cam 2")
                test.action_camposition_1()
            } else if (test.selectedCamMode == "inside") {
                console.log("cam 1")
                test.action_camposition_2()
            }

            camPos = "normal"
            return
        }
    }





}));


var UpdateActiveMenu = function(i) {
    let array = Array.from(siteMenuMap, ([name, value]) => ({ name, value }));
    // console.log(array);
    array.forEach((item, index) => {
        item.value.classList.remove("active");
        if (index == i) {
            item.value.classList.add("active");
            return;
        }

    })
}

let sizearray = [];

function RecalcMenu() {
    let array = Array.from(MenuMap, ([name, value]) => ({ name, value }));
    array.forEach(item => {
        // console.log(item.value.offsetHeight);
        sizearray.push(item.value.offsetHeight);
    })
}


$(window).resize(function() {
    RecalcMenu();
})


function ToggleOptionBox(_optionName) {

}





// const configuration_ext = ["5600", "3955", "5"];


function GetCurrentConfiguration(elem) {
    let tempId;
    if (elem.querySelector(".kat-select") == null) return;
    tempId = elem.querySelector(".kat-select").getAttribute("id")
    if (!configuration.includes(tempId)) {
        configuration.push(tempId);
    } else {
        let posInArr = configuration.indexOf(tempId);
        configuration.splice(posInArr, 1);
    }


}

function SaveConfiguration() {
    navigator.clipboard.writeText(configuration.toString()).then(function() {
        alert('Copying to clipboard was successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
    console.log(desiredWidthElements)
}

export function LoadConfiguration(arr) {

    if (typeof(arr) !== 'undefined') {
        let Elements = [];
        arr.forEach((e, index) => {
            if (index === 0) {
                document.querySelector("#ui-obj-Breite").value = e;
                let x = Math.floor(parseFloat(e) / 790);
                console.log(x)
                UpdateDWEExtern(x)
                    // desiredWidthElements = 5;
                updateLedOption();
                console.log("width")
                CalcPrice();
                document.querySelector("#ui-obj-Breite").dispatchEvent(new Event('change'));
                return
            }
            if (index === 1) {
                document.querySelector("#ui-obj-Tiefe").value = e;
                updateLedOption();
                console.log("depth")
                CalcPrice();
                document.querySelector("#ui-obj-Tiefe").dispatchEvent(new Event('change'));
                return
            }
            if (index === 2) {
                console.log(desiredWidthElements)
                document.querySelector("#obj-ui-LED").value = e;
                LEDOption.dispatchEvent(new Event('change'));
                console.log("led")
                CalcPrice();
                return
            }
            Elements.push(document.querySelector("#" + e + " .kat-visual"))
        })

        Elements.forEach((e) => {
            console.log(e);
            e.click();
            configuration.push(e.getAttribute("id"));
        })
    } else {
        console.log("######################################## LoadConfiguration arr  is undefined");
    }




    // console.log(configuration);
}


export function CheckConfiguration() {
    let config = readTextFile("./js/configuration.txt");
    console.log(config);
    if (config !== "") {
        // console.log(config.split(","))
        configuration = config.split(",");
        LoadConfiguration(configuration)
        return true
    } else {
        return false
    }
    // console.log(config.toString());
}

function GetScreenCordinates(obj) {
    const rect = obj.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


function AddToolTipToElement(_elem, _text) {
    _elem.addEventListener('mouseover', (e) => {
        // let ttElem = document.querySelector(".tooltip");
        // let ttElemText = document.querySelector(".tooltipText");
        ttElemText.innerText = _text;
        ttElem.style.display = "block";
        let targetWidth = e.target.offsetWidth;
        let ttWidth = ttElem.offsetWidth;

        let pos = GetScreenCordinates(e.target)
            // + full widht/2   +ownwidth/2
        pos.left += ((targetWidth / 2) - (ttWidth / 2));
        pos.top -= ttElem.offsetHeight;

        document.querySelector(".tooltip").style.top = `${pos.top}px`;
        document.querySelector(".tooltip").style.left = `${pos.left}px`;


        // console.log(GetScreenCordinates(e.target));
    })

    _elem.addEventListener('mouseleave', (e) => {
        // let targetWidth = e.target

        // let ttElem = document.querySelector(".tooltip");
        // let ttElemText = document.querySelector(".tooltipText");
        // let pos = GetScreenCordinates(e.target)
        // document.querySelector(".tooltip").style.top = `${pos.top}px`;
        // document.querySelector(".tooltip").style.left = `${pos.left}px`;
        ttElem.style.display = "none";
        // ttElemText.innerText = item.name;
        // console.log(GetScreenCordinates(e.target));
    })
}


const Action_ToggleVersand = (_state) => {
    let shippingElements = document.querySelectorAll(".shippingElement");

    if (shippingElements.length > 0) {
        shippingElements.forEach((e) => {
            _state == "true" ? e.style.display = "block" : e.style.display = "none"
        })
    }
}


let configuration_string = []; //send via post on click - safe to... db?
const CreateConfiguration = () => {


    configuration_string = []


    const arr = [...ElementMapper].map(([name, value]) => ({ name, value }));
    let requests = arr.map((e, i) => {
        return new Promise((resolve, reject) => {
            let xqwe = e.value.element
            if (e.value.id == "Slider-0") {
                xqwe = e.value.element
            }
            //
            FindElementByNode(xqwe).then((node) => {
                if (node.classList.contains("Slider-0")) {
                    console.log("Dimensional slider")
                        //save slider data and return
                }
                if (node.classList.contains("Beleuchtung-0")) {
                    console.log("LedBlock")
                        //save Led data and return
                }

                let node2 = node.querySelector(".kat-select.isActive")
                if (node2 != null) {
                    e.isSelected = true
                } else {
                    // console.log("node2 is null.")
                    e.isSelected = false
                }

                if (e.isSelected) {
                    configuration_string.push(node2.id)
                    resolve()
                } else {
                    resolve()
                }
                resolve()


            })
            resolve()

        });

    })
    Promise.all(requests).then(() => {
        //code after all promises are resolved
        console.log(configuration_string)
    });
}


const FindElementByNode = (_node) => {
    return new Promise((resolve, reject) => {
        var stack = [],
            node, ii;
        let root = document
        stack.push(root);

        while (stack.length > 0) {
            node = stack.pop();
            if (node == _node) {
                console.log("found")
                resolve(node);

            } else if (node.children && node.children.length) {
                for (ii = 0; ii < node.children.length; ii += 1) {
                    stack.push(node.children[ii]);
                }
            }
        }

        // no - element? -> Return null.
        return null;
    })

}



// const AnimateBlockHeight = (_elem, _height, _duration) => {
//     let targetHeight = _elem.offsetHeight;
//     let targetWidth = _elem.offsetWidth;
//     let finalDuration = _duration / targetHeight;

//     let targetPaddingX = elem.style.padd;
//     let targetPaddingY;

//     let intervalCounter = 0;
//     let normalizePadding = 0;
//     _elem.style.overflow = "hidden";
//     for (let i = targetHeight; i >= _height; i--) {

//         setTimeout(function timer() {
//             console.log(i);
//             _elem.style.height = i + "px";
//             _elem.style. = i + "px";
//             // _elem.style.paddingBottom = normalizePadding + "px";
//             console.log("Off: " + _elem.offsetHeight);
//             console.log("H: " + _height);
//             normalizePadding++;
//             if (_elem.offsetHeight == _height) {
//                 _elem.style.display = "none";
//                 _elem.style.overflow = "unset";
//             }
//         }, intervalCounter * finalDuration);
//         intervalCounter++;
//     }

// }