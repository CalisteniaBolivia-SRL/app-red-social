import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraCargando from '../BarraCargando';
export type TituloPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<TituloPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
    }


    render() {
        // var { key, descripcion, state, direccion, nombre } = (this.props.datoSucursal) ? this.props.datoSucursal : this.props.datas;
        return (<SView col={"xs-12"} center row>
            <SIcon name={'TitPerfil'} height={44} width={296} style={{ position: 'absolute', left: 0 }} />
            <SView col={"xs-12"} row >
                <SHr height={10} />
                <SView width={25} />
                <SIcon name={this.props.icon} width={25} height={25} />
                <SView width={10} />
                <SText fontSize={18} font="Oswald-Bold" color={STheme.color.white}>{this.props.titulo}</SText>
                <SHr height={10} />
            </SView>
        </SView>
        );
    }
}
export default (index);