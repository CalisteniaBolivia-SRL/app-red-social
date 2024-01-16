import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SImage, SNavigation, SText, STheme, SView } from 'servisofts-component'
import Icons from 'servisofts-component/img'
import SSocket from 'servisofts-socket';

const handlePress = (key) => {
    SNavigation.navigate("/perfil/client", { pk: key });
}

type PropsType = {
    index: Number,
    data: {
        key_usuario: string,
        cantidad: number, // cantidad de likes
        usuario: {
            Nombres: String,
            Apellidos: String,
            CI: String,
            Correo: String,
            Telefono: String,
        }
    }
}
export default class ListCard extends Component<PropsType> {


    render() {
        // this.props.data.key_usuario
        // var propsFilter = this.props.filter(a => (a.index == 0) || (a.index == 1) || (a.index == 2 ))
        // console.log(propsFilter)
        var label = "";
        switch (this.props?.index + 1) {
            case 1: label = "er"; break;
            case 2: label = "do"; break;
            case 3: label = "er"; break;
            case 4: label = "to"; break;
            case 5: label = "to"; break;
            case 6: label = "to"; break;
            case 7: label = "mo"; break;
            case 8: label = "vo"; break;
            case 9: label = "no"; break;
            case 10: label = "mo"; break;
        }
        // TODO:ALVARO TOCO AQUI PARA QUE REDIRIJA
        return (
            <View col={"xs-12"} row center>
                <SView col={"xs-11.7"} height={45} style={{ alignContent: 'flex-start' }} row
                    onPress={handlePress.bind(this, this.props?.data?.key_usuario)}
                >
                    <SView style={{ position: 'absolute' }} height>
                        <SIcon name={"RankBack"} height={50} width={200} />
                    </SView>
                    <SHr height={5} />
                    <SView col={"xs-2"} row center>
                        <SView width={15} />
                        <SText color={STheme.color.text} fontSize={18}>{this.props?.index + 1}</SText>
                        <SText color={STheme.color.text} fontSize={11}>{label}</SText>
                    </SView>
                    <SView col={"xs-10"} backgroundColor={STheme.color.white} height={35} row center
                        style={{ transform: [{ skewX: '-18deg' }] }}
                    >
                        <SView col={"xs-10"} row>
                            <SView width={10} />
                            <SText fontSize={15} color={STheme.color.black}>{this.props?.data?.usuario?.Nombres}</SText>
                        </SView>
                        <SView col={"xs-2"} flex center style={{ textAlign: "right" }} height>
                            <SView width={40} style={{ transform: [{ skewX: '18deg' }] }}>
                                <SView style={{
                                    width: 30,
                                    height: 30, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
                                }}>
                                    <SImage src={SSocket.api.root + "usuario/" + this.props?.data?.key_usuario} style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover"
                                    }} />
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                </SView>
            </View>
        )
    }
}