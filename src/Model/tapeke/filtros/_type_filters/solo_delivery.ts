import { typeFilters } from "."

export const data: typeFilters = {
    showInBar: true,
    label: "Solo entrega a Domicilio",
    select: "",
}
export const filtro = (arr,filtro) => {
    return arr.filter((obj: any) => obj?.delivery);
}