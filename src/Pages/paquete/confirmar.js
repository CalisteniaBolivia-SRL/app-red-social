import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage, SDate } from 'servisofts-component';
import { AccentBar, BottomNavigator, BtnNavegar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import BtnSend from './components/BtnSend';
class confirmar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0,
            fecha_fin: ""
        };
        this.params = SNavigation.getAllParams();
    }

    btn = ({ title, onPress, active }) => {
        return <SView col={"xs-5.5"} height={44} center border={STheme.color.secondary} backgroundColor={active ? STheme.color.secondary : STheme.color.white} style={{ borderRadius: 8 }} onPress={onPress}  >
            <SText fontSize={14} color={active ? STheme.color.white : STheme.color.secondary} bold>{title}</SText>
        </SView>
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
                <SText color={STheme.color.text} style={{ fontSize: 17 }} center >¿Estás seguro que deseas adquirir este paquete?</SText>
            </SView>
            <SView flex />
            <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                    {this.btn({ title: "No, cancelar", onPress: () => { SPopup.close("confirmar"); }, active: false })}
                    <SView col={"xs-1"} />
                    {this.btn({
                        title: "Sí, Confirmar", onPress: () => {
                            SPopup.close("confirmar");
                            SNavigation.navigate("/paquete/membresia/qr", { ...this.params, });
                        }, active: true
                    })}
                </SView>
            </SView>
            <SView flex />
            <SView col={"xs-11"} center>
                <SText color={STheme.color.text} style={{ fontSize: 12 }} center >IMPORTANTE: Por favor tome en cuenta que no se podrá cancelar el pedido posteriormente.</SText>
            </SView>
            <SHr />
            <SHr />
        </SView>
    }

    fechas(data_paquete, data_sucursal, data_usuario) {
        return <>
            <SView col={"xs-12"} flex style={{ alignItems: "flex-start" }}>
                {/* <SText >Registre la fecha de inicio de su membresía.</SText> */}
            </SView>
            <SHr height={5} />
            {/* <SForm
                ref={(ref) => { this.form = ref; }}
                style={{
                    alignItems: "center",
                }}
                inputProps={{
                    separation: 15,
                }}
                inputs={{
                    Fecha_inicio: {
                        placeholder: "Fecha de Inicio", isRequired: true, type: "fecha",
                        onChangeText: (value) => {
                            // this._handlingFecha(value)
                            var fecha_fin_ = new SDate(value).addDay(data_paquete?.dias).toString("yyyy-MM-dd")
                            this.setState({
                                fecha_fin: fecha_fin_
                            });
                        },
                    },
                    Fecha_fin: { placeholder: "Fecha de Fin", isRequired: false, value: this.state.fecha_fin, type: "fecha", disabled: true },
                }}

                onSubmit={(values) => {
                    var finalObj = {
                        // ...this.data,
                        ...values
                    }

                    if (!values["Fecha_inicio"]) return;
                    SPopup.open({ key: "confirmar", content: this.popupConfirmacion() });
                }}
            /> */}
            <SHr height={26} />

        </>
    }

    render_with_data() {
        var paquete = Model.paquete.Action.getByKey(this.params.pk);
        var usuario;
        {/* USUARIO */ }
        // var usuario = Model.usuario.Action.getUsuarioLog();
        var sucursal = Model.sucursal.Action.getByKey(this.params.sucursal);
        {/* USUARIO */ }
        // if (!usuario) return <SLoad />
        if (!sucursal) return <SLoad />
        if (!paquete) return <SLoad />
        // console.log(JSON.stringify(sucursal) + " PPPP");
        // var { key, descripcion, dias, precio, participantes } = paquete;

        return <SView col={"xs-12"} center>
            <SView
                height={90}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 10
                }}
                row center
            >
                <SView col={"xs-3"} row  >
                    <SView style={{
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        overflow: "hidden"
                    }}>
                        <SImage src={SSocket.api.root + "sucursal/portada/" + sucursal.key} width={"100%"} height={"100%"} style={{ resizeMode: 'cover', }} />
                    </SView>
                </SView>
                <SView col={"xs-9"} >
                    {/* USUARIO */}
                    {/* <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{usuario?.Nombres}</SText> */}
                    <SView col={"xs-12"} row>
                        <SText color={STheme.color.text} fontSize={15} >
                            Calistenia Bolivia
                        </SText>
                        <SView width={5}></SView>
                        <SText color={STheme.color.text} fontSize={15} style={{ textTransform: "uppercase" }}>
                            {sucursal?.descripcion}
                        </SText>
                    </SView>
                    <SView col={"xs-12"} >
                        <SText color={STheme.color.text} fontSize={12} row>
                            {sucursal?.direccion}
                        </SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={16} />
            <SView col={"xs-12"} flex style={{ alignItems: "flex-start" }}>
                <SText >Detalle</SText>
            </SView>
            <SHr height={10} />
            <SView
                height={115}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18
                }}
                row
            >
                <SView col={"xs-6"}>
                    <SText fontSize={14}>Días</SText>
                </SView>
                <SView col={"xs-6"} flex style={{ alignItems: "flex-end" }}>
                    <SText>{paquete.dias}</SText>
                </SView>
                <SView height={2} col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }}></SView>
                <SView col={"xs-6"}>
                    <SText>Participantes</SText>
                </SView>
                <SView col={"xs-6"} flex style={{ alignItems: "flex-end" }}>
                    <SText>{paquete.participantes}</SText>
                </SView>
                <SView height={2} col={"xs-12"} style={{ borderColor: STheme.color.gray, borderBottomWidth: 1 }}></SView>
                <SView col={"xs-6"}>
                    <SText>Precio</SText>
                </SView>
                <SView col={"xs-6"} flex style={{ alignItems: "flex-end" }}>
                    <SText>{paquete.precio}</SText>
                </SView>
            </SView>
            {/* <SHr height={26} />
            {this.fechas(paquete, sucursal, usuario)}
            <SHr height={16} /> */}
        </SView>

    }

    render() {
        var defaultData = {
            ...this.params,
        };
        return (
            <SPage
                footer={this.footer()}
                title={"Confirmar Membresía"}
            >
                <Container>
                    {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Detalle Membresía</SText>
                    </SView> */}
                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={30} />
                    <SText center color={STheme.color.lightGray}>{"Al pagar un nuevo paquete, este se activará inmediatamente si no tiene uno vigente. Si ya tiene uno, el nuevo comenzará cuando termine el actual."}</SText>
                    <SHr h={30} />
                    <BtnSend
                        onPress={() => {
                            // this.form.submit()
                            SPopup.open({ key: "confirmar", content: this.popupConfirmacion() });
                            // SNavigation.navigate("/restaurante", { pk: obj.key });
                        }}
                    >Confirmar</BtnSend>
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
export default connect(initStates)(confirmar);