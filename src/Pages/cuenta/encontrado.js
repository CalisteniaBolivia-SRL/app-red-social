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
class encontrado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
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

    render_with_data() {
        // console.log(this.params.pk)
        // console.log(this.state.data)
        // var sucursal_servicio = Model.sucursal_servicio.Action.getAll();
        // var usuario = Model.usuario.Action.getByKey(this.params.keyUser);
        // var sucursal_servicio = {}
        // var sucursales = {}
        // if (!usuario) return <SLoad />
        // if (!sucursal_servicio) return <SLoad />
        // console.log(usuario)
        var dataUser = this.params.dataUser
        return <CardUser datas={dataUser} root={'/paquete/membresia'} />

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
                            titulo={"¡HEMOS ENCONTRADO TU CUENTA!"}
                            icon={"Ifest"}
                            descripcion={"Por favor, verifica tus datos para continuar."}
                        />
                        <SHr height={25} />
                        {this.render_with_data()}
                        {/* <CardUser datas={this.params.keyUser} /> */}
                        <SHr height={35} />
                        <BtnSend2
                            onPress={() => {
                                SNavigation.navigate("/paquete/membresia/confirmar", { ...this.params });
                            }}
                            style={{ zIndex: 99999, position: "absolute" }}
                        >Sí, es mi cuenta
                        </BtnSend2>
                        <SHr height={10} />
                        <BtnSend3
                            onPress={() => {
                                SNavigation.navigate("/cuenta");
                            }}
                            style={{ zIndex: 99999, position: "absolute" }}
                        >No, no es mi cuenta
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
export default connect(initStates)(encontrado);