import { typeFilters } from "."

export const data: typeFilters = {
        showInBar: false,
        label: "Nombre",
        select: "",
}
export const filtro = (arr, filtro) => {
        // return arr;
        return arr.filter((obj: any) => obj?.nombre.toUpperCase().indexOf(filtro.select.toUpperCase()) > -1);
}