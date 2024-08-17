import { useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { API_SERVER, CommonApiData } from "../../EnvConfig/env_config";
import { NotificationSound } from "./CommonNotification";
import axios from "axios";
import qs from "qs";

const post = (url, payload, onDone) => {
    axios({
        method: "post",
        url: `${API_SERVER + url}`,
        //url: `http://192.168.1.37:5000${url}`,
        data: qs.stringify(payload),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        onDone(res.data);
    }).catch(error => {
        if (error.response) {
            console.log('Error response:', error.response);
        } else {
            console.log('Error message:', error.message);
        }
    });
};

export { post };

export function convertTwoDecimalsOnValue(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
}
export function convertThreeDecimalsOnValue(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,3})/s;
    return value.match(regex)[0];
}
export function convertThreeDecimalsWithoutZero(value) {
    const regex = /^(?!0\d*\.?)\d*(?:[.,]\d{0,3})?/;
    const match = value.match(regex);
    return match ? match[0] : "";
}

let previousValue = "";
export function ConvertToCharacterCaseOne(value) {
    let regex = /^[a-zA-Z0-9\/_\-]*$/;
    let matchResult = value.match(regex);
    if (matchResult !== null) {
        previousValue = matchResult[0];
        return matchResult[0];
    } else {
        return previousValue;
    }
}

let preValue = "";
export function ConvertToCharacterCaseTwo(value) {
    let regex = /^[a-zA-Z0-9\/_\-]*$/;
    let matchResult = value.match(regex);
    if (matchResult !== null) {
        preValue = value.toUpperCase();
        return value.toUpperCase();
    } else {
        return preValue;
    }
}

