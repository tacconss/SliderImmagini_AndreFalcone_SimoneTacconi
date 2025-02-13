import { createNavigator } from "./navigator/navigator.js";
import { generateLoginComponent } from "./login/login.js";
import { generateImageCarosel } from "./imageCarosel/imageCarosel.js";
import { generateTable } from "./table/table.js"

const login = generateLoginComponent(document.querySelector("#loginContainer"));
const navigator = createNavigator(document.querySelector("#container"));
const imageCarosel = generateImageCarosel(document.querySelector("#immaginiCarosello"))
const table = generateTable(document.querySelector("#immaginiTabella"))

let imgList = ["https://blog.geografia.deascuola.it/uploads/2023/04/Val-d-Orcia-panorama_1bb3052e3a980627951e300394f187d8.jpg", "https://ilfotografo.it/wp-content/uploads/2022/06/CAN128.lead_.la_fiorita_98159931-1024x683.jpg","https://i0.wp.com/fotografinviaggio.it/wp-content/uploads/2023/04/Immagine-copertina-per-blog-1-2-2.jpg?fit=1000%2C662&ssl=1","https://www.emotionrit.it/wp-content/uploads/2022/08/Perche-un-panorama-ci-colpisce-scaled.jpg"];

table.setList(imgList)
table.render();

imageCarosel.setImgList(imgList);
imageCarosel.render();

login.build("453f3d23-1478-440e-ada7-f2ebdcd16b14", "private");
login.renderForm();
