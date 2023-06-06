import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SImage, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
export default class pendiente_pago extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    btn = ({ title, onPress, active }) => {
        return <SView col={"xs-5.5"} height={44} center border={STheme.color.primary} backgroundColor={active ? STheme.color.primary : ""} style={{ borderRadius: 8 }} onPress={onPress}  >
            <SText fontSize={14} color={active ? STheme.color.secondary : STheme.color.primary} bold>{title}</SText>
        </SView>
    }


    getDetalleDelivery() {
        if (!this.props?.data?.delivery) return null;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Envio</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. {SMath.formatMoney(this.props.data.delivery)}</SText>
            </SView>
        </SView>
    }
    getDetalleCupon() {
        if (!this.state.cupon) return null;;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Cupon:</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. -{SMath.formatMoney(this.state.cupon.monto)}</SText>
            </SView>
        </SView>
    }
    getViewDetalle() {
        const { delivery, precio, distancia, cantidad, key, nombre } = this.props.data;

        if (!key) {
            return null;
        }
        // console.log(this.props.data.restaurante)
        // this.auxPedido = Parent.Actions.getDetalle(key, this.props)
        // if (!this.auxPedido) return <SLoad />
        // Validations.pedido_en_curso("pedido/confirmar");
        return <>
            <SView col={"xs-12 "} center row style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SView col={"xs-12"}>
                        <SHr height={15} />
                        <SText fontSize={18} bold>Detalle pedido</SText>
                        <SHr height={15} />
                    </SView>
                    <SView center col={"xs-2"} height={85} style={{ borderRadius: 8, overflow: 'hidden', }}>

                        <Restaurante.FotoPerfil data={this.props.data.restaurante} style={{
                            width: "100%",
                            position: "relative",
                            resizeMode: "cover"
                        }} />

                        {/* <SImage src={SSocket.api.root+"restaurante/"+this.auxPedido.restaurante?.key} style={{
                            width: "100%",
                            position: "relative",
                            resizeMode: "cover"
                        }} /> */}
                    </SView>
                    <SView col={"xs-10"} row >
                        <SView col={"xs-1"}  >
                        </SView>
                        <SView col={"xs-11"} row >
                            <SView col={"xs-12"} >
                                {/* <SText color={STheme.color.text} fontSize={14} bold  >{nombre}</SText> */}
                            </SView>
                            <SHr height={15} />
                            <SView col={"xs-6"} style={{ justifyContent: 'flex-start', }}>
                                <SText fontSize={14} color={STheme.color.primary} bold> Precio</SText>
                                <SHr height={5} />
                                <SText fontSize={20} bold>Bs. {precio} </SText>
                            </SView>
                            <SView col={"xs-6"} center row>
                                <SView col={"xs-12"} center>
                                    <SText fontSize={14} color={STheme.color.primary} >Cantidad</SText>
                                </SView>
                                <SHr height={5} />
                                <SView col={"xs-12"} center   >
                                    <SView col={"xs-6"} center style={{ height: 40, backgroundColor: STheme.color.card, borderRadius: 6 }}>
                                        <SText fontSize={14}     > {cantidad} </SText>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                        <SHr height={5} />
                    </SView>

                    <SHr height={15} />
                    <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                    <SHr height={12} />
                    <SView col={"xs-12"} center>
                        <SText fontSize={16} bold>{delivery == 0 ? "Recoger del lugar" : "Envio a domicilio"}</SText>
                    </SView>
                    <SHr height={18} />
                </SView>
            </SView>
            <SHr height={18} />
            <SView col={"xs-12  "} row center style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SHr height={15} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify" }} fontSize={15}   >Total</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15}   >Bs. {SMath.formatMoney(precio * cantidad)}</SText>
                    </SView>
                    <SHr height={10} />
                    {this.getDetalleDelivery()}
                    <SHr height={10} />
                    {this.getDetalleCupon()}
                    <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                    <SHr height={10} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify" }} fontSize={15} bold>Total:</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15} bold >Bs. {SMath.formatMoney(((precio * cantidad) + parseFloat(delivery)) - (this.state?.cupon?.monto ?? 0))}</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>

        </>
    }

    popupConfirmacion() {
        var INSTACE = this;
        return <SView
            style={{
                width: "100%",
                maxWidth: 365,
                height: 210,
                borderRadius: 30,
                padding: 8

            }}
            center
            withoutFeedback
            backgroundColor={STheme.color.background}
        >
            <SHr />
            <SHr />
            <SView col={"xs-8"} center>
                <SText color={STheme.color.darkGray} style={{ fontSize: 20 }} center >¿Estás seguro que deseas realizar este pedido?</SText>
            </SView>

            <SView flex />
            <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                    {this.btn({ title: "No, cancelar", onPress: () => { SPopup.close("confirmar"); }, active: false })}
                    <SView col={"xs-1"} />
                    {this.btn({ title: "Sí, Confirmar", onPress: () => { INSTACE._form.submit() }, active: true })}
                </SView>
            </SView>
            <SView flex />
            <SView col={"xs-11"} center>
                <SText color={STheme.color.darkGray} style={{ fontSize: 12 }} center >IMPORTANTE: Por favor tome en cuenta que no se podrá cancelar el pedido posteriormente.</SText>
            </SView>
            <SHr />
            <SHr />
        </SView>
    }

    getViewFactura() {
        return <SForm
            ref={(form) => { this._form = form; }}
            col={"xs-12  "}
            inputProps={{
                customStyle: "default",
                style: {
                    height: 50,
                    width: "100%",
                    borderWidth: 0,
                    fontSize: 10,
                    borderRadius: 4,
                    fontSize: 14,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff"
                }
            }}
            center
            inputs={{
                nit: { icon: <SText bold width={50} center>Nit: </SText>, placeholder: "N/R" },
                business_name: { icon: <SText bold width={50} center>R.S.: </SText>, placeholder: "N/R" },
            }}
            onSubmit={(values) => {
                var usuario = Model.usuario.Action.getUsuarioLog();
                var timeOut = 15000;
                var tipoPago = this.state.tipoPagoSelect
                var typeQhuantuy = ""
                var card = "";
                switch (tipoPago.key) {
                    case "QR":
                        typeQhuantuy = "QR"
                        timeOut = 15000;
                        break;
                    case "Efectivo":
                        typeQhuantuy = "Efectivo"
                        timeOut = 15000;
                        break;
                    case "Billetera":
                        typeQhuantuy = "Billetera"
                        timeOut = 15000;
                        break;
                    case "Credito":
                        typeQhuantuy = "CYBERSOURCE"
                        timeOut = 4 * 60 * 1000;
                        console.log(tipoPago);
                        card = tipoPago.tageta;
                        break;
                }

                var client = {
                    "razon_social": values["business_name"] ?? (usuario["Nombres"] + " " + usuario["Apellidos"]),
                    "nit": values["nit"] ?? "",
                    "phone": usuario["Telefono"] ?? "",
                    "email": "rickypazd@icloud.com"
                }
                // Removimos tigo money
                // if (tipoPago.key == "TigoMoney") {
                //     client.ci = tipoPago.phone;
                //     client.phone = tipoPago.phone;
                // }

                SPopup.close("confirmar");
                this.setState({ loading: true });


                SSocket.sendPromise(
                    {
                        "component": "pedido",
                        "type": "select_pay_method",
                        "key_pedido": this.props.data.key,
                        "pay_method": typeQhuantuy,
                        "client": client,
                        "card": card,
                        "key_cupon_usuario": this.state?.cupon?.key_cupon_usuario,
                    }, timeOut
                ).then((resp) => {
                    this.auxPedido = resp.data;
                    console.log(resp);
                    if (this.auxPedido.state == "pendiente_pago") {
                        // SPopup.alert("No se pudo realizar el pago.")
                    } else {
                        // Validations.set_pedido_en_curso(this.auxPedido);
                        // Validations.pedido_en_curso("pedido/confirmar");
                    }
                    this.setState({ loading: false });
                }).catch((err) => {
                    this.setState({ loading: false });
                    if (err.pay_method == "Billetera") {
                        SPopup.open({ content: this.popupSinFondos(err.error), key: "sinFondos" });
                    } else {
                        SPopup.alert(err.error)
                    }

                });
            }} />
    }
    validateCupon(cupon) {
        if (cupon.monto_minimo_compra) {
            const { delivery, precio, distancia, cantidad, key } = this.props.data;
            var monto = (precio * cantidad);
            if (parseFloat(cupon.monto_minimo_compra) > parseFloat(monto)) {
                SPopup.alert("El monto minimo de compra del cupon es de " + cupon.monto_minimo_compra)
                return;
            }
        }
        this.setState({ cupon: cupon })
        SNavigation.goBack();
    }
    getAddCupon() {
        if (this.state.cupon) {
            return <SView col={"xs-12"} card center onPress={() => {
                SNavigation.navigate("/cupones/lista", {
                    onSelect: (cupon) => {
                        this.validateCupon(cupon);
                        // var monto = ((precio * cantidad) + parseFloat(delivery)) - (this.state?.cupon?.monto ?? 0));

                    }
                });
            }
            }>
                <SHr />
                <SView col={"xs-11"}>
                    <SText>CUPON SELECCIONADO</SText>
                    <SText>{this.state.cupon.monto}</SText>
                    <SText>{this.state.cupon.descripcion}</SText>
                </SView>
                {/* <SText>{JSON.stringify(this.state.cupon)}</SText> */}
                <SHr />
            </SView >
        }
        return <SView col={"xs-12"} center onPress={() => {
            SNavigation.navigate("/cupones/lista", {
                onSelect: (cupon) => {
                    this.validateCupon(cupon);
                }
            });
        }}>
            <SHr />
            <SText bold>Agregar cupón</SText>
            <SHr />
        </SView>
    }
    render() {
        const { delivery, precio, distancia, cantidad, key } = this.props.data;

        var blackList = [];
        if (!delivery) {
            //Cuando el pedido es 'Recojer del lugar' desactivamos los siguientes metodos de pago.
            blackList.push("Efectivo")
        }
        return (<SView col={"xs-12"} backgroundColor={STheme.color.card} >
            <Container>
                <SHr height={20} />

                {this.getViewDetalle()}
                <SHr height={20} />
                {this.getAddCupon()}
                <SHr height={20} />
                <TipoPago.Select ref={ref => this._tipoPago = ref} blackList={blackList} />
                <SHr height={20} />
                {this.getViewFactura()}
                <SHr height={20} />


                <PButtom loading={this.state.loading} onPress={() => {
                    this.state.tipoPagoSelect = this._tipoPago.getValue()
                    if (!this.state.tipoPagoSelect) {
                        SPopup.alert("Select a payment method");
                        return;
                    }
                    SPopup.open({ key: "confirmar", content: this.popupConfirmacion() });
                }}>CONFIRMAR</PButtom>
                <SHr height={40} />

            </Container>
        </SView>
        );
    }
}

