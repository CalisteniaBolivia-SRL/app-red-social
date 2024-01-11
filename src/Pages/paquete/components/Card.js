import { Text, View } from 'react-native'
import React, { Component } from 'react'
// import PButtom from '../../../Components/PButtom'
import { SText, STheme, SView, SNavigation, SImage } from 'servisofts-component';
import SSocket from "servisofts-socket"
export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        {/* TODO: alvaro toco este codigo para colorear paquete */ }
        var { key, descripcion, state, precio, promo_usuario } = this.props.datas;
        return (
            <SView
                height={55}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}

                // style={{ borderRightWidth: 3, borderColor: STheme.color.secondary }}

                style={{
                    borderRadius: 10,
                    borderLeftWidth: 2,
                    borderTopWidth: 2,
                    borderBottomWidth: 2,
                    borderColor:(!promo_usuario ? "transparent" : "cyan")
                    // padding: 8
                }}
                // border={!promo_usuario ? "transparent" : "cyan"}
                row
                center
                onPress={() => { SNavigation.navigate('/paquete/membresia/detalle', { sucursal: this.props.key_sucursal, pk: key }) }}
            >
                <SView width={8} />
                <SView width={40} height={40} card style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <SImage src={SSocket.api.root + "paquete/" + key + "?time=" + new Date().getTime()} />
                </SView>
                <SView width={8} />
                <SView flex center>
                    <SView row col={"xs-12"} center>
                        <SView style={{ padding: 8 }} col={"xs-8"} >
                            <SText bold color={STheme.color.text} fontSize={15}>{descripcion}</SText>
                        </SView>
                        <SView flex />
                        <SView width={90} card height={55} center style={{ borderRightWidth: 3, borderColor: STheme.color.secondary }}>
                            <SText bold style={{ alignItems: "flex-end" }} fontSize={15} color={STheme.color.text}>Bs. {precio}</SText>
                        </SView>
                    </SView>
                </SView>
            </SView>
        )
    }
}