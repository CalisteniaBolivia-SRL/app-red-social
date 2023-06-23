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
            data:{}
        };
        this.pk = SNavigation.getParam("pk");
    }

    componentDidMount() {
        var publicacion = Model.publicacion.Action.getByKey(this.pk);
        if (!publicacion) return <SLoad />
        this.setState({ data: publicacion })
        this.state.data = publicacion

    }
    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
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
            >
                <Container>
                    <Publicacion.CardPost data={this.state.data} />
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