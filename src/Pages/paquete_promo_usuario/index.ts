import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import sucursales from './sucursales';
import root_backup from './root_backup';
export const Parent = {
    name: "paquete_promo_usuario",
    path: `/paquete_promo_usuario`,
}
export default SPage.combinePages(Parent.name, {
    // "": root,
    "": root,
    "sucursales": sucursales,

});