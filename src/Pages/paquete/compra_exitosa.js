import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, SPage, SText, SView } from 'servisofts-component'
import LogoAnimado from '../../Components/LogoAnimado';
import { Container } from '../../Components';

export default class compra_exitosa extends Component {
  render() {
    return (<SPage disableScroll center>
      {/* <SIcon name={"logo"}/> */}
      <SText fontSize={22} bold>COMPRA EXITOSA</SText>
      <SHr h={10}/>
      <SText fontSize={24} bold>Gracias por tu preferencia.</SText>
      <SHr h={20} />
      <Container>
        <LogoAnimado />
      </Container>
      <SHr h={20} />
      <SView padding={8} card>
        <SText fontSize={22} bold onPress={() => {
          SNavigation.reset("/");
        }}>SALIR</SText>
      </SView>
    </SPage >
    )
  }
}