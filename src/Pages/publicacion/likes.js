import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");

    }
    //PublicacionLikeGetAll (keypublicacion)

    // componentDidMount() {
    //     SSocket.sendPromise({
    //         ...Model.publicacion_like.
    //         "component": "publicacion_like",
    //         "type": "publicacionLikeGetAll",
    //         "key_publicacion": this.pk


    //     }).then((e) => {
    //         if (e.estado != "exito") return;
    //         this.setState({ data: e.data })
    //     }).catch((e) => {

    //     })
    // }


    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
    }

    navBar() {
        return <TopBar type={"home"} />
    }

    render_with_data() {
        // var publicacionLike = Model.publicacion.Action.get;
        // if (!this.state.data) return <SLoad />

        return <SList
            // buscador={"true"}

            space={14}
            // data={this.state.data}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <SText>Hola</SText>
                // return <Sucursal.Card image={1} datas={data} root={'/sucursal/detalle'} />
            }}
        />
    }

    render() {

        return (
            <SPage
                // navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                title={"Me gusta"}
            >
                <Container>
                    <SText>LIKES</SText>
                    {this.render_with_data()}
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
export default connect(initStates)(likes);