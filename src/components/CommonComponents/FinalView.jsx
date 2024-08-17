import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { FaFilePdf } from "react-icons/fa";
import { FaTruck } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoThumbsUpOutline } from "react-icons/io5";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { copyToClipboard } from '../../EnvConfig/EnvConfig';
import { setSuccessStatus } from '../../Redux/Services/CNSlice';
import { setOpen } from '../../Redux/Services/headerSlice';
import BlurLoader from '../Layout/BlurFullPageLoader';


const FinalView = ({ setValue, PageType, PopUpHanlder, loadingSuccessMsg, CNApprovalAccess, handleShowFile, handlePrintCN, isPrint, isBarCode,isPrintCN, loading, handleShowBarCode, value, isUpdate, handleUpdateLS, pagePermission }) => {

    const inputrefs = useRef([])
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false);
    const open = useSelector((state) => state.header.open);
    const SuccessMessage = useSelector((state) => state.cnFormData.SuccessMessage);
    const [copyStatus, setCopyStatus] = useState(false)
    const handleNavigate = (value, path) => {
        dispatch(setSuccessStatus(value));
        setValue('MainCN')
        navigate(path)
    };

    useEffect(() => {
        if (open) {
            function handleresize() {
                if (window.innerWidth > 1200) {
                    dispatch(setOpen(false));
                } else {
                    dispatch(setOpen(true));
                }
            };
            handleresize();
            window.addEventListener("resize", handleresize);
            return () => window.addEventListener("resize", handleresize);
        }

    }, []);

    useEffect(() => {
        if (copyStatus) {
            setTimeout(() => {
                setCopyStatus(false)
            },1000)
        }
    }, [copyStatus])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        if (PageType === 'GRNEntry') { inputrefs.current['boxNewCN'].focus() }
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="main-card rounded-0 p-4 d-flex flex-column justify-content-center" style={{ height: '90vh' }}>
                        <div className="d-flex align-items-center flex-column text-center">
                            {/*<div className="success_icon d-flex justify-content-center align-items-center mb-3">*/}
                            {/*    <img src='./images/thanku2.svg' alt='ICON' />*/}
                            {/*</div>*/}
                            <p className='m-0 mb-1' style={{ fontSize: '22px', fontFamily: 'sans-serif', fontWeight: 600, lineHeight: '1.2' }}>
                                {SuccessMessage && PageType === 'GRNEntry' ? (
                                    <>
                                        {`${SuccessMessage.split('[')[0]} [`}
                                        <Tooltip
                                            title={copyStatus ? 'Copied!' : 'Copy to clipboard!'}
                                            arrow
                                            componentsProps={{
                                                arrow: {
                                                    sx: {
                                                        color: "#5D3FD3",
                                                    }
                                                },
                                                tooltip: {
                                                    sx: {
                                                        color: "white",
                                                        backgroundColor: "#5D3FD3",
                                                    }
                                                }
                                            }}
                                        >  <span style={{ color: '#799EDE', cursor: 'pointer' }} onClick={() => {
                                            setCopyStatus(true)
                                            copyToClipboard(SuccessMessage.split('[')[1].split(']')[0].trim())
                                        }}>
                                            {SuccessMessage.split('[')[1].split(']')[0]}
                                        </span>
                                        </Tooltip>
                                        {' ]'} {SuccessMessage.split('[')[1].split(']')[1]} 
                                    </>

                                ) :
                                    PageType === 'StokeUpdate' ? loadingSuccessMsg :
                                        <>
                                        {`${loadingSuccessMsg?.split('[')[0]} [`}
                                        <Tooltip
                                            title={copyStatus ? 'Copied!' : 'Copy to clipboard!'}
                                            arrow
                                            componentsProps={{
                                                arrow: {
                                                    sx: {
                                                        color: "#5D3FD3",
                                                    }
                                                },
                                                tooltip: {
                                                    sx: {
                                                        color: "white",
                                                        backgroundColor: "#5D3FD3",
                                                    }
                                                }
                                            }}
                                        > <span style={{ color: '#799EDE', cursor: 'pointer' }} onClick={() => {
                                        setCopyStatus(true)
                                        copyToClipboard(loadingSuccessMsg?.split('[')[1]?.split(']')[0].trim())
                                    }}>
                                        {loadingSuccessMsg?.split('[')[1]?.split(']')[0]}
                                        </span></Tooltip>
                                    {' ]'} {loadingSuccessMsg?.split('[')[1]?.split(']')[1]}

                                </>}
                            </p>


                            <hr style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                borderWidth: "0",
                                borderTop: "1px solid #F5F5F5"
                            }}></hr>

                            <div className="message_body">

                                <h4 style={{ color: "#F1916D" }}>Choose Next Option</h4>

                            </div>
                            <div className="col-12 flex-row d-flex flex-wrap justify-content-center gap-3">

                                {PageType === 'GRNEntry' &&
                                    <div className="d-flex flex-column justify-content-center  align-items-center px-4 finalBook"
                                        ref={ref => inputrefs.current['boxNewCN'] = ref}
                                        style={{
                                            backgroundColor: "red", width: "150px", borderRadius: "4px", cursor: "pointer",
                                            boxShadow: isFocused && "2px 2px 8px #E05D4D"
                                        }}
                                        onClick={() => {
                                            handleNavigate(false)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleNavigate(false)
                                            }
                                        }}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        tabIndex={0}
                                    >
                                        <IoMdAdd style={{ color: "white", fontSize: "23px", marginTop: "8px", fontWeight: "bolder" }} />
                                        <p style={{ color: "white", fontSize: "10px" }}>BOOK NEW CN</p>
                                    </div>
                                }

                                {(PageType === 'LoadingSheet' || PageType === 'LoadingSheetTally' || PageType === 'UpdateLoadingSheet' || PageType === 'THCArrival' || PageType === 'StokeUpdateWithCN' || PageType === 'StokeUpdateWithPackage' || PageType === 'ManifestWithCN' || PageType === 'ManifestWithPackage' || PageType ==='DRSStatusUpdate') && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalCreateLoading " style={{ backgroundColor: "red", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => PageType ? PopUpHanlder() : navigate('/Operation/Connection/LoadingSheet')}>
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>
                                        {
                                            PageType && PageType === 'LoadingSheetTally' ?
                                                'CREATE NEW LOADING TALLY' :
                                                PageType === 'UpdateLoadingSheet' ? 'CREATE NEW MANIFEST' :
                                                    PageType === 'THCArrival' ? 'CREATE NEW THC ARRIVAL' :
                                                        PageType === 'StokeUpdateWithCN' ? 'CREATE NEW STOCK UPDATE WITH CN' :
                                                            PageType === 'StokeUpdateWithPackage' ? 'CREATE NEW STOCK UPDATE WITH PACKAGE' :
                                                            PageType === 'ManifestWithCN' ? 'CREATE NEW MANIFEST WITH CN' :
                                                                PageType === 'ManifestWithPackage' ? 'CREATE NEW MANIFEST WITH PACKAGE' : PageType === 'DRSStatusUpdate' ?'CREATE NEW DRS STATUS UPDATE':'CREATE NEW LOADING SHEET'
                                        }
                                    </p>
                                </div>}

                                {((PageType !== 'UpdateLoadingSheet' && PageType !== 'StokeUpdateWithCN' && PageType !== 'StokeUpdateWithPackage' && PageType !== 'GRNEntry' && PageType !== 'ManifestWithCN' && PageType !== 'ManifestWithPackage') && (PageType === 'LoadingSheet' && pagePermission.updateLoadingSheetPageView)) &&
                                    <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalPrint " style={{ backgroundColor: "#ffc107", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                        onClick={() => isUpdate ? handleUpdateLS() : navigate('/Operation/Connection/UpdateLoadingSheet')}
                                    >
                                        <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                        <p style={{ color: "white", fontSize: "10px" }}> {PageType === 'THCArrival' ? 'CREATE NEW STOCK UPDATE' : 'UPDATE LOADING SHEET'}</p>
                                    </div>}

                                {PageType !== 'THCArrival' && PageType !== 'StokeUpdateWithCN' && PageType !== 'StokeUpdateWithPackage' && PageType !== 'GRNEntry' && PageType !== 'DRSStatusUpdate' && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalPrint " style={{ backgroundColor: "#00B763", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => isPrint & handleShowFile()}
                                >
                                    <FaFilePdf style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px", whiteSpace: "nowrap" }}>PRINT {PageType === 'UpdateLoadingSheet' || PageType === 'ManifestWithCN' || PageType === 'ManifestWithPackage' ? 'MANIFEST' : 'LOADING SHEET'}</p>
                                </div>}

                                {PageType === 'GRNEntry' && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalPrintSticker " style={{ backgroundColor: "orange", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => isBarCode && handleShowBarCode()}
                                >
                                    <RiBarcodeBoxLine style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px", whiteSpace: "nowrap" }}>PRINT STICKER</p>
                                </div>}

                                {PageType === 'GRNEntry' && <div className="d-flex flex-column justify-content-center  align-items-center px-2 printCN " style={{ backgroundColor: "green", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => isPrintCN & handlePrintCN()}
                                >
                                    <RiBarcodeBoxLine style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px", whiteSpace: "nowrap" }}>PRINT CN</p>
                                </div>}

                                {(PageType === 'GRNEntry' && CNApprovalAccess) && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "#a913e4", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Booking/CNApproval')}
                                >
                                    <IoThumbsUpOutline style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px", whiteSpace: "nowrap" }}>APPROVE CN</p>
                                </div>}

                                {PageType === 'LoadingSheet' && pagePermission.manifestWithCNView && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "blue", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Connection/ManifestWithCN')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE MANIFEST WITH CN</p>
                                </div>}

                                {PageType === 'LoadingSheet' && pagePermission.manifestWithPackageView && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "darkblue", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Connection/ManifestWithPackage')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE MANIFEST WITH PACKAGE</p>
                                </div>}

                                {(PageType === 'ManifestWithCN' || PageType === 'ManifestWithPackage') && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "#a913e4", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Connection/THC')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE THC</p>
                                </div>}

                                {PageType === 'THCArrival' && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "#a913e4", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Arrival/StockUpdateWithCN')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE STOCK UPDATE</p>
                                </div>}
                                {PageType === 'DRSStatusUpdate' && pagePermission.podUploadPageAccess && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "#a913e4", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Delivery/PODUpload')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE POD UPLOAD</p>
                                </div>}
                                {(PageType === 'StokeUpdateWithCN' || PageType ==='StokeUpdateWithPackage') && pagePermission.drsPageAccess && <div className="d-flex flex-column justify-content-center  align-items-center px-2 finalApprove" style={{ backgroundColor: "#a913e4", width: "150px", borderRadius: "4px", cursor: "pointer" }}
                                    onClick={() => navigate('/Operation/Delivery/DRSEntry')}
                                >
                                    <FaTruck style={{ color: "white", fontSize: "20px", marginTop: "8px", fontWeight: "bolder" }} />
                                    <p style={{ color: "white", fontSize: "10px" }}>CREATE DRS</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? <BlurLoader /> : <></>}
        </>
    )
}

export default FinalView