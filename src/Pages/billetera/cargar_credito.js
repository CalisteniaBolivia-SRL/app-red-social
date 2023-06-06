import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SInput, SPopup, } from 'servisofts-component';
import { WebView } from 'react-native';
import Model from '../../Model';
import { PButtom } from '../../Components';
import TipoPago from '../../Components/TipoPago/Select';
import SSocket from 'servisofts-socket'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHeaderBilletera() {
        return <SView col={"xs-12"} center style={{ backgroundColor: "transparent" }}>
            <SHr height={20} />
            <SView col={"xs-12"}><SText col={"xs-12"} fontSize={24} center>¡Recarga crédito a tu billetera!</SText></SView>
            <SHr height={25} />
            <SView col={"xs-12"}><SText fontSize={16} color={'#979797'} center>Compra crédito para facilitar la compra de tus packs.</SText></SView>
            <SHr height={25} />
            <SInput type={'money'} ref={(ref) => { this.input = ref }} style={{ maxWidth: 350 }} isRequired={true} placeholder={"0"} placeholderTextColor={STheme.color.gray} />
            <SHr height={20} />
        </SView>
    }


    getDetalleBilletera(fecha, descripcion, monto) {
        return <SView key={fecha} col={"xs-12"} center>
            <SHr height={10} />
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center >
                <SView col={"xs-12"} row backgroundColor={STheme.color.card} height={52} center style={{ borderRadius: 8 }}>
                    <SView col={"xs-8 md-9"} height style={{
                        justifyContent: "center",
                    }}>
                        <SText color={STheme.color.text} fontSize={12} style={{ paddingLeft: 4 }} >{fecha}</SText>
                        <SHr height={4} />
                        <SText color={STheme.color.gray} fontSize={10} style={{ paddingLeft: 4 }} >{descripcion}</SText>
                    </SView>
                    <SView col={"xs-4 md-3"} style={{ textAlign: "right" }} row >
                        <SIcon name={monto > 0 ? 'Ingreso' : 'Egreso'} width={20} height={15} fill={"#8DBF3B"} /><SView col={"xs-1"} />
                        <SText color={STheme.color.text} fontSize={14}>{SMath.formatMoney(monto)}</SText>
                    </SView>
                </SView>
            </SView>
        </SView>
    }



    getDetalle(obj) {
        if (obj.tipo_pago == 'compra_tapeke') {
            return obj.detalle
        }
        if (obj.tipo_pago == 'Manual') {
            return "Cargado por tapeke"
        }
        return obj.tipo_pago
    }


    getBoton() {
        return <>
            <SView col={"xs-10"} row center   >
                <SHr height={30} />
                <PButtom fontSize={20} loading={this.state.loading} onPress={() => {

                    var values = {
                        business_name: null,
                        nit: null
                    }
                    if (!this.input.verify()) {
                        return null;
                    }
                    var tipoPago = this.tipoPago.getValue();
                    if (!tipoPago) {
                        SPopup.alert("Seleccione un metodo de pago")
                        return null;
                    }
                    var usuario = Model.usuario.Action.getUsuarioLog();
                    var timeOut = 15000;
                    var typeQhuantuy = ""
                    var card = "";
                    switch (tipoPago.key) {
                        case "QR":
                            typeQhuantuy = "QR"
                            timeOut = 30000;
                            break;
                        case "Credito":
                            typeQhuantuy = "CYBERSOURCE"
                            timeOut = 60 * 1000;
                            console.log(tipoPago);
                            card = tipoPago.tageta;
                            break;
                    }

                    var client = {
                        "razon_social": values["business_name"] ?? (usuario["Nombres"] + " " + usuario["Apellidos"]),
                        "nit": values["nit"] ?? "",
                        "phone": usuario["Telefono"] ?? "",
                        "email": usuario["Correo"]
                    }
                    this.setState({ loading: true });
                    SSocket.sendPromise(
                        {
                            "component": "billetera",
                            "type": "select_pay_method",
                            "monto": parseFloat(this.input.getValue()),
                            "key_usuario": usuario.key,
                            "pay_method": typeQhuantuy,
                            "client": client,
                            "card": card
                        }, timeOut
                    ).then((resp) => {
                        this.setState({ loading: false });
                        console.log(resp);
                        switch (tipoPago.key) {
                            case "QR":
                                SNavigation.navigate("/billetera/qr", { data: JSON.stringify(resp.data) })
                                break;
                            case "Credito":
                                SNavigation.navigate("/billetera");
                                break;
                        }
                    }).catch((err) => {
                        this.setState({ loading: false });
                        SPopup.alert("Error en el pago");
                        console.error("Error en el pago", err);
                    });
                }}>CARGAR CRÉDITO</PButtom>
                <SHr height={30} />
            </SView>
        </>
    }


    getContent() {
        // if (!Model.usuario.Action.getKey()) return <SText>No user</SText>
        var data = Model.billetera.Action.getAll({
            key_cliente: Model.usuario.Action.getKey()
        })
        // var data = Model.billetera.Action.getAllBy({
        //     key_cliente: Model.usuario.Action.getKey()
        // });
        if (!data) return <SLoad />
        return <SView col={"xs-10 sm-5 lg-4"} center>
            {this.getHeaderBilletera()}
            <TipoPago ref={(ref) => { this.tipoPago = ref }} blackList={['Billetera', 'Efectivo']} />
            {this.getBoton()}
        </SView>
    }

    render() {
        return (<SPage title={''} onRefresh={() => { Model.billetera.Action.CLEAR(); }} >
            <SView col={"xs-12"} center>{this.getContent()}</SView>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);