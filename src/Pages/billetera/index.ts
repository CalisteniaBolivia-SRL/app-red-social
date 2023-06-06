import { SPage } from 'servisofts-component';
import cargar_credito from './cargar_credito';
import QR from './QR';

import root from './root';

export const Parent = {
    name: "billetera",
    path: "/billetera"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "cargar_credito": cargar_credito,
    "qr": QR,

});