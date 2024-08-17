import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const URLEncode = () => {
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
        separator: 'LF (Unix)',
        newlines: false,
        urlsafe: false,
        chunks: false,

    });
    const [fileUploaderFormData, setFileUploaderFormData] = useState({
        initialValue: '',
        charset: 'BINARY (no conv.)',
        separator: 'CRLF (Windows)',
        newlines: false,
        chunks: false,
        urlsafe: false,
    });
    const toggleLiveModeButton = () => {
        setIsDisabledButton(!isDisabledButton)
        setLiveModeButton(prevState => (prevState === 'Live Mode Off' ? 'Live Mode On' : 'Live Mode Off'));
    };
    const handleClear = () => {
        setFormData({
            initialValue: '',
            charset: 'UTF-8',
            separator: 'LF (Unix)',
            newlines: false,
            urlsafe: false,
            chunks: false,
        })
        setFileUploaderFormData({
            initialValue: '',
            charset: 'JIS',
            separator: 'CRLF (Windows)',
            newlines: false,
            chunks: false,
            urlsafe: false,
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
        post(`/encode_URL`, { ...data }, (res) => {
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
    };
    const handleEncodeFileUploader = () => {
        const data = {
            ...fileUploaderFormData,
        }
        setIsLoading(true)
        post('/URLfile_encoder', { ...data }, (res) => {
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
            link.download = 'Encoded.txt';
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
        document.title = 'URL Encode'
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
                        <h6 >{'URL Encode'} </h6>
                    </div>
                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Simply enter your data then push the encode button.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Encode to URL-encoded format</label>
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
                                Designation character set
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <select
                                    className="form-select w-25"
                                    style={{ backgroundColor: isDisabledButton ? '#FFEEEE' : '#fff' }}
                                    value={formData.separator}
                                    onChange={(e) => {
                                        setFormData({ ...formData, separator: e.target.value })
                                    }}
                                >
                                    <option value='LF (Unix)'>LF (Unix)</option>
                                    <option value='CRLF (Windows)'>CRLF (Windows)</option>
                                </select>
                                Designation Newline separator
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtmultiple'
                                    type="checkbox"
                                    className=""
                                    disabled={formData.chunks === true}
                                    checked={formData.newlines}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => { setFormData({ ...formData, newlines: e.target.checked }) }}
                                />
                                <label htmlFor='txtmultiple'>Encode each line separately (useful for when you have multiple entries)</label>

                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtSplit'
                                    type="checkbox"
                                    checked={formData.chunks}
                                    disabled={formData.newlines === true}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => { setFormData({ ...formData, chunks: e.target.checked }) }}
                                />
                                <label htmlFor='txtSplit'>Split lines into 76 character wide chunks (useful for MIME).</label>
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
                                    className="btn btn-rounded btn-secondary">Encode</button>
                                Encode your data into the area bellow
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
                            <p style={{ fontSize: '11px' }}>Select a file to upload and process, then you can download the Encode result.</p>


                            <div className='fields' style={{ width: '100%', maxWidth: '1000px', }}>
                                <label className="form-label"> Encode files to URL-encoded format:</label>
                                <div className="file">
                                    <span className="detail"><i className="fas fa-file-alt me-2"></i>{fileuploded}</span>
                                    <input type="file" accept=".txt" name="upload[]" onChange={handleFileUpload} id="upload"></input>
                                </div>
                            </div>
                            <p style={{ fontSize: '11px' }}><i className="fa-solid fa-circle-info me-1"></i>The maximum file size is 192MB.</p>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <select
                                    className="form-select w-25"
                                    value={fileUploaderFormData.charset}
                                    onChange={(e) => {
                                        setFileUploaderFormData({ ...fileUploaderFormData, charset: e.target.value })
                                    }}
                                >
                                    <option value='BINARY (no conv.)'>BINARY (no conv.)</option>
                                    <option value='UTF-8'>UTF-8</option>
                                    <option value='AUTO-DETECTED'>AUTO-DETECTED</option>
                                    <option value='ASCII'>ASCII</option>
                                    <option value='JIS'>JIS</option>
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
                                Designation character set
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <select
                                    className={`form-select w-25  ${(isDisabledButton || (fileUploaderFormData.newlines === false)) ? 'select-background' : ''}`}
                                    value={fileUploaderFormData.separator}
                                    disabled={(fileUploaderFormData.newlines === false)}
                                    onChange={(e) => {
                                        setFileUploaderFormData({ ...fileUploaderFormData, separator: e.target.value })
                                    }}
                                >
                                    <option value='LF (Unix)'>LF (Unix)</option>
                                    <option value='CRLF (Windows)'>CRLF (Windows)</option>
                                </select>
                                <label>Newline separator (for the "encode each line separately" and "split lines into chunks" functions).</label>
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtnewlines'
                                    type="checkbox"
                                    checked={fileUploaderFormData.newlines}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => {
                                        setFileUploaderFormData({ ...fileUploaderFormData, newlines: e.target.checked })
                                    }}
                                />
                                <label style={{ cursor: "pointer" }} htmlFor='txtnewlines'>Encode each line separately (useful for when you have multiple entries)</label>

                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtchunks'
                                    type="checkbox"
                                    checked={fileUploaderFormData.chunks}
                                    onChange={(e) => {
                                        setFileUploaderFormData({ ...fileUploaderFormData, chunks: e.target.checked })
                                    }}
                                    style={{ cursor: "pointer" }}
                                /><label style={{ cursor: "pointer" }} htmlFor='txtchunks'>Split lines into 76 character wide chunks (useful for MIME).</label>
                            </div>

                            <div className='' >
                                <button type="button"
                                    onClick={() => handleEncodeFileUploader()}
                                    className="btn btn-rounded btn-secondary">Encode
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
                                    to download the Encoded file.
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

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Meet URL Decode and Encode, a simple online tool that does exactly what it says: decodes from URL encoding as well as encodes into it quickly and easily. URL encode your data without hassles or decode it into a human-readable format.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>URL encoding, also known as "percent-encoding", is a mechanism for encoding information in a Uniform Resource Identifier (URI). Although it is known as URL encoding it is, in fact, used more generally within the main Uniform Resource Identifier (URI) set, which includes both Uniform Resource Locator (URL) and Uniform Resource Name (URN). As such it is also used in the preparation of data of the "application/x-www-form-urlencoded" media type, as is often employed in the submission of HTML form data in HTTP requests.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Advanced options</div>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Character set: </span>Our website uses the UTF-8 character set, so your input data is transmitted in that format. Change this option if you want to convert the data to another character set before encoding. Note that in case of text data, the encoding scheme does not contain the character set, so you may have to specify the appropriate set during the decoding process. As for files, the binary option is the default, which will omit any conversion; this option is required for everything except plain text documents.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Newline separator: </span>  Unix and Windows systems use different line break characters, so prior to encoding either variant will be replaced within your data by the selected option. For the files section, this is partially irrelevant since files already contain the corresponding separators, but you can define which one to use for the "encode each line separately" and "split lines into chunks" functions.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Encode each line separately:</span> Even newline characters are converted to their Base64-encoded forms. Use this option if you want to encode multiple independent data entries separated with line breaks. (*)</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Split lines into chunks: </span> The encoded data will become a continuous text without any whitespaces, so check this option if you want to break it up into multiple lines. The applied character limit is defined in the MIME (RFC 2045) specification, which states that the encoded lines must be no more than 76 characters long. (*)</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Live mode:</span>When you turn on this option the entered data is encoded immediately with your browser's built-in JavaScript functions, without sending any information to our servers. Currently this mode supports only the UTF-8 character set.</li>
                    </ul>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>(*) These options cannot be enabled simultaneously since the resulting output would not be valid for the majority of applications.</p>


                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Safe and secure</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>All communications with our servers come through secure SSL encrypted connections (https). We delete uploaded files from our servers immediately after being processed and the resulting downloadable file is deleted right after the first download attempt or 15 minutes of inactivity (whichever is shorter). We do not keep or inspect the contents of the submitted data or uploaded files in any way. Read our privacy policy below for more details.</p>
                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Completely free</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Our tool is free to use. From now on, you don't need to download any software for such simple tasks.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Details of the URL encoding</div>
                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Types of URI characters</span>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The characters allowed in a URI are either reserved or unreserved (or a percent character as part of a percent-encoding). Reserved characters are characters that sometimes have special meaning. For example, forward slash characters are used to separate different parts of a URL (or more generally, a URI). Unreserved characters have no such special meanings. Using percent-encoding, reserved characters are represented using special character sequences. The sets of reserved and unreserved characters and the circumstances under which certain reserved characters have special meaning have changed slightly with each new revision of specifications that govern URIs and URI schemes.</p>


                    <div className="row">
                        <div className="table-responsive">
                            <table className='table table-bordered  mb-0'>
                                <tbody>
                                    <tr >
                                        <th colSpan="18">RFC 3986 section 2.2 Reserved Characters (January 2005)</th>
                                    </tr>
                                    <tr colSpan="18">
                                        <td >!</td>
                                        <td >*</td>
                                        <td >'</td>
                                        <td >(</td>
                                        <td>)</td>
                                        <td>;</td>
                                        <td>:</td>
                                        <td>@</td>
                                        <td>&</td>
                                        <td>=</td>
                                        <td>+</td>
                                        <td>$</td>
                                        <td>,</td>
                                        <td>/</td>
                                        <td>?</td>
                                        <td>#</td>
                                        <td>[</td>
                                        <td>]</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-5">
                            <table className='table table-bordered mb-0'>
                                <tbody>
                                    <tr >
                                        <th colSpan="26">RFC 3986 section 2.3 Unreserved Characters (January 2005)</th>
                                    </tr>
                                    <tr  >
                                        <td >A</td>
                                        <td >B</td>
                                        <td >C</td>
                                        <td >D</td>
                                        <td>E</td>
                                        <td>F</td>
                                        <td>G</td>
                                        <td>H</td>
                                        <td>I</td>
                                        <td>J</td>
                                        <td>K</td>
                                        <td>L</td>
                                        <td>M</td>
                                        <td>N</td>
                                        <td>O</td>
                                        <td>P</td>
                                        <td>Q</td>
                                        <td>R</td>
                                        <td>S</td>
                                        <td>T</td>
                                        <td>U</td>
                                        <td>V</td>
                                        <td>W</td>
                                        <td>X</td>
                                        <td>Y</td>
                                        <td>Z</td>
                                    </tr>
                                    <tr >
                                        <td >a</td>
                                        <td >b</td>
                                        <td >c</td>
                                        <td >d</td>
                                        <td>e</td>
                                        <td>f</td>
                                        <td>g</td>
                                        <td>h</td>
                                        <td>i</td>
                                        <td>j</td>
                                        <td>k</td>
                                        <td>l</td>
                                        <td>m</td>
                                        <td>n</td>
                                        <td>o</td>
                                        <td>p</td>
                                        <td>q</td>
                                        <td>r</td>
                                        <td>s</td>
                                        <td>t</td>
                                        <td>u</td>
                                        <td>v</td>
                                        <td>w</td>
                                        <td>x</td>
                                        <td>y</td>
                                        <td>z</td>
                                    </tr>
                                    <tr>
                                        <td >0</td>
                                        <td >1</td>
                                        <td >2</td>
                                        <td >3</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>-</td>
                                        <td>_</td>
                                        <td>.</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Other characters in a URI must be percent encoded.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Percent-encoding reserved characters</span>


                    <p style={{ fontSize: '12px', marginTop: "8px" }}>When a character from the reserved set (a "reserved character") has special meaning (a "reserved purpose") in a particular context and a URI scheme says that it is necessary to use that character for some other purpose, then the character must be percent-encoded. Percent-encoding a reserved character means converting the character to its corresponding byte value in ASCII and then representing that value as a pair of hexadecimal digits. The digits, preceded by a percent sign ("%"), are then used in the URI in place of the reserved character. (For a non-ASCII character, it is typically converted to its byte sequence in UTF-8, and then each byte value is represented as above.)</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The reserved character "/", for example, if used in the "path" component of a URI, has the special meaning of being a delimiter between path segments. If, according to a given URI scheme, "/" needs to be in a path segment, then the three characters "%2F" (or "%2f") must be used in the segment instead of a "/".</p>


                    <div className="row">
                        <div className="table-responsive">
                            <table className='table table-bordered '>
                                <tbody>
                                    <tr >
                                        <th colSpan="18">Reserved characters after percent-encoding</th>
                                    </tr>
                                    <tr colSpan="18">
                                        <td >!</td>
                                        <td >#</td>
                                        <td >$</td>
                                        <td >&</td>
                                        <td>'</td>
                                        <td>(</td>
                                        <td>)</td>
                                        <td>*</td>
                                        <td>+</td>
                                        <td>,</td>
                                        <td>/</td>
                                        <td>:</td>
                                        <td>;</td>
                                        <td>=</td>
                                        <td>?</td>
                                        <td>@</td>
                                        <td>[</td>
                                        <td>]</td>
                                    </tr>
                                    <tr colSpan="18">
                                        <td >%21</td>
                                        <td >%23</td>
                                        <td >%24</td>
                                        <td >%26</td>
                                        <td >%27</td>
                                        <td >%28</td>
                                        <td >%29</td>
                                        <td >%2A</td>
                                        <td >%2B</td>
                                        <td >%2C</td>
                                        <td >%2F</td>
                                        <td >%3A</td>
                                        <td >%3B</td>
                                        <td >%3D</td>
                                        <td >%3F</td>
                                        <td >%40</td>
                                        <td >%5B</td>
                                        <td >%5D</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "2px" }}>Reserved characters that have no reserved purpose in a particular context may also be percent-encoded but are not semantically different from other characters.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>In the "query" component of a URI (the part after a "?" character), for example, "/" is still considered a reserved character but it normally has no reserved purpose (unless a particular URI scheme says otherwise). The character does not need to be percent-encoded when it has no reserved purpose.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>URIs that differ only by whether a reserved character is percent-encoded or not are normally considered not equivalent (denoting the same resource) unless it is the case that the reserved characters in question have no reserved purpose. This determination is dependent upon the rules established for reserved characters by individual URI schemes.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Percent-encoding unreserved characters</span>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Characters from the unreserved set never need to be percent-encoded.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>URIs that differ only by whether an unreserved character is percent-encoded or not are equivalent by definition, but URI processors, in practice, may not always treat them equivalently. For example, URI consumers shouldn't treat "%41" differently from "A" ("%41" is the percent-encoding of "A") or "%7E" differently from "~", but some do. For maximum interoperability, URI producers are therefore discouraged from percent-encoding unreserved characters.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Percent-encoding the percent character</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Because the percent ("%") character serves as the indicator for percent-encoded octets, it must be percent-encoded as "%25" for that octet to be used as data within a URI.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Percent-encoding arbitrary data</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Most URI schemes involve the representation of arbitrary data, such as an IP address or file system path, as components of a URI. URI scheme specifications should, but often don't, provide an explicit mapping between URI characters and all possible data values being represented by those characters.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Binary data</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Since the publication of RFC 1738 in 1994, it has been specified that schemes that provide for the representation of binary data in a URI must divide the data into 8-bit bytes and percent-encode each byte in the same manner as above. Byte value 0F (hexadecimal), for example, should be represented by "%0F", but byte value 41 (hexadecimal) can be represented by "A", or "%41". The use of unencoded characters for alphanumeric and other unreserved characters is typically preferred because it results in shorter URLs.</p>

                    <span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Character data</span>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The procedure for percent-encoding binary data has often been extrapolated, sometimes inappropriately or without being fully specified, to apply to character-based data. In the World Wide Web's formative years, when dealing with data characters in the ASCII repertoire and using their corresponding bytes in ASCII as the basis for determining percent-encoded sequences, this practice was relatively harmless; many people assumed that characters and bytes mapped one-to-one and were interchangeable. However, the need to represent characters outside the ASCII range grew quickly and URI schemes and protocols often failed to provide standard rules for preparing character data for inclusion in a URI. Web applications consequently began using different multi-byte, stateful, and other non-ASCII-compatible encodings as the basis for percent-encoding, leading to ambiguities as well as difficulty interpreting URIs reliably.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>For example, many URI schemes and protocols based on RFCs 1738 and 2396 presume that the data characters will be converted to bytes according to some unspecified character encoding before being represented in a URI by unreserved characters or percent-encoded bytes. If the scheme does not allow the URI to provide a hint as to what encoding was used, or if the encoding conflicts with the use of ASCII to percent-encode reserved and unreserved characters, then the URI cannot be reliably interpreted. Some schemes fail to account for encoding at all and instead just suggest that data characters map directly to URI characters, which leaves it up to individual users to decide whether and how to percent-encode data characters that are in neither the reserved nor unreserved sets.</p>

                    <div className="row">
                        <div className="table-responsive">
                            <table className='table table-bordered '>
                                <tbody>
                                    <tr >
                                        <th colSpan="18">Common characters after percent-encoding (ASCII or UTF-8 based)</th>
                                    </tr>
                                    <tr colSpan="18">
                                        <td >newline</td>
                                        <td >space</td>
                                        <td >"</td>
                                        <td >%</td>
                                        <td>-</td>
                                        <td>[</td>
                                        <td>]</td>
                                        <td>\</td>
                                        <td>^</td>
                                        <td>_</td>
                                        <td>`</td>
                                        <td></td>
                                        <td>|</td>
                                        <td>}</td>
                                        <td>~</td>
                                        <td>@</td>
                                    </tr>
                                    <tr colSpan="18">
                                        <td >%0A or %0D or %0D%0A</td>
                                        <td >%20</td>
                                        <td >%22</td>
                                        <td >%25</td>
                                        <td >%2D</td>
                                        <td >%2E</td>
                                        <td >%3C</td>
                                        <td >%3E</td>
                                        <td >%5C</td>
                                        <td >%5E</td>
                                        <td >%5F</td>
                                        <td >%60</td>
                                        <td >%7B</td>
                                        <td >%7C</td>
                                        <td >%7D</td>
                                        <td >%7E</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Arbitrary character data is sometimes percent-encoded and used in non-URI situations, such as for password obfuscation programs, or other system-specific translation protocols.</p>
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
export default URLEncode;





