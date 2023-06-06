import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SImage, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    effect1(moving) {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 10.46
        return <SView col={"xs-12"} height={h} style={{
            // position: "absolute",
            bottom: moving,
            zIndex: 1
        }}>
            <SIcon name='Effect1' fill={STheme.color.primary} />
        </SView>
    }


    render() {
        if (!this.props.data) return <SLoad type='skeleton' col={"xs-12"} height={100} />
        return (<>
            <SView col={"xs-12"} flex center >
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} row height={150} backgroundColor={STheme.color.primary} center
                    onLayout={(evt) => {
                        this.setState({ layout: evt.nativeEvent.layout })
                    }}
                >
                    <SImage src={SSocket.api.root + "sucursal/portada/" + this.props.data.key} width={"100%"} height={"100%"}
                        style={{
                            resizeMode: 'cover',
                        }}
                    />
                </SView>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} center>
                    <SHr height={15} />
                    <SView col={"xs-12"} flex style={{ alignItems: 'flex-start' }} >
                        <SIcon name={'BackTit1'} height={50} width={135} />
                    </SView>
                    <SHr height={5} />
                    <SText fontSize={22} font="Oswald-Bold" style={{ textTransform: "uppercase" }}>CALISTENIA {this.props.data.descripcion}</SText>
                    <SHr height={10} />
                </SView>
                <SView col={"xs-10"} center   >
                    <SText center fontSize={14} color={STheme.color.gray}  >{this.props.data.direccion}</SText>
                </SView>
                <SHr height={15} />
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} flex style={{ alignItems: 'flex-end' }} >
                    <SIcon name={'BackTit2'} height={32} width={110} />
                </SView>
                <SHr height={35} />

                {/* {this.effect1(-12)}
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} row height={140} backgroundColor={STheme.color.primary} center  >
                    <SView col={"xs-6"} height={140} >
                        <SImage src={require('../../../Assets/img/p1.jpg')} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                    <SView col={"xs-6"} height={140} >
                        <SImage src={require('../../../Assets/img/p2.jpg')} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                </SView>
                {this.effect1(12)} */}

            </SView>
        </>
        );
    }
}
