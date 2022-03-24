class MainElement {
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


    priceTable = [{
        "1000": [{
                "2000": { "text": 100000 }
            },
            {
                "y3000": { "text": 100000 }
            }
        ]
    }, {
        "2000": [{
                "y000": { "text": 20000 }
            },
            {
                "y3000": { "text": 20000 }
            }
        ]
    }];


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
            unit: ""
        },
        {
            function: "",
            text: "",
            min: "",
            max: "",
            step: "",
            unit: ""
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


let SETTINGS_rowCount = 0;
let SETTINGS_colCount = 0;

let SETTINGS_PriceTableRows = new Map();;
let SETTINGS_PriceTableCols = new Map();;

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


    render(5, 5, document.querySelector(".modalTableContainer"));
    UpdatePriceTable();
    let items = document.querySelectorAll('.orderItem');

    items.forEach(item => {
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
    })






    $("#PriceTableRows").click(function(e) {
        if (SETTINGS_rowCount >= 12) return;
        let temp_id = "tablerow_" + SETTINGS_rowCount;
        let tempParent = document.querySelector(".PriceTableRowsElementContainer");
        SETTINGS_rowCount++;
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("form-floating");

        let RowInput = document.createElement("input");
        RowInput.classList.add("form-control", "mb-2", "editor_tableRow");
        RowInput.setAttribute("type", "text");
        RowInput.setAttribute("id", temp_id);
        RowInput.addEventListener('change', () => {
                UpdatePriceTable();
            })
            // RowInput.setAttribute("placeholder", "text");

        let RowLabel = document.createElement("label");
        RowLabel.setAttribute("for", "id");
        RowLabel.innerText = "Row-Name_" + SETTINGS_rowCount;
        inputContainer.append(RowInput, RowLabel)
        tempParent.append(inputContainer);
        SETTINGS_PriceTableRows.set("tablerow_" + SETTINGS_rowCount, RowInput);
        // console.log(SETTINGS_PriceTableRows);
        UpdatePriceTable();

    })

    $("#PriceTableCols").click(function(e) {
        if (SETTINGS_colCount >= 12) return;
        let temp_id = "tablecol_" + SETTINGS_colCount;
        let tempParent = document.querySelector(".PriceTableColsElementContainer");

        SETTINGS_colCount++;
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("form-floating");

        let ColInput = document.createElement("input");
        ColInput.classList.add("form-control", "mb-2", "editor_tableCol");
        ColInput.setAttribute("type", "text");
        ColInput.setAttribute("id", temp_id);
        ColInput.addEventListener('change', () => {
                UpdatePriceTable();
            })
            // ColInput.setAttribute("placeholder", "text");

        let ColLabel = document.createElement("label");
        ColLabel.setAttribute("for", "id");
        ColLabel.innerText = "Col-Name_" + SETTINGS_colCount;
        inputContainer.append(ColInput, ColLabel)
        tempParent.append(inputContainer);
        SETTINGS_PriceTableCols.set("tablecol_" + SETTINGS_colCount, ColInput);
        // console.log(SETTINGS_PriceTableCols);
        UpdatePriceTable();
        //add


    })

    $("#PriceTableRowsRemove").click(function(e) {
        let tempParent = document.querySelector(".PriceTableRowsElementContainer");
        SETTINGS_PriceTableRows.delete(tempParent.lastChild.childNodes[0].getAttribute("id"));
        tempParent.lastChild.remove();
        SETTINGS_rowCount--;
    })

    $("#PriceTableColsRemove").click(function(e) {
        let tempParent = document.querySelector(".PriceTableColsElementContainer");
        SETTINGS_PriceTableCols.delete(tempParent.lastChild.childNodes[0].getAttribute("id"));
        tempParent.lastChild.remove();
        SETTINGS_colCount--;
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

        ToggleSliderOptions($(this).val());
        ToggleLEDOptions($(this).val());
        ToggleExtraOption($(this).val());
    })

    ToggleSliderOptions = (val) => {
        val == "x-slider" ? $("#SliderOptions").css("display", "flex") : $("#SliderOptions").css("display", "none");
    }

    ToggleLEDOptions = (val) => {
        val == "x-LED" ? $("#LEDOption").css("display", "flex") : $("#LEDOption").css("display", "none");
    }

    ToggleExtraOption = (val) => {
        val == "1col" ? $("#ExtraOption").css("display", "flex") : $("#ExtraOption").css("display", "none");
    }

    ToggleInfoOptions = (val) => {
        val ? $("#InfoOption").css("display", "flex") : $("#InfoOption").css("display", "none");
    }

    $("#inputChildNodeInfo").on("change", function(e) {
        ToggleInfoOptions(this.checked);
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

})


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


// function CreateNewMenuElement(e) {
//     const id = "MenuElement-" + MenuMapper.size;
//     let NewListItem = document.createElement("li");
//     NewListItem.setAttribute("id", id);
//     NewListItem.classList.add("child", "orderItem");
//     NewListItem.setAttribute('draggable', true);
//     NewListItem.addEventListener('dragstart', (e) => { dragStart(e) });
//     NewListItem.addEventListener('drop', (e) => { dropped(e) })
//     NewListItem.addEventListener('dragenter', (e) => { cancelDefault(e) })
//     NewListItem.addEventListener('dragover', (e) => { cancelDefault(e) })
//     NewListItem.innerText = "New Node element";


//     MenuMapper.set(id, new MainMenuElement({
//         id: id,
//         name: "",
//         icon: "",
//         element: NewListItem
//     }));

//     NewListItem.addEventListener('click', (e) => {
//         console.log(e.target);
//         document.querySelector(".ChildNodeEditor").style.display = "none";
//         document.querySelector(".ParentNodeEditor").style.display = "none";
//         document.querySelector(".MenuEditor").style.display = "block";
//         OpenMenuElementInEditor(MenuMapper.get(e.target.getAttribute("id")));
//     })


//     // let ParentElem = ParentMapper.get(e.parentNode.getAttribute("id")).element.appendChild(NewListItem);
//     e.before(NewListItem);
//     return NewListItem;
// }




// function CreateNewChildElement(e) {
//     let xad = e.parentNode.getAttribute("id");
//     xad = ParentMapper.get(xad);
//     console.log(xad);
//     const id = e.parentNode.getAttribute("id") + "-" + xad.childs2.length;
//     let NewListItem = document.createElement("li");
//     NewListItem.classList.add("child");
//     NewListItem.setAttribute('draggable', true);
//     NewListItem.setAttribute('id', id);
//     NewListItem.addEventListener('dragstart', (e) => { dragStart(e) });
//     NewListItem.addEventListener('drop', (e) => { dropped(e) })
//     NewListItem.addEventListener('dragenter', (e) => { cancelDefault(e) })
//     NewListItem.addEventListener('dragover', (e) => { cancelDefault(e) })
//     NewListItem.innerText = "New Node element";



//     // e.c
//     ElementMapper.set(id, new MenuElement({
//         id: id,
//         name: "",
//         type: "",
//         price: "",
//         img: "",
//         hover: false,
//         fixed: false,
//         single: false,
//         upgrade: false,
//         info: false,
//         selected: false,
//         infoHeadline: "",
//         infoText: "",
//         infoImage: "",
//         extra: false,
//         extraText1: "",
//         extraText2: "",
//         extraText3: "",
//         background: "",
//         function: "",
//         functionParam: "",
//         element: NewListItem
//     }));

//     NewListItem.addEventListener('click', (e) => {
//         document.querySelector(".ChildNodeEditor").style.display = "block";
//         document.querySelector(".ParentNodeEditor").style.display = "none";
//         document.querySelector(".MenuEditor").style.display = "none";
//         OpenChildElementInEditor(ElementMapper.get(id));
//     })

//     let ParentElem = ParentMapper.get(e.parentNode.getAttribute("id")).element.appendChild(NewListItem);
//     ParentMapper.get(e.parentNode.getAttribute("id")).childs2.push(NewListItem);
//     // ParentMapper.get(e.parentNode.getAttribute("id")).childs.push(NewListItem);
//     ParentElem.after(e);
//     return NewListItem;
// }


// function CreateNewParentElement(e) {
//     const id = "ParentElement-" + ParentMapper.size;
//     let elem = document.createElement("ul");
//     elem.classList.add("moveable", "parent");
//     elem.setAttribute("id", id);
//     elem.addEventListener("click", (e) => {
//         if (e.target.classList.contains("parent")) {
//             $("#activeElementText").text($(this).children("span").text());
//             document.querySelector(".ChildNodeEditor").style.display = "none";
//             document.querySelector(".ParentNodeEditor").style.display = "block";
//             document.querySelector(".MenuEditor").style.display = "none";
//             console.log(ParentMapper.get(e.target.getAttribute("id")));
//             let temp = ParentMapper.get(e.target.getAttribute("id"));
//             OpenParentElementInEditor(temp);
//         }
//     })


//     let textElem = document.createElement("span");
//     textElem.classList.add("textEle");
//     textElem.innerText = "text";


//     let ButtonUpElement = document.createElement("div");
//     ButtonUpElement.innerHTML = '<i class="fas fa-arrow-up"></i>';
//     ButtonUpElement.classList.add("positionbutton", "up", "float-end", "ms-2");


//     let ButtonDownElement = document.createElement("div");
//     ButtonDownElement.innerHTML = '<i class="fas fa-arrow-down"></i>';
//     ButtonDownElement.classList.add("positionbutton", "down", "float-end");

//     let NewChildButton = document.createElement("li");
//     NewChildButton.classList.add("addNewChild");
//     NewChildButton.addEventListener("click", () => {
//         CreateNewChildElement(NewChildButton);
//     })
//     NewChildButton.innerHTML = '<i class="fas fa-plus-circle"></i> Add New</li>';

//     elem.appendChild(textElem);
//     elem.appendChild(ButtonUpElement);
//     elem.appendChild(ButtonDownElement);
//     elem.appendChild(NewChildButton);

//     document.querySelector(".listWrapper").insertBefore(elem, e);
//     let tempObj = new ParentElement({
//         id: id,
//         name: "",
//         type: "",
//         subline: "",
//         menuType: "",
//         element: elem
//     });
//     ParentMapper.set(id, tempObj);
//     // return NewChildButton;
// }


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
    ToggleSliderOptions(SelectedChild.type);

    document.querySelector("#inputChildNodeName").value = SelectedChild.name;
    document.querySelector("#inputChildNodePrice").value = SelectedChild.price;
    document.querySelector("#inputChildNodeImg").value = SelectedChild.img;

    SelectedChild.hover ? document.querySelector("#inputChildNodeHover").checked = true : document.querySelector("#inputChildNodeHover").checked = false;
    SelectedChild.fixed ? document.querySelector("#inputChildNodeFixed").checked = true : document.querySelector("#inputChildNodeFixed").checked = false;
    SelectedChild.single ? document.querySelector("#inputChildNodeSingle").checked = true : document.querySelector("#inputChildNodeSingle").checked = false;
    SelectedChild.upgrade ? document.querySelector("#inputChildNodeUpgrade").checked = true : document.querySelector("#inputChildNodeUpgrade").checked = false;
    SelectedChild.selected ? document.querySelector("#inputChildNodeSelected").checked = true : document.querySelector("#inputChildNodeSelected").checked = false;
    // document.querySelector("#inputChildNodeHover").value = SelectedChild.hover;
    // document.querySelector("#inputChildNodeFixed").value = SelectedChild.fixed;
    // document.querySelector("#inputChildNodeSingle").value = SelectedChild.single;
    // document.querySelector("#inputChildNodeUpgrade").value = SelectedChild.upgrade;
    // document.querySelector("#inputChildNodeSelected").value = SelectedChild.selected;

    SelectedChild.info ? document.querySelector("#inputChildNodeInfo").checked = true : document.querySelector("#inputChildNodeInfo").checked = false;
    ToggleInfoOptions(SelectedChild.info);
    // document.querySelector("#inputChildNodeInfo").value = SelectedChild.info;
    document.querySelector("#inputChildNodeInfoHeadline").value = SelectedChild.infoHeadline;
    document.querySelector("#inputChildNodeInfoText").value = SelectedChild.infoText;
    document.querySelector("#inputChildNodeInfoImage").value = SelectedChild.infoImage;

    SelectedChild.extra ? document.querySelector("#inputChildNodeExtra").checked = true : document.querySelector("#inputChildNodeExtra").checked = false;
    // document.querySelector("#inputChildNodeExtra").value = SelectedChild.extra;
    document.querySelector("#inputChildNodeExtra1").value = SelectedChild.extraText1;
    document.querySelector("#inputChildNodeExtra2").value = SelectedChild.extraText2;
    document.querySelector("#inputChildNodeExtra3").value = SelectedChild.extraText3;

    document.querySelector("#inputChildNodeBackground").value = SelectedChild.background;
    document.querySelector("#inputChildNodeFunction").value = SelectedChild.function;
    document.querySelector("#inputChildNodeFunctionParam").value = SelectedChild.functionParam;

    document.querySelector("#inputChildNodeSliderFunction1").value = SelectedChild.slider[0].function;
    document.querySelector("#inputChildNodeSliderText1").value = SelectedChild.slider[0].text
    document.querySelector("#inputChildNodeSliderMin1").value = SelectedChild.slider[0].min;
    document.querySelector("#inputChildNodeSliderMax1").value = SelectedChild.slider[0].max;
    document.querySelector("#inputChildNodeSliderStep1").value = SelectedChild.slider[0].step;
    document.querySelector("#inputChildNodeSliderUnit1").value = SelectedChild.slider[0].unit;

    document.querySelector("#inputChildNodeSliderFunction2").value = SelectedChild.slider[1].function;
    document.querySelector("#inputChildNodeSliderText2").value = SelectedChild.slider[1].text;
    document.querySelector("#inputChildNodeSliderMin2").value = SelectedChild.slider[1].min;
    document.querySelector("#inputChildNodeSliderMax2").value = SelectedChild.slider[1].max;
    document.querySelector("#inputChildNodeSliderStep2").value = SelectedChild.slider[1].step;
    document.querySelector("#inputChildNodeSliderUnit2").value = SelectedChild.slider[1].unit;

    document.querySelector("#inputChildNodeLEDText").value = SelectedChild.LED[0].info1;
    document.querySelector("#inputChildNodeLEDUnit").value = SelectedChild.LED[0].unit;
    document.querySelector("#inputChildNodeLEDMin").value = SelectedChild.LED[0].min;
    document.querySelector("#inputChildNodeLEDMax").value = SelectedChild.LED[0].max;
    document.querySelector("#inputChildNodeLEDStep").value = SelectedChild.LED[0].step;



}



