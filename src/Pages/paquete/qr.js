import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage, SDate } from 'servisofts-component';
import { AccentBar, BottomNavigator } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SectionApis from '../login/components/SectionApis';
import BtnSend from './components/BtnSend';
import Header from './components/Header';
import Card from './components/Card';
import SSocket from 'servisofts-socket'
import * as amortizar from "./amortizar"
import SShared from '../../Components/SShared';

class qr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

    componentDidMount() {
        console.log("Enviando")
        this.setState({ loading: true })
        SSocket.sendPromise({
            component: "paqueteVentaUsuario",
            type: "getQr",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            key_paquete: this.params.pk,
            key_sucursal: this.params.sucursal
        }, 60 * 1000).then(e => {
            this.setState({ loading: false, dataqr: e.data })
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e)
        })
    }
    render_with_data() {
        var paquete = Model.paquete.Action.getAll();
        if (!paquete) return <SLoad />

        return <SList
            buscador={"true"}
            center
            space={15}
            initSpace={15}
            data={Object.values(paquete)}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} pkSucursal={this.params.pk} />
            }}
        />

    }

    getQr() {
        var po = this.state.pay_order;
        if (!po) return null;
        var obj = po.data;
        if (!obj) return null;
        return "data:image/jpeg;base64," + obj?.image_data;
    }

    render() {
        var defaultData = {
            ...this.params,
        };


        return (
            <SPage
                footer={this.footer()}
                title={"Pago QR"}
            >
                <Container>
                    {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Comprar</SText>
                    </SView> */}
                    <SHr height={20} />
                    <SView center col={"xs-12"} style={{ backgroundColor: STheme.color.card, borderRadius: 16 }} >
                        <SView col={"xs-12"} center row flex>
                            <SHr height={16} />

                            <SView col={"xs-9"} border={'transparent'}  >
                                <SText fontSize={16} color='white' center> Para adquirir la membresía seleccionada debe cancelar por QR</SText>
                            </SView>
                            <SHr height={16} />
                            <SView col={"xs-12"} center >

                                <SView center col={"xs-9"} colSquare backgroundColor={"#fff"} style={{ borderRadius: 16 }}>
                                    <SImage src={"data:image/png;base64, " + this.state?.dataqr?.qrImage} width={"100%"} height={"100%"}
                                        enablePreview
                                        style={{
                                            // resizeMode: "contain"
                                            // resizeMode: "cover"
                                        }} />
                                    {/* <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black} ></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView> */}
                                </SView>
                                <SHr />
                                <SText>{this.state?.dataqr?.qrid}</SText>
                            </SView>

                            <SHr height={16} />
                            <SView col={"xs-12"} height={100} row center  >
                                <SView col={"xs-2"} height center>
                                </SView>
                                <SView flex center height={60} >
                                    <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => { SShared.saveB64(this.getQr()) }}>
                                        <SIcon name={"ImgSave"} fill={STheme.color.black} />
                                    </SView>
                                </SView>
                                <SView flex center height={60} >
                                    <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => { SShared.sharedB64(this.getQr()) }}>
                                        <SIcon name={"ImgShare"} fill={STheme.color.black} />
                                    </SView>
                                </SView>
                                <SView col={"xs-2"} height center></SView>
                            </SView>
                            <SHr height={16} />
                            {/* <Contador date={this.state?.pay_order?.fecha_exp} ></Contador> */}

                            <SHr height={20} />
                        </SView>
                    </SView>
                    <SHr height={20} />
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
export default connect(initStates)(qr);