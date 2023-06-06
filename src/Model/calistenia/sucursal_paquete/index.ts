import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "sucursal_paquete"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_paquete": { type: "timestamp", label: "Key paquete" },
        "key_sucursal": { type: "timestamp", label: "Key sucursal" },
        "estado": { type: "integer" },
        // "key_usuario": { type: "text", fk: "usuario" },
        
    },
    image: {
        api: "root",
        name: "sucursal_paquete"
    },
    Action,
    Reducer,
});