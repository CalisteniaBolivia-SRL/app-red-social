import { SPage } from 'servisofts-component';

import root from './root';
import reserva from './reserva';
import detalle from './detalle';
import comollegar from './comollegar';
export const Parent = {
    name: "restaurante",
    path: "/restaurante"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "reserva":reserva,
    "detalle":detalle,
    "comollegar":comollegar
});