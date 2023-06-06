import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SMapView2 } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';

export default class listo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
    }

    componentDidMount() {
        this.isRun = true;
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    showMapa() {
        if (!this.props.data.restaurante.key) return null;
        return <SView col={"xs-12"} height flex row center backgroundColor={'transparent'}>
            <SMapView2 initialRegion={
                {
                    latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
                    longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }}
                preventCenter>
                <SMarker lat={this.props.data?.restaurante?.latitude} lng={this.props.data?.restaurante?.longitude}  >
                    <SIcon name="MarcadorMapa" width={20} height={30} />
                </SMarker>
                <SMarker lat={this.props.data?.direccion?.latitude} lng={this.props.data?.direccion?.longitude}  >
                    <SIcon name="MarcadorMapa" width={20} height={30} />
                </SMarker>
            </SMapView2>
        </SView>
    }

    getBotones() {
        return (
            <>
                <SView col={"xs-12"} height={90} row>
                    <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center  >
                        <SIcon name="PedConfirmacion" width={48} fill={STheme.color.primary + 22} > </SIcon>
                        <SView col={"xs-12"} height={10} backgroundColor={STheme.color.primary + 22} style={{ borderRadius: 16, }}></SView>
                        <SText color={STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Confirmación</SText>
                    </SView>
                    <SView width={5} height />
                    <SView flex border={'transparent'} center>
                        <SIcon name="PedPreparacion" width={48} fill={STheme.color.primary} />
                        <SView col={"xs-12"} height={10} backgroundColor={STheme.color.primary} />
                        <SText color={STheme.color.primary} style={{ fontSize: 12 }} bold>Recoge tu pedido</SText>
                    </SView>
                    <SView width={5} height />
                </SView>
            </>
        );
    }

    render() {
        if (!this.props?.data?.restaurante?.key) return null;

        return (
            <SView col={"xs-12"} height onBack={() => { SNavigation.replace("/"); return true; }}  >
                {this.showMapa()}
                <Container >
                    <SView col={"xs-12"} height={225} row center  >
                        <SHr height={10} />
                        <SView col={"xs-3"} height={7} backgroundColor={STheme.color.card} style={{ borderRadius: 16, }}
                            onPress={() => { SNavigation.navigate("pedido/pedidoqr", { key_pedido: this.props?.data?.key }) }} />
                        <SHr height={5} />
                        <SView col={"xs-12"} border={'transparent'} row center >
                            <SText color={STheme.color.darkGray} style={{ fontSize: 38 }} bold>{this.props?.data?.horario.hora_inicio} - {this.props?.data?.horario.hora_fin}</SText>
                        </SView>
                        <SView col={"xs-12"} border={'transparent'} center >
                            <SText color={STheme.color.darkGray} style={{ fontSize: 15 }} bold>Tu tapeke esta listo</SText>
                        </SView>
                        {this.getBotones()}
                        <SHr height={10} />
                    </SView>
                </Container>
            </SView >
        );
    }
}