import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage, SInput } from 'servisofts-component';
import { AccentBar, Sucursal } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import Mapa from './components/Mapa';
import Card from './components/Card';
import Header from './components/Header';
import BackButtom from '../../Components/BackButtom';
import SSocket from 'servisofts-socket'


class detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0,
            dataEntredores: {}
        };
        this.params = SNavigation.getAllParams();
        this.pk = SNavigation.getParam("pk");
    }

    componentDidMount = async () => {
        var usuarioRol = await SSocket.sendPromise({
            ...Model.usuarioRol.info,
            "component": "usuarioRol",
            "type": "getAll",
            "estado": "cargando",
            "key_rol": "b5b4a616-dd16-4443-b859-39245f50c8df"
        }).then((e) => {
            if (e.estado != "exito") return;
            return e.data;
        }).catch((e) => {
            console.error(e)
        })

        var sucursalUsuario = await SSocket.sendPromise({
            ...Model.usuarioRol.info,
            "component": "sucursal_usuario",
            "type": "getAll",
            "estado": "cargando",
            "key_sucursal": this.pk
        }).then((e) => {
            if (e.estado != "exito") return;
            return e.data;
        }).catch((e) => {
            console.error(e)
        })

        // console.log(usuarioRol)
        // console.log(sucursalUsuario)
        let dato;
        var dataMostrar = [];
        Object.values(sucursalUsuario).map((obj) => {
            if (obj.estado == 0) return null
            dato = Object.values(usuarioRol).find(obj2 => obj2.key_usuario == obj.key_usuario);
            if (!dato) return null
            dataMostrar.push(obj.key_usuario)
        })
        console.log(dataMostrar)



        var usuarios = await SSocket.sendPromise({
            ...Model.usuario.info,
            "component": "usuario",
            "type": "getAllKeys",
            "estado": "cargando",
            "keys": dataMostrar
        }).then((e) => {
            if (e.estado != "exito") return;
            console.log(e.data)
            return e.data;
        }).catch((e) => {
            console.error(e)
        })

        this.setState({ dataEntredores: usuarios })
    }

    loadData() {
        this.sucursal = Model.sucursal.Action.getByKey(this.pk);
        if (!this.sucursal) return null;
        return true;
    }
    contenido() {
        return <SView col={"xs-12"} row>
            <SList
                data={this.state.dataEntredores}
                space={10}
                horizontal
                render={(obj, key) => {
                    // console.log(SSocket.api.root + "usuario/" + obj.usuario?.key)
                    return <SView width={130} center >
                        <SView card height={127} width={127} center style={{ borderRadius: 15, overflow: "hidden" }}>
                            {/* <SIcon name='Iusuario' width={80} height={80} fill={STheme.color.text} style={{ position: "absolute" }} /> */}
                            <SImage src={SSocket.api.root + "usuario/" + obj.usuario?.key + "?date=" + new Date().getTime()} style={{ resizeMode: 'cover' }} />
                        </SView>
                        <SView col={"xs-12"} height={52} style={{ overflow: 'hidden' }}>
                            <SHr height={16} />
                            <SText fontSize={14} center style={{ textTransform: 'uppercase' }}>
                                {obj.usuario?.Nombres} {obj.usuario?.Apellidos}
                            </SText>
                        </SView>
                        <SHr height={5} />
                    </SView>
                }} />
        </SView>
    }

    render_with_data() {
        return this.contenido()
    }

    render() {
        var defaultData = {
            ...this.params,
        };
        this.loadData();
        return (
            <SPage hidden footer={<BackButtom />}>
                <Header data={this.sucursal} />
                <SView  center margin={50}>
                    <SView width={100} height={100} >
                        <SImage src={SSocket.api.root + "sucursal/" + this.sucursal.key} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                </SView>
                
                <Container>
                    <Sucursal.Tituto icon='TitEntrenador' titulo={'ENTRENADORES'} />
                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={30} />
                </Container>
                <Container>
                    <SHr height={20} />
                    <Sucursal.Tituto icon='TitUbicacion' titulo={'UBICACIÓN'} />
                    <SHr height={20} />
                </Container>
                <Mapa height={350} data={this.sucursal} />
                <Container>
                    <SHr height={20} />
                    <Sucursal.Tituto icon='TitComprar' titulo={'COMPRAS'} />
                    <SHr height={20} />
                    <SView col={"xs-12"} center row
                    onPress={()=>{
                        SNavigation.navigate("/paquete/membresia",{ pk: this.pk})
                    }}
                    >
                        {/* <SView width={200} center
                            style={{
                                borderColor: STheme.color.secondary,
                                borderWidth: 1,
                                borderRadius: 8
                            }}
                        >
                            <SHr height={10} />
                            <SText fontSize={18} bold>COMPRAR</SText>
                            <SHr height={10} />
                        </SView> */}
                        <SIcon name='Adquiere' height={45}  />
                    </SView>
                </Container>
                <SHr height={50} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(detalle);