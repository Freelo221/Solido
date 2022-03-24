class MainElement {
    settings = {
        "rows": [

        ],
        "cols": [

        ]
    };
    menuItems = [];
    optionItems = [

    ];

    constructor(props) {

    }
}


class MenuElement {

    id;

    type;
    name;
    price;
    img;
    hover;
    fixed;
    single;
    upgrade;
    info;
    background;
    infoHeadline;
    infoText;
    infoImage;
    selected;
    extra;
    extraText1;
    extraText2;
    extraText3;

    function;
    functionParam;
    element;
    hasExtraPrice;
    extraPrice;
    toggleExtraPrice;
    showPrice;

    priceTable = [


    ];

    discountTable = [


    ];


    LED = [{
        info1: "",
        unit: "",
        min: "",
        max: "",
        step: ""
    }]

    slider = [{
            function: "",
            text: "",
            min: "",
            max: "",
            step: "",
            unit: "",
            start: "",
        },
        {
            function: "",
            text: "",
            min: "",
            max: "",
            step: "",
            unit: "",
            start: "",
        }
    ]


    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.price = props.price;
        this.img = props.img;
        this.hover = props.hover;
        this.fixed = props.fixed;
        this.single = props.single;
        this.upgrade = props.hover;
        this.info = props.info;
        this.infoHeadline = props.infoHeadline;
        this.infoText = props.infoText;
        this.infoImage = props.infoImage;
        this.selected = props.selected;
        this.extra = props.extra;
        this.extraText1 = props.extraText1;
        this.extraText2 = props.extraText2;
        this.extraText3 = props.extraText3;
        this.function = props.function;
        this.functionParam = props.functionParam;
        this.element = props.element;
        this.background = props.background;
        this.hasExtraPrice = props.hasExtraPrice;
        this.extraPrice = props.extraPrice;
        this.toggleExtraPrice = props.toggleExtraPrice
        this.showPrice = props.showPrice
            // this.priceTable = props.priceTable;
    }


}

class ParentElement {

    id;
    name;
    type;
    subline;
    menuType;
    element;

    childs = [];
    childs2 = [];

    constructor(props) {
        // super(props);
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.subline = props.subline;
        this.menuType = props.menuType;
        this.element = props.element;
    }
}


class MainMenuElement {

    id;
    name;
    icon;
    element;
    childs = [];
    constructor(props) {
        // super(props);
        this.id = props.id;
        this.name = props.name;
        this.icon = props.icon;
        this.element = props.element;
    }


}


class GeneratorOptions {
    cols = [];
    rows = [];

    constructor(props) {
        props.cols.forEach((elem) => {
            this.addCol(elem.data);
        })

        props.rows.forEach((elem) => {
            this.addRow(elem.data);
        })
    }

    addCol = (props) => {
        this.cols.push(props.colName);
    }

    addRow = (props) => {
        this.cols.push(props.rowName);
    }
}


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


let SETTINGS_rowCount = 0;
let SETTINGS_colCount = 0;

let SETTINGS_PriceTableRows = new Map();
let SETTINGS_PriceTableCols = new Map();


const imagePath = "/img/conf/";
let selectedImgPicker;

var ElementMapper = new Map();
var ParentMapper = new Map();
var MenuMapper = new Map();
// const FinalElement = new ParentElement();
var selectedElement;

var NewMenuElementButton;
var NewParentElementButton;

function test() {
    for (let i = 0; i < 5; i++) {
        $("#PriceTableRows").click()
        $("#PriceTableCols").click()
    }
}

