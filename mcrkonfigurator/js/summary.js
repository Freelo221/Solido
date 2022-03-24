$(document).ready(function() {


    for (let index = 0; index < 10; index++) {

        let x = new SummaryElement({
            description: "WDVS Wandanschluss",
            anzahl: index,
            itemPrice: "8.700,00",
            curFinalPrice: "8.700,00",
            infoText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, et odio sunt doloribus iure provident vitae quammolestias nobis dicta libero corporis consequuntur aut cumeaque suscipit repudiandae ullam eveniet."
        });
        document.querySelector(".SummaryContainer").appendChild(x.CreateElement())
    }

    // let x = new SummaryElement({
    //     description: "WDVS Wandanschluss",
    //     anzahl: "10",
    //     itemPrice: "8.700,00",
    //     curFinalPrice: "8.700,00",
    //     infoText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, et odio sunt doloribus iure provident vitae quammolestias nobis dicta libero corporis consequuntur aut cumeaque suscipit repudiandae ullam eveniet."
    // });


});


class SummaryElement {

    description;
    anzahl;
    itemPrice;
    curFinalPrice;
    infoText;


    constructor(props) {
        this.description = props.description
        this.anzahl = props.anzahl
        this.itemPrice = props.itemPrice
        this.curFinalPrice = props.curFinalPrice
        this.infoText = props.infoText
    }


    CreateElement = () => {

        let Container = ElementCreator({ type: "div", classes: ["col12"] })
        let RowItem = ElementCreator({ type: "div", classes: ["row", "listContainer"] })

        let DescriptionItem = ElementCreator({ type: "div", classes: ["col-7"], innerText: this.description })
        let CountItem = ElementCreator({ type: "div", classes: ["col-1", "text-end"], innerText: this.anzahl })
        let PriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end"], innerText: this.itemPrice })
        let FinalPriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end"], innerText: this.curFinalPrice })

        let DescriptionRowItem = ElementCreator({ type: "div", classes: ["row", "listContainer_descrition"] })
        let DescriptionTextItem = ElementCreator({ type: "div", classes: ["col-7", "mt-2", "mb-5"], innerText: this.infoText })



        RowItem.append(DescriptionItem, CountItem, PriceItem, FinalPriceItem)
        DescriptionRowItem.append(DescriptionTextItem);
        Container.append(RowItem, DescriptionRowItem)


        return Container
    }

}


const ElementCreator = (props) => {
    let TempElem = document.createElement(props.type)
    if (props.id) { TempElem.setAttribute("id", props.id) }
    if (props.classes.length > 0) {
        props.classes.forEach((_class) => {
            TempElem.classList.add(_class)
        })
    }
    if (props.innerText) {
        TempElem.innerText = props.innerText;
    }

    return TempElem;
}