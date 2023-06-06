import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SForm, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BtnSend from './components/BtnSend';
import BtnSend2 from './components/BtnSend2';
import BackButtom from '../../Components/BackButtom';
class recuperar extends Component {
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

    render() {

        return (
            <SPage
                // navBar={this.navBar()}
                // footer={this.footer()}
                // footer={this.footer2()}
                // onRefresh={this.clearData}
                center
                disableScroll
                hidden
                footer={<BackButtom />}
            >
                <SView col={"xs-11"} flex backgroundColor={STheme.color.primary} center >
                    <Container>
                        <SView center >
                            <SIcon name={"Icarnet"} fill={STheme.color.text} height={154} width={154} />
                        </SView>
                        <SHr height={35} />
                        <SView center col={"xs-10"} >
                            <SText center font="Oswald-Bold" fontSize={22}
                                style={{
                                    textTransform: "uppercase"
                                }}>Por favor, introduce tu número de carnet</SText>
                        </SView>
                        <SHr height={35} />
                        <SForm
                            ref={(ref) => { this.form = ref; }}
                            style={{
                                justifyContent: "space-between",
                            }}
                            inputProps={{
                                col: "xs-12",
                                separation: 16
                            }}
                            inputs={{
                                Password: { placeholder: "Número de carnet", isRequired: true },
                            }}
                            onSubmit={(values) => {
                                SNavigation.navigate("/cuenta/encontrado", {  ...this.params});
                            }}
                        />
                        <SHr height={35} />
                        <BtnSend2
                            onPress={() => {
                                this.form.submit();
                                
                            }}
                            style={{ zIndex: 99999, position: "absolute" }}
                        >Continuar
                        </BtnSend2>
                        <SHr height={30} />

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
export default connect(initStates)(recuperar);