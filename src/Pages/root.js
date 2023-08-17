import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native'

import { SButtom, SDate, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal, Publicacion } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket'

import { FlatList } from 'react-native';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            usuarios: {}
        };
    }


    componentDidMount() {
        SSocket.sendPromise({
            component: "publicacion",
            type: "getAll",
            key_usuario: Model.usuario.Action.getKey(),
        }).then((e) => {
            Model.publicacion.Action._dispatch(e);
            const arr = Object.values(e.data)
            // this.setState({ data: arr })

            let userKeys = arr.map(val => val.key_usuario);
            const uniqueArr = [...new Set(userKeys)];
            SSocket.sendPromise({
                ...Model.usuario.info,
                "component": "usuario",
                "type": "getAllKeys",
                "estado": "cargando",
                "keys": uniqueArr
            }).then((e) => {
                this.setState({ usuarios: e.data })
            }).catch((e) => {
                console.error(e)
            })
        })
        // Model.usuario.Action.getAll({ force: true })

    }
    clearData(resolv) {
        // Model.sucursal.Action.CLEAR();
        // Model.publicacion.Action.CLEAR();
        // Model.usuario.Action.getAll({ force: true, fecha_edit: "1989-01-01T00:00:01" });
        // Model.usuario.Action.CLEAR();
        this.componentDidMount();

    }




    renderPublicidad() {
        return <>
            <SView col={"xs-12"} card height={60} center
                style={{ borderWidth: 2, borderColor: STheme.color.secondary, borderRadius: 20, overflow: "hidden" }}
                onPress={() => {
                    SNavigation.navigate("/servicio")
                }}
            >
                <SImage src={require('../Assets/img/fpublicidad.png')} style={{ resizeMode: 'cover', position: 'absolute' }} />
                <SHr height={5} />
                <SIcon name='Btnpaquete' fill={STheme.color.text} height={25} />
                <SHr height={5} />
                <SText font="Oswald-Regular" fontSize={11}> &lt; PAGA SIMPLE Y RÁPIDO CON QR &gt; </SText>
            </SView>
        </>
    }

    renderPublicaciones() {
        // let publicaciones = Model.publicacion.Action.getAll({
        //     key_usuario: Model.usuario.Action.getKey()
        // // });
        // const arr = Object.values(publicaciones).sort((a, b) => new SDate(a.fecha_on).isBefore(new SDate(b.fecha_on)) ? 1 : -1)



        const handleRefresh = async () => {
            this.clearData();
        };
        let data = Model.publicacion.Action._getReducer()?.data ?? {};
        // if (!this.state.data) return <SLoad />

        return <FlatList
            onRefresh={handleRefresh}
            refreshing={this.state.refreshing}
            // scrollEnabled={false}
            pinchGestureEnabled={false}
            data={Object.values(data).sort((a, b) => new SDate(a.fecha_on, "yyyy-MM-ddThh:mm:ss").getTime() >= new SDate(b.fecha_on, "yyyy-MM-ddThh:mm:ss").getTime() ? -1 : 1)}
            style={{
                width: "100%",
            }}
            keyExtractor={item => item.key.toString()}
            ItemSeparatorComponent={() => <SHr h={40} />}
            renderItem={itm => <Publicacion.Card data={itm.item} usuario={this.state?.usuarios[itm?.item?.key_usuario]?.usuario} />}
        />
    }

    render() {
        return (
            <SPage
                navBar={<TopBar type={"home"} />}
                footer={this.footer()}
                disableScroll
                center
            >
                <Container>
                    {this.renderPublicidad()}
                </Container>
                <SView col={"xs-12 sm-11 md-8 lg-6 xl-4"} flex>
                    {this.renderPublicaciones()}
                </SView>
                <SHr height={40} />
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/root"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);