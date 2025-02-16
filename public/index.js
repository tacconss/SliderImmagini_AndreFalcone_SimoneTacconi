import { createNavigator } from "./navigator/navigator.js";
import { generateLoginComponent } from "./login/login.js";
import { generateImageCarosel } from "./imageCarosel/imageCarosel.js";
import { generateTable } from "./table/table.js";
import { generateUploadImage } from "./uploadImagge/uploadImage.js"

const login = generateLoginComponent(document.querySelector("#loginContainer"));
const navigator = createNavigator(document.querySelector("#container"));
const imageCarosel = generateImageCarosel(document.querySelector("#immaginiCarosello"))
const table = generateTable(document.querySelector("#immaginiTabella"))

const uploadButton = document.querySelector("#uploadButton");
const inputFile = document.querySelector('#file');

let list = []

const uploadFunction = async function() {
    const formData = new FormData();
    formData.append("file", inputFile.files[0]);
    try {
        const res = await fetch("/upload", {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        //Check if URL is duplicate
        let check = false;
        list.forEach((element) => {
            if (element == data.url) {
                check = true;
            }
        });
        //If it's not duplicate
        if (!check) {
            list.push(data);
        }
    } catch (e) {
        console.log(e);
    }
}

uploadButton.onclick = async function () {
    await uploadFunction();
    fetch('/get').then((res) => res.json()).then((imgs) => {
        //Set img list
        table.setList(imgs);
        imageCarosel.setImgList(imgs);
        //Render
        table.render(imageCarosel);
        imageCarosel.render();
    })
}

fetch('/get').then((res) => res.json()).then((imgs) => {
    //Set img list
    table.setList(imgs);
    imageCarosel.setImgList(imgs);
    //Render
    table.render(imageCarosel);
    imageCarosel.render();
})

table.render(imageCarosel);
imageCarosel.render();

login.build("453f3d23-1478-440e-ada7-f2ebdcd16b14", "private");
login.renderForm();
