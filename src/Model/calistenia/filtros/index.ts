import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "filtros"
    },
    Columns: {
        "key": { type: "text", pk: true },
    },
    Action,
    Reducer,
});