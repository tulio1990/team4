 export default class Alerts{
    async convertToJson() {
        const file = ("../json/alerts.json");
        const fetchingFile = await fetch(file);
        this.fileConverted = await fetchingFile.json();
        this.displayingAlerts();
    }
    displayingAlerts(){
        let isEmpty = JSON.stringify(this.fileConverted);
        if (!(isEmpty === '[]')){
            const listOfAlerts = Object.keys(this.fileConverted);
            const productListingMain = document.querySelector(".divider");
            const alertSection = document.createElement("section");
            alertSection.classList.add("alert-list");
            productListingMain.appendChild(alertSection);
            for (let i=0; i<listOfAlerts.length; i++) {
                let JSON_alertMessage, JSON_alertBackground, JSON_alertColor;
                const alertMessage = this.fileConverted.map((JSONalert) => JSON_alertMessage = JSONalert.message);
                const alertBackground = this.fileConverted.map((JSONalert) => JSON_alertBackground = JSONalert.background);
                const alertColor = this.fileConverted.map((JSONalert) => JSON_alertColor = JSONalert.color);
                const alertParagraph = document.createElement("p");
                alertParagraph.innerText = alertMessage[i];
                alertParagraph.style.background = alertBackground[i];
                alertParagraph.style.color = alertColor[i];
                alertSection.appendChild(alertParagraph);
            }
        }
        else {
            return;
        }
    }
};
