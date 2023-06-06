import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SMapView2,SMapView, SMarker, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.765054583781613,
                longitude: -63.1834162269279
            },
        };
    }

    clearData() {
        Model.sucursal.Action.CLEAR();
    }

    loadData() {
        this.sucursales = Model.sucursal.Action.getAll();
        if (!this.sucursales) return null;
        return true;
    }

    navBar() {
        return <TopBar type={"ubicacion"} title='Hola' />
    }

    getListSucursales() {
        if (!this.loadData()) return null;
        return Object.values(this.sucursales).map((obj, index) => {
            return <Sucursal.Marker lat={obj.latitude} lng={obj.longitude} data={obj} onPress={() => {
                SNavigation.navigate("/sucursal", { pk: obj.key });
            }} />
        })
    }

    showMapa100() {
        // var usuario = Model.filtros.Action.getByKey("direccion")?.select;
        // var filDistancia = Model.filtros.Action.getByKey("distancia")?.select;
        // var delta = 0.001 * parseFloat(filDistancia ?? 0);

        return <SView col={"xs-12"} height center >
            <SMapView2 initialRegion={
                {
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09
                }} 
                
                preventCenter>
                {this.getListSucursales()}
                {/* <SMarker lat={usuario?.latitude} lng={usuario?.longitude} >
                    <SIcon name={"Marker"} width={50} height={50} fill={"#FA790E"} />
                </SMarker> */}
            </SMapView2>
        </SView>
    }
    header() {
        return <SView col={"xs-12"}>
            {/* <Container> */}
                {/* <Restaurante.BarraFiltros /> */}
                <Sucursal.MapaListaButtoms url={"/sucursal/mapa"} />
            {/* </Container> */}
        </SView>
    }
    render() {
        return (
            <SPage
            hidden
                // navBar={this.navBar()}
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
        return <BottomNavigator url={"/sucursal"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);