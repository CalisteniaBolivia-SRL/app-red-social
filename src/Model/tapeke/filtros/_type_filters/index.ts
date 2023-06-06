import * as distancia from "./distancia"
import * as direccion from "./direccion"
import * as sin_pack from "./sin_pack"
import * as solo_delivery from "./solo_delivery"
import * as  solo_hoy from "./solo_hoy"
import * as  nombre from "./nombre"
import * as  horario from "./horario"

export const filtros = {
    distancia,
    direccion,
    sin_pack,
    solo_delivery,
    solo_hoy,
    nombre,
    horario
}

export type filterTypesOptions = "distancia" | "direccion" | "sin_pack" | "solo_delivery" | "nombre" | "horario"
export type typeFilters = {
    key?: string,
    label: string,
    showInBar: boolean,
    select: any,
    options?: {}
}
const create_default_data = () => {
    var dataFinal = {};
    Object.keys(filtros).map(key => {
        dataFinal[key] = { key: key, ...filtros[key].data, }
    })
    return dataFinal;
}

export default {
    create_default_data
}
