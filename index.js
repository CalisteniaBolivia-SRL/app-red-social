import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./package.json";

// LogBox.ignoreLogs(['AsyncStorage', 'Animated:', 'VirtualizedLists', 'VirtualizedLists', "Animated.event", "Warning: Each child in a list ","Invalid","Require\ cycle:"])
// LogBox.ignoreLogs(['Warning: ...'])
// LogBox.ignoreAllLogs();
console.disableYellowBox = true;
console.warn = () => {};
AppRegistry.registerComponent(appName, () => App);