import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BtnSend2 from './components/BtnSend2';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            zIndex: 9
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
                onRefresh={this.clearData}
                disableScroll
            >
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <Container
                        style={{
                            // position: 'relative',
                            // zIndex: 999
                        }}>
                        <SHr height={15} />
                        <SView center >
                            <SIcon name={"logowhite"} fill={STheme.color.text} height={80} />
                        </SView>
                        <SHr height={35} />
                        {/* <SView center col={"xs-10"} >
                            <SText center font="Oswald-Bold" fontSize={22}
                                style={{
                                    textTransform: "uppercase"
                                }}>¿Has asistido a nuestras sucursales antes? Si es así, puedes recuperar tu cuenta aquí</SText>
                        </SView> */}
                        <SHr height={35} />
                        {/* <BtnSend2
                            onPress={() => {
                                SNavigation.navigate("/cuenta/recuperar1");
                            }}
                        >Recuperar cuenta
                        </BtnSend2> */}
                        <SHr height={65} />
                        {/* <SView center col={"xs-8"}
                            onPress={() => {
                                SNavigation.navigate("/registro");
                            }}
                        >
                            <SText fontSize={12} center>
                                Si eres nuevo en nuestras sucursales, por favor crea una nueva cuenta AQUÍ
                            </SText>
                        </SView> */}
                        <SHr height={105} />
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