import { Text, View } from 'react-native'
import React, { Component } from 'react'
// import PButtom from '../../../Components/PButtom'
import { SText, STheme, SView, SNavigation,SImage, SIcon,SHr } from 'servisofts-component';
import SSocket from 'servisofts-socket'

export default class CardUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
    }

    render() {

        var { key, Nombres, Apellidos, Telefono, Correo, CI } = this.props.datas;
        return (
            <SView
                            col={"xs-12"}
                            style={{
                                borderRadius: 10,
                                padding: 10,
                                borderColor: STheme.color.darkGray,
                                borderWidth:1
                            }}
                            row center 
                            // onPress={() => {
                            //     SNavigation.navigate("/paquete/membresia/confirmar", { ...this.props.datas });
                            // }}
                            onPress={this.props.onPress}
                        >
                            <SView col={"xs-4"} row >
                                {/* USUARIO */}
                                <SView card style={{
                                    width: 90,
                                    height: 90,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 60,
                                    overflow: "hidden"
                                }}>
                                    <SImage enablePreview src={SSocket.api.root + "usuario/" + key + "?date=" + new Date().getTime()} width={"100%"} height={"100%"}
                                        style={{
                                            resizeMode: 'cover',
                                        }}
                                    />
                                    {/* <SImage enablePreview src={require('../../../Assets/img/entrenador1.jpg')} width={"100%"} height={"100%"}
                                        style={{
                                            resizeMode: 'cover',
                                        }}
                                    /> */}
                                </SView>
                            </SView>
                            <SView col={"xs-8"} >
                                {/* USUARIO */}
                                {/* <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{usuario?.Nombres}</SText> */}
                                <SView row>
                                    <SText color={STheme.color.text} fontSize={20} bold>
                                        {Nombres} {Apellidos}
                                    </SText>
                                    <SHr height={2}/>
                                    {/* <SText color={STheme.color.text} fontSize={15}>
                                    Calistenia Bolivia Cristo
                                    </SText> */}
                                    <SHr height={2}/>
                                    <SView row>
                                        <SView row>
                                            <SIcon name='Icarnet2'  width={15}/>
                                            <SView width={5}/>
                                            <SText fontSize={12} color={STheme.color.gray}>{CI}</SText>
                                        </SView>
                                        <SView width={20}/>
                                        <SView row>
                                            <SIcon name='Icell' width={7}/>
                                            <SView width={5}/>
                                            <SText fontSize={12} color={STheme.color.gray}>{Telefono}</SText>
                                        </SView>
                                        <SHr height={2}/>
                                        <SView row>
                                            <SIcon name='Imail' width={15}/>
                                            <SView width={5}/>
                                            <SText fontSize={12} color={STheme.color.gray}>{Correo}</SText>
                                        </SView>
                                    </SView>
                                </SView>

                            </SView>
                        </SView>
        )
    }
}