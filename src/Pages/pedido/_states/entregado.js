import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput } from 'servisofts-component';
import { Container, PButtom, Restaurante, TipoPago } from '../../../Components';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

export default class listo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
    }

    componentDidMount() {
        this.isRun = true;
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    getEstrella() {
        let arr = Array(5).fill(0);
        return arr.map((x, i) => {
            return <>
                <SView col={"xs-2.2"} height={40} row center onPress={() => {
                    if (this.state.selectValue == i) { }
                    this.setState({ selectValue: i });
                }}>
                    <SIcon name={i > this.state.selectValue ? "EstrellaOff" : "EstrellaOn"} width={i > this.state.selectValue ? 40 : 40} fill={STheme.color.card} />
                </SView>
            </>
        })
    }

    getMedal({ key, title, icon }) {
        var isSelect = this.state[key];
        return <SView col={"xs-4"}>
            <SView col={"xs-12"} center>
                <SView width={70} height={70} backgroundColor={!isSelect ? '#F39773' : "#ffffff"} style={{ borderRadius: 35 }} center
                    onPress={() => { this.setState({ [key]: !this.state[key] }); }} >
                    <SIcon name={icon} width={40} height={40} fill={!isSelect ? '#ffffff' : STheme.color.primary} stroke={!isSelect ? '#ffffff' : STheme.color.primary} />
                </SView>
            </SView>
            <SText col={"xs-12 "} fontSize={12}   bold={isSelect} color={STheme.color.secondary} center  >{title}</SText>
        </SView>
    }

    getMedals() {
        return <SView col={"xs-12 "} row>
            {this.getMedal({ key: "buena_calidad", title: 'Buena calidad', icon: 'Medalla1' })}
            {this.getMedal({ key: "buena_cantidad", title: 'Buena cantidad', icon: 'Medalla2' })}
            {this.getMedal({ key: "buen_servicio", title: 'Buen servicio', icon: 'Medalla3' })}
        </SView>
    }

    calificar() {
        var obj = {
            key_pedido: this.key_pedido,
            star: this.state.selectValue,
            buena_calidad: this.state.buena_calidad == true,
            buena_cantidad: this.state.buena_cantidad == true,
            buen_servicio: this.state.buen_servicio == true,
            comentario: this.inp_comentario.getValue() ?? "",
        }
        Model.calificacion.Actions.registro(obj, this.props);
    }



    render() {
        return (<SView col={"xs-12"} backgroundColor={STheme.color.card}   >
            <Container>
                <SHr height={20} />
                <SView col={"xs-12  "} row center >
                    <SView col={"xs-12"} backgroundColor={STheme.color.primary} style={{ borderRadius: 16 }} center >
                        <SView col={"xs-11  "} center >
                            <SHr height={50} />
                            <SText fontSize={32}   color={STheme.color.secondary} bold center>¿Cómo te pareció?</SText>
                            <SHr height={5} />
                            <SText fontSize={24}   color={STheme.color.secondary} >Califica tu experiencia</SText>
                            <SHr height={20} />
                            {<SView col={"xs-12"} center row  > {this.getEstrella()} </SView>}
                            <SHr height={20} />
                            {this.getMedals()}
                            <SHr height={40} />
                            <SText col={"xs-12"} fontSize={14}   color={STheme.color.secondary} style={{ justifyContent: 'flex-start' }} >Describe tu experiencia (opcional)</SText>
                            <SHr height={5} />
                            <SInput ref={r => this.inp_comentario = r} type={'textArea'} fontSize={14} height={110}   color={STheme.color.secondary} style={{
                                borderRadius: 8, placeholderTextColor: STheme.color.secondary, fontSize: 14,
                            }} center backgroundColor={"#F39773"} placeholder={"\n\nDescribe tu experiencia "} />
                            <SHr height={5} />
                            <PButtom fontSize={20} width={"100%"} height={50} bold withe center onPress={() => { this.calificar() }} >Enviar</PButtom>
                            <SHr height={60} />
                        </SView>
                    </SView>
                </SView>
                <SHr height={20} />
            </Container>
        </SView>
        );
    }
}