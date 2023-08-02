import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "paqueteServicio",
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_paquete": { type: "text", label: "Key paquete" },
        "key_servicio": { type: "text", label: "Key sucursal" },
        "estado": { type: "integer" },
        "fecha_on": { type: "timestamp" }
        // "key_usuario": { type: "text", fk: "usuario" },

    },
    Action,
    Reducer,
});