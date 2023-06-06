import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SLoad, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';

export default class PopupCodigoSeguridad extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getVerificarCodigo(obj) {
        let data = obj;
        // if (obj.key) {
        //     data = Parent.Actions.getByKey(obj.key, this.props);
        //     if (!data) return <SLoad />
        // }
        return <SForm
            row
            ref={(form) => { this.form = form; }}
            inputs={{
                codigo_seguridad: { label: "Ingrese el código", placeholder: "0000", isRequired: true, col: "xs-12", type: "password", maxLength: 4 },
            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {
                if (data["codigo_seguridad"] == values["codigo_seguridad"]) {
                    //TIENE QUE HACER:
                    this.props.callback(obj);
                    SPopup.close("CodigoSeguridad");

                } else {
                    console.log(values);
                    SPopup.alert("Código incorrecto");
                }
            }}
        />
    }


    render() {
        return (
            <SView width={362} center row style={{ borderRadius: 32, overflow: "hidden" }} withoutFeedback backgroundColor={STheme.color.background}   >
                <SView col={"xs-12"} center style={{ backgroundColor: STheme.color.primary }}>
                    <SHr height={16} />
                    <SText color={STheme.color.secondary} style={{ fontSize: 20 }} bold center >Código de seguridad</SText>
                    <SHr height={16} />
                </SView>
                <SHr height={15} />
                <SView col={"xs-11"} center >
                    <SText fontSize={14} color={STheme.color.text}  >Son los 3-4 dígitos numéricos ubicados en la parte trasera de su tarjeta.</SText>
                </SView>
                <SView col={"xs-11"} center row>
                    <SView col={"xs-5"} center flex>
                        <SHr height={15} />
                        <SIcon width={100} name='TarjetaSeguridad'></SIcon>
                    </SView>
                    <SView col={"xs-6"} center>
                        {this.getVerificarCodigo(this.props.data)}
                    </SView>
                </SView>
                <SView col={"xs-12"} center>
                    <SHr height={25} />
                    <SView width={140} height={44} center backgroundColor={STheme.color.primary} style={{ borderRadius: 16 }}
                        onPress={() => {
                            this.form.submit();
                        }}  >
                        <SText fontSize={14} color={STheme.color.white} bold>VERIFICAR</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>
        );
    }
}
