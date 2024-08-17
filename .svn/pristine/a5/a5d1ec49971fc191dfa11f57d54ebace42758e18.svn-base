import Pagination from '@mui/material/Pagination';
import { useEffect, useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaFilePdf } from "react-icons/fa6";
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CommonApiData } from '../../EnvConfig/env_config';
import { ApiCall } from './CustomHooks';


export const OperationalTable = (
    {
        handleEdit,
        filterData,
        handleApprove,
        OtherExport = false,
        handlePrint,
        matchingkey,
        ClickOnLink,
        OperationFilter,
        handleDetail,
        handleCheck,
        handleCheckAll,
        checkAll,
        showCheckBox,
        handleExport,
        PageName,
        loading = false,
        Filter = true,
        handleChange1,
        currentPageNo,
        setFilterData,
        handleSorting,
        sortConfig,
        handleDelete,
        handleFilter,
        AdvancedFilter = true,
        tableData,
        children,
        onlyFilterPage = false,
        cnNo,
        setcnNo,
        LSFilter,
        setLSFilter,
        HandleScanList,
        inputPlaceHolder
    }) => {
    const commonData = CommonApiData();
    let Data = {
        "authToken": commonData.AuthToken,
        "loginToken": commonData.LoginToken,
        "userCode": commonData.UserCode,
    };
    const inputrefs = useRef([]);
    const AdvanceSearchModelcloseButtonRef = useRef(null);
    const AdvanceSearchModelInputRef = useRef([]);
    const [ModalData, setModalData] = useState([]);
    const [MainData, setMainData] = useState(tableData?.Data ? tableData?.Data : []);
    const [ModalTitleKey, setModalTitleKey] = useState([]);
    const [ModalHeaderKey, setModalHaderKey] = useState([]);
    const [AdvanceModelCleared, setAdvanceModelCleared] = useState(true);

    const ShowEyeRecords = (data, key) => {
        setModalData(data)
        setModalTitleKey(key)
        setModalHaderKey(Object?.keys(data[0]))
    };

    //const finalHeaderKeys = tableData?.HeadersKey?.filter(
    //    (key, index) => {
    //        return !tableData?.HideColumns.find((column) => key === column)
    //    }
    //);
    const finalHeaderKeys = tableData?.HeadersKey?.length > 0
        ? tableData?.HeadersKey?.filter((key) => !tableData?.HideColumns?.includes(key))
        : Array.from(
            new Set(
                tableData?.Data?.flatMap((data) => Object.keys(data))
                    .filter((columnName) => !tableData?.HideColumns?.includes(columnName))
            )
        );

    //const finalHeadersValue = tableData?.HeadersValue?.filter(
    //    (key) => {
    //        return !tableData?.HideColumns.find((column) => key === column)
    //    }
    //);

    const finalHeadersValue = (tableData?.HeadersKey?.length > 0 && tableData?.HeadersValue?.length > 0)
        ? tableData.HeadersValue.filter((key) => !tableData?.HideColumns?.includes(key))
        : Array.from(
            new Set(
                tableData.Data?.flatMap((data) => Object.keys(data))
                    .filter((columnName) => !tableData?.HideColumns?.includes(columnName))
            )
        );


    const [ColoredRow, setColoredRow] = useState('');
    // only work when id is present
    //const handleHighlight = (id) => {
    //    setColoredRow(id)
    //};

    //work when both id and index present
    const handleHighlight = (id, index) => {
        const highlightedId = id !== undefined ? id : index;
        setColoredRow(highlightedId);
    };
    /**Local Handle Shorting  in Table please don't Remove this code*/
    //const [order, setOrder] = useState('ASC');
    //const handleSorting = (col) => {
    //    if (order === 'ASC') {
    //        const sorted = [...tableData.Data].sort((a, b) =>
    //            (a[col.replaceAll(' ', '')]).toLowerCase() > (b[col.replaceAll(' ', '')]).toLowerCase() ? 1 : -1
    //        )
    //        setMainData(sorted)
    //        setOrder('DESC')
    //    }
    //    if (order === 'DESC') {
    //        const sorted = [...tableData.Data].sort((a, b) =>
    //            (a[col.replaceAll(' ', '')]).toLowerCase() < (b[col.replaceAll(' ', '')]).toLowerCase() ? 1 : -1
    //        )
    //        setMainData(sorted)
    //        setOrder('ASC')
    //    }
    //}
    /**Local Handle Shorting  in Table please don't Remove this code*/

    let RequestData = {
        "authToken": commonData.AuthToken,
        "loginToken": commonData.LoginToken,
        "userCode": commonData.UserCode,
        "PageName": PageName
    };
    const [serchingData, setSerchingData] = useState([]);
    const [advanceSearchingData, setAdvanceSearchingData] = useState([]);

    const handleResetAdvanceFilter = () => {
        let updatedDataList = advanceSearchingData?.map((item, index) => ({
            ...item,
            Value: ''
        }));
        setAdvanceSearchingData(updatedDataList);
        setFilterData({ ...filterData, AdvanceFilter: [] });
        let iscleared = AdvanceModelCleared ? false : true;
        setAdvanceModelCleared(iscleared)
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (advanceSearchingData?.length > index + 1) {
                AdvanceSearchModelInputRef.current[index + 1].focus();
            } else {
                AdvanceSearchModelInputRef.current['btnAdvSubmit'].focus();
            }
        }
    };

    const serching = async () => {
        if (Filter) {
            let data = await ApiCall('/api/AutoComplete/GetSearchingColumn', RequestData)
            setSerchingData(data.dataList)
            setAdvanceSearchingData(data.advanceDataList)
            setFilterData({ ...filterData, SearchFieldValue: data.dataList[0].valuePart })
        }
    };

    const handleShowFile = async (value) => {
        let imgresult = await ApiCall('/api/Image/GetImage', { ...Data, FormName: 'CustomerMaster', ID: value.ID, CallType: value.CallType });
        let result = imgresult.data;
        if (result.fileType === 'pdf') {
            window.open(`/PDFViewer/#${result.fileBase64}`, '_blank');
        }
        else if (result.fileType === 'down') {
            const link = document.createElement('a');
            link.href = `data:image/jpeg;base64,${result.fileBase64}`;
            link.download = 'image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        else {
            window.open(`/imageView/#${result.fileBase64}`, '_blank');
        }
    }
    const handleDownload = async (value) => {
        try {
            let imgResult = await ApiCall('/api/Image/GetImage', { ...Data, FormName: 'CustomerMaster', ID: value.ID, CallType: value.CallType });

            if (imgResult?.data?.fileBase64) {
                const base64String = imgResult.data.fileBase64.split(',')[1].trim();
                const contentType = imgResult?.data?.contentType || 'application/octet-stream';
                const dataURI = `data:${contentType};base64,${base64String}`;
                const link = document.createElement("a");
                link.href = dataURI;
                link.download = "image.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error("Base64 string is empty or undefined.");
            }
        } catch (error) {
            console.error("Error while handling download:", error);
        }
    };

    const countNo = Math.ceil((parseInt(tableData?.TotalRecord) / parseInt(tableData?.PageSize)));

    useEffect(() => {
        serching();
    }, []);

    useEffect(() => {
        setMainData(tableData?.Data)
    }, [tableData]);

    useEffect(() => {
        if (Filter || onlyFilterPage) {
            handleFilter();
        }

    }, [AdvanceModelCleared]);

    return (
        <div>  {
            tableData ? (
                <div className='main-card card border-0 mb-0' >
                    {/* Filter and Advance Filter Icon and paging*/}
                    <div className='card-header mb-1'>
                        <div className='row justify-content-between align-items-center'>
                            <div className='col-md-6'>
                                <h6 className='m-0 d-flex gap-2'>
                                    <span>{`${tableData?.TotalRecord !== undefined ? 'Total Records : ' + tableData?.TotalRecord : 'No Record Found'}`}</span>
                                    <span>{(showCheckBox || PageName === 'POD Upload') && tableData?.Data?.filter(d => d.checkStatus).length > 0 ? `, Selected: ${tableData?.Data?.filter(d => d.checkStatus).length}` : ''}</span>
                                    {tableData?.Data && tableData?.Data.length > 0 && <div className='col-md-4'>
                                        <input type="text"
                                            className="form-control search"
                                            placeholder={inputPlaceHolder ? inputPlaceHolder : "Scan CN"}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    HandleScanList()
                                                    e.preventDefault()
                                                }
                                            }}
                                            value={cnNo}
                                            onChange={(e) => setcnNo(e.target.value.trim())}
                                        />
                                    </div>}
                                </h6>
                            </div>
                            {OperationFilter ?
                                <div className='col-md-1'>
                                    <div className='d-flex justify-content-end'>

                                        <select
                                            className="form-select"
                                            aria-label="Condition"
                                            value={LSFilter?.sortBy}
                                            style={{ backgroundColor: '#FDAC41', minWidth: '65px' }}
                                            onChange={(e) =>
                                                setLSFilter({ ...LSFilter, sortBy: e.target.value }
                                                )}
                                        >
                                            <option value='FIFO'>FIFO</option>
                                            <option value='LIFO'>LIFO</option>
                                        </select>
                                    </div>
                                </div>

                                : <></>}
                            {Filter ?
                                //Normal Filter Inputs
                                <div className='col-md-8 col-lg-6 d-flex flex-row filters'>
                                    <select
                                        value={filterData?.SearchFieldValue}
                                        onChange={(e) => setFilterData({ ...filterData, SearchFieldValue: e.target.value })}
                                        className="form-select me-2"
                                        aria-label="Default select example">
                                        {Array.isArray(serchingData) ? (
                                            serchingData?.map((list, i) => (
                                                <option key={`filterList${i}`} value={list?.valuePart}> {list?.textPart}</option>
                                            ))
                                        ) : (<></>)}
                                    </select>
                                    <select className="form-select me-2" aria-label="Condition"
                                        value={filterData?.StartValue} onChange={(e) => setFilterData({ ...filterData, StartValue: e.target.value })}
                                    >
                                        <option value="1">Exactly</option>
                                        <option value="2">Contains</option>
                                        <option value="3">Start With</option>
                                    </select>
                                    <input type="text"
                                        className="form-control search"
                                        placeholder="Search"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFilter()
                                            };
                                        }}
                                        value={filterData.SearchText}
                                        onChange={(e) => setFilterData({ ...filterData, SearchText: e.target.value })}
                                    />
                                    {/*Normal Filter Button*/}
                                    <button onClick={handleFilter} className="btn search-btn me-2"><i className="fa-solid fa-magnifying-glass"></i></button>
                                    {/*Advance Filter Button*/}
                                    {
                                        advanceSearchingData && advanceSearchingData?.length !== 0 && (<button className='btn advance-search-btn' data-bs-toggle="modal" data-bs-target="#AdvanceSearchModal" >
                                            <i className="fa-solid fa-filter"></i>
                                        </button>)
                                    }
                                    {/*Page Size DropDown*/}
                                    {
                                        filterData?.PageSize ?
                                            <select className="form-select me-2" aria-label="PageSize" style={{ width: "110px" }}
                                                value={filterData?.PageSize ? filterData?.PageSize : "10"} onChange={(e) => {
                                                    setFilterData({ ...filterData, PageSize: e.target.value })
                                                    let iscleared = AdvanceModelCleared ? false : true;
                                                    setAdvanceModelCleared(iscleared)
                                                }}
                                            >
                                                <option value="10">10</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="500">500</option>
                                            </select> : <></>
                                    }

                                </div>
                                :
                                OtherExport ?
                                    <div className='col-md-8 col-lg-6 flex-row filters'>
                                        <button type="button" className="btn btn-rounded mb-0 btn-warning" style={{ float: 'right' }} name='tblExp'
                                            onClick={handleExport}
                                        >< span className=" text-warning me-2"><i className="fa fa-download text-white color-success"></i>
                                            </span>Export
                                        </button>
                                    </div>
                                    : <> {onlyFilterPage ? <>
                                        {
                                            filterData?.PageSize ?
                                                <select className="form-select me-2" aria-label="PageSize" style={{ width: "110px" }}
                                                    value={filterData?.PageSize ? filterData?.PageSize : "10"} onChange={(e) => {
                                                        setFilterData({ ...filterData, PageSize: e.target.value })
                                                        let iscleared = AdvanceModelCleared ? false : true;
                                                        setAdvanceModelCleared(iscleared)
                                                    }}
                                                >
                                                    <option value="10">10</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                    <option value="200">200</option>
                                                    <option value="500">500</option>
                                                </select> : <></>
                                        }
                                    </> : <></>}</>
                            }

                        </div>
                    </div>

                    {/* Loader in table*/}
                    {loading ?
                        <><center>
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </center></>
                        :
                        /* Table Data*/
                        <div className='card-body'>
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr className='light-bg'>
                                            {tableData?.Data && tableData?.Actions && tableData?.Actions.length > 0 && tableData?.Actions.includes('Checkbox') === false ?
                                                <th>Action</th> :
                                                <></>
                                            }
                                            {tableData?.Data && tableData?.Data[0]?.hasOwnProperty("Checkbox") && PageName !== 'LoadingSheetTally'
                                                ?
                                                <th style={{ width: showCheckBox ? '20px' : '10px' }} key="thActions">
                                                    <input
                                                        className="form-check-input mt-0"
                                                        type="checkbox"
                                                        checked={checkAll}
                                                        onChange={(e) => handleCheckAll(e.target.checked)}
                                                    />
                                                </th> : <></>
                                            }
                                            {finalHeaderKeys?.map((th, headIndex) => (
                                                <th key={`th${headIndex || 0}`} style={{ cursor: 'pointer' }}
                                                    onClick={() =>
                                                        handleSorting ?
                                                            handleSorting(finalHeadersValue[headIndex]) : ''}
                                                >
                                                    {th}
                                                    {
                                                        (sortConfig?.SortColumn !== null
                                                            && sortConfig?.SortOrder !== null
                                                            && sortConfig?.SortColumn === finalHeadersValue[headIndex]) ?
                                                            (
                                                                <>
                                                                    <i className="fa fa-arrow-up ms-2" style={{ color: sortConfig?.SortOrder !== 'DESC' ? '#d4d4d4' : 'red' }} ></i>
                                                                    <i className="fa fa-arrow-down" style={{ color: sortConfig?.SortOrder !== 'ASC' ? '#d4d4d4' : 'red' }}  ></i>
                                                                </>
                                                            )
                                                            : (
                                                                <>
                                                                    <i className="fa fa-arrow-up ms-2" style={{ color: '#d4d4d4' }}></i>
                                                                    <i className="fa fa-arrow-down" style={{ color: '#d4d4d4' }}  ></i>
                                                                </>
                                                            )
                                                    }

                                                </th> || <></>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MainData?.map((item, bodyIndex) => (
                                            <tr className={`TableTrhover ${item.Color === 'Red' && showCheckBox && 'operation'} ${ColoredRow === bodyIndex || item.Edit === ColoredRow ? 'activeTd' : ''}`} key={`row${bodyIndex}`} onClick={() => handleHighlight(item.Edit, bodyIndex)} style={{ backgroundColor: showCheckBox && item.Color }} >
                                                {tableData?.Actions && tableData?.Actions.length > 0 ? (
                                                    PageName !== 'LoadingSheetTally' && <td key={`tdAction${bodyIndex}`} style={{ textAlign: 'center', width: '0rem' }}>
                                                        {tableData.Actions?.map((btn, index) => (
                                                            <span key={index}>
                                                                {btn === 'Edit' ? <i className="fa-regular fa-pen-to-square text-success me-2" key={`row${bodyIndex}edit${index}`} title='Edit' onClick={() => handleEdit(item.Edit)} /> : (<></>)}
                                                                {btn === 'Del' ? <i className="fa-regular fa-trash-can text-danger me-2" title='Delete' key={`row${bodyIndex}del${index}`} onClick={() => handleDelete(item.Del)} /> : (<></>)}
                                                                {btn === 'Print' ? <i className="fa fa-download text-primary me-2" title='Print' key={`row${bodyIndex}print${index}`} onClick={() => handlePrint(item.Print)} /> : (<></>)}
                                                                {btn === 'Detail' ? <i className="fa fa-info-circle text-info me-2" title='Detail' role="button" key={`row${bodyIndex}Detail${index}`} onClick={() => handleDetail(item.Detail)} /> : (<></>)}
                                                                {btn === 'Checkbox' ?
                                                                    <input
                                                                        className="form-check-input mt-0"
                                                                        type="checkbox"
                                                                        checked={item.checkStatus}
                                                                        id={item.Checkbox}
                                                                        onChange={(e) => handleCheck(e.target.checked, item.Checkbox, bodyIndex)}
                                                                    />
                                                                    : (<></>)}
                                                                {btn === 'Approve' ?
                                                                    <button type="button"
                                                                        onClick={() => handleApprove(item.Approve)}
                                                                        className="ApproveBtn btn btn-rounded btn-primary">
                                                                        <span className=" text-white me-1">
                                                                            <i className="fa">&#xf0c7;</i>
                                                                        </span>Approve</button>
                                                                    : (<></>)}
                                                            </span>
                                                        ))}
                                                    </td>
                                                ) : (
                                                    <></>
                                                )}
                                                {
                                                    tableData?.Data && tableData?.Data[0]?.hasOwnProperty("Checkbox") && tableData?.Actions.includes('Checkbox') === false && PageName !== 'LoadingSheetTally' ?
                                                        <td className='text-center'>
                                                            <input
                                                                className="form-check-input mt-0"
                                                                type="checkbox"
                                                                checked={item.checkStatus}
                                                                id={item.Checkbox}
                                                                onChange={(e) => handleCheck(e.target.checked, item.Checkbox, bodyIndex)}
                                                            />
                                                        </td> : <></>
                                                }
                                                {finalHeadersValue?.map((key, tdIndex) => (
                                                    (typeof (item[key]) === 'object') ? (
                                                        Array?.isArray(item[key]) ?
                                                            (item[key].length > 0 ?
                                                                <td className='text-center' key={`key${tdIndex}`}>
                                                                    <i className="fa fa-eye"
                                                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                                        style={{ cursor: 'pointer', color: '#5a8dee' }}
                                                                        onClick={() => ShowEyeRecords(item[key], key)}
                                                                    />
                                                                </td> : <td key={`key${tdIndex}`}></td>) : (
                                                                typeof (item[key]) === 'object' && item[key]?.FileType === 'pdf' ?
                                                                    <td key={`key${tdIndex}`} className='text-center' onClick={() => { handleShowFile(item[key]) }}>
                                                                        <FaFilePdf title='open PDF' style={{ cursor: 'pointer', color: '#5a8dee', fontSize: '16px' }} />
                                                                    </td> :
                                                                    typeof (item[key]) === 'object' && item[key]?.FileType === '' ? (<td key={`key${tdIndex}`}></td>) :
                                                                        (<td key={`key${tdIndex}`} className='text-center' >
                                                                            <i className="fa fa-image me-2"
                                                                                title='show Image'
                                                                                onClick={() => { handleShowFile(item[key]) }}
                                                                                style={{ cursor: 'pointer', color: '#5a8dee', fontSize: '14px' }}
                                                                            />
                                                                            <i className='fa fa-download'
                                                                                title='Download'
                                                                                onClick={() => { handleDownload(item[key]) }}
                                                                                style={{ cursor: 'pointer', color: '#5a8dee', fontSize: '14px' }} />
                                                                        </td>))
                                                    ) :
                                                        matchingkey !== key ?
                                                            <td key={`key${tdIndex}`}>{item[key]}</td>
                                                            : <td key={`key${tdIndex}`} title='Link' style={{ color: ColoredRow === bodyIndex || item.Edit === ColoredRow ? '#000' : '' }}>
                                                                <Link to='' className='matching_key' style={{ textDecoration: "none", color: 'var(--text)', textShadow: ".7px .3px #5a8dee", fontSize: '13px' }} onClick={() => ClickOnLink(item[key])} >{item[key]}</Link>
                                                            </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {countNo > 1 ?
                                < Pagination className='pt-2' count={countNo} variant="outlined" page={currentPageNo} onChange={handleChange1} shape="rounded" />
                                : ''}
                        </div>
                    }

                    {/*  Advance Filter Modal Form*/}
                    {AdvancedFilter ?
                        <div className="modal fade" id="AdvanceSearchModal" tabIndex="-1" role="dialog" aria-labelledby="AdvanceSearchModalLabel" aria-hidden="true">
                            <div className='modal-dialog modal-lg modal-dialog-centered' style={{ width: '500px' }}>
                                <div className='modal-content main-card'>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Advance Search</h5>
                                        <button type="button" ref={AdvanceSearchModelcloseButtonRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className='row'>

                                            {Array.isArray(advanceSearchingData) ? (
                                                advanceSearchingData?.map((list, index) => (

                                                    <div key={`advancedFilterList${index}`} className='col-md-12 mb-2 d-flex justify-content-between align-items-center'>

                                                        <label className="col-md-4" style={{ textAlign: 'right' }} value={list?.valuePart}>{list?.textPart}</label>
                                                        <input type="text"
                                                            className="ps-1"
                                                            style={{ width: "20px", height: "20px" }}
                                                            placeholder={list?.operator}
                                                            value={list?.operator}
                                                            disabled />

                                                        <div className='col-md-7'>
                                                            {list.dataType === 'string' ?
                                                                <input type="text"
                                                                    className="form-control"
                                                                    ref={ref => (AdvanceSearchModelInputRef.current[index] = ref)}
                                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                                    placeholder={list?.textPart}
                                                                    value={list?.Value ? list?.Value : ''}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        const columnName = list?.valuePart;
                                                                        const operator = list?.operator;

                                                                        advanceSearchingData[index] = { ...advanceSearchingData[index], Value: value };
                                                                        setAdvanceSearchingData(advanceSearchingData)

                                                                        const existingIndex = filterData?.AdvanceFilter?.findIndex(item => item.ColumnName === columnName && item.Operator === operator);

                                                                        if (value.trim() === '') {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList.splice(existingIndex, 1);
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            }
                                                                        } else {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList[existingIndex] = { ...updatedAdvList[existingIndex], ColumnValue: value };
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            } else {
                                                                                const newAdvList = [...filterData.AdvanceFilter, { ColumnName: columnName, Operator: operator, ColumnValue: value }];
                                                                                setFilterData({ ...filterData, AdvanceFilter: newAdvList });
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                : <></>}
                                                            {list.dataType === 'bool' ?
                                                                <input
                                                                    className=""
                                                                    type="checkbox"
                                                                    checked={list?.Value ? list?.Value : ''}
                                                                    onChange={(e) => {
                                                                        const value = e.target.checked.toString();
                                                                        const columnName = list?.valuePart;
                                                                        const operator = list?.operator;
                                                                        advanceSearchingData[index] = { ...advanceSearchingData[index], Value: value };
                                                                        setAdvanceSearchingData(advanceSearchingData)

                                                                        const existingIndex = filterData?.AdvanceFilter?.findIndex(item => item.ColumnName === columnName && item.Operator === operator);

                                                                        if (value === false) {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList.splice(existingIndex, 1);
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            }
                                                                        } else {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList[existingIndex] = { ...updatedAdvList[existingIndex], ColumnValue: value.toString() };
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            } else {
                                                                                const newAdvList = [...filterData.AdvanceFilter, { ColumnName: columnName, Operator: operator, ColumnValue: value.toString() }];
                                                                                setFilterData({ ...filterData, AdvanceFilter: newAdvList });
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                : <></>}
                                                            {list.dataType === 'datetime' ?
                                                                <DatePicker
                                                                    //  selected={new Date()}
                                                                    selected={list.Value ? new Date(list.Value) : ''}
                                                                    className='form-control input-fields'
                                                                    dateFormat="dd-MMM-yyyy"
                                                                    placeholderText={list.textPart}
                                                                    inputrefs={inputrefs}
                                                                    onChange={(e) => {
                                                                        let dateArr = e?.toString()?.split(' ')
                                                                        dateArr = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`

                                                                        const columnName = list?.valuePart;

                                                                        const operator = list?.operator;

                                                                        advanceSearchingData[index] = { ...advanceSearchingData[index], Value: dateArr };
                                                                        /* console.log(advanceSearchingData[index],"jgs")*/
                                                                        setAdvanceSearchingData(advanceSearchingData)

                                                                        const existingIndex = filterData?.AdvanceFilter?.findIndex(item => item.ColumnName === columnName && item.Operator === operator);

                                                                        if (dateArr === '') {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList.splice(existingIndex, 1);
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            }
                                                                        } else {
                                                                            if (existingIndex !== -1) {
                                                                                const updatedAdvList = [...filterData.AdvanceFilter];
                                                                                updatedAdvList[existingIndex] = { ...updatedAdvList[existingIndex], ColumnValue: dateArr };
                                                                                setFilterData({ ...filterData, AdvanceFilter: updatedAdvList });
                                                                            } else {
                                                                                const newAdvList = [...filterData.AdvanceFilter, { ColumnName: columnName, Operator: operator, ColumnValue: dateArr }];
                                                                                setFilterData({ ...filterData, AdvanceFilter: newAdvList });
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                : <></>}
                                                        </div>
                                                    </div>
                                                ))

                                            ) : (<></>)}
                                        </div>
                                    </div>
                                    <div className="modal-footer p-0">
                                        <button type="button"
                                            ref={ref => (AdvanceSearchModelInputRef.current['btnAdvSubmit'] = ref)}
                                            className="btn btn-rounded btn-outline-success" onClick={(e) => {
                                                if (AdvanceSearchModelcloseButtonRef.current) {
                                                    AdvanceSearchModelcloseButtonRef.current.click();
                                                }
                                                handleFilter()
                                            }}><span className=" text-success me-2"><i className="fa-solid fa-hand-pointer"></i>
                                            </span>Submit</button>
                                        <button type="button" className="btn btn-rounded btn-outline-danger" onClick={handleResetAdvanceFilter}><span className=" text-danger me-2"><i className="fa-solid fa-refresh"></i>
                                        </span>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>}

                    {/* Modal Eye Icon Table Data in Array of Object format*/}

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ background: 'var(--background)' }}>
                                <div className="modal-header" style={{ padding: '7px 15px' }}>
                                    <h5 className="modal-title" id="exampleModalLabel">{ModalTitleKey ? ModalTitleKey : 'Show Records'}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body table-responsive" style={{ maxHeight: '210px', padding: '8px' }}>
                                    <table className="table border text-center">
                                        <thead>
                                            <tr className='light-bg'>
                                                {ModalHeaderKey?.map((th, headIndex) => (
                                                    <>
                                                        <th key={`th${headIndex || 0}`} style={{ padding: '5px 10px', background: 'var(--light-background)' }}>{th}</th>
                                                    </>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ModalData?.map((item, bodyIndex) => (
                                                <tr className="TableTrhover" key={`row${bodyIndex}`} >
                                                    {ModalHeaderKey?.map((key, tdIndex) => (
                                                        <>
                                                            <td key={`key${tdIndex}`}>{item[key]}</td>
                                                        </>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            ) : (<h5>No Record Found !</h5>)
        }
            {children}
        </div>
    )
}