function UpdateChildElement() {

    SelectedChild.type = document.querySelector("#inputChildNodeType").value;
    SelectedChild.name = document.querySelector("#inputChildNodeName").value;
    SelectedChild.price = document.querySelector("#inputChildNodePrice").value;
    SelectedChild.img = document.querySelector("#inputChildNodeImg").value;

    SelectedChild.hover = document.querySelector("#inputChildNodeHover").checked;
    SelectedChild.fixed = document.querySelector("#inputChildNodeFixed").checked;
    SelectedChild.single = document.querySelector("#inputChildNodeSingle").checked;
    SelectedChild.upgrade = document.querySelector("#inputChildNodeUpgrade").checked;
    SelectedChild.selected = document.querySelector("#inputChildNodeSelected").checked;
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

    SelectedChild.slider[1].function = document.querySelector("#inputChildNodeSliderFunction2").value;
    SelectedChild.slider[1].text = document.querySelector("#inputChildNodeSliderText2").value;
    SelectedChild.slider[1].min = document.querySelector("#inputChildNodeSliderMin2").value;
    SelectedChild.slider[1].max = document.querySelector("#inputChildNodeSliderMax2").value;
    SelectedChild.slider[1].step = document.querySelector("#inputChildNodeSliderStep2").value;
    SelectedChild.slider[1].unit = document.querySelector("#inputChildNodeSliderUnit2").value;

    SelectedChild.LED[0].info1 = document.querySelector("#inputChildNodeLEDText").value;
    SelectedChild.LED[0].unit = document.querySelector("#inputChildNodeLEDUnit").value;
    SelectedChild.LED[0].min = document.querySelector("#inputChildNodeLEDMin").value;
    SelectedChild.LED[0].max = document.querySelector("#inputChildNodeLEDMax").value;
    SelectedChild.LED[0].step = document.querySelector("#inputChildNodeLEDStep").value;

    SelectedChild.element.innerText = SelectedChild.name;
}


