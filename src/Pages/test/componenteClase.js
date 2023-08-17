import React, { Component } from 'react'
import { SText } from 'servisofts-component'


//  -   ventajas
// Permite el ref y se puede ejecutar funciones.

//  -   deventajas
// Renderiza sin control

export default class ComponenteClase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: "Hola",
            count: 1,
        }
    }
    componentDidMount(){
        
    }
    play() {
        alert("Play")
    }
    render() {
        return <SText>{this.state.label}</SText>
    }
}

// let instance = null;
// const a = () => {
//     const refFunction = (ref) => {
//         instance = ref
//     }
//     // instance.play() INCORRECTO
//     return <>
//         <ComponenteClase ref={refFunction} />
//         <Buttom onPress={() => {
//             instance.play() //CORRECTO
//         }}></Buttom>
//     </>
// }