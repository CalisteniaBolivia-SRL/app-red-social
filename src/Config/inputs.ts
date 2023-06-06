import { SInputsCofig, STheme } from 'servisofts-component';
const inputs = () => {
    return {
        "default": {
            "LabelStyle": {
                position: "absolute",
                top: -10,
                left: 0,
                fontSize: 14,
                width: "100%",
                color: STheme.color.text,
            },
            "View": {
                // borderWidth: 2,
                // borderColor: "#E0E0E0" + "40",
                height: 50,
                // borderRadius: 12,
                marginTop: 50,

            },
            "InputText": {
                fontSize: 16,
                paddingStart: 20,
                paddingRight: 20,
                color: STheme.color.text,
                backgroundColor: STheme.color.lightGray,
                placeholderTextColor: STheme.color.text,
                borderRadius: 10,
                // borderColor: STheme.color.text,
                // borderWidth: 1,

            },
            "error": {
                borderRadius: 12,
                borderWidth: 2,
                borderColor: STheme.color.danger,
            },
            "placeholder": {
                color: STheme.color.text,
            }
        }
    }
}
export default inputs;
