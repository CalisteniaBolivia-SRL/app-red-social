import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, BottomNavigator, Container, PButtom, Publicacion } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';


class perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nroPublicaciones: 0,
        };
    }

    btn = ({ title, onPress, active }) => {
        return <SView col={"xs-5.5"} height={44} center border={STheme.color.card} backgroundColor={active ? STheme.color.primary : ""} style={{ borderRadius: 8 }} onPress={onPress}  >
            <SText fontSize={14} color={active ? STheme.color.secondary : STheme.color.text} bold>{title}</SText>
        </SView>
    }

    load_data() {
        // this.data = Model.direccion_usuario.Action.getAll();
        this.data = Model.usuario.Action.getUsuarioLog();
        return this.data;
    }

    getPerfil() {

        if (!this.load_data()) return <SLoad />
        var usuario = this.data;
        // var usuario = this.props.state.usuarioReducer.usuarioLog;
        // if (!usuario) {
        //     SNavigation.navigate('login');
        //     return <SView />
        // }

        // var usuario = Model.usuario.Action.getUsuarioLog();
        // if (!usuario) return <SView col={"xs-12"} center height onPress={() => {
        // 	SNavigation.navigate("/login")
        // 	this.fadeOut();
        // }}></SView>
        return (
            <SView center>
                <SView style={{
                    width: 140,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        position: "absolute"
                    }}>
                        {/* <SIcon name='InputUser' width={139} height={139} /> */}
                    </SView>

                    <SView style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: STheme.color.primary,
                        borderRadius: 100,
                        overflow: "hidden",
                    }} border={STheme.color.card}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()}

                            style={{ resizeMode: 'cover', }} />


                    </SView>
                </SView>
                <SHr />
                <SView >
                    <SView center>
                        <SText style={{
                            // flex: 5,
                            fontSize: 18,
                            // fontWeight: "bold",
                            // color: "#fff"
                        }} font='LondonBetween'>{usuario["Nombres"] + " " + usuario["Apellidos"]} </SText>
                    </SView>
                    <SHr />


                </SView>
            </SView>
        )
    }
    getDato(key, icon) {
        // var text = usuario_dato
        if (!this.data) return null;
        var text = this.data[key] ?? '--';
        if (key == "Password") {
            text = "************"
        }
        return <SView row col={"xs-12"} center>
            <SHr />
            <SHr />
            <SIcon name={icon} width={40} height={30} fill={STheme.color.secondary} />
            <SView width={16} />
            <SText>{text}</SText>
            <SView flex />
        </SView>
    }
    getDatos() {
        return <SView col={"xs-12"} center>
            {/* {this.getDato("Nombres", "InputUser")} */}
            {/* {this.getDato("Apellidos", "InputUser")} */}
            {/* {this.getDato("CI", "InputUser")} */}
            {/* {this.getDato("Fecha de nacimiento", "Calendar")} */}
            {this.getDato("Telefono", "InputPhone")}
            {this.getDato("Correo", "InputEmail")}
            {this.getDato("Password", "InputPassword")}
            {/* {this.getDato("Direccion", "InputLocation")} */}

        </SView>
    }

    popupEliminar() {
        var INSTACE = this;
        return <SView
            style={{
                width: "100%",
                maxWidth: 365,
                height: 220,
                borderRadius: 30,
                padding: 8

            }}
            center
            withoutFeedback
            backgroundColor={STheme.color.background}
        >
            <SHr height={30} />
            <SView col={"xs-8"} center >
                <SText color={STheme.color.text} style={{ fontSize: 20 }} center >¿Estás seguro de eliminar la cuenta?</SText>
            </SView>
            <SHr height={10} />
            <SView flex />
            <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                    {this.btn({ title: "No, cancelar", onPress: () => { SPopup.close("eliminar"); }, active: false })}
                    <SView col={"xs-1"} />
                    {this.btn({
                        title: "Sí, Confirmar", onPress: () => {
                            Model.usuario.Action.editar({
                                data: {
                                    ...this.data,
                                    estado: 0
                                },
                            }
                            );
                            SPopup.close("eliminar");
                            Model.usuario.Action.CLEAR() //Limpiar caché
                            Model.usuario.Action.unlogin();

                        }, active: true
                    })}
                </SView>
            </SView>
            <SView flex />
        </SView>
    }
    opcion({ url, titulo, icon }) {
        if (url == 'admin') {
            var roles = Roles_permisos.components.rol.Actions.getAll(this.props);
            var ru = Roles_permisos.components.usuarioRol.Actions.getAll(
                this.props.state.usuarioReducer?.usuarioLog?.key,
                null,
                this.props
            );
            if (!roles) return;
            if (!ru) return;
            if (Object.keys(ru).length === 0) return;
        }
        return (
            <>
                <SView
                    row
                    col={'xs-11'}
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: STheme.color.card
                        // borderBottomColor: STheme.color.darkGray
                    }}
                    onPress={() => {
                        if (url == 'salir') {
                            this.props.dispatch({ type: 'USUARIO_LOGOUT' });
                            carrito.Actions.removeAll(this.props); //Elimina todos los eventos del carrito
                            SNavigation.replace('login');
                        } else {
                            SNavigation.navigate(url);
                        }
                    }}>
                    <SView row col={'xs-1'}>
                        <SIcon
                            name={icon}
                            width={20}
                            height={20}
                            fill={url == 'salir' ? '#ff4132' : STheme.color.primary}></SIcon>
                    </SView>
                    <SView row col={'xs-9'}>
                        <SText color={url == 'salir' ? '#ff4132' : STheme.color.primary} font={"Roboto"}>
                            {titulo}
                        </SText>
                    </SView>
                    <SView flex col={'xs-2'} style={{ alignItems: 'flex-end' }}>
                        <SIcon
                            name={'MenuPerfil'}
                            width={9}
                            fill={url == 'salir' ? '#ff4132' : STheme.color.primary}></SIcon>
                    </SView>
                    <SHr height={20} />
                </SView>
                <SHr height={20} />
            </>
        );
    }
    getOpciones() {
        return (
            <SView col={'xs-12'} center>
                <SView
                    backgroundColor={STheme.color.card}
                    col={'xs-12'}
                    style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        borderTopWidth: 1,
                        borderTopColor: STheme.color.card
                    }}>
                    <SHr />
                    <SView row col={'xs-12'} center>
                        <SHr height={10} />
                        <SView row col={'xs-10'} center>
                            <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>OPCIONES</SText>
                        </SView>
                        <SHr height={10} />
                        <SView
                            row
                            col={'xs-8'}
                            center
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: STheme.color.card
                            }}></SView>
                    </SView>
                    <SView row col={'xs-12'} center>
                        <SHr height={50} />
                        <SView
                            row
                            col={'xs-11'}
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: STheme.color.card
                            }}
                            onPress={() => {
                                // SNavigation.navigate(url);
                            }}>
                            <SView row col={'xs-1'}>
                                <SIcon
                                    name={STheme.getTheme() == 'dark' ? "Dark" : "Sun"}
                                    width={20}
                                    height={20}
                                    fill={STheme.color.primary}></SIcon>
                            </SView>
                            <SView row col={'xs-9'}>
                                <SText font={"Roboto"}>Modo {STheme.getTheme() == 'dark' ? "oscuro" : "claro"}</SText>
                            </SView>
                            <SView flex col={'xs-2'} style={{ alignItems: 'flex-end' }}>
                                {/* <SIcon
                      name={'Modo'}
                      width={35}
                      fill={STheme.color.primary}></SIcon> */}

                                <SwitchTheme
                                    width={35}
                                    height={20}
                                    callback={(resp) => {
                                        console.log('viendo que', resp);
                                    }}
                                />
                            </SView>
                            <SHr height={20} />
                        </SView>
                        <SHr height={20} />
                        {this.opcion({
                            url: 'editar',
                            titulo: 'Editar perfil',
                            icon: 'Editar'
                        })}
                        {this.opcion({
                            url: 'perfil',
                            titulo: 'Notificaciones',
                            icon: 'Notificacion'
                        })}
                        {this.opcion({
                            url: 'admin',
                            titulo: 'Administración',
                            icon: 'Admin'
                        })}
                        {this.opcion({
                            url: 'terminos',
                            titulo: 'Términos y Condiciones',
                            icon: 'IconCheckedOk'
                        })}
                        {this.opcion({
                            url: 'salir',
                            titulo: 'Salir',
                            icon: 'SalirPerfil'
                        })}
                    </SView>
                    <SHr height={30} />
                </SView>
            </SView>
        );
    }

    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();

        }}
            footer={this.footer()}
        >
            <Container>
                <SView col={"xs-12"} center>
                    {this.getPerfil()}
                    <SView height={10}></SView>
                    {this.getDatos()}
                    <SView height={20}></SView>
                    {/* {this.getOpciones()} */}


                    <PButtom fontSize={20} onPress={() => {
                        SNavigation.navigate("/perfil/editar", { key: this.data.key });
                    }}>EDITAR</PButtom>
                    <SHr height={10} />
                    <PButtom fontSize={20} onPress={() => {
                        SNavigation.navigate("/notifications");
                    }}>NOTIFICACIONES</PButtom>
                    <SHr height={10} />
                    <PButtom fontSize={20} onPress={() => {
                        // SPopup.confirm({
                        //     title: "Eliminar cuenta", message: "¿Estás seguro de eliminar la cuenta?", onPress: () => {
                        //         Model.usuario.Action.editar({
                        //             data: {
                        //                 ...this.data,
                        //                 estado: 0
                        //             },
                        //         }
                        //         );
                        //         Model.usuario.Action.CLEAR() //Limpiar caché
                        //         Model.usuario.Action.unlogin();
                        //     }
                        // })
                        SPopup.open({ key: "eliminar", content: this.popupEliminar() });

                    }}>ELIMINAR CUENTA</PButtom>
                    <SView height={30}></SView>
                </SView>
            </Container>

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
export default connect(initStates)(perfil);