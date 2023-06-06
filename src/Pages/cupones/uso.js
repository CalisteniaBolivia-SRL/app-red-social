import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { AccentBar, Container } from '../../Components';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render_add() {
        return <SView col={"xs-12"} center>
            <SHr height={50} />
            <SText bold fontSize={18}>{"¿Cómo usar un cupón?"}</SText>
            <SHr height={50} />
            <SView col={"xs-12"} row center>
                <SIcon name={"Logo"} width={30} />
                <SView width={8} />
                <SText fontSize={14} flex>{"Ingresá el código con los guiones."}</SText>
            </SView>
            <SHr />
            <SView col={"xs-12"} row center>
                <SIcon name={"Logo"} width={30} />
                <SView width={8} />
                <SText fontSize={14} flex>{"Chequeá las condiciones, la fecha de vencimiento y para qué locales sirve."}</SText>
            </SView>
            <SHr />
            <SView col={"xs-12"} row center>
                <SIcon name={"Logo"} width={30} />
                <SView width={8} />
                <SText fontSize={14} flex>{"Una vez elegiste tu pedido, seleccioná el cupón que quierés usar ¡y listo!"}</SText>
            </SView>
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