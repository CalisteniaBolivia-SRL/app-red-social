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
        var { key, descripcion, state, direccion, nombre } = this.props.data;
        return (<SView col={"xs-6"} activeOpacity={0.8}
            onPress={() => {
                SNavigation.navigate(this.props.root, {
                    key_sucursal: this.props.key_sucursal, key_servicio: this.props.key_servicio
                })
            }}
            style={{ padding: 5 }}
            row
        // height={120}
        >

            <SView col={"xs-12"}
                card height ={185}
                style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    // padding: 15
                }}>
                <SView col={"xs-12"} style={{ alignItems: 'center' }}>
                    <SView col={"xs-12"} height={100} style={{
                        overflow: 'hidden',
                        // borderRadius: 8,
                        // padding:5
                    }}>
                        <SImage src={SSocket.api.root + "sucursal/portada/" + key} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
                    </SView>
                </SView>

                <SView col={"xs-12"} />
                <SView col={"xs-0.5"} />
                <SView col={"xs-12"}
                    style={{ padding: 10 }} >
                    <SView col={"xs-12"}  >
                        <SText fontSize={18} bold color={STheme.color.text} >{descripcion}</SText>
                        <SText fontSize={10} color={STheme.color.text}>{direccion}</SText>

                    </SView>

                </SView>

            </SView>

        </SView>
        );
    }
}
export default (index);