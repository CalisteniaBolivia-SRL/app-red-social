import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SUuid, SView } from 'servisofts-component';
import { AccentBar, Container, PButtom, Restaurante } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key_pack: null,
            key_pedido: SUuid(),
            precio: 15,
            cantidad: 1,
            disponible: 5,
            envio: false,
            delivery: "false",
        };
        this.pk = SNavigation.getParam("pk");
    }
    load_data() {
        this.data = Model.restaurante.Action.getByKeyRecursive(this.pk);
        if (!this.data) return null;
        return this.data;
    }

    getBotones() {
        return <SView width={114} center row border={'transparent'}  >
            <SView col={"xs-12"} center>
                <SView width={114} height={26} center style={{ borderRadius: 8, backgroundColor: STheme.color.primary }}>
                    <SText fontSize={12} color={STheme.color.secondary} >  {this.data?.proximo_horario?.pack?.cantidad_disponibles ?? 0} disponible(s)</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} center row>
                <SView col={"xs-3"} center row>
                    <SView width={36} height={36} center style={{ backgroundColor: "#FFE0CF", borderRadius: 17 }}
                        onPress={() => {
                            if (this.state.cantidad <= 1) return;
                            this.setState({ cantidad: this.state.cantidad - 1 });
                        }}>
                        <SText fontSize={32} height={52} color={STheme.color.primary} style={{}} center>-</SText>
                    </SView>
                </SView>
                <SView col={"xs-6"} row center >
                    <SText fontSize={35} color={STheme.color.text} center >{this.state.cantidad}</SText>
                </SView>
                <SView col={"xs-3"} center border={'transparent'} >
                    <SView width={36} height={36} center style={{ backgroundColor: STheme.color.primary, borderRadius: 17 }}
                        onPress={() => {
                            if (this.state.cantidad >= this.data?.proximo_horario?.pack?.cantidad_disponibles) return;
                            this.setState({ cantidad: this.state.cantidad + 1 });
                        }}>
                        <SText fontSize={32} height={45} color={STheme.color.white} style={{
                            // position: "absolute",
                        }} >+</SText>
                        <SHr height={4} />
                    </SView>
                </SView>
            </SView>

        </SView>
    }

    tipoEntrega(delivery) {
        return <>
            <SView col={"xs-11"} style={{ opacity: delivery == true ? 1 : 0.3 }}>
                <SHr height={15} />
                <SText fontSize={18} style={{ fontWeight: "bold" }}>Tipo de entrega</SText>
                <SHr height={20} />
                <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6, }}
                    {...(delivery ? {
                        onPress: () => { this.setState({ envio: false, delivery: "false" }); }
                    } : {})} >
                    <SView col={"xs-2"} center flex>
                        <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                            backgroundColor={this.state.envio != false ? "transparent" : STheme.color.primary} ></SView>
                    </SView>
                    <SView col={"xs-10"} >
                        <SHr height={15} />
                        <SText fontSize={18} col={"xs-12"} style={{ fontWeight: "bold" }}>Recoger del lugar </SText>
                        <SHr height={10} />
                        {/* <SText fontSize={14} col={"xs-12"}   >¡Se encuentra a  Km de tu ubicación!</SText> */}
                        {/* TODO: ricky  */}
                        <SText fontSize={14} col={"xs-12"}   >¡Se encuentra a {this.data.distancia} Km de tu ubicación!</SText>
                        <SHr height={15} />
                        <SView col={"xs-12"} row center>
                            <SView col={"xs-6"} >
                            </SView>
                            <SView col={"xs-6"} style={{ alignItems: "flex-end", }}
                                row
                                center>
                                <SIcon name={'ComoLlegar'} height={26} width={26} />
                                <SText color={STheme.color.primary} height={26} center fontSize={15} style={{ fontWeight: "bold" }}
                                    onPress={() => {
                                        SNavigation.navigate("/restaurante/comollegar", { pk: this.pk });
                                    }}
                                >Cómo llegar {">"}</SText>
                            </SView>
                        </SView>

                    </SView>
                    <SHr height={10} />
                </SView>
                <SHr height={15} />
                {this.tipo_domicilio(delivery)}
                <SHr height={15} />
            </SView>
        </>
    }

    tipo_domicilio(delivery) {
        if (!delivery) return null;
        return <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6 }}  {...(delivery ? {
            onPress: () => {
                if (this.costo_envio) {
                    if (this.costo_envio.monto) {
                        this.setState({ envio: this.costo_envio.monto, delivery: "true" })

                    }
                }
            }
        } : {})}>
            <SView col={"xs-2"} center flex>
                <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                    backgroundColor={this.state.envio != false ? STheme.color.primary : "transparent"} ></SView>
            </SView>
            <SView col={"xs-10"} >
                <SHr height={15} />
                <SText fontSize={18} style={{ fontWeight: "bold" }}>Envío a domicilio</SText>
                <SHr height={30} />
                {this.getCostoEnvio()}
                <SHr height={15} />
            </SView>
            <SHr height={10} />
        </SView>
    }

    getCostoEnvio() {
        // TODO: ricky
        var data_costos = Model.costo_envio.Action.getAll();
        if (!data_costos) return <SLoad />;
        var distancia = this.data.distancia * 1000;
        var costo = { metro: 0, };
        Object.values(data_costos).map(obj => {
            if (distancia <= obj.metro && (costo.metro > obj.metro || costo.metro == 0)) {
                costo = obj;
                return;
            }
        })
        // return costo.monto ? SMath.formatMoney(costo.monto) : "No ";
        if (costo.monto) {
            this.costo_envio = costo;
            return <SText fontSize={14}   >Costo del envío: Bs. {SMath.formatMoney(costo.monto)} </SText>
        } else {
            return <SText fontSize={14}   >No hay costos de envio</SText>
        }
    }

    // ejecutar() {
    //     this.aux = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
    //     if (!this.aux) return alert("No se encontró el pack");
    //     SSocket.sendPromise(
    //         {
    //             "component": "pedido",
    //             "version": "1.0",
    //             "key_pedido": this.state.key_pedido,
    //             "type": "registro",
    //             "estado": "cargando",
    //             "key_usuario": this.props.state.usuarioReducer.usuarioLog.key,
    //             "data": {
    //                 "key_pack": this.aux.pack.key,
    //                 "cantidad": this.state.cantidad,
    //                 "delivery": this.state.delivery,
    //                 "fecha": this.auxRestaurante.horario.fecha,
    //                 "direccion": {
    //                     "key_direccion_usuario": this.props.state.direccion_usuarioReducer.miDireccion.key,
    //                 }
    //             }
    //         }
    //     ).then((resp) => {
    //         this.state.key_pedido = SUuid();
    //         Validations.set_pedido_en_curso(resp.data);
    //         Validations.pedido_en_curso();
    //     }).catch((err) => {
    //         console.log("SPromiseerror ", err);
    //     });
    // }

    handlePress() {
        if (!Model.usuario.Action.getKey()) {
            SNavigation.navigate("/login");
            // SPopup.alert("Inicie session con un usuario para comprar un tapeke.")
            return;
        }
        var direccion_str = Model.filtros.Action.getByKey("direccion")?.select?.direccion;
        if (!direccion_str) {
            SPopup.alert("Inserte direccion para realizar el pedido.")
            return;
        }
        var key_direccion = Model.filtros.Action.getByKey("direccion")?.select?.key;
        var direccion = {};
        if (key_direccion) {
            direccion = {
                "key_direccion_usuario": key_direccion,
            }
        } else {
            var latitude = Model.filtros.Action.getByKey("direccion")?.select?.latitude;
            var longitude = Model.filtros.Action.getByKey("direccion")?.select?.longitude;
            direccion = {
                "direccion": direccion_str,
                "latitude": latitude,
                "longitude": longitude,
            }
        }
        this.setState({ loading: true });
        var resquest = {
            "key_usuario": Model.usuario.Action.getKey(),
            "key_pedido": this.state.key_pedido,
            "data": {
                "key_pack": this.data?.proximo_horario?.pack?.key,
                "cantidad": this.state.cantidad,
                "delivery": this.state.delivery,
                "fecha": this.data?.proximo_horario?.fecha,
                "direccion": direccion
            }
        }
        // return;
        Model.pedido.Action.registro(resquest).then((resp) => {
            console.log(resp)
            SNavigation.navigate("/pedido", { pk: resp.data.key })
            this.state.key_pedido = SUuid();
            this.setState({ loading: false });
        }).catch(e => {
            this.setState({ loading: false });
        })
    }

    render_data() {
        if (!this.load_data()) return <SLoad />
        return <SView col={"xs-12"} center>
            {/* <Container>
            </Container> */}

            <SView col={"xs-12"} height backgroundColor={STheme.color.card} style={{
                alignItems: "center",
            }}>
                <SHr height={18} />
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center row style={{ backgroundColor: STheme.color.white }}>
                    <SView col={"xs-11"} row center>
                        <SView col={"xs-12"}>
                            <SHr height={15} />
                            <SText fontSize={18} style={{ fontWeight: "bold" }}>Detalle pedido</SText>
                            <SHr height={15} />
                        </SView>
                        <SView col={"xs-12"} row backgroundColor={"transparent"} >
                            <SView center width={85} height={85} backgroundColor={"#eee"} style={{ borderRadius: 8, overflow: 'hidden', }}>

                                <Restaurante.FotoPerfil data={this.data} style={{ width: "100%", resizeMode: "cover" }} />

                            </SView>
                            <SView row flex height border={'transparent'} >
                                <SView width={4} />
                                <SView flex row >
                                    <SView col={"xs-12"} border={'transparent'}>
                                        <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.data?.nombre}</SText>
                                    </SView>
                                    <SHr height={6} />
                                    <SView style={{ justifyContent: 'flex-start', }} border={'transparent'} >
                                        <SText fontSize={14} style={{ fontWeight: "bold" }} color={STheme.color.primary} fontWeight>Precio</SText>
                                        <SText fontSize={16} style={{ fontWeight: "bold" }}>Bs. {SMath.formatMoney(this.data?.proximo_horario.pack?.precio ?? 0)}</SText>
                                    </SView>
                                    <SView flex />

                                    {this.getBotones()}
                                </SView>
                            </SView>
                        </SView>

                        <SHr height={15} />
                        <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                        <SHr height={18} />
                    </SView>
                </SView>
                <SHr height={18} />

                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} row center style={{ backgroundColor: STheme.color.white }}>
                    <SView col={"xs-11"} row center>
                        <SHr height={15} />
                        <SView col={"xs-6"} >
                            <SText style={{ textAlign: "justify" }} fontSize={15}   >Total</SText>
                        </SView>
                        <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={15}   >Bs. {SMath.formatMoney((this.state.cantidad * (this.data?.proximo_horario?.pack?.precio ?? 0)))}</SText>
                        </SView>
                        <SHr height={10} />
                        <SView col={"xs-6"} >
                            <SText style={{ textAlign: "justify" }} fontSize={15}   >Envío</SText>
                        </SView>
                        <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={15}   >{this.state.envio ? "Bs. " + SMath.formatMoney(this.state.envio) : null}</SText>
                        </SView>
                        <SHr height={10} />
                        <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                        <SHr height={10} />
                        <SView col={"xs-6"} >
                            <SText style={{ textAlign: "justify", fontWeight: "bold" }} fontSize={15}   >Total</SText>
                        </SView>
                        <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                            <SText fontSize={15} style={{ fontWeight: "bold" }} >Bs. {(this.state.cantidad * (this.data?.proximo_horario?.pack?.precio ?? 0)) + this.state.envio}</SText>
                        </SView>
                        <SHr height={15} />
                    </SView>
                </SView>
                <SHr height={18} />
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center style={{ backgroundColor: STheme.color.white }}>
                    {this.tipoEntrega(this.data?.delivery)}
                </SView>

                <SHr height={18} />
                <PButtom loading={this.state.loading} fontSize={20} onPress={this.handlePress.bind(this)}>REALIZAR PEDIDO</PButtom>
                <SHr height={40} />

            </SView>

        </SView>
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                {this.render_data()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);