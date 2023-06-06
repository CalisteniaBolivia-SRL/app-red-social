import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Model from '../../Model';
import ListaTarjetas from './Components/ListaTarjetas';
import Sin_tarjetas from './Components/_Sin_tarjetas';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.callback = SNavigation.getParam("callback");
    }


    _render_data() {
        var data = Model.pago_tarjeta.Action.getAll({
            key_usuario: Model.usuario.Action.getKey()
        })
        if (!data) return <SLoad />
        if (Object.values(data).filter(a => a.estado != 0).length <= 0) {
            // if (Object.values(data).length >= 0) {
            return <Sin_tarjetas />
        }
        return <ListaTarjetas data={data} onSelect={(resp) => {
            if (this.callback) {
                this.callback(resp);
                SNavigation.goBack();
            }
        }} />
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                {this._render_data()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);