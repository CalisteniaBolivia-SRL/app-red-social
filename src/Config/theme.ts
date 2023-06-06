import { SThemeThemes } from 'servisofts-component';
import MapStyle from './mapStyle'

const theme: SThemeThemes = {
    default: {
        barStyle: "light-content",
        barColor: "#ffffff",
        text: "#000000",
        primary: "#ffffff",
        secondary: "#D70000",
        info: "#DE5738",
        background: "#ffffff",
        // card: "#44444466",
        card: "#99999966",
        accent: "#99CC00",
        lightGray:"#D9D9D9",
        lightBlack: "#5A5A5A",
        mapStyle: MapStyle,
        // font: "OpenSans-SemiBold",
        darkGray:"#DADADA"

    },
    dark: {

        barStyle: "light-content",
        barColor: "#000000",
        text: "#ffffff",
        primary: "#000000",
        secondary: "#D70000",
        info: "#DE5738",
        background: "#000000",
        // card: "#eeeeee66",
        card: "#66666666",
        accent: "#99CC00",
        mapStyle: MapStyle,
        // font: "OpenSans-SemiBold",
        lightGray:"#5A5A5A",
        lightBlack: "#D9D9D9",
        darkGray:"#2D2D2D"
    }
}
export default theme;