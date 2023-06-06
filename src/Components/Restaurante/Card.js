import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SMath, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Restaurante from '.';
export type RestauranteCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<RestauranteCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render_foto_perfil() {
        var { key } = this.props.data;
        return <SView width={50} height={50} style={{
            left: 8,
            borderRadius: 100,
            overflow: "hidden",
            position: "absolute",
            borderColor: STheme.color.secondary,
            borderWidth: 1,
        }} card>
            <SImage src={SSocket.api.root + "restaurante/" + key} style={{
                resizeMode: "cover"
            }} />
        </SView>
    }
    render_portada() {
        var { key, nombre } = this.props.data;
        return <SView col={"xs-12"} height={100} backgroundColor={STheme.color.card}>
            <SImage src={SSocket.api.root + "restaurante/portada/" + key} style={{
                resizeMode: "cover"
            }} />
        </SView>
    }
    handlePress() {
        if (!this.props.onPress) return null;
        this.props.onPress(this.props.data)
    }
    render() {
        var { key, nombre, proximo_horario, distancia } = this.props.data;
        return (
            <SView
                width={320}
                // col={"xs-11"}
                height={186} 
                style={{
                    borderRadius: 16,
                    borderColor: "#AAAAAA22",
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderBottomWidth: 3,
                    marginTop: 8,
                    overflow: "hidden"
                }}
                activeOpacity={1}
                {...this.props}
                onPress={!this.props.onPress ? null : this.handlePress.bind(this)}>

                {this.render_portada()}
                <SView col={"xs-12"} height style={{
                    position: "absolute"
                }}>
                    <SView col={"xs-12"} height={88}>

                    </SView>
                    <SView row center>
                        <SView width={40} />
                        <SView width={200} height={24} center backgroundColor={STheme.color.primary} style={{
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                        }}>
                            <SText col={"xs-12"} center color={STheme.color.secondary}>{nombre}</SText>
                        </SView>
                        <SView flex />
                        {this.render_foto_perfil()}
                    </SView>
                    <SView col={"xs-12"} flex row>
                        <SView flex height style={{
                            justifyContent: "center",
                            paddingLeft: 8
                        }}>
                            {/* <Restaurante.ProximoHorario data={this.props.data} /> */}
                            <SText fontSize={11}>{proximo_horario?.extraData?.text}</SText>
                            <SText fontSize={11}>{proximo_horario?.extraData?.hora_inicio} - {proximo_horario?.extraData?.hora_fin}</SText>
                        </SView>
                        <SView flex height center>
                            <SText>{distancia + " Km"}</SText>
                        </SView>
                        <SView flex height center>
                            <SText>{"Bs " + SMath.formatMoney(proximo_horario?.pack?.precio ?? 0)}</SText>
                        </SView>
                    </SView>
                </SView>
                <Restaurante.Favorito data={this.props.data} style={{
                    position: "absolute",
                    top: 2, right: 4
                }} />
                <Restaurante.Disponibles data={this.props.data} style={{
                    position: "absolute",
                    top: 8, left: 4
                }} />
                {/* <SText>{JSON.stringify(this.props.data)}</SText> */}
            </SView>

        );
    }
}
export default (index);