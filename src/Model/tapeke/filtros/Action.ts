import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";
import { filterTypesOptions } from "./_type_filters";

import { filtros } from "./_type_filters";
export default class Action extends SAction {

    select(type: filterTypesOptions, data: {}) {
        this._dispatch({
            ...this.model.info,
            type: "select",
            filter: type,
            data: data
        })
    }
    getByKey(key: filterTypesOptions, extra: {}, _default: any) {
        return super.getByKey(key, extra, _default)
    }
    registro(extra?: {}) {
        return null;
    }
    editar(extra?: {}) {
        return null;
    }
    eliminar(extra?: {}) {
        return null;
    }

    filtrar(key: filterTypesOptions, filtro, arr) {
        return filtros[key].filtro(arr, filtro);
    }
}