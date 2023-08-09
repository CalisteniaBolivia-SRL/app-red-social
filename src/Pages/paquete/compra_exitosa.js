import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, SPage, SText, SView, STheme } from 'servisofts-component'
import LogoAnimado from '../../Components/LogoAnimado';
import { Container } from '../../Components';
import BtnSend from './components/BtnSend';

export default class compra_exitosa extends Component {
  render() {
    return (<SPage disableScroll center>
      <Container>
        <SHr height={20} />
        <SView center col={"xs-12"} style={{ backgroundColor: STheme.color.card, borderRadius: 16 }} >
          <SView col={"xs-11"} center row >
            <SHr height={25} />
            <SText fontSize={25} bold font="Oswald-Bold">¡COMPRA EXITOSA!</SText>
            <SHr height={30} />
            <SIcon name={"Good"} fill={STheme.color.text} height={100} />
            <SHr height={30} />
            <SText col center fontSize={20} bold font="Oswald-Bold">¡BIENVENIDO(A) A LA FAMILIA DE CALISTENIA!</SText>
            <SHr height={20} />
            <SText fontSize={16} font="">Gracias por tu compra.</SText>
            <SText col center fontSize={16} font="">
              Estamos emocionados de acompañarte en tu viaje de fitness y superación.</SText>
            <SHr height={30} />
            <SIcon name={"logowhite"} fill={STheme.color.text} height={45} />
            <SHr height={30} />
            <SView center col={"xs-11"} >
              <BtnSend
                onPress={() => {
                  {/* USUARIO */ }
                  // var usuario = Model.usuario.Action.getUsuarioLog();
                  // if (!usuario) return SNavigation.navigate("/cuenta", { ...this.params });
                  SNavigation.replace("/");
                }}
              >Ir a Inicio</BtnSend>
            </SView>

            <SHr height={30} />
          </SView>
        </SView>
        <SHr />
        <SHr height={20} />
      </Container>
    </SPage >
    )
  }
}