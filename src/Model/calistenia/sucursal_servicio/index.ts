import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "sucursal_servicio"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        // "key_usuario": { type: "text", fk: "usuario" },
        
    },
    image: {
        api: "root",
        name: "sucursal_servicio"
    },
    Action,
    Reducer,
});