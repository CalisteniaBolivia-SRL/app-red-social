import React, { Component } from 'react';
import { SView } from 'servisofts-component';
import {
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';

import { LoginType, UsuarioType } from "../types";

class LoginFacebook extends Component<LoginType> {

    resolve(user: UsuarioType) { }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }

    onPress() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.signIn();
        })

    }
    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name,  first_name, last_name, email',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    this.reject(error);
                } else {
                    this.resolve({
                        id: result.id,
                        name: result.first_name,
                        email: result.email,
                        last_name: result.last_name

                    });
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    signIn = async () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    this.reject(login);
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);
                    });
                }
            },
            error => {
                this.reject(error);
            },
        );
    };
    render() {
        return this.props.children;
    }
}

export default LoginFacebook;