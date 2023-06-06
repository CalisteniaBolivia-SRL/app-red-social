export const login = ({ userName, password }) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "userName": userName,
            "password": password
        });
        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://10.83.253.250:30047/rest/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                resolve(result.token);
            })
            .catch(error => reject(error));
    })

}


export const qrcode_payment = ({
    qrId, transactionId, payDate, Authorization
}) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Authorization);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "qrId": qrId,
            "transactionId": transactionId,
            "payDate": payDate
        });

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://10.83.253.250:30047/rest/qrcode/payments", requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })

}

