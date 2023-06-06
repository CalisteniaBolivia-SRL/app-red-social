import { SStorage } from "servisofts-component";
import { SReducer } from "servisofts-model";
import _type_filters from "./_type_filters";
export default class Reducer extends SReducer {


    initialState(extra?: {}) {
        var initState = super.initialState(extra);
        initState.data = _type_filters.create_default_data();
        if(!initState.data) return initState;
        SStorage.getItem("FILTROS", (itm) => {
            if (!itm) return;
            var data = JSON.parse(itm);
            Object.keys(data).map((key) => {
                if (initState.data[key]) {
                    initState.data[key].select = data[key].select;
                }
            })
        });
        console.log("entro al initial", initState);
        return initState;
    }

    select(state: any, action: any): void {
        if (state.data[action.filter]) {
            state.data[action.filter].select = action.data;
        }
        SStorage.setItem("FILTROS", JSON.stringify(state.data));
        // console.log("CAMBIO UN FILTRO", state)
    }
}