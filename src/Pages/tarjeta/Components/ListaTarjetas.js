import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SList, SNavigation, SPage, SText, STheme, SThread, SView, SSection, SPopup } from 'servisofts-component';
import { Container } from '../../../Components';
import Model from '../../../Model';
import HeaderTarjeta from './HeaderTarjeta';
import PopupCodigoSeguridad from './PopupCodigoSeguridad';

export default class ListaTarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       
    }

    item(obj, i) {
        if (obj.estado != "1") return null;
        var digitos = obj.numero_tarjeta.slice(-4);
        return <SSection key={"card_cre" + i}>
            <SView col={"xs-12"} row center style={{ borderRadius: 16, }} backgroundColor={STheme.color.card}
                onPress={() => {
                    SPopup.open({
                        content: <PopupCodigoSeguridad data={obj} callback={(resp) => {
                            if (this.props.onSelect) {
                                this.props.onSelect(resp);
                            }
                        }} />, key: "CodigoSeguridad"
                    });
                }}>
                <SHr height={10} />
                <SView col={"xs-11"} row >
                    <SView col={"xs-2"} height={30}>
                        <SImage src={require('../../../Assets/img/tarjeta1.png')} style={{ width: 40 }} />
                    </SView>
                    <SView col={"xs-7 sm-7 md-8 lg-8 xl-8"} >
                        <SHr height={10} />
                        <SText fontSize={16} style={{ fontWeight: "bold" }}>*** **** **** {digitos}</SText>
                    </SView>
                    <SView col={"xs-3 sm-3 md-2 lg-2 xl-2"} row >
                        <SView style={{ borderRadius: 100, backgroundColor: STheme.color.accent }} width={33} height={33} center flex
                            onPress={() => { SNavigation.navigate("/tarjeta/new", { key: obj.key, callback: this.callback }) }}>
                            <SIcon name="EditT" fill={STheme.color.white} width="20"></SIcon>
                        </SView>
                        <SView width={10}></SView>
                        <SView style={{ borderRadius: 100, backgroundColor: STheme.color.error, }} width={33} height={33} center flex
                            onPress={() => {
                                SPopup.confirm({
                                    title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => {
                                        Model.pago_tarjeta.Action.editar({
                                            data: {
                                                ...obj,
                                                estado: 0
                                            },
                                        })
                                        // Parent.Actions.eliminar(obj, this.props)
                                    }
                                })
                            }}>
                            <SIcon name="DeleteT" width="15"></SIcon>
                        </SView>
                    </SView>
                </SView>
                <SHr height={10} />
            </SView>
            <SHr height={7} />
        </SSection>
    }

    render() {
        return (<Container >
            <HeaderTarjeta />
            <SHr height={16} />
            <SView col={"xs-12"} row>
                <SText fontSize={14} bold>Detalles de la tarjeta</SText>
            </SView>
            <SList
                // buscador
                initSpace={20}
                data={this.props.data}
                render={this.item.bind(this)}
            />
            <SView height={30} card />
            <SView col={"xs-12"} style={{ alignItems: "flex-end" }}
                onPress={() => {
                    SNavigation.navigate("/tarjeta/new", { callback: this.callback, keyPedido: this.keyPedido });
                }}>
                <SView row>
                    <SIcon name={"TarjetaAdd"} width={25} />
                    <SText color={STheme.color.primary}> Agregar una tarjeta </SText>
                </SView>
            </SView>
        </Container >
        );
    }
}