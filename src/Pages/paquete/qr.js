import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage, SDate, SThread } from 'servisofts-component';
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
import BarraCargando from '../../Components/BarraCargando';

const debugData = {
    dataUser: {
        key: "c4310023-4413-42dd-9676-e9ed1bd862dc"
    },
    pk: "7b924269-dad6-47a8-bc5d-b3d48cd3ef98",
    sucursal: "08a66311-af52-4461-8ca8-2c1e445b60aa",
}
class qr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
        // this.params = debugData;
    }


    componentDidMount() {

        this.setState({ loading: true })
        let key_usuario = "";
        if (this.params.dataUser) {
            key_usuario = this.params.dataUser.key
        } else {
            key_usuario = Model.usuario.Action.getKey()
        }
        SSocket.sendPromise({
            component: "paqueteVentaUsuario",
            type: "getQr",
            estado: "cargando",
            key_usuario: key_usuario,
            key_paquete: this.params.pk,
            key_sucursal: this.params.sucursal
        }, 60 * 2000).then(e => {
            this.setState({ loading: false, dataqr: e.data })
            this.isRun = true;
            this.hilo()
            console.log(e);
        }).catch(e => {
            this.setState({ loading: false })
            console.error(e)
        })
    }

    componentWillUnmount() {
        this.isRun = false;
    }

    hilo = () => {
        if (!this.isRun) return;
        new SThread(5000, "verificar_pago", true).start(() => {
            if (!this.isRun) return;
            this.verificarPago();
            this.hilo();
        })
    }

    verificarPago() {
        let key_usuario = "";
        if (this.params.dataUser) {
            key_usuario = this.params.dataUser.key
        } else {
            key_usuario = Model.usuario.Action.getKey()
        }
        SSocket.sendPromise({
            component: "paqueteVentaUsuario",
            type: "verificarPago",
            estado: "cargando",
            qrid: this.state.dataqr.qrid,
            key_usuario: key_usuario,
            key_paquete: this.params.pk,
            key_sucursal: this.params.sucursal,
        }).then(e => {
            if (e.data.fecha_pago) {
                SNavigation.navigate("/paquete/compra_exitosa")
            }
        }).catch(e => {
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
        var po = this.state?.dataqr
        if (!po) return null;

        return "data:image/jpeg;base64," + po?.qrImage;
    }

    getQRComponent() {
        if (!this.state?.dataqr) {
            return <SView col={"xs-12"} height center >
                <SText color={STheme.color.gray} col={"xs-10"} center bold>{"Solicitando el código QR al banco.\nEs posible que tome un poco de tiempo."}</SText>
                <SHr h={16} />
                <BarraCargando col={"xs-11"} />
            </SView>
        }
        return <SImage src={this.getQr()} width={"100%"} height={"100%"}
            enablePreview
            style={{
                // resizeMode: "contain"
                // resizeMode: "cover"
            }} />
    }
    render() {
        var defaultData = {
            ...this.params,
        };

        // return <SPage
        //     footer={this.footer()}
        //     title={"Pago QR"}
        //     center
        // >
        //     <Container>
        //         <SText fontSize={24} bold>PROXIMAMENTE!!!</SText>
        //         <SHr />
        //         <SHr />
        //         <SText fontSize={14} center>Proximamente podras adquirir tu subscripcion por medio de un QRSimple.</SText>
        //     </Container>
        // </SPage>
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
                                    {this.getQRComponent()}
                                    {/* <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black} ></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView>
                                        <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} fill={STheme.color.black}></SIcon></SView> */}
                                </SView>
                                <SHr />
                                <SText fontSize={10} color={STheme.color.gray}>{this.state?.dataqr?.qrid}</SText>
                            </SView>

                            <SHr height={16} />
                            <SView col={"xs-12"} height={100} row center  >
                                <SView col={"xs-2"} height center>
                                </SView>
                                <SView flex center height={60} >
                                    <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => {
                                        SShared.saveB64(this.getQr())
                                    }}>
                                        <SIcon name={"ImgSave"} fill={STheme.color.black} />
                                    </SView>
                                </SView>
                                <SView flex center height={60} >
                                    <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.black, borderWidth: 2, padding: 8 }} onPress={() => {
                                        SShared.sharedB64(this.getQr(), { message: "", titulo: "" })
                                    }}>
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
                    <SHr />
                    <SView onPress={() => {
                        this.verificarPago();
                    }} padding={8} card><SText>{"VERIFICAR PAGO"}</SText></SView>
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