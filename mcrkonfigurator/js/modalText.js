 function CreateModalContent(props) {
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

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreateTypeHelp";


     container.appendChild(InfoText);
     return container;

 }

 function CreateExtraPoleHelp() {
     let container = document.createElement("div");

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreateExtraPoleHelp";


     container.appendChild(InfoText);
     return container;
 }

 function CreatePolePriceHelp() {
     let container = document.createElement("div");

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreatePolePriceHelp";


     container.appendChild(InfoText);
     return container;
 }

 function CreateInfoHelp() {
     let container = document.createElement("div");

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreateInfoHelp";


     container.appendChild(InfoText);
     return container;
 }

 function CreateExtraHelp() {
     let container = document.createElement("div");

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreateExtraHelp";


     container.appendChild(InfoText);
     return container;
 }

 function CreateDefaultHelp() {
     let container = document.createElement("div");

     let InfoText = document.createElement("p");
     InfoText.innerText = "CreateDefaultHelp";


     container.appendChild(InfoText);
     return container;
 }