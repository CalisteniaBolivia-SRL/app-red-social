import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {
  
 
    get_media_restaurante(key_restaurante) {
        var reducer = this._getReducer()
        if(!reducer.media) reducer.media = {}
        var data = reducer.media[key_restaurante];
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                ...this.model.info,
                type: "get_media_restaurante",
                estado: "cargando",
                key_restaurante: key_restaurante,
                key_usuario: Model.usuario.Action.getKey(),
            })
            return null;
        }
        // console.log("NADA" +data);
        return data;
    }
 
}