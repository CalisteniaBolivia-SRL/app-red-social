import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {

    getAllRecursive() {
        var packs = this.getAll();
        var pedidos = Model.pedido.Action.getAllActivos();
        if (!packs || !pedidos) return null;

        var lista = Object.values(pedidos);
        Object.values(packs).map((pack: any) => {
            var pedidos_del_pack = lista.filter((obj: any) => obj.key_pack == pack.key);
            pack.pedidos = pedidos_del_pack;
            var pedidos_activos = pedidos_del_pack.filter((p: any) => p.state != "pendiente_pago" && p.state != "timeout_pago");
            var cantidad = 0;
            pedidos_activos.map((o: any) => cantidad += o.cantidad);
            pack.cantidad_disponibles = pack.cantidad - cantidad
        })
        return packs;
    }
}