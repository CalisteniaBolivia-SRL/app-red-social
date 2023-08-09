import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Publicacion } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.pk = SNavigation.getParam("pk");
    }

    componentDidMount() {
        SSocket.sendPromise({
            "component": "publicacion",
            "type": "getByKey",
            "estado": "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            "key": this.pk
        }).then((e) => {
            console.log(e);
            if (e.estado != "exito") return;
            const data = e.data[this.pk];
            this.setState({ data: data })

            SSocket.sendPromise({
                ...Model.usuario.info,
                "component": "usuario",
                "type": "getAllKeys",
                "estado": "cargando",
                "keys": [data?.key_usuario]
            }).then((e) => {
                if (e.estado != "exito") return;
                this.setState({ usuario: e.data[data.key_usuario]?.usuario })
            }).catch((e) => {
                console.error(e)
            })
            // this.setState({ usuario: e.data[this.props.data?.key_usuario]?.usuario })
        }).catch((e) => {
            console.error(e)
        })


        // var publicacion = Model.publicacion.Action.getByKey(this.pk);
        // if (!publicacion) return <SLoad />
        // this.setState({ data: publicacion })
        // this.state.data = publicacion

    }
    clearData(resolv) {
        this.componentDidMount();
    }

    navBar() {
        return <TopBar type={"home"} />
    }

    render() {
        return (
            <SPage
                // navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData.bind(this)}
            >
                <Container>
                    <Publicacion.Card data={this.state.data} usuario={this.state.usuario}
                        onLike={(e) => {
                            this.state.data.mylike = 1;
                            this.state.data.likes += 1;
                            this.setState({ ...this.state })
                        }}
                        disLike={(e) => {
                            this.state.data.mylike = 0;
                            this.state.data.likes -= 1;
                            this.setState({ ...this.state })
                        }}
                    />
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(post);