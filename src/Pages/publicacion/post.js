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
        };
        this.pk = SNavigation.getParam("pk");
    }


    componentDidMount(){
        // SNavigation.goBack();
        let publicacion= Model.publicacion.Action.getByKey(this.pk);
        if (!publicacion) return <SLoad />
        var key = this.pk
        var data=[]
        // var datas ={data:{key:{publicacion}}};
        data.key =key;
        // data
        // data = {this.pk: {publicacion}};
        console.log(data )

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
                    <SText>post</SText>
                    {/* <Publicacion.Card data={this.data} /> */}
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
export default connect(initStates)(post);