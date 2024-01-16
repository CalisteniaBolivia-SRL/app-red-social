import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
// import membresia from './root';
export const Parent = {
    name: "paquete_promo_usuario",
    path: `/paquete_promo_usuario`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    // "membresia": membresia,

});