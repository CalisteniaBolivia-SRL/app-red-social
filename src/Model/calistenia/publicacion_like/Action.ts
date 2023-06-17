import { SAction } from "servisofts-model";
import SSocket from "servisofts-socket"
import Model from "../..";
export default class Action extends SAction {

    dislike(extra?: { key_publicacion, key_usuario }) {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                ...this.model.info,
                type: "dislike",
                ...extra,
            }).then(e => {
                Model.publicacion.Action._dispatch({
                    component: "publicacion",
                    type: "dislike",
                    key_publicacion: extra.key_publicacion,
                    key_usuario: Model.usuario.Action.getKey(),
                })
            }).catch(e => {
                reject(e);
            })
        })
    }
}