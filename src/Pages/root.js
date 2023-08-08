import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SDate, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal, Publicacion } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket'

import { FlatList } from 'react-native';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }


    componentDidMount() {

        // Model.usuario.Action.getAll({ force: true })

    }
    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
        Model.publicacion.Action.CLEAR();
        // Model.usuario.Action.getAll({ force: true, fecha_edit: "1989-01-01T00:00:01" });
        // Model.usuario.Action.CLEAR();
        this.componentDidMount();

    }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList
            // buscador={"true"}
            center
            space={14}
            data={sucursales}
            limit={5}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Sucursal.Card image={1} datas={data} root={'/sucursal/detalle'} />
            }}
        />

    }
    banner() {
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-8 xl-11 xxl-11"}
                backgroundColor={STheme.color.primary}
            >
                <SView col={"xs-12"} height={470}>
                    <SImage src={require('../Assets/img/banner1.png')} style={{ resizeMode: 'cover' }} />
                </SView>
                <SHr height={20} />
                <SView col={"xs-12"} height={470}>
                    <SImage src={require('../Assets/img/banner2.png')} style={{ resizeMode: 'cover' }} />
                </SView>

            </SView>
        </>
    }
    navBar() {
        return <TopBar type={"home"} />
    }


    renderLogo() {
        return <>
            <SHr height={15} />
            <SView col={"xs-12"} height={100} center style={{ borderWidth: 2, borderColor: STheme.color.secondary, borderRadius: 21 }}>
                <SHr height={10} />
                <SIcon name='logowhite' fill={STheme.color.text} width={200} />
                <SHr height={10} />
            </SView>
            <SHr height={15} />
        </>
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
        let publicaciones = Model.publicacion.Action.getAll({
            key_usuario: Model.usuario.Action.getKey()
        });
        if (!publicaciones) return <SLoad />
        const arr = Object.values(publicaciones).sort((a, b) => new SDate(a.fecha_on).isBefore(new SDate(b.fecha_on)) ? 1 : -1)

        const handleRefresh = async () => {
            this.clearData();
        };
        return <FlatList
            onRefresh={handleRefresh}
            refreshing={this.state.refreshing}
            data={arr}
            style={{
                width: "100%",
            }}
            keyExtractor={item => item.key.toString()}
            ItemSeparatorComponent={() => <SHr h={100} />}
            renderItem={itm => <Publicacion.Card data={itm.item} />}
        />
        return <SList
            data={publicaciones}
            order={[{ key: "fecha_on", order: "desc" }]}
            space={50}
            render={(a) => {
                return <Publicacion.Card data={a} />
            }}
        />
    }
    render() {

        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                disableScroll
            >
                <Container flex>
               
                    {/* <SHr height={20} /> */}
                    {/* <SHr height={15} /> */}
                    {this.renderPublicidad()}
                    {/* <SHr height={15} /> */}
                    <SView col={"xs-12"} flex>
                        {this.renderPublicaciones()}
                    </SView>
                    {/* {this.render_with_data()} */}
                    {/* {this.banner()} */}

                </Container>
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