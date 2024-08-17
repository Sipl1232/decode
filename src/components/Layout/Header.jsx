import { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { CommonApiData, GetSession, RemoveSession, SetSession } from "../../EnvConfig/env_config";

const Header = () => {

    const [theme, setTheme] = useState(GetSession('localStorage', 'theme'))
    const [open, setOpen] = useState(false)
    let AuthData = CommonApiData();
    const navigate = useNavigate()
    const Logout = async () => {
        await SetSession('cookies', 'loginSessionID', 'EXPIRED')
        let user = GetSession('cookies', 'user')
        await SetSession('cookies', 'user', { ...user, loginSessionID: 'EXPIRED' })
        await RemoveSession('cookies', 'branchCode')
        navigate('/login');
    };
    

    useEffect(() => {
        if (document && document.body) {
            document.body.classList.remove('light', 'dark');
            if (theme === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.add('light');
            }
        }
    }, [theme]);

    return (
        <>
            <header  className=" bg-dark fixed-top d-block d-md-flex align-items-center justify-content-between">
                <div className="d-flex gap-3 justify-content-between">
                    {/*<Link className="logo d-flex align-items-center">*/}
                    {/*    <span className="logo">*/}
                    {/*        <img //src={`assets/img/${theme === 'light' ? 'read-meter-logo.png' : 'read-meter-logo.png'}`}*/}
                    {/*            alt="" height='50px' width='240px' />*/}
                    {/*    </span>*/}
                    {/*</Link>*/}
                    {/*<i className="fa fa-bars toggle-sidebar-btn " onClick={() => setOpen(!open)} />*/}
                </div>

                <div className="d-flex align-items-center px-2 justify-content-between">
                    <div>
                        {theme === 'light' ?
                            <>
                                <MdDarkMode
                                    style={{ cursor: 'pointer' }}
                                    title='Dark'
                                    className='fs-3'
                                    onClick={(e) => {
                                        setTheme(theme === 'light' ? 'dark' : 'light')
                                        SetSession('localStorage', 'theme', theme === 'light' ? 'dark' : 'light')
                                    }}
                                /> </> :
                            <> <MdLightMode
                                title='Light'
                                className='fs-3'
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setTheme(theme === 'light' ? 'dark' : 'light')
                                    SetSession('localStorage', 'theme', theme === 'light' ? 'dark' : 'light')
                                }}
                            /></>}
                    </div>
                    <ul className="d-flex gap-3 mt-3 align-items-center" >
                        {/*<div className='user_headname text-white' style={{ fontWeight: '600' }}>{AuthData?.LoginUserCode} : {AuthData?.User}</div>*/}
                        {/*<FaPowerOff style={{ color: 'red', fontSize: '22px', cursor: 'pointer', marginRight:"15px" }} onClick={Logout} title='Logout' />*/}
                    </ul>
                </div>
            </header>
        </>
    )
}
export default Header