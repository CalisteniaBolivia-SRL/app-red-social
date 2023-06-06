import { SDate } from "servisofts-component";
import { typeFilters } from "."

export const data: typeFilters = {
        showInBar: true,
        label: "Solo hoy",
        select: "",
}
export const filtro = (arr, filtro) => {
        return arr.filter((obj: any) => obj.proximo_horario.dia == new SDate().getDayOfWeek());
}