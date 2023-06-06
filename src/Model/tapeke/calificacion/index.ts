import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "calificacion"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_pedido": { type: "text", editable: true },
        "star": { type: "integer", editable: true },
        "buen_servicio": { type: 'boolean', editable: true },
        "buena_calidad": { type: 'boolean', editable: true },
        "buen_cantidad": { type: 'boolean', editable: true },
        "comentario": { type: "text", editable: true },
    },
    Action,
    Reducer,
});