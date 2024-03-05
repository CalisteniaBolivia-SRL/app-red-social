import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from '../registro/components/BtnSend';

class root_backup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.key_paquete = SNavigation.getParam("pk")
    }

    render_alvaro() {
        var paquete = Model.paquete.Action.getByKey(this.key_paquete);
        if (!paquete) return <SLoad />
        var { key, descripcion, observacion, dias, precio, participantes } = paquete;
        return <>
            <SView col={"xs-11"} height={"100%"} center border={'yellow'} style={{ borderWidth: 2, borderRadius: 12, padding: 16 }} row onPress={() => {
                SNavigation.navigate("/paquete_promo_usuario/sucursales", { key_paquete: this.key_paquete });
            }} >
                <SText color={STheme.color.text} font='OpenSans-ExtraBold' fontSize={32} style={{ textTransform: "uppercase" }} center>🎉FULL PROMO🎉</SText>
                {/* <SHr height={"10%"}></SHr> */}
                <SView center border={"transparent"} style={{
                    width: "100%",
                    height: 250,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    overflow: "hidden"
                }}>
                    <SImage src={SSocket.api.root + "paquete/" + this.key_paquete + "?time=" + new Date().getTime()} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
                </SView>
                {/* <SHr></SHr> */}
                {/* <SHr></SHr> */}
                <SView col={"xs-12"}  >
                    {/* <SText color={"red"} fontSize={18} style={{ textTransform: "uppercase" }} center>Obserbacion del paquete</SText> */}
                    <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{observacion}</SText>
                    <SHr></SHr>
                    <BtnSend onPress={() => { SNavigation.navigate("/paquete_promo_usuario/sucursales", { key_paquete: this.key_paquete }); }} >ADQUIRIR PAQUETE</BtnSend>
                </SView>
            </SView>
        </>
    }

    render() {
        return (
            <SPage center  >
                <Container >
                    {this.render_alvaro()}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root_backup);