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
        this.params = SNavigation.getAllParams();
        this.pk = SNavigation.getParam("pk");
    }

    render_with_data() {


        // var paquete_servicio = Model.paquete_servicio.Action.getAll(); //para más tarde
        var sucursal_paquete = Model.sucursal_paquete.Action.getAll();
        if (!sucursal_paquete) return <SLoad />
        // var paquete = Model.paquete.Action.getByKey(data.key_paquete);
        var paquetes = Model.paquete.Action.getAll();
        if (!paquetes) return <SLoad />

        // Object.values(publicaciones).filter(obj => obj.key_usuario == usuario.key);
        var sucursal_paquetes = Object.values(sucursal_paquete).filter(sucursal_paquete_ => sucursal_paquete_.key_sucursal == this.pk);
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
        console.log(dataMostrar)

        return <SList
            buscador={"true"}
            space={15}
            initSpace={15}
            data={dataMostrar}
            filter={(a) => a.estado != 0}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} dataPaquete={paquetes} pkSucursal={this.params.pk} />
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