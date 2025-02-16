export const generateTable = (parentElement) => {
    let list = [];

    return {
        getList: () => {
            return list
        },
        setList: (newImgList) => {
            list = newImgList;
        },
        render: function(carosel) {
            //Draw Table
            let html = "";
            list.forEach((element) => {
               html+='<tr><td><img src="' + element.url + '" class="d-block w-100" width="100" height="100" alt="..."></td><td><button type="button" id="delete' + element.id + '" class="delete">X</button></td></tr>' 
            });
            parentElement.innerHTML = html;
            //Delete Element
            document.querySelectorAll(".delete").forEach((element, index) => {
                element.onclick = () => {
                    //Remove localy
                    console.log(list.splice(index, 1));
                    //Remove From Database
                    let url = ''
                    fetch('/get').then((res) => res.json()).then((imgs) => { //Prendo la lista di immagini
                        url = '/delete/' + imgs[index].id; //Vedo l'id dell'immagini alla posizione del bottone premuto
                    }).then(() => {
                        fetch(url, {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" }
                        }).then(() => { 
                            console.log("success") 
                        });
                    });
                    //Render
                    this.render();
                    carosel.render();
                }
            });
        }
    }
}