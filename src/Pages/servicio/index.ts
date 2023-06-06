import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
// import membresia from './root';
export const Parent = {
    name: "servicio",
    path: `/servicio`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    // "membresia": membresia,

});