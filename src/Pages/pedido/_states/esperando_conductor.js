import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SButtom } from 'servisofts-component';
import { Container, FloatButtomTap, PButtom, Restaurante, TipoPago,Pedido } from '../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class esperando_conductor extends Component {
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
        
        return <>
            <SView col={"xs-12"} height row center backgroundColor={'transparent'}>
                <SMapView2 initialRegion={
                    {
                        latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
                        longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
                        latitudeDelta: 0.0722,
                        longitudeDelta: 0.0421,
                    }} preventCenter>
                    <Restaurante.Marker data={this.props.data?.restaurante} lat={this.props.data?.restaurante?.latitude} lng={this.props.data?.restaurante?.longitude} height />
                     <SMarker lat={this.props.data?.direccion?.latitude} lng={this.props.data?.direccion?.longitude} >
                        <SIcon name={"Marker"} width={50} height={50} fill={"#FA790E"} />
                    </SMarker>
                    <SMarker lat={this.state.region.latitude} lng={this.state.region.longitude} >
                        <SIcon name={"Bicicleta"} width={50} height={50} fill={"blue"} />
                    </SMarker>
                </SMapView2>
            </SView>
        </>
    }

    showCards() {
        return <SView row>
            <Pedido.Card data={this.props.data} />
            <Pedido.PerfilConductor data={this.props.data} />
        </SView>
    }
    render() {
        console.log("debe promesa")
        return (
            <>
                <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}>
                    {this.showMapa()} 
                    {this.showCards()}
                    <SView height={50} />
                </SView>

                <FloatButtomTap onPress={() => {
                    // console.log("pollo ", this.state.region.latitude)
                    Model.background_location.Action.getByKeyAsync(this.props.data.key_conductor).then(r => {
                        console.log(r);
                        this.state.region.latitude = r.data.latitude;
                        this.state.region.longitude = r.data.longitude;
                        this.setState({ ...this.state });
                    }).catch(r => {
                        console.log(r)
                    })
                }} />


            </>
        );
    }
}