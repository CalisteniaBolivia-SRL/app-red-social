import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, Pedido, Restaurante, TopBar } from '../Components';
import BarraCargando from '../Components/BarraCargando';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    clearData() {
        Model.restaurante.Action.CLEAR();
        Model.pedido.Action.CLEAR();
    }
    loadData() {
        this.restaurantes = Model.restaurante.Action.getAllRecursive();
        this.pedidos_en_curso = Model.pedido.Action.getAllActivos();
        if (!this.restaurantes) return null;
        if (!this.pedidos_en_curso) return null;

        var key_usuario = Model.usuario.Action.getKey();
        if (!key_usuario) return null;
        this.data = Object.values(this.pedidos_en_curso).filter((a) => key_usuario == a.key_usuario
            && a.state != "entregado"
            && a.state != "pendiente_pago"
            && a.state != "timeout_pago"
        )
        return this.data;
    }

    navBar() {
        return <TopBar type={"menu"} title='Compras' />
    }

    getBotones(obj) {
        var OPINAR = (
            <SView col={"xs-6"} center onPress={() => {
                // TODO como entrar a la page de pedido entregado
                // SNavigation.navigate('/pedido/entregado', { pk: obj.key }) 
            }}   >
                <SView width={120} height={24} style={{ backgroundColor: '#EEEEEE', borderRadius: 4 }} center>
                    <SText fontSize={12} color={"#666"}>Opinar</SText>
                </SView>
            </SView>
        )
        var REPETIR = (
            <SView col={"xs-6"} center>
                <SView width={120} height={24} style={{ backgroundColor: '#EEEEEE', borderRadius: 4 }} center onPress={() => {
                    SNavigation.navigate('/restaurante', { pk: obj?.restaurante?.key })
                }}>
                    <SText fontSize={12} color={"#666"}>Repetir</SText>
                </SView>
            </SView>
        )

        if (obj.state == "pagado") return <BarraCargando />
        if (obj.state == "pago_en_proceso") return <BarraCargando />
        if (obj.state == "no_recogido") {
            OPINAR = <SView col={"xs-6"} />
        }

        return (<SView col={"xs-12"} row   >
            {OPINAR}
            {REPETIR}
        </SView>);
    }

    _buildMessage(pedido) {
        switch (pedido.state) {
            case "pagado":
                return "Esperando la hora de entrega."
            case "pago_en_proceso":
                return "Pago en proceso."
            case "timeout_pago":
                return "Pago fuera de tiempo."
            case "pendiente_pago":
                return "Pendiente de pago."
            default:
                return pedido.state;
        }
    }



    render_pedidos_en_curso() {
        if (!this.loadData()) return <SLoad />
        return <SView col={"xs-12"} row center >
            <SList
                data={this.data}
                space={16}
                order={[{ key: "fecha", order: "desc", peso: 1 }]}
                render={(obj, key) => {
                    return <SView col={"xs-12 "} height={120} row center border={STheme.color.card} style={{ borderRadius: 8, }}
                        onPress={() => {
                            SNavigation.navigate("/pedido", { pk: obj.key })
                            // if (obj.state == "pagado") {
                            //     if (obj.delivery == 0) {
                            //         SNavigation.navigate("pedido/usuario/pagado", { key_pedido: obj.key })
                            //     }
                            //     if (obj.delivery != 0) {
                            //         SNavigation.navigate("pedido/delivery/pagado", { key_pedido: obj.key })
                            //     }
                            // }
                            // if (obj.state == "no_recogido") {
                            //     SNavigation.navigate("pedido/noRecogido", { key_pedido: obj.key });
                            // }
                        }} >
                        <SView col={"xs-12"} row center border={"transparent"}  >
                            <SView col={"xs-2"} center border={"transparent"}  >
                                <SView height={40} width={40}  >
                                    <Restaurante.FotoPerfil data={obj.restaurante} style={{ width: "100%", position: "relative", resizeMode: "cover", borderRadius: 8, }} />
                                </SView>
                            </SView>
                            <SView col={"xs-8"} border={"transparent"} style={{}} >
                                <SText fontSize={16} color={STheme.color.text} >{obj?.restaurante?.nombre}</SText>
                                <SText fontSize={12} color={STheme.color.text} >{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH")}  {obj.horario.hora_inicio} - {obj.horario.hora_fin}</SText>
                                <SView height={8} />

                                <SText fontSize={12} color={STheme.color.primary} bold>{this._buildMessage(obj)}</SText>

                            </SView>
                            <SView col={"xs-2"} height={40} row center style={{ alignContent: 'center', }}>
                                <SText fontSize={18} color={STheme.color.gray} >x {obj?.cantidad}</SText>
                            </SView>
                        </SView>
                        <SView col={"xs-12"} center>
                            <SView col={"xs-11"} row center border={"transparent"}>
                                {this.getBotones(obj)}
                            </SView>
                        </SView>
                    </SView>
                }} />
        </SView>
    }

    render() {
        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<AccentBar />}>
                <Container>
                    <SHr height={40} />
                    {this.render_pedidos_en_curso()}
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/compras"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);