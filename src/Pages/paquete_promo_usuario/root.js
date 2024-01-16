import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar, BottomNavigator, TopBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';

// import SectionApis from '../login/components/SectionApis';
// import BtnSend from './components/BtnSend';
// import Header from './components/Header';
import Card from './components/Card';
import BackButtom from '../../Components/BackButtom';
import BtnSend from '../registro/components/BtnSend';

// let captura_key_paquete = '0b29859d-1c59-40f8-a447-c4786af0cef9';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
        this.key_sucursal = SNavigation.getParam("key_sucursal")
        this.key_paquete = SNavigation.getParam("key_paquete", '397c3437-8237-44b2-9f6b-38e1f8e847d9')
    }



    render_with_data() {
        var servicio = Model.servicio.Action.getAll();

        //  if(!this.state.sucursal_servicio) return null;

        // var servicio = Model.sucursal.Action.getAll();
        //var sucursal_servicio = Model.sucursal_servicio.Action.getAll();
        if (!servicio) return <SLoad />
        //if (!sucursal_servicio) return <SLoad />
        // console.log(sucursal_servicio);

        return <SList
            buscador={"true"}
            space={15}
            initSpace={15}
            data={Object.values(servicio)}
            filter={(a) => a.estado != 0 && !!a.estado_app}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} key_sucursal={this.key_sucursal} />
            }}
        />
    }

    render_alvaro() {
        var paquete = Model.paquete.Action.getByKey(this.key_paquete);
        if (!paquete) return <SLoad />
        var { key, descripcion, observacion, dias, precio, participantes } = paquete;
        return <>
            <SView col={"xs-11"} height={500} border={'cyan'} row onPress={() => {
                SNavigation.navigate("/paquete", { key_servicio: "1" }); this.fadeOut();
            }} >
                <SView center style={{
                    width: 350,
                    height: 350,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    overflow: "hidden"
                }}>
                    <SImage src={SSocket.api.root + "paquete/" + this.key_paquete + "?time=" + new Date().getTime()} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
                </SView>
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
                // navBar={this.navBar()}
                // footer={this.footer()}
                // title={"Comprar"}
                // hidden
                onRefresh={(resolve) => {
                    Model.servicio.Action.CLEAR();
                    if (resolve) resolve();
                }}
            >
                <Container>
                    {this.render_alvaro()}
                    {/* <SHr height={20} /> */}
                </Container>
            </SPage>
        );
    }
    footer() {
        return <>
            <BottomNavigator url={"/servicio"} />
        </>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);