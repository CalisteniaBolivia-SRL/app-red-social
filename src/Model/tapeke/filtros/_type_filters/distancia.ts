import { typeFilters } from "."

export const data: typeFilters = {
    showInBar: false,
    label: "Distancia",
    select: "30",
    options: {
        "1": { label: "menos de 1 Km", value: "1" },
        "30": { label: "menos de 30 Km", value: "30" },
    }
}

export const filtro = (arr, filtro) => {
    // return arr;
    return arr.filter((obj: any) => parseFloat(obj?.distancia ?? 0) <= parseFloat(filtro?.select ?? 0));
}