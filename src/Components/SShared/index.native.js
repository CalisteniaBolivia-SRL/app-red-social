import React, { Component } from 'react';
import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-camera-roll/camera-roll";
import { SUuid } from 'servisofts-component';
export default class SShared extends Component {

    static async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    static async guardar(qr) {

    };
    static sharedB64(b64, { titulo = "titulo", message = "mensaje" }) {
        var imageUrl = b64;
        let shareImage001 = {
            title: titulo,
            message: message,
            url: imageUrl,
            // saveToFiles: true,
        };
        // console.log(shareImage001)
        Share.open(shareImage001)
            .then((res) => { console.log(res); })
            .catch((err) => { err && console.log(err); });
    }
    static async saveB64(b64) {
        if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
            console.log("Denied");
            alert("No se puede guardar la imagen");
            return;
        }
        let imageName = SUuid() + ".png";
        const dirs = RNFetchBlob.fs.dirs;
        const path = Platform.OS === 'ios' ? `${dirs.DocumentDir}/${imageName}` : `${dirs.PictureDir}/${imageName}`;
        // const path = `${dirs.PictureDir}/${imageName}`;

        var image_data = b64.split(',');
        image_data = image_data[1];
        await RNFetchBlob.fs.writeFile(path, image_data, 'base64');
        if (Platform.OS === 'android') {
            // Guarda la imagen en la galería de Android
            await CameraRoll.save(path, { type: 'photo' });
            alert("Imagen guardada en el carrete.")
        } else {
            // Guarda la imagen en la galería de iOS
            const promise = CameraRoll.save(path, 'photo');
            promise
                .then(function (result) {
                    console.log('save succeeded ' + result);
                    alert("Imagen guardada en el carrete.")
                })
                .catch(function (error) {
                    console.log('save failed ' + error);
                });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View>
                <Text> NATIVE </Text>
            </View>
        );
    }
}
