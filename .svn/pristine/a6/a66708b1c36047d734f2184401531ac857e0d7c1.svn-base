
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { AlertBox } from '../CommonComponents/InputBox';

const Base64ToPdf = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState({});
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        initialValue: '',
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
        })
        setResponseValue({})
        setShow(false)
    }



    const handleSubmit = () => {
        const base64String = formData.initialValue;
        if (!base64String) {
            AlertBox('ERROR', 'Enter Base64 PDF!', 'txtValue1');
            return;
        }
        setIsLoading(true);
        try {
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const size = (blob.size / 1024).toFixed(2);
            setResponseValue({
                url,
                size,
                mimeType: blob.type,
                extension: 'pdf',
            });
            setShow(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Invalid Base64 string.', error);
            setIsLoading(false);
        }
    };






    useEffect(() => {
        document.title = 'Base64 To Pdf'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Base64 To Pdf'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>CConvert Base64 to PDF online using a free decoding tool which allows you to decode Base64 as PDF and display it directly in the browser.
                            In addition, you will receive some basic information about this PDF (MIME type, extension, size).
                            And, of course, you will have a special link to download the PDF to your device.
                            If you are looking for the reverse process, check PDF to Base64.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Base64 To Pdf converter</label>
                                <textarea
                                    id='txtValue1'
                                    rows="3"
                                    type="text"
                                    className="form-control"
                                    placeholder='Type (or Paste) here...'
                                    value={formData.initialValue}
                                    onChange={(e) => {
                                        setFormData({ ...formData, initialValue: e.target.value })
                                    }}
                                />
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>

                            {show ? <>
                                <div className="fields">
                                    <div>

                                        <iframe
                                            src={responseValue.url}
                                            width="100%"
                                            height="600"
                                            title="PDF Viewer"
                                        ></iframe>
                                    </div>
                                    {responseValue && (
                                        <div>
                                            <p style={{ fontSize: '11px', }}> <b>Size:</b> {responseValue.size}KB</p>
                                            <p style={{ fontSize: '11px' }}> <b> MIME Type: </b>{responseValue.mimeType}</p>
                                            <p style={{ fontSize: '11px' }}> <b>Extension: </b>.{responseValue.extension}</p>

                                        </div>
                                    )}
                                </div>
                            </> : <>
                                <div>
                                    <div style={{ border: "1px solid black", marginBottom: "10px", padding: "10px", borderRadius: "6px" }}>
                                        <h6 style={{ marginTop: "8px" }}>PDF DISPLAY AREA</h6>
                                        <p style={{ marginTop: "8px" }}>The result of Base64 decoding will appear here as an interactive PDF</p>
                                    </div>
                                </div>
                            </>}




                            <div className='card-body'>
                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                                {show ? <>  <a href={responseValue.url} download={`document.pdf`}>
                                    <button className="btn btn-rounded btn-primary">Download PDF</button>
                                </a></> : <></>}

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>

                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        How to convert Base64 to Video
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <ul>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Paste your string in the "Base64" field. </li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Press the "Decode Base64 to Audio" button.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Click on the Download Pdf Button to download the PDF file.</li>
                    </ul>
                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: "600", marginTop: "7px" }}>
                            <i className="fas fa-question-circle me-1"> </i>
                            About PDF
                        </div>
                        <ul>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Name: Portable Document Format </li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Developer: Adobe Inc.</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>MIME types: application/pdf, application/x-pdf, application/x-bzpdf, application/x-gzpdf</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>File Extensions: .pdf</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Uniform Type Identifier: com.adobe.pdf</li>
                        </ul>
                    </div>

                    <div style={{ fontSize: '13px', marginTop: "12px", marginBottom: '12px' }}><i className="fas fa-copyright me-1"></i> @2024<a href=' www.sagarinfotech.com'> www.sagarinfotech.com</a></div>
                    <div className='card-body'>
                        <button type="button"
                            onClick={() => {
                                navigate('/PrivacyPolicy')
                            }}
                            className=" btn-rounded btn btn-info">
                            <span className=" text-white me-2">
                                <i className="fas fa-lock"></i>
                            </span>Privacy policy</button>
                        <button type="button" onClick={() => {

                        }} className=" btn-rounded btn btn-info"><span className="text-white me-2">
                                <i className="fas fa-at"></i>
                            </span>Contact us
                        </button>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>This website uses cookies. We use cookies to personalise content/ads and to analyse our traffic.</p>
                </div>
            </div>
            {isLoading && <BlurLoader />}
        </>
    )
}
export default Base64ToPdf;
