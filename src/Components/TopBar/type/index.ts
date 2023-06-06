import _default from "./_default";
import ubicacion from "./ubicacion";
import menu from "./menu";
import home from "./home";

export type TopBarTypes = "default" | "ubicacion" | "menu" | "home"
export default {
    "default": _default,
    ubicacion,
    menu,
    home
}