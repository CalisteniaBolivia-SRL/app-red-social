import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getAll(extra?: {}) {
        var key_usuario = Model.usuario.Action.getKey();
        if (!key_usuario) return null;
        return super.getAll({
            key_usuario: key_usuario
        })
    }
}