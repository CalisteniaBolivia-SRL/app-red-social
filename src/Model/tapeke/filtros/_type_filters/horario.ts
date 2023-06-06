import { typeFilters } from "."

export const data: typeFilters = {
        showInBar: false,
        label: "Horario",
        select: "",
}
export const filtro = (arr, filtro) => {
        return arr;
        // return arr.filter((obj: any) => obj?.proximo_horario?.pack?.cantidad_disponibles > 0);
}