import { SStorage } from "servisofts-component";
import SSocket from 'servisofts-socket'
export default class DeviceKey {
    static _STORAGE_KEY = "firebaseDeviceKey";

    static KEY = "";

    static init = () => {
        DeviceKey._loadKey()
    }
    static getKey = () => {
        return DeviceKey.KEY;
    }
    static setKey = (key) => {
        // if(DeviceKey.KEY == null)
        DeviceKey.KEY = key;
        DeviceKey._saveKey();
    }

    static _loadKey = () => {
        SStorage.getItem(DeviceKey._STORAGE_KEY, (data) => {
            DeviceKey.KEY = data ?? DeviceKey.KEY;
        })
    }
    static _saveKey = () => {
        SStorage.setItem(DeviceKey._STORAGE_KEY, DeviceKey.KEY);
    }
}