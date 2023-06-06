import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "cupon"
    },
    Columns: {
        "descripcion": { type: "text", editable: true },
        "observacion": { type: "text", editable: true },
        "tipo": { type: "text", editable: true },
        "fecha_off": { type: "date", editable: true },
        "monto": { type: "double", editable: true },
        "monto_minimo_compra": { type: "double", editable: true },
      
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
        "key_usuario": { type: "text", fk: "usuario" },
        "key": { type: "text", pk: true },
    },
    Action,
    Reducer,
});