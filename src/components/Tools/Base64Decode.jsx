import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const Base64Decode = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const fileType = ['txt'];
    const [isLoading, setIsLoading] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [isDisabledButton, setIsDisabledButton] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [base64Content, setBase64Content] = useState('');
    const [liveModeButton, setLiveModeButton] = useState('Live Mode Off');
    const [fileuploded, setFileUploaded] = useState('Click (or tap) here to select a file');
    const [formData, setFormData] = useState({
        initialValue: '',
        charset: 'UTF-8',
        newlines: false
    });
    const [fileUploaderFormData, setFileUploaderFormData] = useState({
        initialValue: '',
        newlines: false
    });
    const toggleLiveModeButton = () => {
        setIsDisabledButton(!isDisabledButton)
        setLiveModeButton(prevState => (prevState === 'Live Mode Off' ? 'Live Mode On' : 'Live Mode Off'));
    };
    const handleClear = () => {
        setFormData({
            initialValue: '',
            charset: 'UTF-8',
            newlines: false
        })
        setFileUploaderFormData({
            initialValue: '',
            newlines: false
        })
        setIsDisabledButton(false)
        setLiveModeButton('Live Mode Off')
        setResponseValue('')
        setFileUploaded('Click (or tap) here to select a file')
        setBase64Content('')
        setShowDownload(false)
    }
    const handleSubmit = (val) => {
        const data = val === undefined ? { ...formData } : { ...formData, initialValue: val };
        setIsLoading(true)
        post('/decode_text', { ...data }, (res) => {
            if (res.status === 'success') {
                setResponseValue(res.responseValue)
                liveModeButton === 'Live Mode Off' && AlertBox(res.status, res.message, res.focus);
                setIsLoading(false);
            }
            else if (res.status === 'error') {
                liveModeButton === 'Live Mode Off' && AlertBox(res.status, res.message, 'txtValue1');
                setIsLoading(false)
            }
        })
    }
    const handleDecodeFileUploader = () => {
        const data = {
            ...fileUploaderFormData,
        }
        setIsLoading(true)
        post('/txtfile_decoder', { ...data }, (res) => {
            if (res.status === 'success') {
                setBase64Content(res.responseValue)
                AlertBox(res.status, res.message, res.focus);
                setIsLoading(false);
                setShowDownload(true)
            }
            else if (res.status === 'error') {
                liveModeButton === 'Live Mode Off' && AlertBox(res.status, res.message, '');
                setIsLoading(false)
            }
        })
    }
    const handleDownloadFile = () => {
        if (base64Content !== '') {
            const blob = new Blob([base64Content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'decoded.txt';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    const copyToClipboard = () => {
        const textarea = textareaRef.current;
        textarea.select();
        document.execCommand('copy');
        responseValue !== '' && toast.success('Text copied to clipboard!');
    };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            AlertBox('ERROR', 'No file selected!', '');
            return;
        }
        const extArr = file.name.split(".");
        const fileExtension = extArr[extArr.length - 1];
        setIsLoading(true);
        if (fileType.includes(fileExtension.toLowerCase())) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = reader.result;
                const base64Image = img.split(',')[1];
                setIsLoading(false);
                setFileUploaded(`File Uploaded Successfully - ${file.name}`);
                setFileUploaderFormData((prev) => ({ ...prev, initialValue: base64Image }));
            };
        } else {
            setIsLoading(false);
            AlertBox('ERROR', 'Please Upload a Valid File!', '');
        }
    };

    useEffect(() => {
        document.title = 'Base64 Decode'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        isDisabledButton && setFormData(prev => ({ ...prev, charset: 'UTF-8' }))
    }, [isDisabledButton])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Base64 Decode'} </h6>
                    </div>
                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Simply enter your data then push the decode button.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Decode from Base64 format</label>
                                <textarea
                                    id='txtValue1'
                                    rows="3"
                                    type="text"
                                    className="form-control"
                                    placeholder='Type (or Paste) here...'
                                    value={formData.initialValue}
                                    onChange={(e) => {
                                        setFormData({ ...formData, initialValue: e.target.value })
                                        isDisabledButton && handleSubmit(e.target.value)
                                    }}
                                />
                            </div>
                            <p style={{ fontSize: '11px' }}><i className="fa-solid fa-circle-info me-1"></i>For encoded binaries (like images, documents, etc.) use the file upload form a little further down on this page</p>

                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <select
                                    className={`form-select w-25  ${isDisabledButton ? 'select-background' : ''}`}
                                    disabled={isDisabledButton}
                                    value={formData.charset}
                                    onChange={(e) => {
                                        setFormData({ ...formData, charset: e.target.value })
                                    }}
                                >
                                    <option value='UTF-8'>UTF-8</option>
                                    <option value='AUTO-DETECTED'>AUTO-DETECTED</option>
                                    <option value='ASCII'>ASCII</option>
                                    <option value='ISO-8859-1'>ISO-8859-1</option>
                                    <option value='ISO-8859-2'>ISO-8859-2</option>
                                    <option value='ISO-8859-6'>ISO-8859-6</option>
                                    <option value='ISO-8859-15'>ISO-8859-15</option>
                                    <option value='Windows-1252'>Windows-1252</option>
                                    <option value='ArmSCII-8'>ArmSCII-8</option>
                                    <option value='BIG-5'>BIG-5</option>
                                    <option value='CP850'>CP850</option>
                                    <option value='CP866'>CP866</option>
                                    <option value='CP932'>CP932</option>
                                    <option value='CP936'>CP936</option>
                                    <option value='CP950'>CP950</option>
                                    <option value='CP50220'>CP50220</option>
                                    <option value='CP50221'>CP50221</option>
                                    <option value='CP50222'>CP50222</option>
                                    <option value='CP51932'>CP51932</option>
                                </select>
                                Source character set
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtcheckbox1'
                                    type="checkbox"
                                    checked={formData.newlines}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => { setFormData({ ...formData, newlines: e.target.checked }) }}
                                    className=""
                                />
                                <label htmlFor='txtcheckbox1' style={{ cursor: "pointer" }}>
                                    Decode each line separately (useful for when you have multiple entries)
                                </label>
                            </div>
                            <div className='d-flex align-items-center gap-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={() => toggleLiveModeButton()}
                                    className={`btn btn-rounded ${isDisabledButton ? 'btn-info' : 'btn-secondary'}`}>
                                    {liveModeButton}</button>
                                Decode in real-time as you type or paste (supports only the UTF-8 character set)
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={() => handleSubmit()}
                                    disabled={isDisabledButton}
                                    className="btn btn-rounded btn-secondary">Decode</button>
                                Decode your data into the area bellow
                            </div>

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
                                    </span>Copy</button>

                            </div>
                            <p style={{ fontSize: '11px' }}>Select a file to upload and process, then you can download the decoded result.</p>


                            <div className='fields' style={{ width: '100%', maxWidth: '1000px', }}>
                                <label className="form-label"> Decode files to Base64 format:</label>
                                <div className="file">
                                    <span className="detail"><i className="fas fa-file-alt me-2"></i>{fileuploded}</span>
                                    <input type="file" accept=".txt" name="upload[]" onChange={handleFileUpload} id="upload"></input>
                                </div>
                            </div>

                            <p style={{ fontSize: '11px' }}><i className="fa-solid fa-circle-info me-1"></i>The maximum file size is 192MB.</p>
                            <p style={{ fontSize: '11px' }}><i className="fas fa-exclamation-triangle me-1"></i>Do not execute decoded files originated from untrusted sources.</p>
                            <div className='d-flex align-items-center gap-1 mb-2 ' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtcheckbox2'
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    checked={fileUploaderFormData.newlines}
                                    onChange={(e) => { setFileUploaderFormData({ ...fileUploaderFormData, newlines: e.target.checked }) }}
                                />
                                <label htmlFor='txtcheckbox2' style={{ cursor: "pointer" }}>
                                    Decode each line separately (useful for when you have multiple entries)
                                </label>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleDecodeFileUploader()}
                                    className="btn btn-rounded btn-secondary">Decode
                                </button>
                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                            </div>
                            {showDownload &&
                                <div className="state" data-state="success">
                                    <i className="fas fa-check-circle me-2"></i>
                                    <b>Success!</b>
                                    <br />
                                    <a onClick={handleDownloadFile} className="me-2" style={{ textDecoration: 'underline', color: "blue", cursor: 'pointer' }}>
                                        CLICK OR TAP HERE
                                    </a>
                                    to download the decoded file.
                                    <br />
                                </div>
                            }

                        </div>
                    </div>
                    <div className='card-body'>

                    </div>
                </div>
            </div>


            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>

                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        About
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Meet Base64 Decode and Encode, a simple online tool that does exactly what it says: decodes from Base64 encoding as well as encodes into it quickly and easily. Base64 encode your data without hassles or decode it into a human-readable format.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>Base64 encoding schemes are commonly used when there is a need to encode binary data, especially when that data needs to be stored and transferred over media that are designed to deal with text. This encoding helps to ensure that the data remains intact without modification during transport. Base64 is used commonly in a number of applications including email via MIME, as well as storing complex data in XML or JSON.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Advanced options</div>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Character set: </span> In case of textual data, the encoding scheme does not contain the character set, so you have to specify which character set was used during the encoding process. It is usually UTF-8, but can be many others; if you are not sure then play with the available options or try the auto-detect option. This information is used to convert the decoded data to our website's character set so that all letters and symbols can be displayed properly. Note that this is irrelevant for files since no web-safe conversions need to be applied to them.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Decode each line separately: </span> The encoded data usually consists of continuous text, so even newline characters are converted into their Base64-encoded forms. Prior to decoding, all non-encoded whitespaces are stripped from the input to safeguard the input's integrity. This option is useful if you intend to decode multiple independent data entries that are separated by line breaks.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Live mode:  </span>When you turn on this option the entered data is decoded immediately with your browser's built-in JavaScript functions, without sending any information to our servers. Currently, this mode supports only the UTF-8 character set. </li>
                    </ul>
                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Safe and secure</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>All communications with our servers come through secure SSL encrypted connections (https). We delete uploaded files from our servers immediately after being processed and the resulting downloadable file is deleted right after the first download attempt or 15 minutes of inactivity (whichever is shorter). We do not keep or inspect the contents of the submitted data or uploaded files in any way. Read our privacy policy below for more details.</p>
                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Completely free</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Our tool is free to use. From now on, you don't need to download any software for such simple tasks.</p>
                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Details of the Base64 encoding</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Base64 is a generic term for a number of similar encoding schemes that encode binary data by treating it numerically and translating it into a base-64 representation. The Base64 term originates from a specific MIME-content transfer encoding.</p>
                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Design</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The particular choice of characters to make up the 64 characters required for Base64 varies between implementations. The general rule is to choose a set of 64 characters that is both 1) part of a subset common to most encodings, and 2) also printable. This combination leaves the data unlikely to be modified in transit through systems such as email, which were traditionally not 8-bit clean. For example, MIME's Base64 implementation uses A-Z, a-z, and 0-9 for the first 62 values, as well as "+" and "/" for the last two. Other variations, usually derived from Base64, share this property but differ in the symbols chosen for the last two values; an example is the URL and filename safe "RFC 4648 / Base64URL" variant, which uses "-" and "_".</p>
                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Example</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Here's a quote snippet from Thomas Hobbes's Leviathan:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px", fontFamily: "inherit" }}>"Man is distinguished, not only by his reason, but ..."</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>This is represented as an ASCII byte sequence and encoded in MIME's Base64 scheme as follows:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCAuLi4=</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>In the above quote the encoded value of Man is TWFu. Encoded in ASCII, the letters "M", "a", and "n" are stored as the bytes 77, 97, 110, which are equivalent to "01001101", "01100001", and "01101110" in base-2. These three bytes are joined together in a 24 bit buffer producing the binary sequence "010011010110000101101110". Packs of 6 bits (6 bits have a maximum of 64 different binary values) are converted into 4 numbers (24 = 4 * 6 bits) which are then converted to their corresponding values in Base64.</p>

                    <div className="row">
                        <div className="table-responsive">
                            <table className='table table-bordered  table-striped mb-0'>
                                <tbody>
                                    <tr>
                                        <th>Text content</th>
                                        <td colSpan="8">m</td>
                                        <td colSpan="8">a</td>
                                        <td colSpan="8"> n</td>
                                    </tr>
                                    <tr>
                                        <th>ASCII</th>
                                        <td colSpan="8">77</td>
                                        <td colSpan="8">97</td>
                                        <td colSpan="8"> 110</td>
                                    </tr>
                                    <tr>
                                        <th>Bit pattern</th>
                                        <td >0</td>
                                        <td >1</td>
                                        <td >0</td>
                                        <td >0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <th>Index</th>
                                        <td colSpan="6">19</td>
                                        <td colSpan="6">22</td>
                                        <td colSpan="6"> 5</td>
                                        <td colSpan="6"> 46</td>
                                    </tr>
                                    <tr>
                                        <th>Base64-encoded</th>
                                        <td colSpan="6">T</td>
                                        <td colSpan="6">W</td>
                                        <td colSpan="6"> F</td>
                                        <td colSpan="6"> U</td>
                                    </tr>
                                    <td></td>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>As this example illustrates, Base64 encoding converts 3 uncoded bytes (in this case, ASCII characters) into 4 encoded ASCII characters.</p>
                    <p style={{ fontSize: '13px' }}><i className="fas fa-copyright me-1"></i> @2024<a href=' www.sagarinfotech.com'> www.sagarinfotech.com</a></p>
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
                            navigate('/AboutUs')

                        }} className=" btn-rounded btn btn-info"><span className="text-white me-2">
                                <i className="fas fa-users"></i>
                            </span>About us
                        </button>
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
export default Base64Decode;