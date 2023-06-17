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

    componentDidMount() {
        this.setState({ loading: true });
        Model.publicacion_like.Action.getAllPromise(this.pk).then(e => {
            this.setState({ loading: false, data: e.data });
        }).catch(e => {
            this.setState({ loading: false, error: e });
        })
    }
    render_with_data() {
        if (!this.state.data) return <SLoad />
        return <SList
            space={14}
            data={this.state.data}
            render={(data) => {
                return <SText color={STheme.color.text}>Hola</SText>
            }}
        />
    }

    render() {
        return (
            <SPage
                onRefresh={(resolve) => {
                    this.componentDidMount();
                    resolve()
                }}
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