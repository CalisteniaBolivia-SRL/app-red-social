import { Text, View } from 'react-native'
import React, { Component } from 'react'
import PButtom from '../../../Components/PButtom'
import { STheme } from 'servisofts-component'
import PButtom4 from '../../../Components/PButtom4'

export default class BtnSend3 extends Component {
    render() {
        return (
            <PButtom4
            // style={{fontSize:20}}
        
                width={"100%"}
                props={{
                    type: "outline",
                }}
                onPress={this.props.onPress}
               
            >{this.props.children}</PButtom4>
        )
    }
}