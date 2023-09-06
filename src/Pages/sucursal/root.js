import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SList2, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
        if (resolv) resolv();
    }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList2
            // buscador={"true"}
            space={0}
            horizontal
            data={sucursales}
            filter={obj => !!obj.estado_app && !obj.tipo_tienda}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Sucursal.Card image={1} data={data} key_sucursal={data.key} root={'/sucursal/detalle'} />
            }}
        />
    }

    navBar() {
        return <TopBar type={"home"} />
    }

    render() {

        return (
            <SPage
                hidden
                // navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<Sucursal.MapaListaButtoms url={"/sucursal"} />}
            >
                <Container>
                    <SHr height={10} />
                    {this.render_with_data()}
                    <SHr height={30} />
                </Container>
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