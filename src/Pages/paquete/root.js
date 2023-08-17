import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BackButtom from '../../Components/BackButtom';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.params = SNavigation.getAllParams();

    }

    componentDidMount() {
        SSocket.sendPromise({
            "component": "sucursal",
            "type": "getByKeyServicio",
            "key_servicio": this.params.key_servicio


        }).then((e) => {
            if (e.estado != "exito") return;
            this.setState({ data: e.data })
        }).catch((e) => {

        })
    }


    clearData() {
        // this.componentDidMount()
        // Model.pedido.Action.CLEAR();
        // Model.horario.Action.CLEAR();
        // Model.pack.Action.CLEAR();
        // Model.restaurante.Action.CLEAR();
        // Model.favorito.Action.CLEAR();
        // Model.publicacion.Action.CLEAR();
    }

    render_with_data() {

        var sucursal_servicio = {}
        var sucursales = {}
        if (!sucursales) return <SLoad />
        if (!sucursal_servicio) return <SLoad />
        // console.log(this.state.data)
        if (Object.keys(this.state.data).length === 0) return <SView row><SHr height={60} /><SIcon name='Iprox' height={30} width={30} fill={STheme.color.text}/><SView width={10}/><SText fontSize={22} center font="Oswald-Bold">Próximamente...</SText></SView>;

        return <SList
            buscador={"true"}
            space={14}
            data={this.state.data}
            filter={(a => a.estado_app > 0)}
            render={(data) => {
                return <Sucursal.Card image={1} data={data}  root={'/paquete/membresia'}
                    key_servicio={this.params.key_servicio}
                    key_sucursal={data.key}
                />
            }}
        />

    }
    navBar() {
        return <TopBar type={"home"} />
    }

    render() {

        return (
            <SPage
                // navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                hidden
            >
                <SHr height={50} />
                <Container>
                    {this.render_with_data()}
                    <SHr height={25} />
                </Container>
            </SPage>
        );
    }

    footer() {
        return <>
            <BottomNavigator url={"/paquete"} />
            <BackButtom />
        </>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);