import React from 'react'
import { SText } from 'servisofts-component'

//ventajas
//  los state son mucho mas faciles de contralar sus renderizaciones.

//deventajas
// No tiene ref o no lo conozco.
// Es complejo.
// Son muchos hooks que aprender

export default () => {
    // const [state, setState] = React.useState({ label: "hola" })
    const [label, setLabel] = React.useState("hola")
    const [count, setCount] = React.useState(1)

    React.useEffect(() => {

    }, []) // componentDidMount

    
    React.useEffect(() => {
        //aca cuando cambia 1
    }, [label])// componentDidMount que solo entra cuando label cambia
    React.useEffect(() => {
        //aca cuando cambia la otra
    }, [count])// componentDidMount que solo entra cuando count cambia


    const calcularCuenta = React.useMemo(() => {

    }, [label])


    const calcularLabel = () => {
        // 
    }

    const l = calcularLabel();
    const c = calcularCuenta();
    return <>
        <SText>{label}</SText>
        <SText onPress={() => {
            setCount(count + 1)
        }}>{count}</SText>

    </>
}