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

class membresia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.key_servicio = SNavigation.getParam("key_servicio");
        this.key_sucursal = SNavigation.getParam("key_sucursal");
    }

    render_with_data() {


        var paquete_servicio = Model.paqueteServicio.Action.getAll(); //para más tarde
        var sucursal_paquete = Model.sucursal_paquete.Action.getAll();
        if (!sucursal_paquete) return <SLoad />
        if (!paquete_servicio) return <SLoad />
        // var paquete = Model.paquete.Action.getByKey(data.key_paquete);
        var paquetes = Model.paquete.Action.getAll();
        if (!paquetes) return <SLoad />

        // Object.values(publicaciones).filter(obj => obj.key_usuario == usuario.key);

        const paquetes_del_servicio = Object.values(paquete_servicio).filter(o => o.key_servicio == this.key_servicio);
        const sucursal_paquetes = Object.values(sucursal_paquete).filter(sucursal_paquete_ => sucursal_paquete_.key_sucursal == this.key_sucursal && !!paquetes_del_servicio.find(a => a.key_paquete == sucursal_paquete_.key_paquete));

        // sucursal_paquete
        // console.log(paquetes)

        // console.log(sucursal_paquete)

        // console.log(sucursal_paquetes)
        let dato;
        let datoOk;
        var dataMostrar = [];
        Object.values(paquetes).map((obj) => {
            if (obj.estado == 0) return null
            dato = Object.values(sucursal_paquetes).find(obj2 => obj2.key_paquete == obj.key);
            if (!dato) return null
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
                title={"Comprar"}
                hidden
            >
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