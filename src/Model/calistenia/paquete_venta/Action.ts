import { SLocation, SMath, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";
export default class Action extends SAction {

    
    getPaqueteVentaUsuarioActivo() {
        return SSocket.sendPromise({
            ...this.model.info,
            estado: "cargando",
            type: "getPaqueteVentaUsuarioActivo",
            key_usuario: Model.usuario.Action.getKey()
        })
    }

    getAllByUsuario() {
        return SSocket.sendPromise({
            ...this.model.info,
            estado: "cargando",
            type: "getAllByUsuario",
            key_usuario: Model.usuario.Action.getKey()
        })
    }

   
}