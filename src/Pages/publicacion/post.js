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
            data
        };
        this.pk = SNavigation.getParam("pk");
    }


    componentDidMount() {
        // SNavigation.goBack();
        var publicacion = Model.publicacion.Action.getByKey(this.pk);
        if (!publicacion) return <SLoad />
        // var key = this.pk
        // var datas = []
        // var data =  {
        //         "1e4836d2-1f58-49b5-80e5-7a74792e5725": {
        //             ...publicacions
        //         },
        //     }

        // var datas ={data:{key:{publicacion}}};
        // datas.data[key] = { publicacion }
        // data
        // data = {this.pk: {publicacion}};
        console.log(publicacion)
        this.setState({ data: publicacion })

    }
    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
    }

    navBar() {
        return <TopBar type={"home"} />
    }

    render() {
        console.log(this.state.data)
        return (
            <SPage
                // navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
            >
                <Container>
                    <SText>post</SText>
                    <Publicacion.CardPost data={this.state.data} />
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