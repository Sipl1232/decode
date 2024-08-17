
import { useEffect } from "react";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Base64Decode from "./components/Tools/Base64Decode";
import { useNavigate } from 'react-router-dom';
//<Sidebar />

const Layout = (Props) => {
    const { Component, PageUrl } = Props;
    const navigate = useNavigate();
    return (
        <div style={{ overflowX: "hidden" }}>
            <Header />
            <div className="row" style={{ marginTop:'40px' }}>
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-6  px-md-0 px-sm-3">
                    <Component />
                    {window.location.pathname === "/" && < Base64Decode />}
                </div>
                <div className="col-md-3">
                    {/*<Sidebar />*/}
                </div>
            </div>
        </div>

    )
}
export default Layout;