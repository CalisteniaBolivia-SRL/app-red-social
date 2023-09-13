import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container } from '../../Components';
import BackButtom from '../../Components/BackButtom';
import Model from '../../Model';
import SectionApis from './components/SectionApis';
import SectionFooter from './components/SectionFooter';
import SectionForm from './components/SectionForm';
import SectionHeader from './components/SectionHeader';
import SectionRegister from './components/SectionRegister';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/perfil");
            return null;
        }

        return (
            <SPage center
                hidden
                footer={this.footer()}
            >
                <SHr height={40} />
                <SView col={"xs-12"} center>
                    <SView col={"xs-12"}>
                        <Container>
                            {/* <SHr height={8} /> */}
                            <SectionHeader />
                            {/* <SHr height={16} /> */}
                        </Container>
                    </SView>
                    <Container>
                        <SHr height={16} />
                        <SectionForm ref={ref => this._sectionForm = ref} />
                        <SHr height={25} />
                        <SectionFooter onPress={() => {
                            this._sectionForm.submit();
                        }} />
                        <SHr height={35} />
                        {/* <SectionApis /> */}
                        {/* <SHr height={35} /> */}

                        {/* quitar mientrastanto */}
                        <SectionRegister />

                        <SHr height={50} />
                    </Container>
                </SView>
            </SPage>
        );
    }
    footer() {
        return <>
            <BottomNavigator url={"/login"} />
            <BackButtom />
        </>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(login);