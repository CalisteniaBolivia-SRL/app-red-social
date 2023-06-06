import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, Container, PButtom, Restaurante } from '../../Components';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
    }
    load_data() {
        this.data = Model.restaurante.Action.getByKeyRecursive(this.pk);
        if (!this.data) return null;
        return this.data;
    }
    render_data() {
        if (!this.load_data()) return <SLoad />
        return <SView col={"xs-12"} center>
            <SView col={"xs-12"} height row center backgroundColor={STheme.color.white}>

                <SView col={"xs-11 sm-10 md-8 lg-4 xl-4"} height >

                    <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white, borderRadius: 16, overflow: "hidden", borderWidth: 2, borderColor: STheme.color.card}} center>
                        <SHr height={15} />

                        <SView col={"xs-11"} row center  >
                            <SView width={60}   >


                                <SView center style={{ overflow: 'hidden', borderRadius: 8, borderWidth: 0, borderColor: STheme.color.lightGray }}
                                    width={55} height={55} backgroundColor={STheme.color.white}>
                                    <Restaurante.FotoPerfil data={this.data} width={58} height={58} />
                                </SView>
                            </SView>

                            <SView flex style={{
                                justifyContent: "center",
                                paddingLeft: 8
                            }} >
                                <SText fontSize={15}   style={{ fontWeight: "bold" }}>{this.data?.nombre}</SText>
                                <Restaurante.ProximoHorario data={this.data} col={"xs-12"} />

                            </SView>
                        </SView>
                        <SHr height={15} />

                    </SView>


                    <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white, borderRadius: 16, overflow: "hidden", borderWidth: 2, borderColor: STheme.color.card }} center>
                        <SView col={"xs-11"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                            <SHr height={15} />
                            <SText fontSize={18}   style={{ fontWeight: "bold" }}>Descripción</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14}   >{this.data?.descripcion}</SText>
                            <SHr height={15} />
                        </SView>
                        <SView col={"xs-11"}>
                            <SHr height={15} />
                            <SText fontSize={18}   style={{ fontWeight: "bold" }}>Dirección</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14}   >{this.data?.direccion}</SText>
                            <SHr height={15} />
                        </SView>
                    </SView>
                    <SHr height={20} />
                </SView>
            </SView>
            {/* <Container>
            </Container> */}
        </SView>
    }
    render() {
        return (
            <SPage header={<AccentBar />}>
                {this.render_data()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);