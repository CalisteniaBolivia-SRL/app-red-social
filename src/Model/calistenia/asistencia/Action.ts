import { SLocation, SMath, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";
export default class Action extends SAction {

    
    getByKeyUsuario() {
        return SSocket.sendPromise({
            ...this.model.info,
            estado: "cargando",
            type: "getByKeyUsuario",
            key_usuario: Model.usuario.Action.getKey()
        })
    }

    getByKeyRecursive(key) {
        var data = this.getAllRecursive();
        if (!data) return null;
        return data[key];
    }

    getAllRecursive() {
        var sucursales = this.getAll();
        // var horarios = Model.horario.Action.getAllRecursive();
        // if (!horarios || !restaurantes) return null;
        // var ubicacion_usuario = Model.filtros.Action.getByKey("direccion", {}, null).select;
        Object.values(sucursales).map((obj: any) => {
            // restaurantes[obj.key].horarios = Model.horario.Action.getAllBy({
            //     key_restaurante: obj.key
            // })

            obj.distancia = "";
            // if (ubicacion_usuario) {
            //     obj.distancia = getDistance(ubicacion_usuario.latitude, ubicacion_usuario.longitude, obj.latitude, obj.longitude);
            //     obj.distancia = (parseFloat(obj.distancia ?? 0) / 1000).toFixed(1)
            // }
            // restaurantes[obj.key].proximo_horario = Model.horario.Action.getByKeyRestauranteProximo(obj.key);
        })

        return sucursales;
    }

    getAllFilters() {
        var filtros = Model.filtros.Action.getAll();
        var data = this.getAllRecursive();
        if (!data) return null;
        var arr = Object.values(data);
        Object.values(filtros).map((filtro: any) => {
            if (filtro.select) {
                arr = Model.filtros.Action.filtrar(filtro.key, filtro, arr);
            }
        })
        // console.log(filtros)
        return arr;
    }
}