export function convertDate(value) {
    const regex = /(?: (?: 31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
    const match = value.match(regex);
    return match ? match[0] : "";
}
export function convertToNumber(value) {
    return value.replace(/[^0-9]/g, '');
}

export function properCase(inputString) {
    return inputString.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

export function upperCase(inputString) {
    return inputString.toUpperCase();
}
export function convertToDate(value) {
    return value.replace(/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g, '');
}
export function convertToContactNumber(value) {
    return value.replace(/[^0-9+-]/g, '');
}

export function getAmountWithGST(Amount, gstRate) {
    if (Amount && gstRate) {
        return ((Number(Amount) * Number(gstRate)) / 100).toFixed(2);
    } else {
        return ''
    }
};

export function getDateAndTime() {
    let pqrDate = new Date()
    let dateArr = pqrDate?.toString()?.split(' ')
    let curTime = dateArr[4]
    let curHHMM = curTime.split(':')
    curHHMM = `${curHHMM[0]}:${curHHMM[1]}`
    dateArr = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`
    return {
        time: curHHMM,
        date: dateArr
    }
};


export function arraysAreEqual(arr1, arr2) {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
            return false;
        }
    }
    return true;
};


export function convertStringToArray(arr, separator) {
    if (arr === undefined) {
        return 'Please Supply Valid String!'
    }
    if (arr === '') {
        return [];
    } else {
        let newArr = arr.split(separator);
        return newArr;
    }
};

export function convertNumberToWord(number) {
    if (typeof number !== 'number' || isNaN(number)) {
        return 'invalid input';
    }
    if (number === 0) return 'zero';
    let integerPart = Math.floor(number);
    let decimalPart = Math.round((number - integerPart) * 100);
    if (decimalPart === 100) {
        integerPart++;
        decimalPart = 0;
    }
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function convertIntegerToWord(n) {
        let str = '';
        str += (n[1] !== '00') ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] !== '00') ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] !== '00') ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] !== '0') ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';


        if (n[5] !== '00') {

            str += (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]);
        }
        return str.trim();
    }

    function convertIntegerToWordPaise(n) {
        if (Number(n) <= 0) return
        n = n.toString().padStart(6, '0'); // Ensure the input is 6 digits long
        let str = '';
        str += (n[0] !== '0') ? a[n[0]] + 'crore ' : '';
        str += (n[1] !== '0') ? a[n[1]] + 'lakh ' : '';
        str += (n[2] !== '0') ? a[n[2]] + 'thousand ' : '';
        str += (n[3] !== '0') ? a[n[3]] + 'hundred ' : '';

        if (n[4] !== '0' || n[5] !== '0') {
            if (str !== '') {
                str += 'and ';
            }
            if (n[4] === '1') {
                str += a[parseInt(n[4] + n[5])];
            } else {
                str += b[n[4]] + ' ' + a[n[5]];
            }
        }
        return str.trim();
    }

    let integerWords = '';
    if (integerPart >= 1e9) return 'overflow';
    let integerStr = integerPart.toString();
    if (integerStr.length > 9) return 'overflow';
    let n = ('000000000' + integerStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    integerWords = convertIntegerToWord(n);

    let decimalWords = '';
    if (decimalPart !== 0) {
        let decimalNum = parseInt(decimalPart, 10);
        decimalWords = convertIntegerToWordPaise(('000' + decimalNum).substr(-3));
        decimalWords += ' paise';
    }

    let result = integerWords;
    if (decimalWords !== '') {
        if (result !== '') {
            result += ' rupee and ';
        }
        result += decimalWords;
    }

    return result;
}


export function formatDate(date) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var day = ('0' + date.getDate()).slice(-2);
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    return day + '-' + month + '-' + year;
}

export const useGetData = (url, bodyData) => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);
    let { AuthToken, LoginToken, UserCode, CompanyCode, ...rest } = bodyData;
    let Data = {
        ...rest,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    }
    useEffect(() => {
        const abortController = new AbortController();
        fetch(`${API_SERVER + url}`, {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        }).then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => setError(err))
            .finally(() => {
                abortController.abort();
            });
        setLoading(false);
    }, [url])

    return { data, error, loading };
};

export const ApiCall = (url, bodyData) => {
    let { ...rest } = bodyData;
    let Data = {
        ...rest,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "loginBCode": CommonApiData().loginBCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    }
    const abortController = new AbortController();
    let data = fetch(`${API_SERVER + url}`, {
    //let data = fetch(`http://192.168.1.132:5000${url}`, {
        method: 'POST',
        body: JSON.stringify(Data),
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    }).then((res) => res.json())
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err
        }).finally(() => {
            abortController.abort();
        });
    return data
};



export const deleteData = (url, bodyData, RefereshApi, HandleClear, chargeType, inputref) => {

    let { ...rest } = bodyData;
    let _Data = {
        ...rest,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
        Type: 'E',
        PageIndex: '1'
    }
    if (typeof bodyData === 'object' && bodyData !== null) {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            keydownListenerCapture: true,
            stopKeydownPropagation: false,
            didOpen: () => {
                document.addEventListener('keydown', function (event) {
                    if (event.key === 'Y' || event.key === 'y') {
                        Swal.clickConfirm();
                    } else if (event.key === 'N' || event.key === 'n') {
                        Swal.clickCancel();
                    }
                });
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const abortController = new AbortController();
                let Data = await fetch(`${API_SERVER + url}`, {
                    method: 'POST',
                    body: JSON.stringify(_Data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                    signal: abortController.signal
                }).then((res) => res.json())
                    .then(async (res) => {
                        if (res.status === 'SUCCESS') {
                            await NotificationSound(res.status, res.message, res.focus, inputref);
                            if (chargeType) {
                                RefereshApi(0, chargeType)
                            } else {
                                RefereshApi()
                            }
                            HandleClear()
                        } else {
                            await NotificationSound(res.status, res.message, res.focus, inputref);
                        }
                        return res;
                    })
                    .catch((err) => {
                        return err
                    }).finally(() => {
                        abortController.abort();
                    });
                return Data
            }
        });

    } else {
        NotificationSound('ERROR', 'Body Data is not valid JSON !');
    }
};

