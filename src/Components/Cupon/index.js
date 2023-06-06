import React, { Component } from 'react';
import { SDate, SHr, SIcon, SMath, SText, STheme, SView } from 'servisofts-component';

type propsType = {
    data: any,
    onPress: any,
}

export default class Cupon extends Component<propsType> {
    static defaultProps: propsType = {
    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return <SView col={'xs-12'} height={160} style={{
            borderRadius: 16,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: STheme.color.card,
            overflow: "hidden"
        }} row onPress={this.props.onPress}>
            <SView col={"xs-4"} backgroundColor={STheme.color.primary} center>
                <SView width={50} height={50}>
                    <SIcon name='KMenu' width={50} />
                </SView>
                <SHr />
                <SText fontSize={12} color={STheme.color.secondary}>{this.props.data.descripcion}</SText>
            </SView>
            <SView col={"xs-8"} style={{
                padding: 8
            }}>
                <SView row style={{ alignItems: "flex-end" }}>
                    <SText style={{
                        fontSize: 16,
                        paddingBottom: 3
                    }}>{"Bs."}</SText>
                    <SText fontSize={40} font='Roboto-Bold'>{SMath.formatMoney(this.props.data?.monto)}</SText>
                </SView>
                <SHr />
                <SText fontSize={14} font="OpenSans-Bold">{this.props.data.observacion}</SText>
                <SHr height={4} />
                <SText fontSize={12} color={STheme.color.gray}>{"Valido hasta " + new SDate(this.props.data.fecha_off, "yyyy-MM-dd").toString("day. dd de MON. yyyy")}</SText>
                {/* <SText fontSize={12} color={STheme.color.gray}>{"Valido hasta dom. 22 de nov. 2020 "}</SText> */}
                <SView flex />
                <SText color={STheme.color.primary}>{"Ver detalle >"}</SText>
            </SView>

        </SView>
    }
}