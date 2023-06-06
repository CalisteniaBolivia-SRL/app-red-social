import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, SImage, SInput, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import { Container, PButtom } from '../../Components';
import SShared from '../../Components/SShared';

class QR extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.data = JSON.parse(SNavigation.getParam("data"));
    }
    success() {
        SNavigation.navigate("billetera");
    }
    render() {
        const { transaction_id, image_data, checkout_amount } = this.data;
        // var transaction_id_reducer = this.props.state.billeteraReducer.transaction_id;
        // if (transaction_id_reducer == transaction_id) {
        //     this.success();
        // }
        console.log("miralo ", image_data);
        return (
            <SPage disableScroll>
                <SView col={"xs-12"} center height style={{ backgroundColor: STheme.color.primary, }}>


                    <Container>
                        {/* <SView col={"xs-9"} border={'transparent'}  >
                            <SText fontSize={16} color='red' center> aqui va algo</SText>
                        </SView> */}
                        {/* <SHr height={16} /> */}
                        <SView col={"xs-12"} center  >
                            <SView center col={"xs-9"} colSquare backgroundColor={"#fff"} style={{padding: 32,borderRadius: 16}}>
                                <SImage src={image_data} />
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "0deg" }], left: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "270deg" }], left: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "90deg" }], right: 20, top: 20 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                                <SView style={{ position: "absolute", width: 40, height: 40, transform: [{ rotate: "180deg" }], right: 20, bottom: 15 }} ><SIcon name={"BarraQr"} ></SIcon></SView>
                            </SView>
                        </SView>
                        <SHr height={16} />
                        <SView col={"xs-12"} height={100} row center  >
                            <SView col={"xs-2"} height center>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {
                                    SShared.saveB64(image_data)
                                }}>
                                    <SIcon name={"ImgSave"} />
                                </SView>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {SShared.sharedB64(image_data)}}>
                                    <SIcon name={"ImgShare"} />
                                </SView>
                            </SView>
                            <SView col={"xs-2"} height center>
                            </SView>
                        </SView>
                        <SHr height={16} />

                        <PButtom withe loading={this.state.loading} onPress={() => {
                            SSocket.sendPromise(
                                {
                                    "component": "billetera",
                                    "type": "getByTransactionId",
                                    "transaction_id": transaction_id,
                                }
                            ).then((resp) => {
                                this.setState({ loading: false });
                                if (!!resp?.data?.key) {
                                    this.success();
                                }
                            }).catch((err) => {
                                this.setState({ loading: false });
                                console.error("Error en el pago", err);
                            });
                        }}>Verificar pago</PButtom>

                    </Container>

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(QR);