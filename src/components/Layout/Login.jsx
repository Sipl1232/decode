import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  { RemoveSession, SetSession, config } from '../../EnvConfig/env_config';
import BlurLoader from '../CommonComponents/BlurFullPageLoader.jsx';
import { NotificationSound } from '../CommonComponents/CommonNotification';
import { ApiCall } from '../CommonComponents/CustomHooks';
export default function SignIn() {
    const inputrefs = useRef([]);
    const StaticToken = config.secret_key;
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({ userCode: '', password: '' });

    const handleLogin = async () => {
        setIsLoading(true);
        const data = {
            ...user,
            AuthToken: StaticToken,
            LoginUserCode: '',
            Source: 'web'
        }
        let res = await ApiCall(`/login`, data)
        if (res.status === 'SUCCESS') {
            SetSession('cookies', 'token', res.token);
            SetSession('localStorage', 'theme', 'light');
            SetSession('cookies', 'loginUserCode', res.loginUserCode);
            SetSession('cookies', 'userName', res.userName);
            SetSession('cookies', 'user', res)
            setTimeout(() => {
                setIsLoading(false);
                navigate(location.state || '/Dashboard')
                localStorage.setItem('ID', "10040")
            }, 700)
        } else {
            setIsLoading(false);
            NotificationSound(res.status, res.message, res.focus, inputrefs)
        }
    };

    useEffect(() => {
        inputrefs.current['txtUserCode'].focus()
        RemoveSession('cookies', 'token')
        RemoveSession('cookies', 'loginusercode')
        RemoveSession('cookies', 'username')
        RemoveSession('cookies', 'user')
    }, [])

    return (
        <>
            <div className="container-fluid bg-dark bg-login vh-100 d-flex justify-content-start align-items-center" >
                <div className="row" data-aos="zoom-in" data-aos-duration="1000" >
                    <div className=" mx-4 col-10 px-4 py-5 main-login text-black rounded">
                        <div className=''>
                            <img src="./assets/img/read-meter-logo.png" className='img1 login-cart-logo' width={300} height={70} alt="..." style={{ display: "flex" }} />
                         
                        </div>
                        <div className="">
                            <h5 className="mb-4 mt-2 text-center" style={{ textShadow: '2px 2px 2px #c7ad79' }}> Welcome To
                                <br /><span className='fw-bold ' style={{ color: "var(--mycolorFilterCheckText)", textShadow: '1px 1px 1px white' }} > Electricity & Meter Management
                                    Control System</span>
                            </h5>
                            <div className="col-lg-3 col-md-4 col-sm-6" style={{ width: '100%' }}>
                                <div className="fields">
                                    <label className="form-label" style={{ color: '#74531f', fontSize: '14px' }}>User Code</label>
                                    <input
                                        id="txtUserCode"
                                        ref={ref => (inputrefs.current['txtUserCode'] = ref)}
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name='userCode'
                                        placeholder='User Code'
                                        maxLength='50'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                inputrefs.current['txtPassword'].focus()
                                            };
                                        }}
                                        value={user.userCode}
                                        onChange={(e) => {
                                            setUser({ ...user, userCode: e.target.value })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6" style={{ width: '100%' }}>
                                <div className="fields">
                                    <label className="form-label" style={{ color: '#74531f', fontSize: '14px' }}>Password</label>
                                    <input
                                        id="txtPassword"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                               // handleLogin(e)
                                            }
                                        }}
                                        type="password"
                                        ref={ref => (inputrefs.current['txtPassword'] = ref)}
                                        className="form-control"
                                        autoComplete="off"
                                        placeholder='Password'
                                        maxLength='20'
                                        name='Password'
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="py-2 loading">
                                <button className='btn  w-100 login-btn' //onClick={handleLogin}
                                >Login</button>
                                {isLoading && (<BlurLoader />)}
                            </div>
                            <Link style={{ fontSize: "14px" }}>
                                forgot password?
                            </Link>
                            <div className='copyright'>
                                <div>Copyright 2024 © ReadMeter</div>
                                <div>Designed & Developed By Sagar Informatics Pvt. Ltd.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}





