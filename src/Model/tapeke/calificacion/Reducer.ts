import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {
    
  
    get_media_restaurante(state: any, action: any): void {
        if (action.estado != "exito") return;
        state.media[action.key_restaurante] = action.data;
    }
}