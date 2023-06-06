import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navBar() {
        return <TopBar type={"menu"} title='ajustes' />
    }
    clearData() {
        // Model.restaurante.Action.CLEAR();
    }
    loadData() {
        this.favoritos = Model.favorito.Action.getAll({ key_usuario: Model.usuario.Action.getKey() })
        this.restaurantes = Model.restaurante.Action.getAllRecursive();
        if (!this.restaurantes) return null;
        if (!this.favoritos) return null;
        return true;
    }
    render_with_data() {
        if (!this.loadData()) return <SLoad />
        // if (!this.loadData()) return <SView>assa </SView>
        return <SList
            center
            filter={obj => obj.estado != 0}
            data={this.favoritos}
            render={(obj) => {
                if (!this.restaurantes[obj.key_restaurante]) return null;
                return <Restaurante.Card data={this.restaurantes[obj.key_restaurante]} onPress={(data) => {
                    SNavigation.navigate("/restaurante", { pk: data.key })
                }} />
            }}
        />
    }
    render() {
        return (
            <SPage
                // navBar={this.navBar()}
                title={"Ajustes"}
                // footer={this.footer()}
                onRefresh={this.ajustes}
            >
                <Container>
                    {/* <SText >ajustes</SText> */}
                </Container>
             </SPage>
        );
    }

    // footer() {
    //     return <BottomNavigator url={"/favoritos"} />
    // }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);