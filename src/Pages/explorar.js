import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Restaurante, TopBar } from '../Components';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData() {
        Model.restaurante.Action.CLEAR();
    }
    loadData() {
        this.restaurantes = Model.restaurante.Action.getAllFilters();
        if (!this.restaurantes) return null;
        return true;
    }

    render_list_recomendados() {
        return <Container>
            <SList center initSpace={8}
                data={this.restaurantes}
                col={"xs-12"}
                // filter={obj => obj?.proximo_horario?.pack?.cantidad > 0}
                order={[
                    { key: "proximo_horario/pack/cantidad", order: "asc", peso: 1 },
                    { key: "distancia", order: "asc", peso: 2 },
                    { key: "proximo_horario/fecha", order: "asc", peso: 3 },
                ]}
                limit={10}
                render={(obj) => {
                    // console.log(obj)
                    return <Restaurante.Card col={"xs-12"} width={0} data={obj} onPress={(data) => {
                        SNavigation.navigate("/restaurante", { pk: data.key })
                    }} />
                }}
            />
        </Container>
    }
    render_with_data() {
        if (!this.loadData()) return <SLoad />
        return <SView col={"xs-12"} center>
            {this.render_list_recomendados()}
        </SView>

    }
    navBar() {
        return <TopBar type={"ubicacion"} title='Hola' />
    }

    header() {
        return <SView col={"xs-12"}>
            <Container>
                <Restaurante.BarraFiltros />
                <Restaurante.MapaListaButtoms url={"/explorar"} />
                <SHr/>
            </Container>
        </SView>
    }
    render() {
        return (
            <SPage
                navBar={this.navBar()}
                header={this.header()}
                footer={this.footer()}
                onRefresh={this.clearData}>
                {this.render_with_data()}
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);