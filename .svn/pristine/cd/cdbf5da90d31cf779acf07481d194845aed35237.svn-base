import Swal from 'sweetalert2';
import { GetSession, RemoveSession, SetSession } from '../../EnvConfig/env_config';
import { virtualPath } from '../../config';

export const ErrorSound = () => {
    var audio = new Audio('./Sound/Error.mp3');
    audio.play();
}

export const SuccessSound = () => {
    var audio = new Audio('./Sound/Success.mp3');
    audio.play();
}

export const NotificationSound = (status = '', message = '', focus = '', inputrefs = null, handleClear = null) => {

    const BroadcastMsg = (Key, Value) => {
        if (typeof BroadcastChannel !== 'undefined') {
            const broadcastChannel = new BroadcastChannel(virtualPath.replace("/", "-") + 'broadcast_channel');
            broadcastChannel.postMessage({ Key, Value });
        }
    };

    //document.addEventListener('click', function (event) {
    //    const backdrop = document.querySelector('.swal2-toast-shown');
    //    if (backdrop) {
    //        Swal.close();
    //    }
    //});

    const obj_status = {
        'ERROR': {
            position: "center",
            icon: 'error',
            title: 'Oops..',
            color: '#dc362e',
            sound: './Sound/Error.mp3',
        },
        'UNAUTHORIZED': {
            icon: 'error',
            title: 'Error',
            color: '#dc362e',
            sound: './Sound/Error.mp3',
        },
        'SUCCESS': {
            icon: 'success',
            title: 'Success',
            color: '#238914',
            sound: './Sound/Success.mp3',
        },
        'INFO': {
            icon: 'info',
            title: 'Information',
            color: '#2b6274',
            sound: './Sound/Success.mp3',
        }
    };
    const obj_position = {
        'top': 'top',
        'top start': 'top-start',
        'top end': 'top-end',
        'center': 'center',
        'center start': 'center-start',
        'center end': 'center-end',
        'bottom': 'bottom',
        'bottom start': 'bottom-start',
        'bottom end': 'bottom-end',
    };
    let enableNotificationSound = false;
    let _toast = false;
    let timer = 0;
    let position = obj_position?.center?.position;
    let width = 500;

    if (GetSession('localStorage', 'enableNotificationSound') === null || GetSession('localStorage', 'enableNotificationSound') === 'true') {
        enableNotificationSound = true;
    }
    if (GetSession('localStorage', 'sweetAlert_Toast') !== null && GetSession('localStorage', 'sweetAlert_Toast') !== undefined && GetSession('localStorage', 'sweetAlert_Toast') === 'true') {
        _toast = true;
    }
    if (GetSession('localStorage', 'sweetAlert_AutoHide') !== null && GetSession('localStorage', 'sweetAlert_AutoHide') !== undefined && GetSession('localStorage', 'sweetAlert_AutoHide') === 'true') {
        timer = 5000;
    }
    if (GetSession('localStorage', 'sweetAlert_Position') !== null && GetSession('localStorage', 'sweetAlert_Position') !== '' && GetSession('localStorage', 'sweetAlert_Position') !== undefined) {
        position = obj_position[GetSession('localStorage', 'sweetAlert_Position').toLowerCase()] ?? 'center'
    }
    const { icon, title, color, sound } = obj_status[status.toUpperCase()] || obj_status.ERROR;

    if (_toast) {
        timer = 3000;
        width = 400;
    }
    const options = {
        position: 'center',
        toast: _toast,
        text: message || title,
        icon,
        title: (_toast ? null : title),
        color,
        confirmButtonColor: color,
        timerProgressBar: _toast,
        showConfirmButton: !_toast,
        iconColor: color,
        timer: timer,
        width: width,
        didOpen: (toast) => {
            if (_toast) {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                //toast.addEventListener('click', () => Swal.close())

                if (status.trim().toUpperCase() === 'SUCCESS') {
                    if (handleClear !== null && inputrefs !== null) {
                        handleClear()
                    }
                }
                if (focus !== '' && inputrefs !== null && inputrefs.current[focus] !== undefined && inputrefs.current[focus]) {
                    inputrefs.current[focus].focus();
                }
            }
        },
        didClose: () => {
            if (!_toast) {
                if (status.trim().toUpperCase() === 'SUCCESS') {
                    if (handleClear !== null && inputrefs !== null) {
                        handleClear()
                    }
                }
                if (focus !== '' && inputrefs !== null && inputrefs.current[focus] !== undefined && inputrefs.current[focus]) {
                    inputrefs.current[focus].focus();
                }
            }
            if (status.trim().toUpperCase() === 'EXPIRED') {
                (async () => {

                    //await authService.logout({
                    //    UserCode: config?.UserCode ? config?.UserCode : CommonApiData().UserCode,
                    //    LoginToken: config?.LoginToken ? config?.LoginToken : CommonApiData().LoginToken,
                    //});

                    await SetSession('cookies', 'loginSessionID', 'EXPIRED')
                    let user = GetSession('cookies', 'user')
                    await SetSession('cookies', 'user', { ...user, loginSessionID: 'EXPIRED' })
                    await RemoveSession('cookies', 'BranchCodeCookie')
                    BroadcastMsg('logout', '');
                    window.location.href = '/login';
                })()
            }
        },
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
    };

    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            if (status.trim().toUpperCase() === 'SUCCESS') {
                if (handleClear !== null && inputrefs !== null) {
                    handleClear()
                }
            }
            if (focus !== '' && inputrefs !== null && inputrefs.current[focus] !== undefined && inputrefs.current[focus]) {
                inputrefs.current[focus].focus();
            }
        }
    });

    if (enableNotificationSound) {
        let audio = new Audio(sound);
        audio.play();
    }
    return;
}