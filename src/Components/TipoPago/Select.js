import React, { Component } from 'react';
import { SHr, SIcon, SImage, SNavigation, SText, STheme, SView, SLoad, SInput } from 'servisofts-component';


class TipoPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KeytipoPago: null,
            tipoPago: null,
        };
    }
    componentDidMount() {
        // this.props.callback({ tipopago: this.state.KeytipoPago })
    }
    getValue() {
        if (!this.state.KeytipoPago) return null;
        var data = {
            key: this.state.KeytipoPago,
        };
        if (this.state.KeytipoPago == "TigoMoney") {
            if (!this.inptTelefono.verify()) {
                return null;
            }
            data.phone = this.inptTelefono.getValue();
            data.phone = data.phone.replace("+591 ", '');
            if (data.phone) {
                data.phone = data.phone.replace(" ", '');
            }
        }
        if (this.state.KeytipoPago == "Credito") {
            var card = this.state.obj_tarjeta;
            data.tageta = {
                "expiration_year": card.ano,
                "cvv_code": parseInt(card.codigo_seguridad),
                "credit_card_number": parseInt(card.numero_tarjeta),
                "card_holder_name": card.nombre,
                "encryption": false,
                "expiration_month": card.mes,
                "card_holder_email": "rickypazd@icloud.com",
                "tokenization": false
            };
        }
        return data;
    }
    item(key, descripcion, imagen) {
        if (this.props.blackList) {
            if (this.props.blackList.includes(key)) {
                return null;
            }
        }
        return <>
            <SHr height={15} />
            <SView col={"xs-12"} row center height={60} onPress={() => {
                var tarjetaNumber = "";
                if (key == "Credito") {
                    var pagina = "";
                    pagina = "/tarjeta";

                    SNavigation.navigate(pagina, {
                        callback: (tarjeta) => {
                            this.state.KeytipoPago = key;
                            this.state.tipoPago = descripcion;
                            var digitos = tarjeta.numero_tarjeta.slice(-4);
                            this.tarjetaNumber = "*** *** *** " + digitos;
                            this.state.obj_tarjeta = tarjeta;
                            this.setState({ ...this.state });

                        },
                    });
                    return;
                }
                this.state.KeytipoPago = key;
                this.state.tipoPago = descripcion;
                // if (this.props.callback) this.props.callback({ tipopago: this.state.KeytipoPago })
                this.setState({ ...this.state });
                // end document
            }}>
                <SView col={"xs-2.5"} >
                    <SView center style={{ width: 55, height: 55, borderRadius: 4, borderWidth: 1, borderColor: STheme.color.card }}>
                        <SImage src={imagen} style={{ width: 50 }} />
                    </SView>
                </SView>
                <SView col={"xs-0.5"} />
                <SView col={"xs-8"} height center>
                    <SText fontSize={14} col={"xs-12"} >{descripcion}</SText>
                    {key == "Credito" ? <SText fontSize={12} col={"xs-12"} > {this.tarjetaNumber ?? "Seleccionar tarjeta."} </SText> : null}
                </SView>
                <SView col={"xs-1"} center>
                    <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                        backgroundColor={this.state.tipoPago == descripcion ? STheme.color.primary : 'transparent'}
                    ></SView>
                </SView>
            </SView>
        </>
    }

    getTelefono() {
        if (this.state.KeytipoPago != "TigoMoney") return null;
        return (
            <SView col={"xs-11"} center >
                <SHr height={15} />
                <SInput fontSize={16} placeholder={"_  _  _  _  _  _  _"}
                    type={'telefono'}
                    isRequired={true}
                    height={55}
                    center
                    defaultValue={this.props?.defaultPhone}
                    ref={(ref) => { this.inptTelefono = ref }}
                />
            </SView>
        )
    }
    render() {
        return <SView col={"xs-12 "} center style={{ backgroundColor: STheme.color.white }} >
            <SView col={"xs-12"} row center style={{ borderWidth: 2, borderColor: STheme.color.card, borderRadius: 6 }}>
                <SView col={"xs-11"} row >

                    <SHr height={15} />
                    {this.item("Billetera", "Billetera Tapeke", require('../../Assets/img/tapeke.png'))}
                    {this.item("Credito", "Tarjeta de Debito / Crédito", require('../../Assets/img/Ptarjeta.png'))}
                    {/* {this.item("Fassil", "Banco FASSIL", require('../../../../../Assets/img/Pfassil.png'))} */}
                    {this.item("QR", "Transferencia QR", require('../../Assets/img/Ptransferencia.png'))}
                    {this.item("Efectivo", "Efectivo", require('../../Assets/img/efectivo_1.png'))}
                    {/* {this.item("TigoMoney", "Tigo Money", require('../../Assets/img/Ptigo.png'))} */}

                </SView>
                {this.getTelefono()}

                <SHr height={15} />
            </SView>
        </SView>
    }
}


export default TipoPago;