$(document).ready(function() {

    NewMenuElementButton = document.querySelector(".addNewMenuElement");
    NewParentElementButton = document.querySelector(".addNewParent");
    GenerateMenuFromJson();

    // debug
    assignInfoClicks();

    // render(5, 5, document.querySelector(".modalTableContainer"));
    UpdatePriceTable("priceTable");
    UpdatePriceTable("discountTable");
    let items = document.querySelectorAll('.orderItem');

    items.forEach(item => {
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
    })


    $(".UpdateStartValues1").on("change", function() {
        isEnabled = true;
        let item = document.querySelectorAll('.UpdateStartValues1');
        let tempSelect = document.querySelector("#inputChildNodeSliderStartValue1");
        item.forEach((e) => {
            if (e.value == "" || e.value <= 0) {
                isEnabled = false;
            }
        })

        if (isEnabled) {
            tempSelect.disabled = false;
            CreateStartValueOptions(tempSelect, document.querySelector("#inputChildNodeSliderMin1").value, document.querySelector("#inputChildNodeSliderMax1").value, document.querySelector("#inputChildNodeSliderStep1").value)

        } else {
            tempSelect.disabled = true;
        }
    })

    $(".UpdateStartValues2").click(function() {
        isEnabled = true;
        let item = document.querySelectorAll('.UpdateStartValues');
        let tempSelect = document.querySelector("#inputChildNodeSliderStartValue2");
        item.forEach((e) => {
            if (e.value == "" || e.value <= 0) {
                isEnabled = false;
            }
        })

        if (isEnabled) {

            tempSelect.disabled = false;
            CreateStartValueOptions(tempSelect, document.querySelector("#inputChildNodeSliderMin2").value, document.querySelector("#inputChildNodeSliderMax2").value, document.querySelector("#inputChildNodeSliderStep2").value)

        } else {
            tempSelect.disabled = true;
        }
    })



    $("#PriceTableRows").click(function(e) {
        if (SETTINGS_rowCount >= 12) return;
        let temp_id = "tablerow_" + SETTINGS_rowCount;
        let tempParent = document.querySelector(".PriceTableRowsElementContainer");
        CreateTableUIItem("row", temp_id, tempParent);
        SETTINGS_rowCount++;

        UpdatePriceTable("priceTable");
        UpdatePriceTable("discountTable");

    })

    $("#PriceTableCols").click(function(e) {
        if (SETTINGS_colCount >= 12) return;
        let temp_id = "tablecol_" + SETTINGS_colCount;
        let tempParent = document.querySelector(".PriceTableColsElementContainer");


        CreateTableUIItem("col", temp_id, tempParent);
        SETTINGS_colCount++;
        // console.log(SETTINGS_PriceTableCols);
        UpdatePriceTable("priceTable");
        UpdatePriceTable("discountTable");
        //add


    })

    $("#PriceTableRowsRemove").click(function(e) {
        let tempParent = document.querySelector(".PriceTableRowsElementContainer");
        SETTINGS_PriceTableRows.delete(tempParent.lastChild.childNodes[0].getAttribute("id"));
        tempParent.lastChild.remove();
        SETTINGS_rowCount--;
        console.log(SETTINGS_rowCount);
        UpdatePriceTable("priceTable");
        UpdatePriceTable("discountTable");
    })

    $("#PriceTableColsRemove").click(function(e) {
        let tempParent = document.querySelector(".PriceTableColsElementContainer");
        SETTINGS_PriceTableCols.delete(tempParent.lastChild.childNodes[0].getAttribute("id"));
        tempParent.lastChild.remove();
        SETTINGS_colCount--;
        console.log(SETTINGS_colCount);
        UpdatePriceTable("priceTable");
        UpdatePriceTable("discountTable");
    })

    // CreateNewParentElement(document.querySelector(".addNewParent"));
    // CreateNewParentElement(document.querySelector(".addNewParent"));
    // CreateNewChildElement(x);
    // CreateNewChildElement(x);


    MoveParentUp = function(elem) {
        let array = [];
        let prevElem = $(elem).prev();
        let curElem = $(elem);
        if ($(prevElem).hasClass("menuContainer")) {
            return;
        } else {
            let pos = 0;
            array = Array.from(ParentMapper, ([name, value]) => ({ name, value }));

            array.forEach((item, i) => {
                if (item.value.element == elem) {
                    console.log("%c" + i, "color:red");
                    pos = i;

                }
            })

            let el = array[pos];
            array.splice(pos, 1);
            array.splice(pos - 1, 0, el);

            $(curElem).insertBefore(prevElem);
            ParentMapper.clear();
            array.forEach((item) => {
                // console.log(item);
                ParentMapper.set(item.name, item.value);
            })
            console.log(ParentMapper)
        }
        // $(prevElem).hasClass("menuContainer") ? () => {} : $(curElem).insertBefore(prevElem);

    }

    MoveParentDown = function(elem) {


        let array = [];
        let nextElem = $(elem).next();
        let curElem = $(elem);
        if ($(nextElem).hasClass("menuContainer")) {
            return;
        } else {
            let pos = 0;
            array = Array.from(ParentMapper, ([name, value]) => ({ name, value }));

            array.forEach((item, i) => {
                if (item.value.element == elem) {
                    console.log("%c" + i, "color:red");
                    pos = i;

                }
            })

            let el = array[pos];
            array.splice(pos, 1);
            array.splice(pos + 1, 0, el);

            $(curElem).insertAfter(nextElem);
            ParentMapper.clear();
            array.forEach((item) => {
                // console.log(item);
                ParentMapper.set(item.name, item.value);
            })
            console.log(ParentMapper)
        }


        // let nextElem = $(elem).next();
        // let curElem = $(elem);
        // $(nextElem).hasClass("addNewParent") ? () => {} : $(curElem).insertAfter(nextElem);

    }


    $(".up").click(function(e) {
        // MoveParentUp(e.target);
        // let prevElem = $(this).parent().prev();
        // let curElem = $(this).parent();

        // $(prevElem).hasClass("menuContainer") ? () => {} : $(curElem).insertBefore(prevElem);

    })

    $(".down").click(function(e) {
        // MoveParentDown(e.target);
        // let nextElem = $(this).parent().next();
        // let curElem = $(this).parent();
        // $(nextElem).hasClass("addNewParent") ? () => {} : $(curElem).insertAfter(nextElem);

    })

    $(".menuEditorClose").click(function(e) {
        RemoveallActiveStates();
        $(this).parent().hide();
    })

    $(".childEditorClose").click(function(e) {
        RemoveallActiveStates();
        $(this).parent().hide();
    })

    $(".parentEditorClose").click(function(e) {
        RemoveallActiveStates();
        $(this).parent().hide();
    })

    $(".PriceTableEditor_closeBtn").click(function(e) {
        document.querySelector(".PriceTableEditor_container").style.display = "none";
    })

    $(".openPriceTableButton").click(function(e) {
        document.querySelector(".PriceTableEditor_container").style.display = "block";
    })

    $(".DiscountTableEditor_closeBtn").click(function(e) {
        document.querySelector(".DiscountTableEditor_container").style.display = "none";
    })

    $(".openDiscountTableButton").click(function(e) {
        document.querySelector(".DiscountTableEditor_container").style.display = "block";
    })

    $(".ModalInfo_closeBtn").click(function(e) {
        document.querySelector(".ModalInfo_container").style.display = "none";
    })

    $(".ModalImage_closeBtn").click(function(e) {
        document.querySelector(".ModalImage_container").style.display = "none";
    })

    $("#functionHelper").click(function(e) {
        let elem = document.querySelector(".ModalInfo_container");
        showFunctionInfo(elem.querySelector(".ModalInfo_table"), document.querySelector("#inputChildNodeFunction").value);
        elem.style.display = "block";
    })

    // $("#functionParameterHelper").click(function(e) {
    //     let elem = document.querySelector(".ModalInfo_container");
    //     showFunctionInfo(elem.querySelector(".ModalInfo_table"));
    //     elem.style.display = "block";
    // })

    $(".openSettingsButton").click(function(e) {
        document.querySelector(".ChildNodeEditor").style.display = "none";
        document.querySelector(".ParentNodeEditor").style.display = "none";
        document.querySelector(".MenuEditor").style.display = "none";
        document.querySelector(".SettingsEditor").style.display = "block";
    })

    $("#inputMenuNodeName").on("input", function(e) {
        $(SelectedMenuItem.element).text($(this).val());
    })

    $("#inputChildNodeName").on("input", function(e) {
        $(SelectedChild.element).text($(this).val());
    })

    $("#inputParentNodeName").on("input", function(e) {
        $(SelectedParent.element).children("span").text($(this).val());
    })


    $("#imgPicker").click(function() {
        // $('#fileInput').click();
        selectedImgPicker = "basic";
        OpenImagePicker();
    })

    $("#imgPicker_info").click(function() {
        // $('#fileInput').click();
        selectedImgPicker = "info";
        OpenImagePicker();
    })

    // $('#fileInput').change(handleFileSelect);

    // $(".child").click(function (e) {
    //     $("#activeElementText").text($(this).text());
    //     document.querySelector(".ChildNodeEditor").style.display = "block";
    //     document.querySelector(".ParentNodeEditor").style.display = "none";
    //     document.querySelector(".MenuEditor").style.display = "none";
    //     OpenChildElementInEditor(e.target);
    // })

    // $(".parent").click(function (e) {
    //     if (e.target.classList.contains("parent")) {
    //         $("#activeElementText").text($(this).children("span").text());
    //         document.querySelector(".ChildNodeEditor").style.display = "none";
    //         document.querySelector(".ParentNodeEditor").style.display = "block";
    //         document.querySelector(".MenuEditor").style.display = "none";
    //         OpenParentElementInEditor(e.target);
    //     }
    // })

    $(".MenuItem").click(function(e) {
        document.querySelector(".ChildNodeEditor").style.display = "none";
        document.querySelector(".ParentNodeEditor").style.display = "none";
        document.querySelector(".SettingsEditor").style.display = "none";
        document.querySelector(".MenuEditor").style.display = "block";
        OpenMenuElementInEditor(e.target);
    })

    $(".addNewParent").click(function(e) {
        const id = "ParentElement-" + ParentMapper.size;
        // document.querySelector(".listWrapper").insertBefore(elem, e);
        let tempObj = new ParentElement({
            id: id,
            name: "ParentElement",
            type: "",
            subline: "",
            menuType: "",
            element: ""
        });
        ParentMapper.set(id, tempObj);
        CreateNewParentElementFromObj(tempObj);
        let theclick = new Event("click")
        ParentMapper.get(id).element.dispatchEvent(theclick);
        // CreateNewParentElement(e.target);
    })

    $(".addNewMenuElement").click(function(e) {
        const id = "MenuElement-" + MenuMapper.size;
        let tempObj = new MainMenuElement({
            id: id,
            name: "test",
            icon: "",
            element: ""
        });
        MenuMapper.set(id, tempObj);
        CreateNewMenuElementFromObj(tempObj);
        let theclick = new Event("click")
        MenuMapper.get(id).element.dispatchEvent(theclick);

        // CreateNewMenuElement(e.target);
    })


    $(".child").click(function(e) {
        // CreateNewChildElement(e.target);

    })



    $("#inputChildNodeType").on("change", function(e) {

        ToggleNodeType($(this).val());



    })



    ToggleSliderOptions = (val) => {
        val == "x-slider" ? $("#SliderOptions").css("display", "flex") : $("#SliderOptions").css("display", "none");
    }

    ToggleLEDOptions = (val) => {
        val == "x-LED" ? $("#LEDOption").css("display", "block") : $("#LEDOption").css("display", "none");
    }

    ToggleExtraOption = (val) => {
        val == "1col" ? $("#ExtraOption").css("display", "flex") : $("#ExtraOption").css("display", "none");
    }

    ToggleInfoOptions = (val) => {
        val ? $("#InfoOption").css("display", "flex") : $("#InfoOption").css("display", "none");
    }

    ToggleExtraPrice = (val) => {
        val ? $("#inputChildNodePriceExtraContainer").css("display", "block") : $("#inputChildNodePriceExtraContainer").css("display", "none");
    }

    $("#inputChildNodeExtra").click(function(e) {

        e.target.checked ? $(".extraOptionContainer").css("display", "block") : $(".extraOptionContainer").css("display", "none");
    })



    $("#inputChildNodeInfo").on("change", function(e) {
        ToggleInfoOptions(this.checked);
        // if (this.checked) {
        //     $("#InfoOption").css("display", "flex");
        // } else {
        //     $("#InfoOption").css("display", "none");
        // }
    })

    $("#inputChildNodePriceExtraCheck").on("change", function(e) {
        ToggleExtraPrice(this.checked);
        // if (this.checked) {
        //     $("#InfoOption").css("display", "flex");
        // } else {
        //     $("#InfoOption").css("display", "none");
        // }
    })

    $("#inputChildNodeFixed").on("change", function(e) {
        if (this.checked) {
            document.querySelector("#inputChildNodeSingle").checked = false;
            document.querySelector("#inputChildNodeUpgrade").checked = false;
            document.querySelector("#inputChildNodeSelected").checked = true;
        }
    })

    $("#inputChildNodeSingle").on("change", function(e) {
        if (this.checked) {
            document.querySelector("#inputChildNodeFixed").checked = false;
            document.querySelector("#inputChildNodeUpgrade").checked = false;
        }
    })

    $("#inputChildNodeUpgrade").on("change", function(e) {
        if (this.checked) {
            document.querySelector("#inputChildNodeFixed").checked = false;
            document.querySelector("#inputChildNodeSingle").checked = false;
        }


    })

    try {
        functionJson = readTextFile('./js/functions.json');
        functionJson = JSON.parse(functionJson);
    } catch {
        console.log("%c", "Cant read JSON file './js/functions.json'  Function Info not loaded.", "color:red");
    }



    $("#inputChildNodeBackground").on("keyup", function(e) {
        document.querySelector(".color-output").style.backgroundColor = e.target.value;
        document.querySelector("#imgPicker").style.backgroundColor = e.target.value;
        document.querySelector("#imgPicker_info").style.backgroundColor = e.target.value;
    })



})



