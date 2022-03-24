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
    Action_ChangeLight
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
                console.log(allText); // display text on the console
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

var ElementMapper = new Map();
var ParentMapper = new Map();
var MenuMapper = new Map();


var gHeight;
var gWidth;

$(document).ready(function() {
    const obj = JSON.parse(jsonNew);
    console.log(obj.optionItems);
    let tempBElem = document.querySelector(".bottomElement");
    let tempBElem2 = document.querySelector("#sec15");



    obj.menuItems.forEach(element => {
        // console.log(element.name);
        AddNewMenuItem(element);

    });

    console.log(MenuMap);

    obj.optionItems.forEach(element2 => {
        AddNewOptionItem(element2);
        element2.childs.forEach(element3 => {
            AddNewElementItem(element3, element2);
        })
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
    console.log(ItemInfoMap);
    console.log(MenuMapper);
    console.log(ParentMapper);
    console.log(ElementMapper);
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
    // console.log(item.extra);
    ElementMapper.set(`${item.id}`, new MenuElement(item));
    let ElementItem = ElementMapper.get(`${item.id}`);


    // console.log(item.type);
    if (item.type == "x-slider") {
        // console.log("object");
        let container = createCustomSlider(item);
        OptionMap.get(parent.name).appendChild(container);
        return;
    } else if (item.type == "x-LED") {
        let container = CreateCustomLedBlock(item, OptionMap.get(parent.name));
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
    let xtraContainer;
    if (item.type == "1col" && item.extra == true) {
        console.log("object");
        container.classList.add("kat-item-col1-flex");

        xtraContainer = document.createElement("div");
        xtraContainer.classList.add("kat-item-col1");

        let xtraTextElement = document.createElement("p");
        xtraTextElement.innerText = `${item.name}`;
        xtraTextElement.classList.add("text-bold");
        xtraTextElement.classList.add("heading");

        let xtraPriceElement = document.createElement("p");
        xtraPriceElement.innerText = `${item.price}`;

        let xtraInfoList = document.createElement("ul");

        console.log("%c" + item.extra.length, "color:red")

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
    if (!item.hover) visualElement.classList.add("noHover");



    visualElement.addEventListener("click", () => {
        test.CheckOptions(visualElement);
        CalcPrice();
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
    if (item.selected) checkElement.classList.add("isActive");
    checkElement.setAttribute("id", `ui-obj-${parent.name}-${item.id}`);
    checkElement.setAttribute("type", `${parent.name}`);
    checkElement.setAttribute("dataValue", `${item.id}`);
    checkElement.setAttribute("price", `${item.price}`);



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
    priceElement.innerText = `${item.price}`;
    priceElement.classList.add("priceTagElement");



    visualElement.appendChild(checkElement);
    container.appendChild(visualElement);

    ElementItem.priceElement = container.querySelector(".priceTagElement");

    if (item.type != "1col") {
        container.appendChild(textElement);
        container.appendChild(priceElement);
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

    for (let i = 0; i < item.slider.length; i++) {
        let row_1 = document.createElement("div");
        row_1.classList.add("row");
        if (i != 0) row_1.classList.add("mt-4");

        let textBox_1 = document.createElement("div");
        textBox_1.classList.add("col-2");
        textBox_1.classList.add("col-sm-2");

        let text_1 = document.createElement("p");
        text_1.classList.add("text-bold");
        text_1.classList.add("text-center");
        text_1.classList.add("text-sm-left");
        text_1.innerText = item.slider[i].text;

        let output_1 = document.createElement("div");
        output_1.classList.add("col-4", "col-sm-3", "text-center", "transform-numbers");
        output_1.innerText = `${item.slider[i].min} ${item.slider[i].unit}`;

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
        slider_1.addEventListener("change", () => {
            output_1.innerText = `${slider_1.value} ${item.slider[i].unit}`;
            UpdatePrices();
            CalcPrice();
            // CalcPrice();
        })
        sliderMap.set(item.slider[i].text, slider_1);


        // slider_1.addEventListener("change", () => { test.removetest(slider_1) });


        AddEventToElement(slider_1, item.slider[i].function, "");


        textBox_1.appendChild(text_1);
        row_1.appendChild(textBox_1);
        row_1.appendChild(output_1);
        sliderBox1.appendChild(slider_1);
        row_1.appendChild(sliderBox1);

        container.appendChild(row_1);
    }
    let priceText = document.createElement("p");
    priceText.innerText = "8.700€";
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

    let visualElement = document.createElement("div");
    visualElement.classList.add("kat-visual");
    visualElement.addEventListener("click", () => {
        test.CheckOptions(visualElement);
        CalcPrice();
    })
    let visualContainer = document.createElement("img");
    visualContainer.setAttribute("src", item.img)

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



    visualElement.appendChild(visualContainer);
    visualElement.appendChild(checkElement);
    container.appendChild(visualElement);

    let container2 = document.createElement("div");
    container2.classList.add("kat-item");

    let textElement = document.createElement("p");
    textElement.innerText = `${item.name}`;
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
    containerInfo3.innerText = `${item.price}`;
    containerInfo3.classList.add("priceTagElement");


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
    bottomOutput.innerText = "5"

    let bottomSliderBox = document.createElement("div")
    bottomSliderBox.classList.add("col-6");

    let bottomSlider = document.createElement("input")
    bottomSlider.classList.add("rangeSlider");
    bottomSlider.addEventListener("change", (e) => {
        bottomOutput.innerText = e.target.value;
    })
    bottomSlider.setAttribute("type", "range");
    bottomSlider.setAttribute("min", `${item.LED[0].min}`);
    bottomSlider.setAttribute("max", `${item.LED[0].max}`);
    bottomSlider.setAttribute("step", `${item.LED[0].step}`);
    bottomSlider.setAttribute("id", `obj-ui-${item.name}`);


    bottomSliderBox.appendChild(bottomSlider);
    bottomOutputBox.appendChild(bottomOutput);
    bottomTextBox.appendChild(bottomText);

    bottomRow.appendChild(bottomTextBox);
    bottomRow.appendChild(bottomOutputBox);
    bottomRow.appendChild(bottomSliderBox);


    parent.appendChild(container);
    parent.appendChild(container2);
    parent.appendChild(bottomRow);

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
    if (elemFunc == "SwitchColor") {
        elem.addEventListener("click", () => { Action_SwitchColor(`${elemParam}`) });
    } else if (elemFunc == "ChangeWidth") {
        elem.addEventListener("click", () => { Action_ChangeWidth(`${elem.value}`) });
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
    }
    return elem;
}



//Calc Stuff

function CalcPrice() {

    let constPrice = GetConstPrice(sliderMap.get("Breite").value, sliderMap.get("Höhe").value);
    $("#size-prize").text(constPrice + " €")

    let elems = $(".kat-visual").children(".kat-select");
    let priceSum = 0;
    $(elems).each(function(i, obj) {
        if ($(obj).hasClass("isActive")) {
            let x = parseInt($(obj).attr("price"));
            if (Number.isInteger(x)) {
                priceSum = priceSum + x;

            }
        }
    })

    let x = priceSum + constPrice;
    $(".sumText").text(x + " €");

}


function GetConstPrice(width, height) {

    // alert(width);
    // alert(height);

    if (width == "4020") {
        if (height == "2959") {
            return 6450;
        } else if (height == "3457") {
            return 6900;
        } else if (height == "3955") {
            return 7300;
        }
    } else if (width == "4810") {
        if (height == "2959") {
            return 7300;
        } else if (height == "3457") {
            return 7750;
        } else if (height == "3955") {
            return 8250;
        }
    } else if (width == "5600") {
        if (height == "2959") {
            return 8150;
        } else if (height == "3457") {
            return 8700;
        } else if (height == "3955") {
            return 9250;
        }
    } else if (width == "6390") {
        if (height == "2959") {
            return 8950;
        } else if (height == "3457") {
            return 9600;
        } else if (height == "3955") {
            return 10200;
        }
    }



    return 0;
}


function UpdateModalBox(id) {
    document.querySelector("#modalOptionBox_img").setAttribute("src", ItemInfoMap.get(id + "_imgPath"));
    document.querySelector("#modalOptionBox_text").innerText = ItemInfoMap.get(id + "_infoText");
    document.querySelector("#modalOptionBox_headline").innerText = ItemInfoMap.get(id + "_Headline");

    document.querySelector("#modalOptionBox_btn").setAttribute("value", id);
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





$(".menu-option").on('scroll', (function() {

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
        console.log(item.value.offsetHeight);
        sizearray.push(item.value.offsetHeight);
    })
}

$(window).resize(function() {
    RecalcMenu();
})