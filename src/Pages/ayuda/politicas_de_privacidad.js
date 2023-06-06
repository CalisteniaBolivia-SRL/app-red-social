import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, Restaurante, TopBar } from '../../Components';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navBar() {
        return <TopBar type={"default"} title='politicas_de_privacidad' />
    }
    render() {
        return (
            <SPage
                navBar={this.navBar()}
                 onRefresh={this.clearData}
                header={<AccentBar />}>
                <Container>
                    <SHr height={40} />
                    <SText>politicas_de_privacidad</SText>
                    <SHr height={40} />
                </Container>
            </SPage>
        );
    }

  
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);