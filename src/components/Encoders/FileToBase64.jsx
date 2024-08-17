import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import {  toast } from 'react-hot-toast';
const FileToBase64 = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [fileuploded, setFileUploaded] = useState('Click (or tap) here to select a file');
    const fileType = 'mp3,pdf,jpeg,txt,xlxx,jpg,doc,zip,mp4,xlsx,xls,gif';
    const [formData, setFormData] = useState({
        initialValue: '',
        outputFormat: 'txt',
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
            outputFormat: 'txt',
        })
        setResponseValue('')
        setFileUploaded('Click (or tap) here to select a file')
    }
    const handleSubmit = () => {
        const data = {
            ...formData,
        }
        setIsLoading(true)
        post('/base64_to_ascii', { ...data }, (res) => {
            if (res.status === 'success') {
                setResponseValue(res.responseValue)
                
                AlertBox(res.status, res.message, res.focus);
                setIsLoading(false);
            }
            else if (res.status === 'error') {
                AlertBox(res.status, res.message, '');
                setIsLoading(false)
            }
        })
    }

    const handleFileUpload = (event) => {
        setFormData((prev) => ({ ...prev, initialValue: '' }));
        setIsLoading(true);
        const file = event.target.files[0];
        if (!file) {
            AlertBox('ERROR', 'No file selected!', '');
            return;
        }
        const extArr = file.name.split(".");
        const fileExtension = extArr[extArr.length - 1];
        if (fileType.includes(fileExtension.toLowerCase())) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = reader.result;
                const base64Image = img.split(',')[1];
                setIsLoading(false);
                setFileUploaded(`File Uploaded Successfully - ${file.name}`);
                setFormData((prev) => ({ ...prev, initialValue: base64Image }));
                setResponseValue(base64Image)
            };
        } else {
            setIsLoading(false);
            AlertBox('ERROR', 'Please Upload a Valid File!', '');
        }
    };
    const copyToClipboard = () => {
        const textarea = textareaRef.current;
        textarea.select();
        document.execCommand('copy');
        responseValue !== '' && toast.success('Text copied to clipboard!'); 
    };

    useEffect(() => {
        document.title = 'File To Base64'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'File To Base64'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Encode file to Base64 online and embed it into any text document such as HTML, JSON, or XML. The fact is that if you do not convert binary to Base64, you won’t be able to insert such data into text files, because binary characters will corrupt text data. It is important to remember that the size of Base64 encoded files increases by 33%. Please note that the file to Base64 encoder accepts any file types with a size of up to 50 MB.</p>
                        <div className='row'>


                            <div className='fields' style={{ width: '100%', maxWidth: '1000px' }}>
                                <label className="form-label">File To Base64</label>
                                <div className="file">
                                    <span className="detail"><i className="fas fa-file-alt me-2"></i>{fileuploded}</span>
                                    <input
                                        type="file"
                                        name="upload[]"
                                        accept=".mp3,.pdf,.jpeg,.txt,xls,.xlsx,.jpg,.doc,.zip,.mp4,.gif"
                                        onChange={handleFileUpload}
                                        id="upload">
                                    </input>
                                </div>
                            </div>


                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <select
                                    className={`form-select w-50`}
                                    value={formData.outputFormat}
                                    onChange={(e) => {
                                        setFormData({ ...formData, outputFormat: e.target.value })
                                    }}
                                >
                                    <option value='txt'>Plain text -- just the Base64 value</option>
                                    <option value='uri'>Data URI -- data:content/type;base64</option>
                                    <option value='HTMLHyperlink'>{`HTML Hyperlink -- <a></a>`}</option>
                                    <option value='json'>{`JSON -- {audio:{mime,data}}`}</option>
                                    <option value='xml'>{`XML -- <audio></audio>`}</option>
                                </select>
                                <label>Output Format</label>
                            </div>

                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">Encode file  to Base64</button>
                            </div>
                            <p style={{ fontSize: '12px', marginTop: "8px" }}>The result of Base64 encoding will appear here</p>
                            <div className="fields">
                                <textarea
                                    id='txtValue2'
                                    rows="10"
                                    type="text"
                                    className="form-control"
                                    placeholder='Result Goes here...'
                                    value={responseValue}
                                    ref={textareaRef}
                                />
                            </div>
                            <div className='card-body'>
                                <button type="button"
                                    onClick={copyToClipboard}
                                    className="btn btn-rounded btn-secondary">
                                    <span className=" text-white me-2">
                                        <i className="fas fa-copy"></i>
                                    </span>Copy
                                </button>

                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>

                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        How to convert file to Base64 online
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <ul>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Select a local file from your computer.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>If necessary, select the desired output format</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>If necessary, select the desired output format.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Press the <span>"</span>Encode file  to Base64<span>"</span>button.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Copy the result from the <span>"</span>Base64<span>"</span>field.</li>
                    </ul>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Output formats</div>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>If you do not know what output format you need, check the following examples to see how will look the result of the same Base64-encoded file formatted in each of the available formats (as an example file I use a gzipped text file):</p>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}> Plain text: </span>Ym9keSB7DQogIGNvbG9yOnJlZA0KfQ==</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}> Data URI: </span>  data:audio/mpeg;base64,Ym9keSB7DQogIGNvbG9yOnJlZA0KfQ==</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>HTML Hyperlink:</span>{`<a href="data:application/gzip;base64,H4sICPsdulsCAHJlYWRtZS50eHQAC0/NSc7PTVUoyVdISixONTPRSy8tKlUEAPCdUNYXAAAA"></a>`}</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}> JavaScript Popup:</span>{` window.onclick = function () {this.open("data:audio/mpeg;base64,/+MYxAAEaAIEeUAQAgBgNgP/////KQQ/////Lvrg+lcWYHgtjadzsbTq+yREu49");};`}</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}> JSON:</span>{` {"audio": {"mime": "audio/mpeg","data": "/+MYxAAEaAIEeUAQAgBgNgP/////KQQ/////Lvrg+lcW" }} window.onclick = function () {this.open("data:audio/mpeg;base64,/+MYxAAEaAIEeUAQAgBgNg");};`}</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}> XML:</span>{` <?xml version="1.0" encoding="UTF-8"?><root><audio mime="audio/mpeg">/+MY+MYxBQSM0sWWVVVVVVVVVVV</audio></root>`}</li>
                    </ul>

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
export default FileToBase64;
