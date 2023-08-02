import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraCargando from '../BarraCargando';
export type SucursalCardPropsType = {
    data: any,
    onPress?: (obj) => {},
    key_servicio?: string,
}
class index extends Component<SucursalCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
    }
    _buildMessage(pedido) {
        switch (pedido.state) {
            case "pagado":
                return "Esperando la hora de entrega."
            case "pago_en_proceso":
                return "Pago en proceso."
            default:
                return pedido.state;
        }
    }

    render() {
        var { key, descripcion, state, direccion, nombre } = (this.props.datoSucursal) ? this.props.datoSucursal : this.props.datas;
        return (<SView col={"xs-12"} activeOpacity={0.8} onPress={() => {
            SNavigation.navigate(this.props.root, { pk: key, key_servicio: this.props.key_servicio })
        }} height={130} backgroundColor={STheme.color.card} style={{ borderRadius: 10, overflow: 'hidden', }}>
            <SView col={"xs-12"} height style={{
                position: "absolute",
            }}>
                <SImage src={SSocket.api.root + "sucursal/portada/" + key} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
            </SView>
            <SView flex col={"xs-12"} />
            <SView style={{ alignItems: "flex-end", padding: 8 }} col={"xs-12"}>
                <SView row height={30} center>
                    <SText fontSize={20} bold color={STheme.color.white} style={{ alignItems: "flex-end" }}>{descripcion}</SText>
                    <SView width={8} />
                    <SIcon name={"Vineta1"} height={14} width={8} fill={"transparent"}></SIcon>
                </SView>
                <SView col={"xs-12"}>
                    <SText style={{ alignItems: "flex-end" }} fontSize={10} color={STheme.color.white}>{direccion}</SText>
                </SView>
            </SView>
        </SView>
        );
    }
}
export default (index);