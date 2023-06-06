import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
export type ProximoHorarioPropsType = {
    data: any
}
class index extends Component<ProximoHorarioPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        var { key, nombre, proximo_horario } = this.props.data;
        return <SView
            row
            {...this.props}
            center
        >
            <SIcon name={"Reloj"} width={13} />
            <SView width={6} />
            <SText fontSize={12} >{proximo_horario.text}</SText>
            <SView flex />
        </SView>
    }
}
export default (index);