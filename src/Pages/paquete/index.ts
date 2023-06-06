import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import membresia from './membresia';
import detalle from './detalle';
import confirmar from './confirmar';
import qr from './qr';
export const Parent = {
    name: "paquete",
    path: `/paquete`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "membresia": membresia,
    "membresia/detalle": detalle,
    "membresia/confirmar": confirmar,
    "membresia/qr": qr,

});