// function handleFileSelect(e) {

//     var files = e.target.files;
//     if (files.length < 1) {
//         alert('select a file...');
//         return;
//     }
//     var file = files[0];
//     var reader = new FileReader();
//     reader.onload = onFileLoaded;
//     reader.readAsDataURL(file);
// }

// function onFileLoaded(e) {
//     var match = /^data:(.*);base64,(.*)$/.exec(e.target.result);
//     if (match == null) {
//         throw 'Could not parse result'; // should not happen
//     }
//     var mimeType = match[1];
//     var content = match[2];

//     document.querySelector("#imgPicker").setAttribute("src", e.target.result);
//     // alert(mimeType);
//     alert(content);
// }

function ToggleNodeType(nodeType) {
    ToggleSliderOptions(nodeType);
    ToggleLEDOptions(nodeType);
    ToggleExtraOption(nodeType);
}


var functionJson;

function dropped(e) {
    cancelDefault(e)

    // get new and old index
    let oldIndex = e.dataTransfer.getData('text/plain')
    let target = $(e.target)
    let newIndex = target.index();


    console.log(selectedElement);
    console.log(e.target);
    if (selectedElement == e.target) {
        return;
    }

    let x = $(target).parent().attr("id");
    let y2 = $(selectedElement).parent().attr("id");

    let dropped;


    if (x != y2) {

        if (x == "mainMenuContainer" || y2 == "mainMenuContainer") {
            return;
        }

        dropped = $(selectedElement).parent().children().eq(oldIndex).remove()
            // return false;
    } else {
        dropped = $(this).parent().children().eq(oldIndex).remove()
    }
    // remove dropped items at old place


    // insert the dropped items at new place
    if (newIndex < oldIndex) {
        target.before(dropped)
    } else {
        target.after(dropped)
    }
}


function cancelDefault(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}

function dragStart(e) {
    selectedElement = e.target;
    var index = $(e.target).index()
    e.dataTransfer.setData('text/plain', index)
    console.log(e.target);
}


function RemoveallActiveStates() {
    $(".activeElement").removeClass("activeElement");
}



var SelectedParent;

function OpenParentElementInEditor(parent) {
    RemoveallActiveStates();
    // if (SelectedParent != null) SelectedParent.element.classList.remove("activeElement");
    SelectedParent = parent;
    SelectedParent.element.classList.add("activeElement");
    // SelectedParent = parent;
    document.querySelector("#inputParentNodeId").value = parent.id;
    document.querySelector("#inputParentNodeName").value = parent.name;
    document.querySelector("#inputParentNodeType").value = parent.type;
    document.querySelector("#inputParentNodeSubline").value = parent.subline;
    document.querySelector("#selectParentNodeMenuType").value = parent.menuType;
}

function UpdateParentElement() {

    let oldName = SelectedParent.name;
    let newName = document.querySelector("#inputParentNodeName").value;

    UpdateParentName(oldName, newName, SelectedParent);

    SelectedParent.name = document.querySelector("#inputParentNodeName").value;
    SelectedParent.type = document.querySelector("#inputParentNodeType").value;
    SelectedParent.subline = document.querySelector("#inputParentNodeSubline").value;
    SelectedParent.menuType = document.querySelector("#selectParentNodeMenuType").value;

    SelectedParent.element.querySelector("span").innerText = document.querySelector("#inputParentNodeName").value;
}

function RemoveParentElement() {
    SelectedParent.element.remove();
    ParentMapper.delete(SelectedParent.id);
}

var SelectedMenuItem;

function OpenMenuElementInEditor(MenuItem) {
    RemoveallActiveStates();
    SelectedMenuItem = MenuItem;
    SelectedMenuItem.element.classList.add("activeElement");
    // SelectedMenuItem = MenuItem;

    console.log(MenuItem);
    document.querySelector("#inputMenuNodeId").value = MenuItem.id;
    document.querySelector("#inputMenuNodeName").value = MenuItem.name;
    document.querySelector("#inputMenuNodeIcon").value = MenuItem.icon;

}

function UpdateMainMenuElement() {
    let oldMenuName = SelectedMenuItem.name;
    let newMenuItem = document.querySelector("#inputMenuNodeName").value;
    UpdateMenuSelect(oldMenuName, newMenuItem);

    SelectedMenuItem.name = document.querySelector("#inputMenuNodeName").value;
    SelectedMenuItem.icon = document.querySelector("#inputMenuNodeIcon").value;

    SelectedMenuItem.element.innerText = document.querySelector("#inputMenuNodeName").value;
}


var SelectedChild;

