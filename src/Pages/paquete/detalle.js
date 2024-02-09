import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar, BottomNavigator, BtnNavegar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import BtnSend from './components/BtnSend';



class detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

    btn = ({ title, onPress, active }) => {
        return <SView col={"xs-5.5"} height={44} center border={STheme.color.secondary} backgroundColor={active ? STheme.color.secondary : STheme.color.white} style={{ borderRadius: 8 }} onPress={onPress}  >
            <SText fontSize={14} color={active ? STheme.color.white : STheme.color.secondary} bold>{title}</SText>
        </SView>
    }

    popupMensajeLogin() {
        var INSTACE = this;
        return <SView
            style={{
                width: "100%",
                maxWidth: 365,
                height: 210,
                borderRadius: 30,
                padding: 8

            }}
            center
            withoutFeedback
            backgroundColor={STheme.color.background}
        >
            <SHr />
            <SHr />
            <SView col={"xs-8"} center>
                <SText color={STheme.color.text} style={{ fontSize: 17 }} center >Para adquirir un paquete debe iniciar sesión</SText>
            </SView>

            <SView flex />
            <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                    {this.btn({ title: "Cancelar", onPress: () => { SPopup.close("confirmar"); }, active: false })}
                    <SView col={"xs-1"} />
                    {this.btn({ title: "Iniciar Sesión", onPress: () => { SNavigation.replace("/login"); SPopup.close("confirmar"); }, active: true })}
                </SView>
            </SView>
            <SView flex />
            {/* <SView col={"xs-11"} center>
                <SText color={STheme.color.text} style={{ fontSize: 12 }} center >IMPORTANTE: Por favor tome en cuenta que no se podrá cancelar el pedido posteriormente.</SText>
            </SView> */}
            <SHr />
            <SHr />
        </SView>
    }

    render_with_data() {
        // var usuario = Model.usuario.Action.getUsuarioLog();
        // if (!usuario) return <SLoad />
        var paquete = Model.paquete.Action.getByKey(this.params.pk);
        if (!paquete) return <SLoad />
        // console.log(JSON.stringify(usuario) + " aaaa");
        var { key, descripcion, observacion, dias, precio, participantes } = paquete;

        return <SView col={"xs-12"} center>

            <SView
                // height={125}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18
                }}
                row center
            >
                <SView col={"xs-3"} row  >
                    <SView style={{
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        overflow: "hidden"
                    }}>
                        <SImage enablePreview src={SSocket.api.root + "paquete/" + key + "?time=" + new Date().getTime()} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                </SView>
                <SView col={"xs-9"} height>
                    <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{descripcion}</SText>
                    <SHr h={4} />
                    <SView col={"xs-12"} flex>
                        <SText color={STheme.color.text} fontSize={12} >{observacion}</SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={16} />
            <SView
                height={105}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18
                }}
                row
            >
                <SView col={"xs-5.8"} center >
                    <SText fontSize={14} >Días</SText>
                    <SView row>
                        <SIcon name='Pdia' width={35} />
                        <SView width={15} />
                        <SText fontSize={32} >{dias}</SText>
                    </SView>
                </SView>
                <SView style={{ borderWidth: 1, borderRightColor: STheme.color.white }} height width={2}></SView>
                <SView col={"xs-5.8"} center>
                    <SText fontSize={14} >Participantes</SText>
                    <SView row>
                        <SIcon name='Pmodel' width={35} />
                        <SView width={15} />
                        <SText fontSize={32} >{participantes}</SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={16} />
            <SView
                height={105}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18,
                    borderColor: STheme.color.secondary,
                    borderWidth: 2
                }}
                center
            >
                <SText fontSize={18} >Precio</SText>
                <SView row>
                    <SIcon name='Pprecio' width={35} />
                    <SView width={15} />
                    <SText fontSize={32} >Bs. {precio}</SText>
                </SView>
            </SView>
            <SHr height={26} />
            <BtnSend
                onPress={() => {
                    var usuario = Model.usuario.Action.getUsuarioLog();
                    // if (!usuario) return SPopup.open({ key: "confirmar", content: this.popupMensajeLogin() });
                    if (!usuario) return SNavigation.navigate("/cuenta", { ...this.params });
                    let clonacion = {
                        ...this.params,
                        dataUser: usuario
                    }
                    SNavigation.navigate("/paquete/membresia/confirmar", clonacion);
                }}
            >Adquirir paquete</BtnSend>
        </SView>

    }

    render() {
        var defaultData = {
            ...this.params,
        };


        return (
            <SPage
                footer={this.footer()}
                title={"Detalle Membresía"}
            >
                <Container>
                    {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Detalle Membresía</SText>
                    </SView> */}
                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={60} />
                </Container>
            </SPage>
        );
    }
    footer() {
        return <BottomNavigator url={"/paquete"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(detalle);