function RemoveChildElement() {
    SelectedChild.element.remove();
    ElementMapper.delete(SelectedChild.id);
}


function GetOutput() {
    let Item = new MainElement();



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

    console.log(JSON.stringify(Item));
}



/*



*/


var jsonTestObj = readTextFile('./js/test.json');


function GenerateMenuFromJson() {
    if (jsonTestObj == "")
        return



    var obj = JSON.parse(jsonTestObj);

    obj.menuItems.forEach(function(value, i) {
        {

            MenuMapper.set(value.id, value);
            CreateNewMenuElementFromObj(value)
        }
    })

    obj.optionItems.forEach(function(value, i) {
        // console.log(value);
        ParentMapper.set(value.id, value);
        CreateNewParentElementFromObj(value);
        console.log(value.childs);
        value.childs.forEach(function(value2, i) {
            ElementMapper.set(value2.id, value2)
            CreateNewChildElementFromObj(value2, value);
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




function render(rows, cols, element) {

    let item = new MenuElement({});
    GetLayout(item.priceTable, element)
    return;

    // let item = new MenuElement({});


    item.priceTable.forEach(item => {
        console.log(item[0]);
    })


    if (countProperties(item.priceTable) > 0) {
        for (let i = 0; i < countProperties(item.priceTable); i++) {
            console.log(i);
            let TableRow = document.createElement("div");
            TableRow.classList.add("row");

            for (let y = 0; y < item.priceTable[i].length; y++) {
                let tableCol = document.createElement("div");
                tableCol.classList.add("col");
                if (i == 0 && y == 0) {} else {
                    let tableColContent = document.createElement("input");
                    if (i == 0) {
                        tableColContent.classList.add("mb-3")
                    }
                    tableCol.append(tableColContent);

                }
                TableRow.append(tableCol);
            }

            element.append(TableRow);
        }
    } else {
        for (let i = 0; i < rows; i++) {
            let TableRow = document.createElement("div");
            TableRow.classList.add("row");

            for (let y = 0; y < cols; y++) {
                let tableCol = document.createElement("div");
                tableCol.classList.add("col");
                if (i == 0 && y == 0) {} else {
                    let tableColContent = document.createElement("input");
                    if (i == 0) {
                        tableColContent.classList.add("mb-3")
                    }
                    tableCol.append(tableColContent);

                }
                TableRow.append(tableCol);
            }

            element.append(TableRow);
        }
    }


    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary", "mt-3");
    button.innerText = "Save";
    element.append(button);
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


UpdatePriceTable = () => {
    let rows;
    let cols;
    // rows = SETTINGS_PriceTableRows.size;
    // cols = SETTINGS_PriceTableCols.size;
    let container = document.querySelector(".PriceTableEditor_table");
    container.innerHTML = "";




    if (SETTINGS_PriceTableRows.size > 0 && SETTINGS_PriceTableCols.size > 0) {


        let tempRow = document.createElement("div");
        tempRow.classList.add("row");
        container.appendChild(tempRow);
        SETTINGS_PriceTableCols.forEach((col) => {
            console.log(col.value);
            let inputContainer = document.createElement("div");
            inputContainer.classList.add("form-floating", "col");
            let label = document.createElement("p");
            label.innerText = col.value;
            inputContainer.appendChild(label);
            tempRow.appendChild(inputContainer);
        });


        SETTINGS_PriceTableRows.forEach((row) => {
            let tempRow = document.createElement("div");
            tempRow.classList.add("row");

            container.appendChild(tempRow);
            SETTINGS_PriceTableCols.forEach((col) => {
                let inputContainer = document.createElement("div");
                inputContainer.classList.add("form-floating", "col");

                let ColInput = document.createElement("input");
                ColInput.classList.add("form-control", "mb-2");
                ColInput.setAttribute("type", "text");

                let ColLabel = document.createElement("label");
                // ColLabel.classList.add("");
                ColLabel.setAttribute("for", "id");
                ColLabel.innerText = "Value";

                inputContainer.append(ColInput, ColLabel)
                tempRow.append(inputContainer);
            })
        })

    }










};



function countProperties(obj) {
    var prop;
    var propCount = 0;
    for (prop in obj) {
        propCount++;
    }
    return propCount;
}