function OpenChildElementInEditor(ChildElement) {

    RemoveallActiveStates();
    SelectedChild = ChildElement;
    SelectedChild.element.classList.add("activeElement");
    console.log(SelectedChild);
    document.querySelector("#inputChildNodeId").value = SelectedChild.id;

    document.querySelector("#inputChildNodeType").value = SelectedChild.type;
    ToggleNodeType(SelectedChild.type);

    document.querySelector("#inputChildNodeName").value = SelectedChild.name;
    document.querySelector("#inputChildNodePrice").value = SelectedChild.price;
    document.querySelector("#inputChildNodeImg").value = SelectedChild.img;
    document.querySelector("#imgPicker").setAttribute("src", SelectedChild.img);
    document.querySelector("#imgPicker").style.backgroundColor = SelectedChild.background;

    document.querySelector("#inputChildNodeBackground").value = SelectedChild.background;
    document.querySelector(".color-output").style.backgroundColor = SelectedChild.background;


    SelectedChild.hover ? document.querySelector("#inputChildNodeHover").checked = true : document.querySelector("#inputChildNodeHover").checked = false;
    SelectedChild.fixed ? document.querySelector("#inputChildNodeFixed").checked = true : document.querySelector("#inputChildNodeFixed").checked = false;
    SelectedChild.single ? document.querySelector("#inputChildNodeSingle").checked = true : document.querySelector("#inputChildNodeSingle").checked = false;
    SelectedChild.upgrade ? document.querySelector("#inputChildNodeUpgrade").checked = true : document.querySelector("#inputChildNodeUpgrade").checked = false;
    SelectedChild.selected ? document.querySelector("#inputChildNodeSelected").checked = true : document.querySelector("#inputChildNodeSelected").checked = false;
    SelectedChild.toggleExtraPrice ? document.querySelector("#inputChildNodeToggleExtraPrice").checked = true : document.querySelector("#inputChildNodeToggleExtraPrice").checked = false;
    SelectedChild.showPrice ? document.querySelector("#inputChildNodeTogglePrice").checked = true : document.querySelector("#inputChildNodeTogglePrice").checked = false;
    // document.querySelector("#inputChildNodeHover").value = SelectedChild.hover;
    // document.querySelector("#inputChildNodeFixed").value = SelectedChild.fixed;
    // document.querySelector("#inputChildNodeSingle").value = SelectedChild.single;
    // document.querySelector("#inputChildNodeUpgrade").value = SelectedChild.upgrade;
    // document.querySelector("#inputChildNodeSelected").value = SelectedChild.selected;

    SelectedChild.info ? document.querySelector("#inputChildNodeInfo").checked = true : document.querySelector("#inputChildNodeInfo").checked = false;
    ToggleInfoOptions(SelectedChild.info);

    SelectedChild.hasExtraPrice ? document.querySelector("#inputChildNodePriceExtraCheck").checked = true : document.querySelector("#inputChildNodePriceExtraCheck").checked = false;
    ToggleExtraPrice(SelectedChild.hasExtraPrice);

    document.querySelector("#inputChildNodePriceExtra").value = SelectedChild.extraPrice;

    // document.querySelector("#inputChildNodeInfo").value = SelectedChild.info;
    document.querySelector("#inputChildNodeInfoHeadline").value = SelectedChild.infoHeadline;
    document.querySelector("#inputChildNodeInfoText").value = SelectedChild.infoText;
    document.querySelector("#inputChildNodeInfoImage").value = SelectedChild.infoImage;
    document.querySelector("#imgPicker_info").setAttribute("src", SelectedChild.infoImage);
    document.querySelector("#imgPicker_info").style.backgroundColor = SelectedChild.background;

    SelectedChild.extra ? document.querySelector("#inputChildNodeExtra").checked = true : document.querySelector("#inputChildNodeExtra").checked = false;
    SelectedChild.extra ? document.querySelector(".extraOptionContainer").style.display = "block" : document.querySelector(".extraOptionContainer").style.display = "none";
    // document.querySelector("#inputChildNodeExtra").value = SelectedChild.extra;
    document.querySelector("#inputChildNodeExtra1").value = SelectedChild.extraText1;
    document.querySelector("#inputChildNodeExtra2").value = SelectedChild.extraText2;
    document.querySelector("#inputChildNodeExtra3").value = SelectedChild.extraText3;


    document.querySelector("#inputChildNodeFunction").value = SelectedChild.function;
    document.querySelector("#inputChildNodeFunctionParam").value = SelectedChild.functionParam;

    document.querySelector("#inputChildNodeSliderFunction1").value = SelectedChild.slider[0].function;
    document.querySelector("#inputChildNodeSliderText1").value = SelectedChild.slider[0].text
    document.querySelector("#inputChildNodeSliderMin1").value = SelectedChild.slider[0].min;
    document.querySelector("#inputChildNodeSliderMax1").value = SelectedChild.slider[0].max;
    document.querySelector("#inputChildNodeSliderStep1").value = SelectedChild.slider[0].step;
    document.querySelector("#inputChildNodeSliderUnit1").value = SelectedChild.slider[0].unit;

    if (SelectedChild.slider[0].min != "" && SelectedChild.slider[0].max != "" && SelectedChild.slider[0].step != "") {
        let tempSelect = document.querySelector("#inputChildNodeSliderStartValue1");
        CreateStartValueOptions(tempSelect, SelectedChild.slider[0].min, SelectedChild.slider[0].max, SelectedChild.slider[0].step);
        tempSelect.disabled = false;
        tempSelect.value = SelectedChild.slider[0].start;
    } else {
        document.querySelector("#inputChildNodeSliderStartValue1").disabled = true;
    }

    document.querySelector("#inputChildNodeSliderFunction2").value = SelectedChild.slider[1].function;
    document.querySelector("#inputChildNodeSliderText2").value = SelectedChild.slider[1].text;
    document.querySelector("#inputChildNodeSliderMin2").value = SelectedChild.slider[1].min;
    document.querySelector("#inputChildNodeSliderMax2").value = SelectedChild.slider[1].max;
    document.querySelector("#inputChildNodeSliderStep2").value = SelectedChild.slider[1].step;
    document.querySelector("#inputChildNodeSliderUnit2").value = SelectedChild.slider[1].unit;


    if (SelectedChild.slider[1].min != "" && SelectedChild.slider[1].max != "" && SelectedChild.slider[1].step != "") {
        let tempSelect = document.querySelector("#inputChildNodeSliderStartValue2");
        CreateStartValueOptions(tempSelect, SelectedChild.slider[1].min, SelectedChild.slider[1].max, SelectedChild.slider[1].step);
        tempSelect.disabled = false;
        tempSelect.value = SelectedChild.slider[1].start;
    } else {
        document.querySelector("#inputChildNodeSliderStartValue2").disabled = true;
    }

    document.querySelector("#inputChildNodeLEDText").value = SelectedChild.LED[0].info1;
    document.querySelector("#inputChildNodeLEDUnit").value = SelectedChild.LED[0].unit;
    document.querySelector("#inputChildNodeLEDMin").value = SelectedChild.LED[0].min;
    document.querySelector("#inputChildNodeLEDMax").value = SelectedChild.LED[0].max;
    document.querySelector("#inputChildNodeLEDStep").value = SelectedChild.LED[0].step;
    ReadPriceTableData("priceTable");
    ReadPriceTableData("discountTable");

}



