import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SInput, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SList2, SForm } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';
import MiPaquete from './components/MiPaqueteActivo';
import TextWithLink from '../../Components/TextWithLink';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nroPublicaciones: 0,
            nroLike: 0,
            publicaciones: [],
            publicacionesMias: []
        };
        this.key_usuario = SNavigation.getParam("pk", Model.usuario.Action.getKey())
    }

    componentDidMount() {
        var usuario = {}
        var canti = 0;
        var mias = {}

        SSocket.sendPromise({
            ...Model.usuario.info,
            "component": "usuario",
            "type": "getAllKeys",
            "estado": "cargando",
            "keys": [this.key_usuario]
        }).then((e) => {
            if (e.estado != "exito") return;
            this.setState({ usuario: e.data[this.key_usuario]?.usuario })
        }).catch((e) => {
            console.error(e)
        })

        SSocket.sendPromise({
            component: "publicacion",
            type: "getAll",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            key_perfil: this.key_usuario,
        }).then(res => {
            if (!this.state.publicaciones) return <SLoad />
            mias = Object.values(res.data);
            canti = Object.keys(mias).length;
            this.setState({ publicacionesMias: mias });
            this.setState({ nroPublicaciones: canti });
            mias.map(a => console.log(a.mylike))
            console.log("asdasd")
            mias.map(a => console.log(a.likes))
            const sumLike = mias.map(item => item.likes).reduce((prev, curr) => prev + curr, 0);

            this.setState({ nroLike: sumLike });
            // console.log(sumLike + " suma")
        }).catch(err => {
            console.log(err)
        })
    }

    renderDataHeaderItem({ val, label }) {
        return <SView center col={"xs-5"}>
            <SText bold fontSize={16}>{val}</SText>
            <SText>{label}</SText>
        </SView>
    }
    renderDataHeader = () => {
        return <SView col={"xs-12"} row>
            {this.renderDataHeaderItem({ val: this.state.nroPublicaciones, label: "Publicaciones" })}
            <SView flex />

            {this.renderDataHeaderItem({ val: this.state.nroLike, label: "Me gusta" })}
            {(Model.usuario.Action.getUsuarioLog()?.key == this.key_usuario) ? <SView width={40} height={40} center card
                onPress={() => {
                    SNavigation.navigate("/perfil/datos", { key: this.key_usuario })
                }}
            >
                <SIcon name='Iajustes' height={23} fill={STheme.color.text} />
            </SView> : null}
        </SView>
    }

    getPerfil() {
        // var usuario = Model.usuario.Action.getByKey(this.key_usuario) ?? {};
        var usuario = this.state.usuario ?? {};
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
                        {(Model.usuario.Action.getKey() != this.key_usuario) ? <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} enablePreview style={{ resizeMode: 'cover' }} /> :
                            <SForm
                                col={"xs-12"}
                                ref={ref => this.inp_foto = ref}
                                inputs={{
                                    foto_p: {
                                        type: "image",
                                        defaultValue: SSocket.api.root + "usuario/" + this.key_usuario + "?date=" + new Date().getTime(),
                                        style: {
                                            width: "100%",
                                            height: 80,
                                            backgroundColor: "none"
                                        },
                                        onChangeText: (evt) => {
                                            this.inp_foto.uploadFiles(Model.usuario._get_image_upload_path(SSocket.api, this.key_usuario), "foto_p");
                                        }
                                    }
                                }}
                            />
                        }
                    </SView>
                </SView>
                <SView width={8} />
                <SView flex center >
                    {this.renderDataHeader()}
                </SView>

            </SView>
            <SHr h={4} />
            <SView col={"xs-12"}>
                <SText bold fontSize={16}>{usuario["Nombres"]} {usuario["Apellidos"]}</SText>
                <TextWithLink fontSize={14}>{usuario["detalle_app"]}</TextWithLink>
            </SView>
        </SView>
        )
    }
    renderMenu() {
        if (Model.usuario.Action.getKey() != this.key_usuario) return null;

        return <SView flex style={{ alignItems: "flex-end" }} >
            <SView center row style={{ alignItems: "flex-end" }} col={"xs-12"} >
                <SView padding={8} row col={"xs-5.8"} center onPress={() => {
                    SNavigation.navigate("/perfil/asistencia", { key: this.key_usuario });
                }}
                    backgroundColor={STheme.color.card}>
                    <SText bold>Asistencia</SText>
                </SView>
                {/* <SHr/> */}
                <SView col={"xs-0.2"} />
                <SView padding={8} row col={"xs-5.8"} center onPress={() => {
                    SNavigation.navigate("/perfil/paquetes", { key: this.key_usuario });
                }}
                    backgroundColor={STheme.color.card}>
                    <SText bold>Paquetes</SText>
                </SView>
            </SView>
            <SView flex />
            <SHr height={15} />
            {/* <SView flex /> */}
            {/* <SView card padding={8} row width={115} center onPress={() => {
                Model.usuario.Action.unlogin(Model);
            }}>
                <SText bold color={STheme.color.danger}>Cerrar sesión</SText>
            </SView> */}
        </SView>
    }
    renderPublicaciones() {
        return <SList2
            horizontal
            data={this.state.publicacionesMias}
            order={[{ key: "fecha_on", order: "desc" }]}
            space={0}
            render={(a) => {
                return <Publicacion.CardPerfil data={a} col={"xs-4"} row center />
            }}
        />
    }

    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();
            this.componentDidMount();
        }}
            footer={this.footer()}
        >
            <Container>
                <SView col={"xs-12"}>
                    {this.getPerfil()}
                    <SHr />
                    <SHr />
                    {this.renderMenu()}
                    {/* {this.renderMenu()}
                    <SHr />
                    <SHr />
                    <MiPaquete data={usuario} onLoad={(data) => {
                        this.setState({ paquetes: data })
                    }} />
                    <SHr />
                    <SHr /> */}
                </SView>
            </Container>

            {/* <SText onPress={() => {
                SNavigation.navigate("/paquete/compra_exitosa")
            }}>IR A LAS PRUEBAS</SText>
            <SText onPress={() => {
                SNavigation.navigate("/notifications")
            }}>IR A LAS NOTIFICACIONES</SText> */}

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