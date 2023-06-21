import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SForm, SHr, SIcon, SImage, SInput, SList, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView, Upload } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal, BtnNavegar, PButtom } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");
    }

    handlePress = () => {
        let image = this.r_image.getValue();
        let descripcion = this.r_descripcion.getValue();
        if (!image) {
            SPopup.alert("Inserta una imagen");
            return;
        }
        if (!descripcion) {
            SPopup.alert("Inserta una descripción");
            return;
        }
        let data = {
            ...this.publicacion,
            descripcion: descripcion
        }
        console.log(this.pk + " llll");

        Model.publicacion.Action.editar({
            data: {
                ...data,
            },
            key_usuario: Model.usuario.Action.getKey(),
            key_publicacion: this.pk
        }).then(resp => {
            Upload.sendPromise(image[0], SSocket.api.root + "upload/publicacion/" + resp.data.key).then(resp2 => {
                SNavigation.reset("/");
            }).catch(e => {
                SNavigation.reset("/");
            })
        }).catch(e => {
            console.error(e);
        })
    }

    getDatos() {
        if (!this.pk) return null
        this.publicacion = Model.publicacion.Action.getByKey(this.pk);
        if (!this.publicacion) return <SLoad />
        return <>
            <SView col={"xs-12"} colSquare style={{ backgroundColor: STheme.color.card, borderRadius: 8, overflow: "hidden" }} center>
                <SInput ref={r => this.r_image = r} type={"image"} style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 99
                }}
                    defaultValue={Model.publicacion._get_image_download_path(SSocket.api, this.pk)}
                // defaultValue={SSocket.api.root + "publicacion/" + publicacion?.key + "?date=" + new Date().getTime()}
                />
                {/* <SImage src={Model.publicacion._get_image_download_path(SSocket.api, this.pk)} style={{
                    resizeMode: "cover" ,position: "absolute", zIndex: 98 
                }} /> */}
                {/* <SIcon name='Icam' width={60} height={60} fill={STheme.color.text} style={{ position: "absolute", zIndex: 98 }} /> */}
            </SView>
            <SHr />
            <SInput ref={r => this.r_descripcion = r} type='textArea' placeholder={"Escribe un pie de foto"} style={{
                backgroundColor: STheme.color.card,
                borderWidth: 1,
                borderColor: STheme.color.card,
                borderRadius: 8,
            }} defaultValue={this.publicacion?.descripcion} />
        </>
    }
    render() {
        if (!Model.usuario.Action.getUsuarioLog()) {
            SNavigation.replace("/login");
            return null;
        }

        return (
            <SPage title={"Nueva publicación"}
                footer={<SView col={"xs-12"} center>
                    <PButtom loading={this.state.loading} center
                        onPress={this.handlePress.bind(this)}>
                        CONFIRMAR
                    </PButtom>
                    <SHr height={15} />
                </SView>}>
                < Container >
                    {this.getDatos()}
                    {/* <SView col={"xs-12"} colSquare style={{ backgroundColor: STheme.color.card, borderRadius: 8, overflow: "hidden" }} center>
                        <SInput ref={r => this.r_image = r} type={"image"} style={{
                            width: "100%",
                            height: "100%",
                            zIndex: 99
                        }} />

                        <SIcon name='Icam' width={60} height={60} fill={STheme.color.text} style={{ position: "absolute", zIndex: 98 }} />
                    </SView>
                    <SHr />
                    <SInput ref={r => this.r_descripcion = r} type='textArea' placeholder={"Escribe un pie de foto"} style={{
                        backgroundColor: STheme.color.card,
                        borderWidth: 1,
                        borderColor: STheme.color.card,
                        borderRadius: 8,
                    }} /> */}
                    <SHr />
                    {/* <SView col={"xs-12"} card height={40} center onPress={this.handlePress.bind(this)}>
                        <SText>{"Continuar"}</SText>
                    </SView> */}
                </Container >
            </SPage >
        );
    }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);