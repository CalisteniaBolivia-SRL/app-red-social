import { typeFilters } from "."

export const data: typeFilters = {
        showInBar: true,
        label: "Ocultar sin Packs",
        select: "",
}
export const filtro = (arr,filtro) => {
        return arr.filter((obj: any) => obj?.proximo_horario?.pack?.cantidad_disponibles > 0);
}