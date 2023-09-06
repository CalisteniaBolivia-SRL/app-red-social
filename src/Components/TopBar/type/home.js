import React, { Component } from 'react'
import { SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';

import { TopBarPropsType } from '..';
import Model from '../../../Model';
export default class home extends Component<TopBarPropsType> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // componentDidMount(){

    // }
    getBack() {
        if (this.props.preventBack) {
            return null;
        }
        return <SView col={"xs-12"} height center >
            <SView onPress={() => {
                if (this.props.onBack) {
                    var prevent_default = this.props.onBack();
                    if (prevent_default) {
                        return;
                    }
                }
                SNavigation.goBack();
            }} col={"xs-12"} style={{
                paddingBottom: 4,
            }} center height>
                <SIcon height={18} name={"BackArrow"} fill={STheme.color.text} />
            </SView>
        </SView>
    }
    render() {
        return (<SView col={"xs-12"} height={50} backgroundColor={STheme.color.barColor} center row>
            <SView col={"xs-11"} row height >
                <SView width={115} height>
                    {/* {this.getBack()} */}

                    <SIcon name={"logowhite"} fill={STheme.color.text} width={115} />

                </SView>
                {(Model.usuario.Action.getKey()) ?
                    <SView flex center height
                        style={{
                            alignItems: "flex-end"
                        }}>
                        <SView col={"xs-2.5"} center onPress={() => {
                            SNavigation.navigate("/perfil/datos", { key: Model.usuario.Action.getKey() })
                        }}>
                            <SIcon fill={STheme.color.text} name='Menup' width={23} height={23} />
                        </SView>
                    </SView>
                    :
                    null
                }

                {/* <SView width={30} height center onPress={() => {
                    SNavigation.navigate('/ajustes');
                }} >
                    <SIcon name={"More"} height={18} />
                </SView>
                <SView width={30} height center onPress={() => {
                    SNavigation.navigate('/cuenta');
                }} >
                    <SIcon name={"Comment"} height={18} />
                </SView> */}
                {/* <SView col={"xs-9"} row style={{}}>
                    <SView flex style={{ alignItems: "flex-end" }}>
                        <SView row >
                            <SIcon name={"More"} height={18} />
                        </SView>
                        <SView row>
                            <SIcon name={"Comment"} height={18} />
                        </SView>
                    </SView>
                </SView> */}
                {/* <SView width={50} height></SView> */}
            </SView>
        </SView>)
    }
}