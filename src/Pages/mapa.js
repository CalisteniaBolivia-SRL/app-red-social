import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SMapView2, SMarker, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            },
        };
    }

    clearData() {
        Model.restaurante.Action.CLEAR();
    }

    loadData() {
        this.restaurantes = Model.restaurante.Action.getAllFilters();
        if (!this.restaurantes) return null;
        return true;
    }

    navBar() {
        return <TopBar type={"ubicacion"} title='Hola' />
    }

    getListRestaurante() {
        if (!this.loadData()) return null;
        return Object.values(this.restaurantes).map((obj, index) => {
            return <Restaurante.Marker lat={obj.latitude} lng={obj.longitude} data={obj} onPress={() => {
                // SNavigation.navigate("/restaurante", { pk: obj.key });
            }} />
        })
    }

    showMapa100() {
        var usuario = Model.filtros.Action.getByKey("direccion")?.select;
        var filDistancia = Model.filtros.Action.getByKey("distancia")?.select;
        var delta = 0.001 * parseFloat(filDistancia ?? 0);

        return <SView col={"xs-12"} height center >
            <SMapView2 initialRegion={
                {
                    latitude: usuario?.latitude ?? this.state.region.latitude,
                    longitude: usuario?.longitude ?? this.state.region.longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta,
                }} preventCenter>
                {this.getListRestaurante()}
                {/* <SMarker lat={usuario?.latitude} lng={usuario?.longitude} >
                    <SIcon name={"Marker"} width={50} height={50} fill={"#FA790E"} />
                </SMarker> */}
            </SMapView2>
        </SView>
    }
    header() {
        return <SView col={"xs-12"}>
            <Container>
                <Restaurante.BarraFiltros />
                <Restaurante.MapaListaButtoms url={"/mapa"} />
            </Container>
        </SView>
    }
    render() {
        return (
            <SPage
                navBar={this.navBar()}
                header={this.header()}
                footer={this.footer()}
                disableScroll
            // onRefresh={this.clearData}
            >
                {this.showMapa100()}
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);