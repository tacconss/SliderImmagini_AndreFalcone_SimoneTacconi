import { createNavigator } from "./navigator/navigator.js";
import { generateLoginComponent } from "./login/login.js";

const login = generateLoginComponent(document.querySelector("#loginContainer"));
const navigator = createNavigator(document.querySelector("#container"));

login.build("453f3d23-1478-440e-ada7-f2ebdcd16b14", "private");
login.renderForm();
