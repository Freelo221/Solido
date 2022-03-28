import { curWidth, curDepth, GetConstPrice } from "./dynamic.js"
import { sparrenklaueSelected } from "./main.js"

export const CreateSummary = (_itemMap, _selectedItems) => {
    // console.log(_itemMap)

    console.log(_selectedItems)

    document.querySelector(".SummaryContainer").innerHTML = ""

    if (sparrenklaueSelected) {
        document.querySelector("#previewImage_tz").setAttribute("src", "./img/tech_zeichnung_summary_sparren.jpg")
    } else {
        document.querySelector("#previewImage_tz").setAttribute("src", "./img/tech_zeichnung_summary_glatt.jpg")
    }




    let description
    let anzahl
    let itemPrice
    let discount
    let curFinalPrice = 0
    let infoText
    let finalPrice = 0



    //Create Tablelike Header
    let Container = ElementCreator({ type: "div", classes: ["col12"] })
    let RowItem = ElementCreator({ type: "div", classes: ["row", "listContainer", "listContainerHeading"] })
    let DescriptionItem = ElementCreator({ type: "div", classes: ["col-6", "p-0", "m-0"], innerText: "Beschreibung" })
    let CountItem = ElementCreator({ type: "div", classes: ["col-1", "text-end", "p-0", "m-0"], innerText: "Anzahl" })
    let PriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end", "p-0", "m-0"], innerText: "Preis" })
    let FinalPriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end", "p-0", "m-0"], innerText: "Betrag" })
    let emptyElement = ElementCreator({ type: "div", classes: ["col-1", "text-end", "p-0", "m-0"] })
    RowItem.append(DescriptionItem, CountItem, PriceItem, FinalPriceItem, emptyElement)
    Container.append(RowItem)
    document.querySelector(".SummaryContainer").appendChild(Container)
        //Create Tablelike Header end


    console.log(GetConstPrice(curWidth, curDepth)) // dachbreite + tiefe Grundpreis
    let constPrice = GetConstPrice(curWidth, curDepth);
    let x = new SummaryElement({
        description: "Terassendach - " + curWidth + "mm x " + curDepth + "mm",
        anzahl: 1,
        itemPrice: constPrice + ",00€",
        curFinalPrice: constPrice + ",00€",
        infoText: ""
    });
    finalPrice = parseFloat(curFinalPrice) + parseFloat(constPrice)
    let tempElem = x.CreateElement()
    document.querySelector(".SummaryContainer").appendChild(tempElem)

    _selectedItems.forEach((e) => {
        let SelectedItem = _itemMap.get(e)
            // console.log(SelectedItem)
        if (e == "Fertigstellung-4") {
            //selbstaufbau
            document.querySelector(".befestignungsNotice").style.display = "block"
        }
        if (e == "Fertigstellung-5") {
            //montage
            document.querySelector(".befestignungsNotice").style.display = "none"
        }
        description = SelectedItem.name

        if (SelectedItem.currentPrice) {
            itemPrice = SelectedItem.currentPrice / SelectedItem.currentCount
        } else {
            itemPrice = 0
        }

        if (SelectedItem.currentCount) {
            anzahl = SelectedItem.currentCount
        } else {
            anzahl = 1
        }

        if (curFinalPrice >= 0)
            curFinalPrice = parseFloat(anzahl) * parseFloat(itemPrice)
        else {
            curFinalPrice = 0
        }

        infoText = SelectedItem.infoText

        let x = new SummaryElement({
            description: description,
            anzahl: anzahl,
            itemPrice: itemPrice + ",00€",
            curFinalPrice: curFinalPrice + ",00€",
            infoText: infoText
        });
        let tempElem = x.CreateElement()
        finalPrice = parseFloat(finalPrice) + parseFloat(curFinalPrice)
        document.querySelector(".SummaryContainer").appendChild(tempElem)

    })


    // Create last Element

    let endElement = ElementCreator({ type: "p", classes: ["finalSum", "p-0", "m-0"], innerText: "Gesamtsumme: " + finalPrice + ",00€" })
    endElement.style.borderTop = "1px solid black"
    document.querySelector(".SummaryContainer").appendChild(endElement)


}




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

        let DescriptionItem = ElementCreator({ type: "div", classes: ["col-6", "p-0", "m-0"], innerText: this.description })
        let CountItem = ElementCreator({ type: "div", classes: ["col-1", "text-end", "p-0", "m-0"], innerText: this.anzahl })
        let PriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end", "p-0", "m-0"], innerText: this.itemPrice })
        let FinalPriceItem = ElementCreator({ type: "div", classes: ["col-2", "text-end", "p-0", "m-0"], innerText: this.curFinalPrice })

        let ArrowElement = ElementCreator({ type: "div", classes: ["col-1", "text-end", "p-0", "m-0", "summaryArrow"], innerText: "" })
        let ArrowElementImage = ElementCreator({ type: "p", classes: ["summaryArrowImage"], innerText: "" })

        if (this.infoText != "") {
            let DescriptionRowItem = ElementCreator({ type: "div", classes: ["row", "listContainer_descrition"] })
            let DescriptionTextItem = ElementCreator({ type: "div", classes: ["col-12", "infoTextItem", "pb-5", "mt-5"], innerText: this.infoText })

            RowItem.addEventListener("click", (e) => {
                if (ArrowElement.classList.contains("active")) {
                    ArrowElement.classList.remove("active")
                    DescriptionTextItem.classList.remove("active")
                    $(DescriptionRowItem).slideUp("fast", function() {
                        // Animation complete.
                        console.log("first")
                    });
                } else {
                    $(DescriptionRowItem).slideDown("fast", function() {
                        // Animation complete.
                    });
                    ArrowElement.classList.add("active")
                    DescriptionTextItem.classList.add("active")

                }



            })

            ArrowElement.append(ArrowElementImage)
            DescriptionRowItem.append(DescriptionTextItem);
            RowItem.append(DescriptionItem, CountItem, PriceItem, FinalPriceItem, ArrowElement)
            Container.append(RowItem, DescriptionRowItem)
        } else {
            RowItem.append(DescriptionItem, CountItem, PriceItem, FinalPriceItem)
            Container.append(RowItem)
        }


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
    if (props.innerText != undefined) {
        TempElem.innerHTML = htmlDecode(props.innerText);
    }

    return TempElem;
}


function htmlDecode(value) {
    return $("<div/>").html(value).text();
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}