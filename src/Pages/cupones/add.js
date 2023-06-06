import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SInput, SLoad, SNavigation, SPage, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, Container, PButtom, PButtom2 } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onBack = SNavigation.getParam("onBack");
    }

    render_add() {
        return <SView col={"xs-12"} center>
            <SHr height={50} />
            <SText bold fontSize={18}>{"¿Quieres agregar un cupón?"}</SText>
            <SInput center ref={ref => this.codigo = ref} type='text'
                label={"Ingresá el código con los guiones"} onChangeText={(txt) => {
                    const tf = (txt + "").toUpperCase();
                    if (txt != tf) {
                        return tf;
                    }
                }} />
            <SHr />
            <SText color={STheme.color.danger}>{this.state.error}</SText>
            <SHr />
            <PButtom
                loading={this.state.loading}
                onPress={() => {
                    var code = this.codigo.getValue();
                    if (!code) {
                        this.setState({ loading: false, error: "Inserte el codigo del cupon." })
                        return;
                    }
                    this.setState({ loading: true, error: "" })
                    Model.cupon.Action.activar({ code: code }).then((resp) => {
                        this.setState({ loading: false, error: "" })
                        if (this.onBack) this.onBack();
                        SNavigation.goBack();
                    }).catch(e => {
                        this.setState({ loading: false, error: "Cupon no encontrado." })
                    })
                }} >SUBIR</PButtom>
            <SHr />

        </SView>
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                <SView col={"xs-12"} center>
                    <Container>
                        {this.render_add()}
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);