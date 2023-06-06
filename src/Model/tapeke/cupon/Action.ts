import { SAction } from "servisofts-model";
import SSocket from "servisofts-socket"
import Model from "../..";
export default class Action extends SAction {

    activar({ code }) {
        return SSocket.sendPromise({
            ...this.model.info,
            estado: "cargando",
            type: "activar",
            codigo: code,
            key_usuario: Model.usuario.Action.getKey()
        })
    }
    getActivos() {
        return SSocket.sendPromise({
            ...this.model.info,
            estado: "cargando",
            type: "getActivos",
            key_usuario: Model.usuario.Action.getKey()
        })
    }
}