import { Cookies } from 'react-cookie';
import { virtualPath } from '../config';
import { v4 as uuidv4 } from 'uuid';
const cookies = new Cookies();

//export const API_SERVER = window.location.protocol + '//' + window.location.host;


let baseUrl;
if (window.location.hostname.indexOf("react.") >= 0) {
    baseUrl = `${window.location.protocol}//${window.location.host}/${window.location.pathname.split('/')[1]}`;
} else {
    baseUrl = `${window.location.protocol}//${window.location.host}`;
}
//export const API_SERVER = baseUrl;
//export const API_SERVER = `http://122.176.151.165:5007`;
export const API_SERVER = `https://bs64converter.sagarinfotech.com`;

export const initializeFilterData = {
    "SearchText": "",
    "StartValue": "2",
    "SearchFieldValue": "",
    "PageSize": "10",
    "AdvanceFilter": []
}

//-------------------To Store data in Local, Cookies and Session Storage-----------------------//
export const SetSession = (type, key, value) => {
    let tempKey = (virtualPath).replace("/", "").toLowerCase() + "_" + key;
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        window.localStorage.setItem(tempKey, value);
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        cookies.set(tempKey, value, { path: "/" });
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        sessionStorage.setItem(tempKey, value);
    }
}

//-------------------To Getting Store data in Local, Cookies and Session Storage-----------------------//
export const GetSession = (type, key) => {
    let tempKey = (virtualPath).replace("/", "").toLowerCase() + "_" + key;
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        let data = window.localStorage.getItem(tempKey);
        return data
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        let data = cookies.get(tempKey);
        return data
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        let data = sessionStorage.getItem(tempKey);
        return data
    }
}

//-------------------To Remove data from Local, Cookies and Session Storage-----------------------//
export const RemoveSession = (type, key) => {
    let tempKey = (virtualPath).replace("/", "").toLowerCase() + "_" + key;
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        localStorage.removeItem(tempKey);
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        cookies.remove(tempKey)
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        sessionStorage.removeItem(tempKey);
    }
}

var user = GetSession('cookies', 'user');

 export const config = {
    token: import.meta.env.VITE_AUTH_TOKEN, 
    LoginToken: user?.loginSessionID ? user?.loginSessionID : null,
    UserCode: user?.eCode ? user?.eCode : null,
    secret_key: import.meta.env.VITE_AUTH_TOKEN, 
    EName: user?.eName ? user?.eName : null,
    companyCode: user?.companyCode ? user?.companyCode : null,
}


//export default config

export const CommonApiData = () => {
    var user = GetSession('cookies', 'user');
    if (user) {
        let data = {
            Token: user.token ? user.token : '',
            LoginUserCode: user.loginUserCode ? user.loginUserCode : '',
            User: user.userName ? user.userName : '',
            Source: 'Web',
        }
        return data
    } else {
        return {
            Token: 'EXPIRED',
            LoginUserCode: '',
            User: '',
            Source: 'Web',
        };
    }
}

export const slabCount = 6;


export const getUUID = () => uuidv4(); // To generate Random ID

//-------------Data Copy to clipboard------------//
export const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
};

//------------------Get Financial Year Data-----------------//
export const getCurrentFinancialYear = () => {
    const launchYear = 2023; // Default Lauch Year
    const today = new Date(); // current Date
    const month = today.getMonth(); //current Month
    const currentYear = today.getFullYear(); // Current Year
    let financialYearArr = [];
    for (let i = 0; i <= (currentYear - launchYear); i++) {
        if ((month + 1) <= 3) {
            financialYearArr.push({
                value: `${(currentYear - i - 1)}-${(currentYear - i)}`,
                label: `${(currentYear - i - 1)}-${(currentYear - i).toString().slice(-2)}`,
            })
        } else {
            financialYearArr.push({
                value: `${(currentYear - i)}-${(currentYear - i + 1)}`,
                label: `${(currentYear - i)}-${(currentYear - i + 1).toString().slice(-2)}`
            })
        }
    }
    return { financialYearArr, currentYear: (month + 1) <= 3 ? (currentYear - 1) + "-" + currentYear : currentYear + "-" + (currentYear + 1) }
}