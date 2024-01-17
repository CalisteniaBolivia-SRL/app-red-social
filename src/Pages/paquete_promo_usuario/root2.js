import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar, BottomNavigator, TopBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import BtnSend from '../registro/components/BtnSend';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.key_paquete = SNavigation.getParam("pk", '397c3437-8237-44b2-9f6b-38e1f8e847d9')
    }





    render_alvaro() {
        var paquete = Model.paquete.Action.getByKey(this.key_paquete);
        if (!paquete) return <SLoad />
        var { key, descripcion, observacion, dias, precio, participantes } = paquete;
        return <>

            <SView col={"xs-11"} height={"95%"} border={'yellow'} style={{borderWidth:2, borderRadius:12, padding:16}} row onPress={() => {
                SNavigation.navigate("/paquete", { key_servicio: "1" }); this.fadeOut();
            }} >
                <SText color={STheme.color.text} font='OpenSans-ExtraBold' fontSize={32} style={{ textTransform: "uppercase" }} center>🎉FULL PROMO🎉</SText>
                <SHr></SHr>
                <SHr></SHr>

                <SView center style={{
                    width: "100%",
                    height: 350,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    overflow: "hidden"
                }}>
                    <SImage src={SSocket.api.root + "paquete/" + this.key_paquete + "?time=" + new Date().getTime()} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
                </SView>
                <SHr></SHr>
                <SHr></SHr>
                <SView col={"xs-12"} height>
                    <SText color={"red"} fontSize={18} style={{ textTransform: "uppercase" }} center>Obserbacion del paquete</SText>
                    <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }} center>{observacion}</SText>
                    <SHr></SHr>
                    <BtnSend onPress={() => { SNavigation.navigate("/paquete", { key_servicio: "1" }); }} >Adquirir paquete</BtnSend>
                </SView>

            </SView>
        </>
    }
    navBar() {
        return <TopBar type={"home"} />
    }
    render() {
        var defaultData = {
            ...this.params,
        };

        return (
            <SPage
                center
            // navBar={this.navBar()}
            // footer={this.footer()}
            // title={"Comprar"}
            // hidden
            // onRefresh={(resolve) => {
            //     Model.servicio.Action.CLEAR();
            //     if (resolve) resolve();
            // }}
            >
                <Container >
                    {this.render_alvaro()}
                </Container>
            </SPage>
        );
    }
    // footer() {
    //     return <>
    //         <BottomNavigator url={"/servicio"} />
    //     </>
    // }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);