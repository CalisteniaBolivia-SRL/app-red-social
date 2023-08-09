import React, { Component } from 'react';
import { SDate, SHr, SIcon, SMath, SText, STheme, SView , SImage, SNavigation} from 'servisofts-component';

type propsType = {
    data: any,
    onPress: any,
}

export default class Publicidad extends Component<propsType> {
    static defaultProps: propsType = {
    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return   <SView col={"xs-12"} card height={60} center
        style={{ borderWidth: 2, borderColor: STheme.color.secondary, borderRadius: 20, overflow: "hidden" }}
        onPress={() => {
            SNavigation.navigate("/servicio")
        }}
    >
        <SImage src={require('../../Assets/img/fpublicidad.png')} style={{ resizeMode: 'cover', position: 'absolute' }} />
        <SHr height={5} />
        <SIcon name='Btnpaquete' fill={STheme.color.text} height={25} />
        <SHr height={5} />
        <SText font="Oswald-Regular" fontSize={11}> &lt; PAGA SIMPLE Y RÁPIDO CON QR &gt; </SText>
    </SView>
    }
}