import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList } from 'servisofts-component';
import { AccentBar, BottomNavigator, TopBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from "servisofts-socket"

// import SectionApis from '../login/components/SectionApis';
// import BtnSend from './components/BtnSend';
// import Header from './components/Header';
import Card from './components/Card';
import BackButtom from '../../Components/BackButtom';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

   

    render_with_data() {
        var servicio = Model.servicio.Action.getAll();

      //  if(!this.state.sucursal_servicio) return null;
        
        // var servicio = Model.sucursal.Action.getAll();
        //var sucursal_servicio = Model.sucursal_servicio.Action.getAll();
        if (!servicio) return <SLoad />
       //if (!sucursal_servicio) return <SLoad />
        // console.log(sucursal_servicio);

        return <SList
            buscador={"true"}
            space={15}
            initSpace={15}
            data={Object.values(servicio)}
            filter={(a) => a.estado != 0}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Card datas={data} pkSucursal={this.params.pk} />
            }}
        />
    }
    navBar() {
        return <TopBar type={"home"} />
    }

    render() {
        var defaultData = {
            ...this.params,
        };

        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                title={"Comprar"}
                hidden
            >
                {/* <SHr height={50} /> */}
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
            <BottomNavigator url={"/servicio"} />
            {/* <BackButtom /> */}
        </>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);