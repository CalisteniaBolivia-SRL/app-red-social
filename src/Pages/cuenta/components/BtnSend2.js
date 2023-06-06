import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PButtom from '../../../Components/PButtom'
import { STheme } from 'servisofts-component'
import PButtom3 from '../../../Components/PButtom3'

export default class BtnSend2 extends Component {
    render() {
        return (
            <PButtom3
            // style={{fontSize:20}}
        
                width={"100%"}
                props={{
                    type: "outline",
                }}
                onPress={this.props.onPress}
               
            >{this.props.children}</PButtom3>
        )
    }
}