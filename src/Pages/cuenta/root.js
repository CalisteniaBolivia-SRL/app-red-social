import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView, SForm } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BtnSend2 from './components/BtnSend2';
import BackButtom from '../../Components/BackButtom';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            carnet: ""
        };
        this.params = SNavigation.getAllParams();
    }

    componentDidMount() {

    }

    clearData() {
        Model.pedido.Action.CLEAR();
        Model.horario.Action.CLEAR();
        Model.pack.Action.CLEAR();
        Model.restaurante.Action.CLEAR();
        Model.favorito.Action.CLEAR();
        Model.publicacion.Action.CLEAR();
    }

    navBar() {
        return <TopBar type={"home"} />
    }

    renderFooter() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 1.26
        return <SView col={"xs-12"} height={h} style={{
            position: "absolute",
            bottom: 0,
            right: -20,
            zIndex: -9
        }}>
            <SIcon name={"Footer"} />
        </SView>
    }

    render() {

        return (
            <SPage
                // navBar={this.navBar()}
                // footer={this.footer()}
                // footer={this.footer2()}
                // onRefresh={this.clearData}
                hidden
                disableScroll
                footer={<BackButtom />}
                center
            >
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <Container >
                        <SHr height={15} />
                        <SView center col={"xs-12"}>
                            <SIcon name={"logowhite"} fill={STheme.color.text} height={80} />
                        </SView>
                        <SHr height={35} />
                        <SView center col={"xs-10"} >
                            <SText center font="Oswald-Bold" fontSize={22}
                                style={{
                                    textTransform: "uppercase"
                                }}>Para adquiri el paquete debes instroducir tu carnet de identidad</SText>
                        </SView>
                        <SHr height={35} />
                        <SForm
                            center
                            ref={(ref) => { this.form = ref; }}
                            style={{
                                justifyContent: "space-between",
                            }}
                            inputProps={{
                                col: "xs-12",
                                separation: 16
                            }}
                            inputs={{
                                Ci: { placeholder: "Número de carnet", isRequired: true },
                            }}
                            onSubmit={(values) => {
                                SSocket.sendPromise({
                                    ...Model.usuario.info,
                                    "type": "getByDato",
                                    "estado": "cargando",
                                    "cabecera": "registro_administrador",
                                    "key_dato": "CI",
                                    "dato": values.Ci
                                }).then((e) => {
                                    if (e.estado != "exito") return;

                                    switch (true) {
                                        case (Object.keys(e.data).length === 0):
                                            SNavigation.navigate("/cuenta/noencontrado", { ...this.params, ci: values.Ci });
                                            break;
                                        case (Object.keys(e.data).length === 1):
                                            SNavigation.navigate("/cuenta/encontrado", { ...this.params, dataUser: Object.values(e.data)[0] })
                                            break;
                                        case (Object.keys(e.data).length > 1):
                                            SNavigation.navigate("/cuenta/coincidencia", { ...this.params, dataUser: e.data });
                                            break;
                                    }

                                }).catch((e) => {
                                    console.error(e)
                                })


                            }}
                        />
                        <BtnSend2
                            onPress={() => {
                                this.form.submit();
                            }}
                        >Continuar
                        </BtnSend2>
                        <SHr height={65} />
                        <SView center col={"xs-8"}
                            onPress={() => {
                                SNavigation.navigate("/registro");
                            }}
                        >
                            <SText fontSize={12} center>
                                Si eres nuevo en nuestra app y quieres participar de nuestra red social regístrate AQUÍ
                            </SText>
                        </SView>
                        <SHr height={35} />
                    </Container>
                    {this.renderFooter()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);