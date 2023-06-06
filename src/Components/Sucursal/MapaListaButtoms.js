import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SList, SMath, SNavigation, SPage, SScroll, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { Container } from '..';
import Model from '../../Model';
export type MapaListaButtomsPropsType = {
    url: any,
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<MapaListaButtomsPropsType> {
    constructor(props) {
        super(props);
        this.state = {
            filtros: {

            }
        };
    }


    getButtom({ label, url, corner }) {
        var select = (this.props.url != url)
        const radius = 8;
        var extraStyle = {
            // borderRadius: 8,
        };
        if (corner == "left") {
            extraStyle = {
                borderTopLeftRadius: radius,
                borderBottomLeftRadius: radius
            }
        }
        if (corner == "right") {
            extraStyle = {
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius
            }
        }
        return <SView col={"xs-6"} center height={35} style={{
            backgroundColor: !select ? STheme.color.secondary : null,
            borderWidth: 2,
            borderColor: STheme.color.secondary,
            ...extraStyle,

        }} onPress={() => {
            if (url) {
                SNavigation.navigate(url);
            }
        }}>
            <SText fontSize={18} color={!select ? STheme.color.white : STheme.color.text}>{label}</SText>
        </SView>
    }
    render() {
        return (
            <Container>
                <SView col={"xs-12"} row>
                    <SHr height={5} />
                    {this.getButtom({ label: "LISTA", url: "/sucursal", corner: "left" })}
                    {this.getButtom({ label: "MAPA", url: "/sucursal/mapa", corner: "right" })}
                    <SHr height={5} />
                </SView>
            </Container >
        );
    }
}
export default (index);