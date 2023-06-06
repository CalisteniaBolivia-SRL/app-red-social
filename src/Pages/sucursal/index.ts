import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import detalle from './detalle';
import mapa from './mapa';
export const Parent = {
    name: "sucursal",
    path: `/sucursal`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "detalle": detalle,
    "mapa": mapa,


});