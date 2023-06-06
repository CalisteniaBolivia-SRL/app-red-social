import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "usuario_notification"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "title": { type: "text", },
        "body": { type: "text", },
        "fecha_visto": { type: "text", },
        "app": { type: "text", },
    },
    Action,
    Reducer,
});