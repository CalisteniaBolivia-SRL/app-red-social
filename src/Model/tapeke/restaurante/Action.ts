import { SLocation, SMath, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

// algoritmo distancia entre 2 polares
// puntos polares
// coordenadas polares
const getDistance = (lat1, lon1, lat2, lon2) => {
    var rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000;
    return d;
}
export default class Action extends SAction {

    getByKeyRecursive(key) {
        var data = this.getAllRecursive();
        if (!data) return null;
        return data[key];
    }

    getAllRecursive() {
        var restaurantes = this.getAll();
        var horarios = Model.horario.Action.getAllRecursive();
        if (!horarios || !restaurantes) return null;
        var ubicacion_usuario = Model.filtros.Action.getByKey("direccion", {}, null).select;
        Object.values(restaurantes).map((obj: any) => {
            // restaurantes[obj.key].horarios = Model.horario.Action.getAllBy({
            //     key_restaurante: obj.key
            // })

            obj.distancia = "";
            if (ubicacion_usuario) {
                obj.distancia = getDistance(ubicacion_usuario.latitude, ubicacion_usuario.longitude, obj.latitude, obj.longitude);
                obj.distancia = (parseFloat(obj.distancia ?? 0) / 1000).toFixed(1)
            }
            restaurantes[obj.key].proximo_horario = Model.horario.Action.getByKeyRestauranteProximo(obj.key);
        })

        return restaurantes;
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