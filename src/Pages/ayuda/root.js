import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, Restaurante, TopBar } from '../../Components';
// import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navBar() {
        return <TopBar type={"menu"} title='Ayuda' />
    }
    clearData() {
        // Model.restaurante.Action.CLEAR();
    }



    item({ url, label }) {
        return <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 16, borderLeftWidth: 20, borderColor: STheme.color.primary }} onPress={() => {
            SNavigation.navigate(url)
        }}>
            <SHr height={20} />
            <SView col={"xs-12"} row center >
                <SView col={"xs-11"} row >
                    <SView width={20}></SView>
                    <SText color={STheme.color.text} fontSize={16}>{label}</SText>
                </SView>
                <SView col={"xs-1"} style={{}} >
                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                </SView>
            </SView>
            <SHr height={20} />
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
                    {this.item({
                        url: "/ayuda/preguntas_frecuentes",
                        label: "Preguntas frecuentes"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/terminos_y_condiciones",
                        label: "Términos y condiciones"
                    })}
                    {/* <SHr height={15} />
                    {this.item({
                        url: "/ayuda/politicas_de_privacidad",
                        label: "Políticas de privacidad"
                    })} */}
                    <SHr height={15} />
                    {this.item({
                        url: "/ayuda/consultas",
                        label: "Consultas"
                    })}
                    <SHr height={15} />
                    {this.item({
                        url: "/chat",
                        label: "Chat"
                    })}
                    <SHr height={40} />
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/favoritos"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);