export const AutoCompleteList = (preFix, type, contextKey = '', contextKey2 = '', contextKey3 = '') => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);

    let Data = {
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    }
    useEffect(() => {
        const abortController = new AbortController();
        fetch(`${API_SERVER}/api/AutoComplete/GetAutoComplete`, {
            method: 'POST',
            body: JSON.stringify({ ...Data, type, preFix, contextKey, contextKey2, contextKey3 }),
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        }).then((res) => res.json())
            .then((res) => {
                let dataList = [];
                let _datalist = res.dataList;
                for (let i = 0; i < _datalist?.length; i++) {
                    let _value = (_datalist[i]?.values);
                    dataList?.push(_value);
                }
                setData(dataList)
                setLoading(false)
            })
            .catch((err) => setError(err))
            .finally(() => {
                abortController.abort();
            });

    }, [type, preFix, contextKey, contextKey2, contextKey3])

    return { data, error, loading };
}

export const FetchAutoCompleteData = async (Data, preFix, type, contextKey = '', contextKey2 = '', contextKey3 = '', contextKey4 = '') => {
    let { ...rest } = Data;
    let _Data = {
        ...rest,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    }
    let dataList = [];
    try {
        if (preFix !== undefined && preFix !== '') {
            const abortController = new AbortController();
            const response = await fetch(`${API_SERVER}/AutoComplete/AutoComplete`, {
                method: 'POST',
                body: JSON.stringify({ ..._Data, Type: type, preFix, ContextKey: contextKey, ContextKey2: contextKey2, ContextKey3: contextKey3, ContextKey4: contextKey4 }),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: abortController.signal
            });

            const res = await response.json();

            let _datalist = res.autoCompleteData;
            for (let i = 0; i < _datalist?.length; i++) {
                let _value = (_datalist[i]?.values);
                dataList?.push(_value);
            }
            return dataList;
        }
        else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};
// Updated DropDownData hook
export const DropDownData2 = (ContextKey = '', ContextKey2 = '') => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    let Data = {
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    };

    useEffect(() => {
        //setLoading(true)
        const abortController = new AbortController();
        fetch('api/Master/GetMasterDataForDriverMaster', {
            method: 'POST',
            body: JSON.stringify({ ...Data, ContextKey, ContextKey2 }),
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                // setLoading(false);
            })
            .finally(() => {
                abortController.abort();
            });
    }, [ContextKey, ContextKey2]);

    return { data, error, loading };
};

export const DropDownData = (Type, ContextKey = '', ContextKey2 = '') => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    let Data = {
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    };
    useEffect(() => {
        const abortController = new AbortController();
        fetch(`${API_SERVER}/AutoComplete/GetMasterData`, {
            method: 'POST',
            body: JSON.stringify({ ...Data, Type, ContextKey, ContextKey2 }),
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        }).then((res) => res.json())
            .then((res) => {
                setData(res)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
            .finally(() => {
                abortController.abort();
            });
    }, [Type, ContextKey, ContextKey2])
    return { data, error, loading };
};

export const usePostApiCall = (url, bodyData) => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    let { AuthToken, LoginToken, UserCode, CompanyCode, ...rest } = bodyData;
    let Data = {
        ...rest,
        "Token": CommonApiData().Token,
        "LoginUserCode": CommonApiData().LoginUserCode,
        "Source": 'Web',
        "User": CommonApiData().UserName,
    }
    const [abortController, setAbortController] = useState(new AbortController());
    const response = useCallback(async () => {
        try {
            const controller = new AbortController();
            setAbortController(controller);
            const response = await fetch(`${API_SERVER + url}`, {
                method: "POST",
                body: JSON.stringify(Data),
                headers: {
                    "Content-Type": "application/json"
                },
                signal: abortController.signal
            });
            const json = await response.json();

            setData(json);
        } catch (error) {
            setError(error.message);
        }
    }, [url, bodyData])

    useEffect(() => {
        return () => abortController.abort();
    }, [abortController]);


    return { data, error, response };
};

