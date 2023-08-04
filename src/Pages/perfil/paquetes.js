import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SInput, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList2, SScrollView2, SList } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';
import Dia from './components/Dia';
import MiPlan from './components/MiPlan';

class paquetes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        Model.paquete_venta.Action.getAllByUsuario().then(resp => {
            this.setState({ data: resp.data })
        }).catch(e => {

        })


    }


    PaqueteItem = (obj) => {
        if (!this.paquetes) return <SLoad />
        if (!this.sucursales) return <SLoad />
        return <SView col={"xs-12"} card >
            <SView col={"xs-12"} row center>
                <SView width={50} height={50} padding={4} center>
                    <SImage src={SSocket.api.root + "/sucursal/" + obj.key_sucursal} style={{
                        borderRadius: 8, overflow: "hidden",
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView flex padding={4}>
                    <SText fontSize={16} bold>{this.paquetes[obj.key_paquete]?.descripcion}</SText>
                    <SText fontSize={14} color={STheme.color.gray}>{this.sucursales[obj.key_sucursal]?.descripcion}</SText>
                    {/* <SText>{obj.monto}</SText> */}
                    <SHr h={4} />
                    <SView col={"xs-12"} row>
                        <SText fontSize={12} color={STheme.color.gray} bold>{new SDate(obj.fecha_inicio, "yyyy-MM-dd").toString("dd de MONTH del yyyy")}</SText>
                        <SView flex />
                        <SText fontSize={12} color={STheme.color.gray} bold>{new SDate(obj.fecha_fin, "yyyy-MM-dd").toString("dd de MONTH del yyyy")}</SText>
                    </SView>
                </SView>
            </SView>
        </SView>
    }
    getBody() {
        this.paquetes = Model.paquete.Action.getAll();
        this.sucursales = Model.sucursal.Action.getAll();
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"}>
            <SText bold fontSize={22}>
                Hola, {usuario.Nombres}
            </SText>
            <SHr height={15} />
            <MiPlan data={usuario} />
            <SHr height={15} />
            <SText bold fontSize={18}>Mis paquetes</SText>
            <SHr />
            <SList
                data={this.state.data}
                order={[{ key: "fecha_fin", order: "desc" }]}
                render={o => this.PaqueteItem(o)}
            />
        </SView>
    }
    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();
            Model.paquete.Action.CLEAR()
            Model.sucursal.Action.CLEAR()
            this.componentDidMount();
        }}
            title="Paquetes"
            footer={this.footer()}
        >
            <Container>
                {this.getBody()}
            </Container>
            <SHr height={40} />
        </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/perfil"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(paquetes);