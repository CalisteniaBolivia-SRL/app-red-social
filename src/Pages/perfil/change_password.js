import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SForm, SHr, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import { Container, PButtom } from '../../Components'
import Model from '../../Model'

export default class change_password extends Component {
    state = {
        error: ""
    }
    render() {
        return (
            <SPage title={"Cambiar contraseña"}>
                <Container>
                    <SText color={STheme.color.white} fontSize={14} justify>{"La contraseña debe contener al menos seis caracteres, incluyendo una combinación de números, letras y los siguientes símbolos especiales: (!$@%)."}</SText>
                    <SForm
                        ref={ref => this.form = ref}
                        inputs={{
                            pass: { type: "password", label: "Contraseña actual", required: true },
                            pass_new: { type: "password", label: "Contraseña nueva", required: true },
                            pass_new_rep: { type: "password", label: "Repetir contraseña nueva", required: true },
                        }}
                        onSubmit={(e) => {
                            if (e.pass_new != e.pass_new_rep) {
                                this.setState({ error: "Las contraseñas no coinciden." })
                                return;
                            }
                            const usuario = Model.usuario.Action.getUsuarioLog();
                            if (e.pass != usuario["Password"]) {
                                this.setState({ error: "La contraseña actual es incorrecta." })
                                return;
                            }

                            Model.usuario.Action.editar({
                                data: {
                                    ...usuario,
                                    Password: e.pass_new
                                }
                            }).then((e) => {
                                SNavigation.goBack();
                            }).catch(e => {
                                this.setState({ error: e.error })
                            })
                        }}
                    />
                    <SHr />
                    <SView col={"xs-11"} row center>
                        <SText color={STheme.color.danger}>{this.state.error}</SText>
                        <SHr />
                        <PButtom fontSize={20} onPress={() => {
                            this.form.submit();
                        }}>CONFIRMAR</PButtom>
                    </SView>
                </Container>
            </SPage>
        )
    }
}