function UpdateChildElement() {

    SetPriceTableData("priceTable");
    SetPriceTableData("discountTable");

    SelectedChild.type = document.querySelector("#inputChildNodeType").value;
    SelectedChild.name = document.querySelector("#inputChildNodeName").value;
    SelectedChild.price = document.querySelector("#inputChildNodePrice").value;
    SelectedChild.img = document.querySelector("#inputChildNodeImg").value;
    SelectedChild.extraPrice = document.querySelector("#inputChildNodePriceExtra").value;

    SelectedChild.hover = document.querySelector("#inputChildNodeHover").checked;
    SelectedChild.fixed = document.querySelector("#inputChildNodeFixed").checked;
    SelectedChild.single = document.querySelector("#inputChildNodeSingle").checked;
    SelectedChild.upgrade = document.querySelector("#inputChildNodeUpgrade").checked;
    SelectedChild.selected = document.querySelector("#inputChildNodeSelected").checked;
    SelectedChild.hasExtraPrice = document.querySelector("#inputChildNodePriceExtraCheck").checked;
    SelectedChild.toggleExtraPrice = document.querySelector("#inputChildNodeToggleExtraPrice").checked;
    SelectedChild.showPrice = document.querySelector("#inputChildNodeTogglePrice").checked;

    console.log(document.querySelector("#inputChildNodeSelected").checked)
    console.log(SelectedChild.selected)
    console.log(SelectedChild);



    // SelectedChild.hover = document.querySelector("#inputChildNodeFixed").hover;
    // SelectedChild.fixed = document.querySelector("#inputChildNodeFixed").value;
    // SelectedChild.single = document.querySelector("#inputChildNodeSingle").value;
    // SelectedChild.upgrade = document.querySelector("#inputChildNodeUpgrade").value;
    // SelectedChild.selected = document.querySelector("#inputChildNodeSelected").value;

    // SelectedChild.info = document.querySelector("#inputChildNodeInfo").value;
    SelectedChild.info = document.querySelector("#inputChildNodeInfo").checked;
    SelectedChild.infoHeadline = document.querySelector("#inputChildNodeInfoHeadline").value;
    SelectedChild.infoText = document.querySelector("#inputChildNodeInfoText").value;
    SelectedChild.infoImage = document.querySelector("#inputChildNodeInfoImage").value;

    SelectedChild.extra = document.querySelector("#inputChildNodeExtra").checked;
    // SelectedChild.extra = document.querySelector("#inputChildNodeExtra").value;
    SelectedChild.extraText1 = document.querySelector("#inputChildNodeExtra1").value;
    SelectedChild.extraText2 = document.querySelector("#inputChildNodeExtra2").value;
    SelectedChild.extraText3 = document.querySelector("#inputChildNodeExtra3").value;

    SelectedChild.background = document.querySelector("#inputChildNodeBackground").value;
    SelectedChild.function = document.querySelector("#inputChildNodeFunction").value;
    SelectedChild.functionParam = document.querySelector("#inputChildNodeFunctionParam").value;

    SelectedChild.slider[0].function = document.querySelector("#inputChildNodeSliderFunction1").value;
    SelectedChild.slider[0].text = document.querySelector("#inputChildNodeSliderText1").value;
    SelectedChild.slider[0].min = document.querySelector("#inputChildNodeSliderMin1").value;
    SelectedChild.slider[0].max = document.querySelector("#inputChildNodeSliderMax1").value;
    SelectedChild.slider[0].step = document.querySelector("#inputChildNodeSliderStep1").value;
    SelectedChild.slider[0].unit = document.querySelector("#inputChildNodeSliderUnit1").value;
    SelectedChild.slider[0].start = document.querySelector("#inputChildNodeSliderStartValue1").value;

    SelectedChild.slider[1].function = document.querySelector("#inputChildNodeSliderFunction2").value;
    SelectedChild.slider[1].text = document.querySelector("#inputChildNodeSliderText2").value;
    SelectedChild.slider[1].min = document.querySelector("#inputChildNodeSliderMin2").value;
    SelectedChild.slider[1].max = document.querySelector("#inputChildNodeSliderMax2").value;
    SelectedChild.slider[1].step = document.querySelector("#inputChildNodeSliderStep2").value;
    SelectedChild.slider[1].unit = document.querySelector("#inputChildNodeSliderUnit2").value;
    SelectedChild.slider[1].start = document.querySelector("#inputChildNodeSliderStartValue2").value;

    SelectedChild.LED[0].info1 = document.querySelector("#inputChildNodeLEDText").value;
    SelectedChild.LED[0].unit = document.querySelector("#inputChildNodeLEDUnit").value;
    SelectedChild.LED[0].min = document.querySelector("#inputChildNodeLEDMin").value;
    SelectedChild.LED[0].max = document.querySelector("#inputChildNodeLEDMax").value;
    SelectedChild.LED[0].step = document.querySelector("#inputChildNodeLEDStep").value;

    // let Height = [];
    // Height.push({ "123": 5000, "456": 10000 })
    SelectedChild.priceTable = PriceTableArray;
    SelectedChild.discountTable = DiscountTableArray;
    console.log(SelectedChild);
    //     let table = [];
    // let Height = [];
    // Height.push({"123" : 5000, "456" : 10000})
    // table.push({Height})

    // console.log(table);


    SelectedChild.element.innerText = SelectedChild.name;
}


function RemoveChildElement() {
    SelectedChild.element.remove();
    ElementMapper.delete(SelectedChild.id);
}


