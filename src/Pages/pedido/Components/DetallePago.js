import React, { Component } from 'react';
import { SHr, SMath, SText, STheme, SView } from 'servisofts-component';

type propsType = {
    precio: Number,
    cantidad: Number,
    delivery: Number,
    cupon: Number
}

export default class DetallePago extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    getDetalleDelivery() {
        if (!this.props?.delivery) return null;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Envio</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. {SMath.formatMoney(this.props.delivery)}</SText>
            </SView>
        </SView>
    }
    getDetalleCupon() {
        if (!this.props.cupon) return null;;
        return <SView col={"xs-12"} row>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} bold>Cupon:</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} bold >Bs. -{SMath.formatMoney(this.props.cupon)}</SText>
            </SView>
        </SView>
    }
    render() {
        const { precio, cantidad, delivery, cupon } = this.props;
        var total = ((precio * cantidad) + parseFloat(delivery)) - (cupon ?? 0);
        return <SView col={"xs-12  "} row center style={{ backgroundColor: STheme.color.white }}>
            <SView col={"xs-11"} row center>
                <SHr height={15} />
                <SView col={"xs-6"} >
                    <SText style={{ textAlign: "justify" }} fontSize={15}   >Total</SText>
                </SView>
                <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={15}   >Bs. {SMath.formatMoney(precio * cantidad)}</SText>
                </SView>
                <SHr height={10} />
                {this.getDetalleDelivery()}
                <SHr height={10} />
                {this.getDetalleCupon()}
                <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                <SHr height={10} />
                <SView col={"xs-6"} >
                    <SText style={{ textAlign: "justify" }} fontSize={15} bold>Total:</SText>
                </SView>
                <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                    <SText fontSize={15} bold >Bs. {SMath.formatMoney(total)}</SText>
                </SView>
                <SHr height={15} />
            </SView>
        </SView>
    }
}