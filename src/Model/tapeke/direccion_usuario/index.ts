import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "direccion_usuario"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "descripcion": { type: "text" },
        "direccion": { type: "text" },
        "latitude": { type: "double" },
        "longitude": { type: "double" },
    },
    Action,
    Reducer,
});