import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BtnSend from './components/BtnSend';
import BtnSend2 from './components/BtnSend2';
import BackButtom from '../../Components/BackButtom';
import BtnSend3 from './components/BtnSend3';
import CardUser from './components/CardUser';
import Header from './components/Header';
class noencontrado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("ci");

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

    background() {
        return <>
            <SView
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    // zIndex: 9
                }}
            >
                <SIcon name={"Ibackg1"} height={146} width={50} />
            </SView>
            <SView
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 10,
                    zIndex: -9
                }}
            >
                <SIcon name={"Ibackg2"} height={185} width={50} />
            </SView>
        </>
    }

    render() {
        return (
            <SPage
                center
                disableScroll
                hidden
                footer={<BackButtom />}
            >
                <SView col={"xs-11"} flex backgroundColor={STheme.color.primary} center >
                    <Container>
                        <Header
                            titulo={"No hemos podido encontrar tu cuenta"}
                            icon={"Inoenco"}
                            descripcion={"Por favor, verifica que hayas introducido tu información correctamente o crea una nueva cuenta."}
                        />
                        <SHr height={25} />
                        <SView
                            col={"xs-12"}
                            style={{
                                borderRadius: 10,
                                padding: 10,
                                borderColor: STheme.color.darkGray,
                                borderWidth: 1
                            }}
                            row center
                        >
                            <SView col={"xs-11"} >
                                {/* USUARIO */}
                                {/* <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{usuario?.Nombres}</SText> */}
                                <SView row center>
                                    <SText color={STheme.color.text} fontSize={20} bold>
                                        Nro de carnet de identidad
                                    </SText>
                                    <SHr height={10} />
                                    <SView row>
                                        <SView row>
                                            <SIcon name='Icarnet2' width={15} />
                                            <SView width={5} />
                                            <SText fontSize={12} color={STheme.color.gray}>{this.pk}</SText>
                                        </SView>
                                        <SView width={20} />
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                        <SHr height={35} />
                        <BtnSend2
                            onPress={() => {
                                SNavigation.navigate("/cuenta");
                            }}
                            style={{ zIndex: 99999, position: "absolute" }}
                        >Volver a intentar
                        </BtnSend2>
                        <SHr height={10} />
                        <BtnSend3
                            onPress={() => {
                                SNavigation.navigate("/registro");
                            }}
                            style={{ zIndex: 99999, position: "absolute" }}
                        >Crear nueva cuenta
                        </BtnSend3>
                        {/* <SHr height={55} /> */}
                        <SHr height={35} />
                    </Container>
                    {this.background()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(noencontrado);