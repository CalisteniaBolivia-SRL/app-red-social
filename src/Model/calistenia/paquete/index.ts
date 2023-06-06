import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "paquete"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "descripcion": { type: "text", editable: true },
        "precio": { type: "text", editable: true },
        "dias": { type: "date", editable: true },
        "participantes": { type: "date", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        // "key_usuario": { type: "text", fk: "usuario" },
        "observacion": { type: "text", fk: "usuario" },
    },
    image: {
        api: "root",
        name: "paquete"
    },
    Action,
    Reducer,
});