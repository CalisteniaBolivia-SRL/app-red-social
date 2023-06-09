import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getAll(extra?: {}) {
        return super.getAll({
            key_usuario: Model.usuario.Action.getKey(),
            app: "client",
            ...extra
        })
    }
}