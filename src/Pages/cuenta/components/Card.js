import { Text, View } from 'react-native'
import React, { Component } from 'react'
// import PButtom from '../../../Components/PButtom'
import { SText, STheme, SView, SNavigation } from 'servisofts-component';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
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
                    padding: 18
                }}
                row
                onPress={() => { SNavigation.navigate('/paquete/membresia/detalle', { sucursal: this.pk, pk: key  }) }}
            >
                <SView col={"xs-10"}>
                    <SText color={STheme.color.text} fontSize={15}>{descripcion}</SText>
                </SView>
                <SView col={"xs-2"}>
                    <SText style={{ alignItems: "flex-end" }} fontSize={12} color={"#666666"}>Bs. {precio}</SText>
                </SView>
            </SView>
        )
    }
}