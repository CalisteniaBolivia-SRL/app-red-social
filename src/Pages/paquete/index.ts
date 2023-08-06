import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import membresia from './membresia';
import detalle from './detalle';
import confirmar from './confirmar';
import qr from './qr';
import compra_exitosa from './compra_exitosa';
export const Parent = {
    name: "paquete",
    path: `/paquete`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "compra_exitosa": compra_exitosa,
    "membresia": membresia,
    "membresia/detalle": detalle,
    "membresia/confirmar": confirmar,
    "membresia/qr": qr,

});