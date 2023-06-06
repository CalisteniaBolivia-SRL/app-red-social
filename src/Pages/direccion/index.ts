import { SPage } from 'servisofts-component';

import root from './root';
import mapa from './mapa';

export const Parent = {
    name: "direccion",
    path: "/direccion"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "root": root,
    "mapa": mapa,
});