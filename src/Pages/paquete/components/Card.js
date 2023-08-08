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
        var { key, descripcion, state, precio } = this.props.datas;
        return (
            <SView
                height={55}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    // padding: 8
                }}
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