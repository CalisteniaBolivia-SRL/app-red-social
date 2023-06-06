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
        return <TopBar type={"menu"} title='Mis Favoritos' />
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
    render_sin_favoritos() {
        return <SView col={"xs-11 sm-6 md-6"} center flex>
            <SHr height={100} />
            <SText fontSize={18} color={STheme.color.primary} font='LondonTwo'  >Usted no tiene Favoritos</SText>
            <SHr height={50} />
            {/* <Container center> */}
            <SIcon name={"SinFavorito"} width={300} fill="red" />
            {/* </Container> */}
        </SView>
    }
    render_with_data() {
        if (!this.loadData()) return <SLoad />
        var favoritos_filters = Object.values(this.favoritos).filter(o => o.estado != 0)
        if (favoritos_filters.length <= 0) return this.render_sin_favoritos()
        return <SList
            center
            data={favoritos_filters}
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
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
            >
                <Container>
                    {this.render_with_data()}
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/favoritos"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);