export const handleDateChange = (e, setFormData, formData, key) => {
    let dateArr = (e?.toString() || '').split(' ');
    if (dateArr.length >= 4) {
        dateArr = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`;
        setFormData({ ...formData, [key]: dateArr });
    } else {
        setFormData({ ...formData, [key]: '' });
    }
};

export const handleImgData = (selector, record, photoNameProp, photoExtProp) => {
    let elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        let element = elements[0];
        if (record[photoNameProp] !== '' && record !== '') {
            element.childNodes[2].innerHTML = `<span class="sc-fqkvVR kFhUBM">(${record[photoNameProp]}.${record[photoExtProp]})</span>`;
        } else {
            element.childNodes[2].innerHTML = `<span class="sc-fqkvVR kFhUBM"><span>Upload</span> or drop a file right here</span><span title="types: JPG,PNG" class="file-types">JPG,PNG</span>`;
        }
    }
}

export const initializeFilterData = {
    "SearchText": "",
    "StartValue": "2",
    "SearchFieldValue": "",
    "PageSize": "10",
    "AdvanceFilter": []
};

export const FileUploadChild = ({ label = '', message = '', types = [], children }) => {
    const message1 = message.split('.')
    const value = message1[0].slice(0, 15) + `.${message1[1]}`
    const renderMessage = () => {
        if (value.trim() === '.' || value.trim() === '') {
            return (
                <span className="sc-fqkvVR">
                    <span>{`Upload ${label}`}</span> or drop a file right here
                </span>
            );
        } else {
            return (
                <span className="sc-fqkvVR">
                    <span className='text-success'>{`${value}`}</span> uploaded successfully!
                </span>
            );
        }
    };

    return (
        <div className='d-flex border p-1' style={{ borderRadius:"5px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33317 6.66667H22.6665V16H25.3332V6.66667C25.3332 5.196 24.1372 4 22.6665 4H5.33317C3.8625 4 2.6665 5.196 2.6665 6.66667V22.6667C2.6665 24.1373 3.8625 25.3333 5.33317 25.3333H15.9998V22.6667H5.33317V6.66667Z" fill="#0658C2"></path>
                <path d="M10.6665 14.6667L6.6665 20H21.3332L15.9998 12L11.9998 17.3333L10.6665 14.6667Z" fill="#0658C2"></path>
                <path d="M25.3332 18.6667H22.6665V22.6667H18.6665V25.3333H22.6665V29.3333H25.3332V25.3333H29.3332V22.6667H25.3332V18.6667Z" fill="#0658C2"></path>
            </svg>
            <div className="sc-eqUAAy file-children ">
                {renderMessage()}
                {(value.trim() !== '.' && value.trim() !== '') &&
                    <span title={`types: ${types.join()}`} className="file-types text-info">{types.join()}</span>
                }
                {children}
            </div>
        </div>
    );
};
export const PleaseEnterValidateMessage = (FieldName, Type) => {
    let Result = "";
    if (Type === "1") {
        Result = "Please select " + FieldName + ".!";
    }
    else if (Type === "2") {
        Result = "Please enter Valid " + FieldName + ".!";
    }
    else if (Type === "3") {
        Result = "Please enter " + FieldName + ".!";
    }
    else if (Type === "4") {
        Result = "Request Json is not proper.!";
    }
    else if (Type === "5") {
        Result = FieldName + " should greater than 0.!";
    }
    else if (Type === "6") {
        Result = FieldName + " should be Numeric.!";
    }
    else if (Type === "7") {
        Result = FieldName + " should be less than or equal to current date.!";
    }
    else if (Type === "8") {
        Result = FieldName + " should be greater than or equal to from date.!";
    }
    else if (Type === "9") {
        Result = "Please enter Valid Token. !";
    }
    else if (Type === "10") {
        Result = "Please enter Login Token. !";
    }
    else if (Type === "11") {
        Result = "Please enter User Code. !";
    }
    else if (Type === "12") {
        Result = FieldName + " should not be greater than 100.!";
    }
    else {
        Result = "Please enter " + FieldName + ".!";
    }
    return Result;
}