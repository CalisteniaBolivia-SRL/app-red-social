import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SSection, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, BottomNavigator, Container, NavBar, Restaurante, TopBar } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData() {
        Model.novedades.Action.CLEAR();
    }
    loadData() {
        this.novedades = Model.novedades.Action.getAll();
        // this.novedades = Model.novedades.Action.getAllRecursive();
        if (!this.novedades) return null;
        return true;
    }

    render_list_recomendados() {
        return <Container>
            <SList center initSpace={8}
                data={this.novedades}
                col={"xs-12"}
                limit={10}
                render={(obj, i) => {
                    if (obj.estado != "1") return null;
                    return <SSection key={"mi_iten_key_" + i}>
                        <SView col={"xs-12"} row center backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}>
                            <SImage src={SSocket.api.root + "novedades/" + obj.key} style={{
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                maxWidth: "100%", minWidth: "100%", overflow: "hidden",
                                resizeMode: "cover",
                                height: 165
                            }} />
                            <SHr height={20} />
                            <SView col={"xs-11"}>
                                <SText color={STheme.color.primary}   fontSize={18} style={{}}>{obj.titulo}</SText>
                                <SHr height={5} />
                                <SView col={"xs-12"} row center style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} ></SView>
                                <SHr height={5} />
                                <SView col={"xs-12"} center flex style={{ alignItems: "flex-end" }}>
                                    <SText color={STheme.color.darkGray}>{obj.fecha}</SText>
                                </SView>
                                <SHr height={10} />
                                <SText color={STheme.color.text}   fontSize={15} style={{}}>{obj.descripcion}</SText>
                            </SView>
                            <SHr height={25} />
                        </SView>
                        <SHr height={20} />
                    </SSection>
                }}
            />
        </Container>
    }
    render_with_data() {
        if (!this.loadData()) return <SLoad />
        return <SView col={"xs-12"} center>
            {this.render_list_recomendados()}
        </SView>

    }
    navBar() {
        return <TopBar type={"menu"} title='novedades' />

    }

    render() {
        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
                header={<AccentBar />}>
                {this.render_with_data()}
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/explorar"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);