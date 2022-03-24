export class MainElement {
    menuItems = [];
    optionItems = [

    ];

    constructor(props) {

    }
}


export class MenuElement {

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
    toggleExtraPrice;
    showPrice;

    priceElement;
    extraPrice;

    priceTable = [];
    discountTable = [];

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
        this.priceTable = props.priceTable;
        this.extraPrice = props.extraPrice;
        this.toggleExtraPrice = props.toggleExtraPrice;
        this.showPrice = props.showPrice;
        this.discountTable = props.discountTable;
    }
}



export class ParentElement {

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


export class MainMenuElement {

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



export class configuration {

    activeStates = new Map();

    constructor(props) {

    }

    addActiveState(state) {


    }
}