function GetOutput() {
    let Item = new MainElement();
    console.log(Item);


    SETTINGS_PriceTableCols.forEach((col) => {
        Item.settings.cols.push(col.value);
    });


    SETTINGS_PriceTableRows.forEach((row) => {
        Item.settings.rows.push(row.value);
    });

    MenuMapper.forEach((value, index) => {
        Item.menuItems.push(value);
    })
    ParentMapper.forEach((value2, key, map) => {
        let parent = (value2);
        value2.element.querySelectorAll(".child").forEach((value3, key) => {
            // parent.childs.push(ElementMapper.get(value3.getAttribute("id")))
            let x = ElementMapper.get(value3.getAttribute("id"));

        })
        Item.optionItems.push(value2);
        // console.log(JSON.stringify(parent));
    });
    navigator.clipboard.writeText(JSON.stringify(Item)).then(function() {
        alert('Copying to clipboard was successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
    // console.log(JSON.stringify(Item));
}



/*



*/


var jsonTestObj = readTextFile('./js/test.json');


function GenerateMenuFromJson() {
    if (jsonTestObj == "")
        return

    var obj = JSON.parse(jsonTestObj);

    obj.settings.rows.forEach(function(value, i) {
        let temp_id = "tablerow_" + SETTINGS_rowCount;
        let tempParent = document.querySelector(".PriceTableRowsElementContainer");

        CreateTableUIItem("row", temp_id, tempParent, value);
        SETTINGS_rowCount++;
    });

    obj.settings.cols.forEach(function(value, i) {
        let temp_id = "tablecol_" + SETTINGS_colCount;
        let tempParent = document.querySelector(".PriceTableColsElementContainer");

        CreateTableUIItem("col", temp_id, tempParent, value);
        SETTINGS_colCount++;
    });

    obj.menuItems.forEach(function(value, i) {
        {

            MenuMapper.set(value.id, value);
            CreateNewMenuElementFromObj(value)
        }
    })

    obj.optionItems.forEach(function(value, i) {
        ParentMapper.set(value.id, value);
        CreateNewParentElementFromObj(value);
        // console.log(value.childs);
        value.childs.forEach(function(value2, i) {
            let temp = value2;
            ElementMapper.set(temp.id, temp)
            CreateNewChildElementFromObj(temp, value);
        })
    })




    // console.log(obj.menuItems[0]);


}

function CreateNewMenuElementFromObj(obj) {
    const id = obj.id;
    let NewListItem = document.createElement("li");
    NewListItem.setAttribute("id", id);
    NewListItem.classList.add("child", "orderItem");
    NewListItem.setAttribute('draggable', true);
    NewListItem.addEventListener('dragstart', (e) => { dragStart(e) });
    NewListItem.addEventListener('drop', (e) => { dropped(e) })
    NewListItem.addEventListener('dragenter', (e) => { cancelDefault(e) })
    NewListItem.addEventListener('dragover', (e) => { cancelDefault(e) })
    NewListItem.innerText = obj.name;




    NewListItem.addEventListener('click', (e) => {
        console.log(e.target);
        document.querySelector(".ChildNodeEditor").style.display = "none";
        document.querySelector(".ParentNodeEditor").style.display = "none";
        document.querySelector(".SettingsEditor").style.display = "none";
        document.querySelector(".MenuEditor").style.display = "block";
        OpenMenuElementInEditor(MenuMapper.get(e.target.getAttribute("id")));
    })

    let NewMenuType = document.createElement("option");
    NewMenuType.setAttribute("value", obj.name);
    NewMenuType.innerText = obj.name;

    document.querySelector("#selectParentNodeMenuType").appendChild(NewMenuType);
    obj.element = NewListItem;
    // let ParentElem = ParentMapper.get(e.parentNode.getAttribute("id")).element.appendChild(NewListItem);
    NewMenuElementButton.before(NewListItem);
    return NewListItem;
}

function CreateNewParentElementFromObj(e) {
    const id = e.id;
    let elem = document.createElement("ul");
    elem.classList.add("moveable", "parent");
    elem.setAttribute("id", id);
    elem.addEventListener("click", (e) => {
        if (e.target.classList.contains("parent")) {
            $("#activeElementText").text($(this).children("span").text());
            document.querySelector(".ChildNodeEditor").style.display = "none";
            document.querySelector(".ParentNodeEditor").style.display = "block";
            document.querySelector(".MenuEditor").style.display = "none";
            document.querySelector(".SettingsEditor").style.display = "none";
            // console.log(ParentMapper.get(e.target.getAttribute("id")));
            console.log(elem.getAttribute("id"));
            let temp = ParentMapper.get(id);
            OpenParentElementInEditor(temp);
        }
    })


    let textElem = document.createElement("span");
    textElem.classList.add("textEle");
    textElem.innerText = e.name;


    let ButtonUpElement = document.createElement("div");
    ButtonUpElement.innerHTML = '<i class="fas fa-arrow-up"></i>';
    ButtonUpElement.classList.add("positionbutton", "up", "float-end", "ms-2");
    ButtonUpElement.addEventListener('click', (e) => {
        MoveParentUp(elem);
    })

    let ButtonDownElement = document.createElement("div");
    ButtonDownElement.innerHTML = '<i class="fas fa-arrow-down"></i>';
    ButtonDownElement.classList.add("positionbutton", "down", "float-end");
    ButtonDownElement.addEventListener('click', (e) => {
        MoveParentDown(elem);
    })

    let NewChildButton = document.createElement("li");
    NewChildButton.classList.add("addNewChild");
    NewChildButton.addEventListener("click", () => {
        AddChild(NewChildButton, ParentMapper.get(id));
        // CreateNewChildElement(NewChildButton);
    })
    NewChildButton.innerHTML = '<i class="fas fa-plus-circle"></i> Add New</li>';

    elem.appendChild(textElem);
    elem.appendChild(ButtonUpElement);
    elem.appendChild(ButtonDownElement);
    elem.appendChild(NewChildButton);

    e.element = elem;

    document.querySelector(".listWrapper").insertBefore(elem, NewParentElementButton);
}


function CreateNewChildElementFromObj(e, parent) {
    const id = e.id;
    // console.log(e.id);
    let NewListItem = document.createElement("li");
    NewListItem.classList.add("child");
    NewListItem.setAttribute('draggable', true);
    NewListItem.setAttribute('id', id);
    NewListItem.addEventListener('dragstart', (e) => { dragStart(e) });
    NewListItem.addEventListener('drop', (e) => { dropped(e) })
    NewListItem.addEventListener('dragenter', (e) => { cancelDefault(e) })
    NewListItem.addEventListener('dragover', (e) => { cancelDefault(e) })
    NewListItem.innerText = e.name;


    NewListItem.addEventListener('click', (e) => {
        document.querySelector(".ChildNodeEditor").style.display = "block";
        document.querySelector(".ParentNodeEditor").style.display = "none";
        document.querySelector(".MenuEditor").style.display = "none";
        document.querySelector(".SettingsEditor").style.display = "none";
        OpenChildElementInEditor(ElementMapper.get(id));
    })
    e.element = NewListItem;
    // parent.childs2.push(NewListItem);
    let ParentElem = parent.element.querySelector('.addNewChild').before(NewListItem);
}


function AddChild(e, p) {
    const id = p.name + "-" + p.childs.length;
    ElementMapper.set(id, new MenuElement({
        id: id,
        name: "test",
        type: "",
        price: "",
        img: "",
        hover: false,
        fixed: false,
        single: false,
        upgrade: false,
        info: false,
        selected: false,
        infoHeadline: "",
        infoText: "",
        infoImage: "",
        extra: false,
        extraText1: "",
        extraText2: "",
        extraText3: "",
        background: "",
        function: "",
        functionParam: "",
        element: "",
        priceTable: "",
        hasExtraPrice: false,
        extraPrice: "",
        toggleExtraPrice: false,
        showPrice: true,
    }));
    let x = ElementMapper.get(id);
    CreateNewChildElementFromObj(x, p);
    p.childs.push(ElementMapper.get(id));
    let theclick = new Event("click")
    ElementMapper.get(id).element.dispatchEvent(theclick);
}


function UpdateMenuSelect(oldName, newName) {

    ParentMapper.forEach(function(obj, i) {
        if (obj.menuType == oldName) {
            obj.menuType = newName;
        }

        let MenuSelectElement = document.querySelector("#selectParentNodeMenuType");
        MenuSelectElement.innerHTML = "";
        MenuMapper.forEach(function(obj, i) {
            let newValue = obj.name == oldName ? newName : obj.name;
            let NewMenuType = document.createElement("option");
            NewMenuType.setAttribute("value", newValue);
            NewMenuType.innerText = newValue;
            MenuSelectElement.appendChild(NewMenuType);
        })
    })
}

function UpdateParentName(oldName, newName, parent) {
    console.log(oldName);
    console.log(newName);

    if (oldName == newName) {
        return;
    }

    let ObjTemp = parent;
    console.log(ObjTemp);
    ParentMapper.delete(parent.id);
    ObjTemp.id = newName;
    ObjTemp.name = newName;
    let NextElem = ObjTemp.element.nextElementSibling;
    let PrevElem = ObjTemp.element.previousElementSibling;
    ObjTemp.element.remove();
    let childs = ObjTemp.childs;
    ObjTemp.childs = [];
    ParentMapper.set(ObjTemp.id, ObjTemp);
    CreateNewParentElementFromObj(ObjTemp);
    childs.forEach(function(obj, i) {
        ElementMapper.delete(obj.id)
        AddChild(obj, ObjTemp);
    })


    console.log(PrevElem);
    console.log(NextElem);
    let NewItem = ParentMapper.get(newName).element;
    console.log(NewItem);
    if (PrevElem != null && PrevElem.classList.contains("parent")) {
        $(NewItem).insertAfter(PrevElem);
    } else if (NextElem != null && NextElem.classList.contains("parent")) {
        $(NewItem).insertBefore(NextElem);
    }
}





function GetLayout(json, parent) {
    console.log(json);
    let price;
    let c = 0;
    for (var i = 0; i < json.length; i++) {

        var obj = json[i];
        let TableRow = document.createElement("div");
        TableRow.classList.add("row");

        for (var key in obj) {

            console.log(`col-${c}`)


            obj[key].forEach((item, index) => {
                console.log(`value ${index}`)
                for (var k in item) {
                    let tableCol = document.createElement("div");
                    tableCol.classList.add("col");

                    let tableColContent = document.createElement("input");
                    tableColContent.value = item[k].text;
                    tableCol.append(tableColContent);
                    console.log(item[k].text);
                    price = item[k].text;
                    TableRow.append(tableCol);
                }
            })
            c++;
        }
        parent.append(TableRow);
    }
}




// let inputContainer = document.createElement("div");
//         inputContainer.classList.add("form-floating");

//         let ColInput = document.createElement("input");
//         ColInput.classList.add("form-control", "mb-2", "editor_tableCol");
//         ColInput.setAttribute("type", "text");
//         ColInput.setAttribute("id", temp_id);
//         ColInput.addEventListener('change', () => {
//                 UpdatePriceTable();
//             })
//             // ColInput.setAttribute("placeholder", "text");

//         let ColLabel = document.createElement("label");
//         ColLabel.setAttribute("for", "id");
//         ColLabel.innerText = "Col-Name_" + SETTINGS_colCount;
//         inputContainer.append(ColInput, ColLabel)
//         tempParent.append(inputContainer);


UpdatePriceTable = (type) => {
    let rows;
    let cols;
    let tempItem;
    // rows = SETTINGS_PriceTableRows.size;
    // cols = SETTINGS_PriceTableCols.size;
    let container = "";
    if (type == "priceTable") {
        container = document.querySelector(".PriceTableEditor_table");
    }
    if (type == "discountTable") {
        container = document.querySelector(".DiscountTableEditor_table");
    }

    container.innerHTML = "";





    if (SETTINGS_PriceTableRows.size > 0 && SETTINGS_PriceTableCols.size > 0) {

        // console.log(SETTINGS_PriceTableRows)
        // console.log(SETTINGS_PriceTableCols)
        let tempRow = document.createElement("div");
        tempRow.classList.add("row", "g-2");
        container.appendChild(tempRow);

        tempRow.appendChild(createRowLabelItem(true));

        SETTINGS_PriceTableCols.forEach((col) => {
            tempRow.appendChild(createRowLabelItem(false, col.value));
        });

        tempRow.appendChild(createRowLabelItem(true));


        SETTINGS_PriceTableRows.forEach((row) => {
            let tempRow = document.createElement("div");
            tempRow.classList.add("row", "g-2");

            tempRow.setAttribute("ElementType", "Row");
            tempRow.setAttribute("ElementValue", row.value);

            container.appendChild(tempRow);

            tempRow.appendChild(createColLabelItem("end", row.value));

            SETTINGS_PriceTableCols.forEach((col) => {
                let inputContainer = document.createElement("div");
                inputContainer.classList.add("col");

                let ColInput = document.createElement("input");
                ColInput.classList.add("form-control", "mb-2", "text-center");
                ColInput.setAttribute("type", "text");
                ColInput.setAttribute("placeholder", "€")
                ColInput.setAttribute("ElementType", "Col");
                ColInput.setAttribute("ElementValue", col.value);

                inputContainer.append(ColInput)
                tempRow.append(inputContainer);
            })

            tempRow.appendChild(createColLabelItem("start", row.value));
        })

        tempRow_bot = document.createElement("div");
        tempRow_bot.classList.add("row");
        container.appendChild(tempRow_bot);
        tempRow_bot.appendChild(createRowLabelItem(true));

        SETTINGS_PriceTableCols.forEach((col) => {
            tempRow_bot.appendChild(createRowLabelItem(false, col.value));
        });

        tempRow_bot.appendChild(createRowLabelItem(true));


    }










};



function createRowLabelItem(_isFill, _value) {

    let inputContainer = document.createElement("div");

    if (_isFill) {
        inputContainer.classList.add("form-floating", "col-1");
        return inputContainer;
    } else {
        inputContainer.classList.add("form-floating", "col");
        let label = document.createElement("p");
        label.innerText = _value;
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.justifyContent = "center";
        inputContainer.appendChild(label);
        return inputContainer;
    }
}

function createColLabelItem(_textPos, value) {

    let inputContainer = document.createElement("div");
    inputContainer.classList.add("form-floating", "col-1");
    let label = document.createElement("p");
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.justifyContent = _textPos;
    label.classList.add("text-center");
    // label.innerText = row.value;
    label.innerText = value;
    inputContainer.appendChild(label);
    return inputContainer;
    // tempRow.appendChild(inputContainer);

}


function CreateTableUIItem(type, temp_id, parent, _text) {
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("form-floating");

    let RowInput = document.createElement("input");
    let RowLabel = document.createElement("label");
    if (type == "row") {
        RowInput.classList.add("form-control", "mb-2", "editor_tableRow");
        RowLabel.innerText = "Row-Name_" + SETTINGS_rowCount;
        // RowInput.setAttribute("ElementType", "Row");
        // RowInput.setAttribute("ElementValue", _text);

    }

    if (type == "col") {
        RowInput.classList.add("form-control", "mb-2", "editor_tableCol");
        RowLabel.innerText = "Col-Name_" + SETTINGS_colCount;
        // RowInput.setAttribute("id", "Col");
        // RowInput.setAttribute("ElementValue", _text);
    }
    // RowInput.classList.add("form-control", "mb-2", "editor_tableRow");
    RowInput.setAttribute("type", "text");
    RowInput.setAttribute("id", temp_id);
    _text == "" ? RowInput.value = "" : RowInput.value = _text;
    RowInput.addEventListener('change', () => {
            UpdatePriceTable("priceTable");
            UpdatePriceTable("discountTable");
        })
        // RowInput.setAttribute("placeholder", "text");


    // RowLabel.setAttribute("for", "id");

    inputContainer.append(RowInput, RowLabel)
    parent.appendChild(inputContainer);

    if (type == "row") {
        SETTINGS_PriceTableRows.set("tablerow_" + SETTINGS_rowCount, RowInput);
    }

    if (type == "col") {
        SETTINGS_PriceTableCols.set("tablecol_" + SETTINGS_colCount, RowInput);
    }


    return inputContainer;
}

var PriceTableArray = [{}];
var DiscountTableArray = [{}];
// PriceTableArray[0][2959][0][4020]

function SetPriceTableData(type) {
    let element = "";
    if (type == "priceTable") {
        PriceTableArray = [{}];
        element = document.querySelector(".PriceTableEditor_table");
    }

    if (type == "discountTable") {
        DiscountTableArray = [{}];
        element = document.querySelector(".DiscountTableEditor_table");
    }
    // PriceTableArray = [{}];
    let tempArray = [];
    let objRow = {};
    let objCol = {};


    let rows = element.querySelectorAll('div[ElementType="Row"]');
    rows.forEach((r, i) => {
        tempArray = [];
        objRow = {};
        objCol = {};
        let rowValue = r.getAttribute("ElementValue");

        r.querySelectorAll('input[elementType="Col"]').forEach((c, i) => {
            console.log(c.getAttribute("elementValue"));
            let value = c.getAttribute("elementValue");
            let price = c.value;
            objCol[value] = price

        })
        tempArray.push(objCol);
        if (type == "priceTable") {
            PriceTableArray[0][rowValue] = (tempArray);
        }
        if (type == "discountTable") {
            DiscountTableArray[0][rowValue] = (tempArray);
        }

    })

    // console.log(PriceTableArray);
}


function ReadPriceTableData(type) {
    let element = "";
    if (type == "priceTable") {
        element = document.querySelector(".PriceTableEditor_table");

    }
    if (type == "discountTable") {
        element = document.querySelector(".DiscountTableEditor_table");
    }
    let rows = element.querySelectorAll('div[ElementType="Row"]');
    rows.forEach((r, i) => {
        // tempArray = [];
        // objRow = {};
        // objCol = {};
        let rowValue = r.getAttribute("ElementValue");

        r.querySelectorAll('input[elementType="Col"]').forEach((c, i) => {
            try {
                let value = c.getAttribute("elementValue");
                if (type == "priceTable") {
                    c.value = SelectedChild.priceTable[0][rowValue][0][value];
                }
                if (type == "discountTable") {
                    c.value = SelectedChild.discountTable[0][rowValue][0][value];
                }

                console.log("TRY")
            } catch {
                c.value = "";
                console.log("CATCH")
            }
        })
    })
}




function CreateStartValueOptions(selectElem, min, max, step) {
    let itemCount = (max - min) / step;
    selectElem.innerHTML = "";
    for (let i = 0; i <= itemCount; i++) {
        let opt = document.createElement("option");
        opt.value = parseInt(min) + parseInt(step) * i;
        opt.innerText = parseInt(min) + parseInt(step) * i;
        selectElem.appendChild(opt);
    }
}


function countProperties(obj) {
    var prop;
    var propCount = 0;
    for (prop in obj) {
        propCount++;
    }
    return propCount;
}






showFunctionInfo = (modal, value) => {
    console.log(functionJson[value]);
    if (!functionJson[value]) {
        alert("No Function Selected")
        return;
    }
    modal.innerHTML = "";
    let container = document.createElement("div");
    let NameView = document.createElement("p");
    let ParamView = document.createElement("p");
    let DescriptionView = document.createElement("p");
    let CallView = document.createElement("p");

    NameView.innerText = `Name: \n${functionJson[value].name}`
    DescriptionView.innerText = `Description: \n${functionJson[value].text}`;
    ParamView.innerText = `Params: \n${functionJson[value].param}`;
    CallView.innerText = `Functioncall: \n${functionJson[value].functionCall}`;
    container.append(NameView, DescriptionView, ParamView, CallView);

    modal.appendChild(container);
}

showFunctionParameterInfo = (modal) => {
    modal.innerHTML = "";
    let container = document.createElement("div");


    container.innerText = "sad";
    modal.appendChild(container);
}





assignInfoClicks = () => {
    $("#elementTypeHelper").click(function() {
        openHelpText("type");
    })

    $("#ToggleExtraPoleHelper").click(function() {
        openHelpText("extraPole");
    })

    $("#ExtraPolePriceHelper").click(function() {
        openHelpText("polePrice");
    })

    $("#BoxInfoHelper").click(function() {
        openHelpText("info");
    })

    $("#ExtraHelper").click(function() {
        openHelpText("extra");
    })
}


openHelpText = (type) => {
    let elem = document.querySelector(".ModalInfo_container");
    let cont = elem.querySelector(".ModalInfo_table");
    cont.innerHTML = "";

    content = CreateModalContent(type);

    cont.appendChild(content);
    elem.style.display = "block";
}

function CreateModalContent(type) {
    switch (type) {
        case "type":
            return CreateTypeHelp();
        case "extraPole":
            return CreateExtraPoleHelp();
        case "polePrice":
            return CreatePolePriceHelp();
        case "info":
            return CreateInfoHelp();
        case "extra":
            return CreateExtraHelp();
        default:
            return CreateDefaultHelp();
    }
}


function CreateTypeHelp() {
    let container = document.createElement("div");
    container.classList.add("row")
    let InfoText = document.createElement("p");
    InfoText.innerText = "CreateTypeHelp";

    let typeBox01 = document.createElement("div");
    typeBox01.classList.add("col-6")
    let typeBox01_heading = document.createElement("h5");
    let typeBox01_image = document.createElement("img");
    let typeBox01_text = document.createElement("p");
    typeBox01_heading.innerText = "1col";
    typeBox01_image.setAttribute("src", "../img/help/type_1col.png");
    typeBox01_image.classList.add("modal_infoImage");
    typeBox01_text.innerText = "Einspaltiges Layout";
    typeBox01.append(typeBox01_heading, typeBox01_image, typeBox01_text);

    let typeBox02 = document.createElement("div");
    typeBox02.classList.add("col-6")
    let typeBox02_heading = document.createElement("h5");
    let typeBox02_image = document.createElement("img");
    let typeBox02_text = document.createElement("p");
    typeBox02_heading.innerText = "2col";
    typeBox02_image.setAttribute("src", "../img/help/type_2col.png");
    typeBox02_image.classList.add("modal_infoImage");
    typeBox02_text.innerText = "Zweispaltiges Layout";
    typeBox02.append(typeBox02_heading, typeBox02_image, typeBox02_text)

    let typeBox03 = document.createElement("div");
    typeBox03.classList.add("col-6")
    let typeBox03_heading = document.createElement("h5");
    let typeBox03_image = document.createElement("img");
    let typeBox03_text = document.createElement("p");
    typeBox03_heading.innerText = "3col";
    typeBox03_image.setAttribute("src", "../img/help/type_3col.png");
    typeBox03_image.classList.add("modal_infoImage");
    typeBox03_text.innerText = "Dreispaltiges Layout";
    typeBox03.append(typeBox03_heading, typeBox03_image, typeBox03_text)

    let typeBox04 = document.createElement("div");
    typeBox04.classList.add("col-6")
    let typeBox04_heading = document.createElement("h5");
    let typeBox04_image = document.createElement("img");
    let typeBox04_text = document.createElement("p");
    typeBox04_heading.innerText = "Slider-Block";
    typeBox04_image.setAttribute("src", "../img/help/type_slider.png");
    typeBox04_image.classList.add("modal_infoImage");
    typeBox04_text.innerText = "Slider Layout";
    typeBox04.append(typeBox04_heading, typeBox04_image, typeBox04_text)

    let typeBox05 = document.createElement("div");
    typeBox05.classList.add("col-6")
    let typeBox05_heading = document.createElement("h5");
    let typeBox05_image = document.createElement("img");
    let typeBox05_text = document.createElement("p");
    typeBox05_heading.innerText = "LED-Block";
    typeBox05_image.setAttribute("src", "../img/help/type_led.png");
    typeBox05_image.classList.add("modal_infoImage");
    typeBox05_text.innerText = "Led-Block Layout";
    typeBox05.append(typeBox05_heading, typeBox05_image, typeBox05_text);

    container.appendChild(InfoText);
    container.append(typeBox01, typeBox02, typeBox03, typeBox04, typeBox05);
    return container;

}

function CreateExtraPoleHelp() {
    let container = document.createElement("div");

    let InfoText = document.createElement("p");
    InfoText.innerText = "Fügt 2 Extra Pfosten hinzu. (Genutzt für die hinteren Pfosten der Dacherweiterung)";
    let InfoText2 = document.createElement("p");
    InfoText2.innerText = "Funktionen für diese Option: \n - ChangeRoofExtensionState";

    container.append(InfoText, InfoText2);
    return container;
}

function CreatePolePriceHelp() {
    let container = document.createElement("div");

    let InfoText = document.createElement("p");
    InfoText.innerText = "Setzt den zusätzlichen Preis Pro Pfosten Fest (Genutzt für das Punktfundament)";


    container.append(InfoText);


    container.appendChild(InfoText);
    return container;
}



function loadDoc(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this)

        }
    };
    xhttp.open("GET", "/img/conf/", true);
    xhttp.send();
}



