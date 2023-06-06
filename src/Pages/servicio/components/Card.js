import { Text, View } from 'react-native'
import React, { Component } from 'react'
// import PButtom from '../../../Components/PButtom'
import { SText, STheme, SView, SNavigation, SImage, SIcon } from 'servisofts-component';
import SSocket from "servisofts-socket"
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
                    padding: 8
                }}
                row
                center
                onPress={() => { SNavigation.navigate('/paquete', { servicio: this.pk, pk: key }) }}
            >
                <SView width={30} height={40} center style={{ borderRadius: 10, overflow: 'hidden' }}>
                    {/* <SImage src={SSocket.api.root + "/paquete/" + key} /> */}
                    <SIcon name={"Lista1"} height={16} fill={"transparent"}></SIcon>
                </SView>
                <SView width={8} />
                <SView flex center>
                    <SView row col={"xs-12"} >
                        <SText bold color={STheme.color.text} fontSize={15}>{descripcion}</SText>
                        <SView flex />
                        {/* <SText style={{ alignItems: "flex-end" }} fontSize={12} color={"#666666"}>Bs. {precio}</SText> */}
                        <SView style={{ alignItems: "flex-end" }}>
                            <SIcon name={"Lista2"} height={16} width={16} fill={STheme.color.text}></SIcon>
                           
                        </SView>
 <SView width={8}  />
                    </SView>

                </SView>
            </SView>
        )
    }
}