import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList } from 'servisofts-component';
import { AccentBar, BottomNavigator } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SectionApis from '../login/components/SectionApis';
import BtnSend from './components/BtnSend';
import Header from './components/Header';
import Card from './components/Card';
import BackButtom from '../../Components/BackButtom';
import SSocket from "servisofts-socket";

class membresia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.key_servicio = SNavigation.getParam("key_servicio");
        this.key_sucursal = SNavigation.getParam("key_sucursal");
    }

    componentDidMount() {
        Model.paquete.Action.CLEAR();
        this.getPaquetePromo();
    }

    getPaquetePromo() {

        var key_usuario = Model.usuario.Action.getKey();


        this.setState({ loading: "cargando", data: null });
        SSocket.sendPromise({
            component: "paquete_promo_usuario",
            type: "getAll",
            key_usuario: key_usuario
            // key_usuario: "5868de4c-87d0-4b5d-8572-7a255d817e6b"
        })
            .then((resp) => {
                this.setState({ loading: false, data: resp.data });
            })
            .catch((e) => {
                this.setState({ loading: false, error: e });
            });
    }

    render_with_data() {


        // var paquete_servicio = Model.paqueteServicio.Action.getAll(); //para más tarde
        // var sucursal_paquete = Model.sucursal_paquete.Action.getAll();
        // if (!sucursal_paquete) return <SLoad />
        // if (!paquete_servicio) return <SLoad />
        // var paquete = Model.paquete.Action.getByKey(data.key_paquete);
        var paquetes = Model.paquete.Action.getAll({
            key_servicio: this.key_servicio,
            key_sucursal: this.key_sucursal,
        });
        if (!paquetes) return <SLoad />
        if (!this.state.data) return <SLoad />
        // Object.values(publicaciones).filter(obj => obj.key_usuario == usuario.key);

        // const paquetes_del_servicio = Object.values(paquete_servicio).filter(o => o.key_servicio == this.key_servicio);
        // const sucursal_paquetes = Object.values(sucursal_paquete).filter(sucursal_paquete_ => sucursal_paquete_.key_sucursal == this.key_sucursal && !!paquetes_del_servicio.find(a => a.key_paquete == sucursal_paquete_.key_paquete));

        // sucursal_paquete
        // console.log(paquetes)

        // console.log(sucursal_paquete)

        // console.log(sucursal_paquetes)
        let arr_paquete_promo_usuario = Object.values(this.state.data)
        var dataMostrar = [];
        Object.values(paquetes).map((obj) => {
            if (obj.estado == 0) return null

            let obj_ppu = arr_paquete_promo_usuario.find(a => a.key_paquete == obj.key)

            if (!obj_ppu) {
                if (!obj.estado_app) return null
            }else{
                obj.promo_usuario = obj_ppu;
            }
            // dato = Object.values(sucursal_paquetes).find(obj2 => obj2.key_paquete == obj.key);
            // if (!dato) return null
            dataMostrar.push(obj)
        })
        return <SList
            buscador={"true"}
            space={15}
            initSpace={15}
            data={dataMostrar}
            filter={(a) => a.estado != 0}
            order={[{ key: "precio", order: "asc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} dataPaquete={paquetes} key_sucursal={this.key_sucursal} />
            }}
        />
    }

    render() {
        var defaultData = {
            ...this.params,
        };

        return (
            <SPage
                footer={this.footer()}
                onRefresh={(callback) => {
                    Model.paquete.Action.CLEAR();
                }}
                title={"Comprar"}
                hidden
            >
                {/* TODO: alvaro toco este codigo para mostrar paaquete promo usuario */}
                <SHr height={50} />
                <Container>
                    {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Comprar</SText>
                    </SView> */}
                    {this.render_with_data()}
                    <SHr height={20} />
                </Container>
            </SPage>
        );
    }
    footer() {
        return <>
            <BottomNavigator url={"/paquete"} />
            <BackButtom />
        </>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(membresia);