let ImageFolderItems;
let ImageFolderItemsSelectedPath;
OpenImagePicker = () => {
    if (ImageFolderItems == null || ImageFolderItems == "") {
        loadDoc((xml) => {

            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(xml.responseText, 'text/html');
            console.log(htmlDoc)
            var preList = htmlDoc.querySelector("#wrapper").querySelectorAll("li")
            console.log(preList)


            ImageFolderItems = preList;


            BuildImagePicker();

        });
    }
    document.querySelector(".ModalImage_container").style.display = "block";

}


BuildImagePicker = () => {

    let mainContainer = document.querySelector(".ModalImage_table");
    let ContainerElem;
    let ImageContainerElem;
    let ImageElem;
    let NameElem;

    ContainerElem = document.createElement("div");
    ContainerElem.classList.add("row", "g-5");


    ImageContainerElem = document.createElement("div");
    ImageContainerElem.classList.add("col-4", "imgPicker_imageContainer");

    ImageContainerElem.addEventListener('click', (e) => {
        ImageFolderItemsSelectedPath = "";

        if (selectedImgPicker == "basic") {
            document.querySelector(".ModalImage_container").style.display = "none";
            document.querySelector("#inputChildNodeImg").value = ImageFolderItemsSelectedPath;
            document.querySelector("#imgPicker").setAttribute("src", ImageFolderItemsSelectedPath);
        }

        if (selectedImgPicker == "info") {
            document.querySelector(".ModalImage_container").style.display = "none";
            document.querySelector("#inputChildNodeInfoImage").value = ImageFolderItemsSelectedPath;
            document.querySelector("#imgPicker_info").setAttribute("src", ImageFolderItemsSelectedPath);
        }

        // console.log(imagePath + tempText);
    })

    ImageElem = document.createElement("img");
    // ImageElem.setAttribute("src", `./img/conf/${ImageFolderItems[i].querySelector("span").innerText}`);
    ImageElem.style.height = "135px"
    ImageElem.style.width = "240px";
    ImageElem.style.backgroundColor = "#ecedef";
    ImageElem.style.outline = "none";
    // ImageElem.style.border = "1px solid black";

    NameElem = document.createElement("p")
    NameElem.innerText = "None";

    ImageContainerElem.append(ImageElem, NameElem);
    ContainerElem.appendChild(ImageContainerElem);
    mainContainer.appendChild(ContainerElem);

    for (i = 1; i < ImageFolderItems.length; i++) {
        let tempText = ImageFolderItems[i].querySelector("span").innerText;

        ImageContainerElem = document.createElement("div");
        ImageContainerElem.classList.add("col-4", "imgPicker_imageContainer");

        ImageContainerElem.addEventListener('click', (e) => {
            ImageFolderItemsSelectedPath = imagePath + tempText;
            if (selectedImgPicker == "basic") {
                document.querySelector(".ModalImage_container").style.display = "none";
                document.querySelector("#inputChildNodeImg").value = imagePath + tempText;
                document.querySelector("#imgPicker").setAttribute("src", imagePath + tempText);
            }

            if (selectedImgPicker == "info") {
                document.querySelector(".ModalImage_container").style.display = "none";
                document.querySelector("#inputChildNodeInfoImage").value = imagePath + tempText;
                document.querySelector("#imgPicker_info").setAttribute("src", imagePath + tempText);
            }

        })

        ImageElem = document.createElement("img");
        ImageElem.setAttribute("src", `./img/conf/${ImageFolderItems[i].querySelector("span").innerText}`);
        ImageElem.style.height = "135px"
        ImageElem.style.width = "240px";

        NameElem = document.createElement("p")
        NameElem.innerText = ImageFolderItems[i].querySelector("span").innerText;

        ImageContainerElem.append(ImageElem, NameElem);
        ContainerElem.appendChild(ImageContainerElem);
        mainContainer.appendChild(ContainerElem);

        console.log(ImageFolderItems[i].querySelector("span").innerText);

    }

}