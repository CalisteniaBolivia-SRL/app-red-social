import { SPage, SPageListProps } from 'servisofts-component';
import root from './root';
import recuperar from './recuperar';
import encontrado from './encontrado';
import coincidencia from './coincidencia';
import noencontrado from './noencontrado';
export const Parent = {
    name: "cuenta",
    path: `/cuenta`,
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "recuperar": recuperar,
    "encontrado": encontrado,
    "coincidencia": coincidencia,
    "noencontrado": noencontrado,
});