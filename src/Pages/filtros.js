import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, PButtom, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getHoraOptions() {
        return [
            { key: "", content: "Todo el dia" },
            { key: "00", content: "12 am." },
            { key: "01", content: "1 am." },
            { key: "02", content: "2 am." },
            { key: "03", content: "3 am." },
            { key: "04", content: "4 am." },
            { key: "05", content: "5 am." },
            { key: "06", content: "6 am." },
            { key: "07", content: "7 am." },
            { key: "08", content: "8 am." },
            { key: "09", content: "9 am." },
            { key: "10", content: "10 am." },
            { key: "11", content: "11 am." },
            { key: "12", content: "12 pm." },
            { key: "13", content: "1 pm." },
            { key: "14", content: "2 pm." },
            { key: "15", content: "3 pm." },
            { key: "16", content: "4 pm." },
            { key: "17", content: "5 pm." },
            { key: "18", content: "6 pm." },
            { key: "19", content: "7 pm." },
            { key: "20", content: "8 pm." },
            { key: "21", content: "9 pm." },
            { key: "22", content: "10 pm." },
            { key: "23", content: "11 pm." },

        ]
    }
    render() {
        var nombre = Model.filtros.Action.getByKey("nombre")?.select;
        var horario = Model.filtros.Action.getByKey("horario")?.select;
        return (
            <SPage
                title={"Filtros"}
            >
                <Container>
                    <SForm
                        ref={(form) => { this.form = form; }}
                        inputs={{
                            nombre: { label: "Nombre del establecimiento", placeholder: "Buscar", defaultValue: nombre },
                            // categoria: { label: "Categoría", placeholder: "Todas", defaultValue: this.data?.categoria?.value },
                            // preferencias: { label: "Preferencias alimenticias", placeholder: "Ninguna", defaultValue: this.data?.preferencias?.value },
                            horario: { label: "Horario de recogida", type: "number", placeholder: "HH24 ( 17 )", defaultValue: horario, type: "select", options: this.getHoraOptions() },
                            // pack: { label: "Ocultar sin packs", placeholder: "No", defaultValue: this.data?.pack?.value ?? "", type: "select", options: [{ key: "", content: "NO" }, { key: "true", content: "SI" }] },
                        }}
                        onSubmit={(values) => {
                            Model.filtros.Action.select("nombre", values.nombre)
                            Model.filtros.Action.select("horario", values.horario)
                            SNavigation.goBack();
                        }} />
                    <PButtom props={{ type: "outline" }}
                        onPress={() => { this.form.submit() }}
                    >{("APLICAR")}</PButtom>
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);