import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
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
    }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        // var sucursales2 = Model.sucursalUsuario.Action.getAll(key_sucursal);
        if (!sucursales) return <SLoad />

        return <SList
            // buscador={"true"}

            space={14}
            data={sucursales}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                // return <SText>Hola</SText>
                return <Sucursal.Card image={1} datas={data} root={'/sucursal/detalle'} />
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
                    <SHr height={20} />
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