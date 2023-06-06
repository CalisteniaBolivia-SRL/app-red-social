import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SInput, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SList2 } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nroPublicaciones: 0,
        };
    }

    renderDataHeaderItem({ val, label }) {
        return <SView center col={"xs-4"}>
            <SText bold fontSize={16}>{val}</SText>
            <SText>{label}</SText>
        </SView>
    }
    renderDataHeader = () => {
        return <SView col={"xs-12"} row>
            {this.renderDataHeaderItem({ val: this.state.nroPublicaciones, label: "Publicaci..." })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidores" })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidos" })}
        </SView>
    }

    getPerfil() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        return (<SView col={"xs-12"}>
            <SView col={"xs-12"} row center>
                <SView style={{
                    width: 80,
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        width: "100%", height: "100%", backgroundColor: STheme.color.card, borderRadius: 100, overflow: "hidden",
                    }} border={STheme.color.card}>

                        {/* <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{ resizeMode: 'cover'}} /> */}
                        <SInput ref={r => this.r_image = r} type={"image"} style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "none"
                        }}
                            defaultValue={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()}
                        />
                    </SView>
                </SView>
                <SView width={8} />
                <SView flex center >
                    {this.renderDataHeader()}
                </SView>

            </SView>
            <SHr h={4} />
            <SView col={"xs-12"}>
                <SText bold fontSize={16}>{usuario["Nombres"] + " " + usuario["Apellidos"]}</SText>
                <SText fontSize={14}>{usuario["CI"]}</SText>
            </SView>
        </SView>
        )
    }
    renderMenu() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"} row>
            <SView card padding={8} row width={115} center onPress={() => {
                SNavigation.navigate("/perfil/editar", { key: usuario.key });
            }}>
                <SText bold>Editar perfil</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={100} center onPress={() => {
                SNavigation.navigate("/perfil/asistencia", { key: usuario.key });
            }}>
                <SText bold>Asistencia</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={115} center onPress={() => {
                Model.usuario.Action.unlogin(Model);
                // SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Cerrar sesión</SText>
            </SView>
        </SView>
    }
    renderPublicaciones() {
        let publicaciones = Model.publicacion.Action.getAll();
        let usuario = Model.usuario.Action.getUsuarioLog();
        if (!publicaciones) return <SLoad />
        if (!usuario) return <SLoad />
        let publicacionesMias = Object.values(publicaciones).filter(obj => obj.key_usuario == usuario.key);
        this.state.nroPublicaciones = Object.keys(publicacionesMias).length;

        console.log(publicacionesMias)
        //console.log(Object.keys(publicacionesMias).length)

        return <SList2
            horizontal
            data={publicacionesMias}
            order={[{ key: "fecha_on", order: "desc" }]}
            space={0}
            render={(a) => {
                // let user = Model.usuario.Action.getByKey(a.key_usuario);
                // if (!user) return <SLoad/>
                // console.log(user);
                return <Publicacion.CardPerfil data={a} col={"xs-4"} row center />
            }}
        />
    }
    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();

        }}
            footer={this.footer()}
        >
            <Container>
                <SView col={"xs-12"}>
                    {this.getPerfil()}
                    <SHr />
                    <SHr />
                    {this.renderMenu()}
                    <SHr />
                    <SHr />

                </SView>
            </Container>
            <SView col={"xs-12"} center>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-3"} style={{ alignItems: "center" }} center >
                    {this.renderPublicaciones()}
                    <SHr height={50} />
                </SView>
            </SView>
        </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/perfil"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);