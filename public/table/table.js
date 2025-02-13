export const generateTable = (parentElement) => {
    let list = [];
    let cont = 0;

    return {
        getList: () => {
            return list
        },
        setList: (newImgList) => {
            list = newImgList;
        },
        render: function() {
            //Draw Table
            let html = "";
            list.forEach((element, index) => {
               html+='<tr><td><img src="' + element + '"class="d-block w-100" width="100" height="100" alt="..."></td><td><button type="button" id="delete' + index + '" class="delete">X</button></td></tr>' 
            });
            parentElement.innerHTML = html;

            //Delete Element
            document.querySelectorAll(".delete").forEach((element, index) => {
                element.onclick = () => {
                    console.log(list.splice(index, 1));
                    this.render();
                }
            });
        }
    }
}