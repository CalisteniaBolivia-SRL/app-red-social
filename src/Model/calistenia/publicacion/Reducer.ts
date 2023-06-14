import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {


    update_cantidad_like(state: any, action: any): void {
        if (!state.data) return;
        if (!state.data[action.key_publicacion]) return;
        state.data[action.key_publicacion].likes += action.cantidad;
    }
}