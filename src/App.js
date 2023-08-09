import React from 'react';
import { Linking, Platform } from 'react-native';
import { SComponentContainer, SNavigation } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import Firebase from './Firebase';
import DeviceKey from "./Firebase/DeviceKey"
import { NavBar, TopBar } from './Components';
import StatusBar from './Components/StatusBar';
// import NavBar from './Components/NavBar';

setProps(Config.socket);
Firebase.init();
DeviceKey.init();
const App = (props) => {
    return <Redux>
        <SComponentContainer
            // debug
            socket={SSocket}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "dark" }}
        >
            <StatusBar />
            <SNavigation
                linking={{
                    prefixes: ["https://calisteniabolivia.com/", "http://calisteniabolivia.com/", 'calisteniabolivia://app/'],
                    getInitialURL: () => {
                        Firebase.getInitialURL();
                    }
                }}
                props={{
                    navBar: TopBar,
                    title: 'Calistenia Bolivia', pages: Pages
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    return {
                        data: usuario ? usuario : {},
                        deviceKey: DeviceKey.getKey(),
                        firebase: {
                            platform: Platform.OS,
                            token: DeviceKey.getKey(),
                            key_usuario: usuario?.key,
                            descripcion: Platform.select({
                                "web": `Web ${window.navigator.userAgent}`,
                                "android": `Android ${Platform?.constants?.Version}, ${Platform?.constants?.Manufacturer} ${Platform?.constants?.Brand} ${Platform?.constants?.Model}`,
                                "ios": `IOS ${Platform?.Version}, ${Platform?.constants?.systemName}`,
                            }),
                            app: "client"
                        }
                    };
                }}
            />
            <NavBar />
        </SComponentContainer>
    </Redux>
}
export default App;