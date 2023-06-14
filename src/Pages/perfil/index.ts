import { SPage } from 'servisofts-component';

import root from './root';
import editar from './editar';
import asistencia from './asistencia';
import datos from './perfil';

export const Parent = {
    name: "perfil",
    path: "/perfil"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    "editar":editar,
    "asistencia":asistencia,
    "datos":datos,

});