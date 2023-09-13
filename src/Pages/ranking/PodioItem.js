import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SInput, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'

const handlePress = (key) => {
    SNavigation.navigate("/perfil/client", { pk: key });

}

const PuestoText = ({ position }) => {
    let label = "";
    switch (position) {
        case 1: label = "er"; break;
        case 2: label = "do"; break;
        case 3: label = "er"; break;
    }

    return <SView style={{
        position: "absolute",
        top: 0,
        left: 8,
    }} row>
        <SText bold style={{ fontSize: 18 }}>{position}</SText>
        <SText style={{ fontSize: 12 }}>{label}</SText>
    </SView>
}

const PositionCard = ({ style, data, index }) => {
    return <SView
        col={"xs-3.7"}
        center
        onPress={handlePress.bind(this, data?.key_usuario)}
        style={{
            position: "absolute",
            top: 120,
            ...style
        }}>
        <SHr />
        <SHr />
        <SView col={"xs-11"} colSquare style={{
            borderRadius: 100,
            maxWidth: 150,
            borderWidth: 1,
            borderColor: STheme.color.card,
            overflow: 'hidden',
            backgroundColor: STheme.color.card
        }}>
            <SImage src={SSocket.api.root + "usuario/" + data?.key_usuario} />
        </SView>
        <SHr />
        <PuestoText position={index + 1} />
        {(index == 0 ?
            <SView col={"xs-12"} center style={{position:"absolute"}}>
                <SIcon fill={'#E6C081'} name='Winner' width={180} height={171} />
            </SView> :
            null)}
        <SText center >{data?.usuario?.Nombres} {data?.usuario?.Apellidos}</SText>
        <SText center fontSize={12} color={STheme.color.gray}>{data?.cantidad} Likes</SText>
    </SView>
}
export default ({ data }) => {
    if (!data) return <SLoad />
    if (!data.length) return <SText>No hay publicaciones.</SText>
    return <SView col={"xs-12"} center height={350} >
        <PositionCard style={{
            left: 0,
        }} data={data[1]} index={1} />
        <PositionCard style={{
            top: 0,
        }} data={data[0]} index={0} />
        <PositionCard style={{
            right: 0,
        }} data={data[2]} index={2} />
    </SView>
}