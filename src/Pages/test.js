import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SLoad, SInput, SView, SInput2, STheme, SIcon } from 'servisofts-component';
import Container from '../Components/Container';
// import TopBar from '../../Components/TopBar';

// import Container from '../../Components/Container';
// import Model from '../../Model';
// import SSocket from 'servisofts-socket';
// import Header from '../../Components/Header';

class formulario extends Component {
    // static TOPBAR = <><TopBar title='Documentos' /><Header /></>
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const style_input = {
            // borderWidth: 1,
            // borderColor: STheme.color.gray,
            borderRadius: 12,
            backgroundColor: STheme.color.card,
            height: 50,
            paddingStart: 16,
            paddingEnd: 16,
            fontSize: 16
        }
        let space = 16;
        return <SPage hidden>
            <Container>
                <SView col={"xs-11"} center>
                    <SHr />
                    <SHr h={space * 2} />
                    <SText fontSize={16} bold color={STheme.color.text}>{"REGISTRO CONDUCTOR"}</SText>
                    <SHr h={space * 2} />
                    <SView col={"xs-12"} row style={{ justifyContent: "space-between" }}>
                        <SView col={"xs-5"} colSquare>
                            <SInput2 type='text' style={[style_input, { height: "100%", textAlign: "center" }]} placeholder={"FOTO CI ANVERSO"} />
                        </SView>
                        <SView col={"xs-5"} colSquare>
                            <SInput2 style={[style_input, { height: "100%", textAlign: "center" }]} placeholder={"FOTO CI REVERSO"} />
                        </SView>
                    </SView>
                    <SHr h={space * 2} />
                    <SInput2 style={[style_input, {}]} placeholder='Carnet de identidad'  />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} placeholder='Nombre completo' />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} type='select' placeholder='Genero' />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} type='select' placeholder='Ciudad' />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} placeholder={"Numero telefono"} />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} placeholder={"Correo electrónico"} />
                    <SHr h={space * 2} />
                    <SView col={"xs-12"} row style={{ justifyContent: "space-between" }}>
                        <SView col={"xs-5"} colSquare>
                            <SInput2 style={[style_input, { height: "100%" }]} placeholder={"FOTO CONDUCTOR"} />
                        </SView>
                        <SView col={"xs-5"} colSquare>
                            <SInput2 style={[style_input, { height: "100%" }]} placeholder={"FOTO VEHICULO"} />
                        </SView>
                    </SView>
                    <SHr h={space * 2} />
                    <SInput2 style={[style_input, {}]} placeholder={"Tipo de vehículo"} />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} placeholder={"NIT"} />
                    <SHr h={space} />
                    <SInput2 style={[style_input, {}]} placeholder={"PLACA"} />
                    <SHr h={space} />
                    <SInput2 style={style_input} placeholder={"SOAT"} />
                    <SInput2 placeholder={"SOAT"} />
                    <SHr h={space} />
                    <SHr h={space} />
                    {/* <PButtom>Registro</PButtom> */}
                    <SHr h={space * 3} />
                </SView>
            </Container>
        </SPage>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(formulario);