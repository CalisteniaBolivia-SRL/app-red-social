import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, STheme, SIcon, SPopup } from 'servisofts-component';
import { AccentBar, Container, PButtom } from '../../Components';
import Model from '../../Model';
import HeaderTarjeta from './Components/HeaderTarjeta';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }


    _handlingCardNumber(number) {
        this.setState({
            cardNumber: number.replace(/\s?/g, '').replace(/[^\d]/g, '').replace(/(\d{4})/g, '$1 ').trim()
        });
    }

    _handlingCardDate(number) {

        this.setState({
            cardDate: number.replace(
                /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
            ).replace(
                /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
            ).replace(
                /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
            ).replace(
                /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
            ).replace(
                /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
            ).replace(
                /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
            ).replace(
                /\/\//g, '/' // Prevent entering more than 1 `/`
            ).trim()
        });

    }

    getregistro() {
        let data = {};
        if (this.key) {
            data = Model.pago_tarjeta.Action.getByKey(this.key);
        }

        if (!data) return <SLoad />
        if (!this.state.cardNumber) {
            this.state.cardNumber = !data["numero_tarjeta"] ? "" : data["numero_tarjeta"].replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        if (!this.state.cardDate) {
            this.state.cardDate = !data["mes"] ? "" : data["mes"] + "/" + data["ano"];
        }
        return <SForm
            row
            ref={(form) => { this.form = form; }}
            inputs={{
                nombre: { label: "Nombre", placeholder: "Nombre completo", isRequired: true, defaultValue: data["nombre"] },
                numero_tarjeta: {
                    label: "Número de tarjeta", placeholder: "0000 0000 0000 0000", isRequired: true, value: this.state.cardNumber, maxLength: 19,
                    onChangeText: (value) => {
                        this._handlingCardNumber(value)
                    },
                    keyboardType: "phone-pad"
                },
                fecha: {
                    label: "Fecha Caducidad", placeholder: "MM/AA", isRequired: true, value: this.state.cardDate, col: "xs-12", maxLength: 5,
                    onChangeText: (value) => {
                        this._handlingCardDate(value)
                    }, keyboardType: "phone-pad"
                },
                codigo_seguridad: { label: "Código de seguridad", placeholder: "0000", isRequired: true, defaultValue: data["codigo_seguridad"], col: "xs-12 sm-6 md-6 lg-6 xl-6", type: "password", maxLength: 4, keyboardType: "phone-pad", },
            }}
            onSubmit={(values) => {
                // this.form
                var dataOk = {
                    codigo_seguridad: values.codigo_seguridad,
                    nombre: values.nombre,
                    numero_tarjeta: values.numero_tarjeta.replace(/\s/g, ''),
                    mes: values.fecha.substring(0, 2),
                    ano: values.fecha.substring(3),
                }
                if (!this.key) {

                    Model.pago_tarjeta.Action.registro({
                        key_usuario: Model.usuario.Action.getKey(),
                        data: dataOk
                    }).then(resp => {
                        SNavigation.goBack();
                    }).catch(e => {
                        console.error(e);
                    })
                } else {
                    Model.pago_tarjeta.Action.editar({
                        key_usuario: Model.usuario.Action.getKey(),
                        data: {
                            ...data,
                            ...dataOk,
                        }
                    }).then(resp => {
                        SNavigation.goBack();
                    }).catch(e => {
                        console.error(e);
                    })
                }

                // if (this.key) {
                //     Parent.Actions.editar({ ...data, ...dataOk }, this.props);
                // } else {
                //     console.log(dataOk);
                //     Parent.Actions.registro(dataOk, this.props);
                // }
            }}
        />
    }

    popupQueEs() {
        return <>
            <SView width={362} center row style={{ borderRadius: 32, overflow: "hidden" }} withoutFeedback backgroundColor={STheme.color.background}   >
                <SView col={"xs-12"} height={35} center style={{ backgroundColor: STheme.color.primary }}>
                    <SHr height={16} />
                    <SText color={STheme.color.secondary} style={{ fontSize: 20 }} bold center >Código de seguridad</SText>
                    <SHr height={16} />
                </SView>
                <SHr height={20} />
                <SView col={"xs-11"} center row>
                    <SView col={"xs-5"} center flex>
                        <SIcon width={100} name='TarjetaSeguridad'></SIcon>
                    </SView>
                    <SView col={"xs-6"} center>
                        <SText fontSize={14} color={STheme.color.text}  >Son los 3-4 dígitos numéricos ubicados en la parte trasera de su tarjeta.</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} center>
                    <SHr height={25} />
                    <SView width={140} height={44} center backgroundColor={STheme.color.primary} style={{ borderRadius: 8 }} onPress={() => { SPopup.close("queEs"); }}  >
                        <SText fontSize={14} color={STheme.color.white} bold>ENTENDIDO</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>
        </>
    }

    render() {
        return (
            <SPage header={<AccentBar />}>
                <Container>
                    <HeaderTarjeta />
                    <SHr height={16} />
                    <SText col={"xs-12"}>{'Detalle de la tarjeta'}</SText>
                    {this.getregistro()}
                    <SView
                        style={{
                            textAlign: "right",
                            alignItems: "flex-end",
                            position: "relative",
                            top: -50,
                            right: "-35%"
                        }}
                    >
                        <SView onPress={() => {
                            SPopup.open({ content: this.popupQueEs(), key: "queEs" });
                        }} row
                        >
                            <SText fontSize={12}   color={STheme.color.primary}>¿Qué es esto? </SText>
                            <SIcon name={"Alert2"} width={15}></SIcon>
                            <SView width={15}></SView>
                        </SView>
                    </SView>
                    <SHr height={36} />
                    <PButtom onPress={() => {
                        this.form.submit();
                    }}>{!this.key ? "AÑADIR" : "EDITAR"} TARJETA</PButtom>
                </Container>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);