import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { AlertBox } from '../CommonComponents/InputBox';

const Base64ToFile = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState({});
    const [show, setShow] = useState(false);
    const [typeShow, setTypeShow] = useState(''); // Corrected variable name
    const [formData, setFormData] = useState({
        initialValue: '',
    });

    const handleClear = () => {
        setFormData({ initialValue: '' });
        setResponseValue({});
        setShow(false);
    };

    const handleSubmit = () => {
        const base64String = formData.initialValue;
        if (!base64String) {
            AlertBox('ERROR', 'Enter Base64 Data!', 'txtValue1');
            return;
        }
        setIsLoading(true);
        try {
            // Decode the base64 string
            const data = base64String;
            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Infer MIME type
            const mime = inferMimeType(byteArray) || 'application/octet-stream';
            const extension = mime.split('/')[1] || 'bin';
            console.log('Detected file extension:', extension);

            // Create a Blob and URL
            const blob = new Blob([byteArray], { type: mime });
            const url = URL.createObjectURL(blob);
            const size = (blob.size / 1024).toFixed(2); // Size in KB

            // Handle different MIME types
            if (mime.startsWith('image/')) {
                setTypeShow('image');
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'image',
                });
            } else if (mime === 'application/pdf') {
                setTypeShow('pdf');
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'pdf',
                });
            } else if (mime.startsWith('audio/')) {
                const audio = new Audio(url);
                audio.onloadedmetadata = () => {
                    setResponseValue({
                        url,
                        size,
                        mimeType: blob.type,
                        extension,
                        duration: audio.duration.toFixed(2),
                        type: 'audio',
                    });
                };
                setTypeShow('audio');
            } else if (mime === 'video/mp4') {
                const video = document.createElement('video');
                video.src = url;

                video.onloadedmetadata = () => {
                    setResponseValue({
                        url,
                        size,
                        mimeType: blob.type,
                        extension,
                        duration: video.duration.toFixed(2),
                        type: 'video',
                    });
                };

                video.onerror = (e) => {
                    console.error('Error loading video:', e);
                    console.error('Error message:', e.message || 'No error message available');
                };
                video.load();
                setTypeShow('video');
            } else if (mime === 'video/x-msvideo') {
                const video = document.createElement('video');
                video.src = url;
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension:'avi',
                    duration: video.duration.toFixed(2),
                    type: 'video',
                });
                video.onloadedmetadata = () => {
                   
                };

                video.onerror = (e) => {
                    console.error('Error loading video:', e);
                    console.error('Error message:', e.message || 'No error message available');
                };

                video.load();
                setTypeShow('video/x-msvideo');
            } else if (mime === 'application/vnd.ms-excel' || mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                setTypeShow('spreadsheet');
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension: mime === 'application/vnd.ms-excel' ? 'xls' : 'xlsx', // Set the correct extension
                    type: 'spreadsheet',
                });
            }
            else if (mime === 'image/gif') {
                setTypeShow('image');
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'image',
                });
            } else if (mime === 'text/plain') {
                const text = new TextDecoder().decode(byteArray);
                setResponseValue({
                    url, 
                    size,
                    mimeType: blob.type,
                    extension: 'txt',
                    text, 
                    type: 'text',
                });
                setTypeShow('text');
            } else {
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'file',
                });
                setTypeShow('file');
            }

            setShow(true);
        } catch (error) {
            console.error('Error processing Base64 string:', error);
        } finally {
            setIsLoading(false);
            console.log('Type to show:', typeShow);
        }
    };



    const inferMimeType = (byteArray) => {
        const signature = byteArray.slice(0, 4).join(' ');
        console.log(signature)
        switch (signature) {
            case '255 216 255 224':
            case '255 216 255 225':
                return 'image/jpeg';
            case '137 80 78 71':
                return 'image/png';
            case '37 80 68 70':
            case '25 50 44 46':
                return 'application/pdf';
            case '73 68 51 3':
                return 'audio/mpeg';
            case '0 0 0 20':
            case '0 0 0 18':
            case '0 0 0 32':
                return 'video/mp4';
            case '82 73 70 70': 
                return 'video/x-msvideo';
            case '26 69 223 163': 
                return 'video/webm';
            case '208 207 17 224': 
                return 'application/vnd.ms-excel';
            case '80 75 3 4': 
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case '71 73 70 56': 
                return 'image/gif';
            case '32 32 99 111':    
                return 'text/plain';
            default:
                return null;
        }
    };


    useEffect(() => {
        document.title = 'Base64 To File';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='main-card card border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header'>
                        <h6>{'Base64 To File'}</h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>
                            Decode Base64 to file using the free online decoder, which allows you to preview files directly in the browser, as well as download them, get the hex dump for any binary data, and get summary information about the original file.
                            Please note that the preview is available only for textual values and known media files such as images, sounds, and videos.
                            In any case, you can always convert Base64 to binary and download the result as a file, regardless of its MIME type.
                            If you are looking for the reverse process, check File to Base64..
                        </p>
                        <div className='row'>
                            <div className="fields">
                                <label className="form-label">Base64 To File converter</label>
                                <textarea
                                    id='txtValue1'
                                    rows="3"
                                    type="text"
                                    className="form-control"
                                    placeholder='Type (or Paste) here...'
                                    value={formData.initialValue}
                                    onChange={(e) => setFormData({ ...formData, initialValue: e.target.value })}
                                />
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button" onClick={handleSubmit} className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>
                            {show ? <>
                                <div className="fields">
                                    {typeShow === 'image' &&
                                        <div style={{ width: '100%', height: '400px', border: "1px black" }}>
                                            <img src={responseValue?.url} alt="Uploaded" width='100%' height='100%' />
                                        </div>
                                    }
                                    {typeShow === 'pdf' &&
                                        <div>
                                            <iframe
                                                src={responseValue.url}
                                                width="100%"
                                                height="600"
                                                title="PDF Viewer"
                                            ></iframe>
                                        </div>
                                    }
                                    {typeShow === 'audio' &&
                                        <div>
                                            <audio style={{ marginBottom: "2px" }} controls src={responseValue?.url}></audio>
                                        </div>
                                    }
                                    {typeShow === 'video/x-msvideo' && responseValue?.url && (
                                        <div>File Preview Not Available</div>
                                    )}
                                    {typeShow === 'video' &&
                                        <div>
                                            <video width="500" height="300" controls src={responseValue?.url}></video>
                                        </div>
                                    }
                                    {typeShow === 'text' && (
                                        <div>
                                            <pre style={{ width: "100%", height: "300px" }}>{responseValue?.text}</pre>
                                        </div>
                                    )}
                                    {typeShow === 'spreadsheet' && (
                                        <div>File Preview Not Available</div>
                                    )}

                                    {typeShow === 'file' &&
                                        <div>File Preview (not supported)</div>
                                    }
                                    {responseValue && (
                                        <div style={{ marginTop: '10px' }}>
                                            <ul>
                                                <li style={{ fontSize: '11px', }}> <b>MIME Type:</b> {responseValue.mimeType}</li>
                                                <li style={{ fontSize: '11px', }}> <b>Extension:</b> .{responseValue.extension}</li>
                                                <li style={{ fontSize: '11px', }}> <b>Size: </b> {responseValue.size}(KB)</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </> : <>
                                <div style={{}}>
                                    <div style={{ border: "1px solid black", borderRadius: "6px", marginBottom: "10px", padding: '10px' }}>
                                        <h6 style={{ marginTop: "8px" }}>DISPLAY AREA</h6>
                                        <p style={{ marginTop: "8px" }}>The result of Base64 decoding will appear here</p>
                                    </div>
                                </div>
                            </>}
                            <div className='card-body'>
                                <button type="button" onClick={handleClear} className="btn btn-rounded btn-danger">
                                    <span className="text-white me-2">
                                        <i className="fa-solid fa-arrow-rotate-left"></i>
                                    </span>
                                    Clear
                                </button>
                                {show && typeShow === 'audio' && (
                                    <a href={responseValue.url} download={`audio.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download Audio</button>
                                    </a>
                                )}

                                {show && typeShow === 'image' && (
                                    <a href={responseValue.url} download={`image.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download Image</button>
                                    </a>
                                )}
                                {show && typeShow === 'pdf' && (
                                    <a href={responseValue.url} download={`pdf.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download PDF</button>
                                    </a>
                                )}
                                {show && typeShow === 'video' && (
                                    <a href={responseValue.url} download={`video.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download video</button>
                                    </a>
                                )}
                                {show && typeShow === 'video/x-msvideo' && (
                                    <a href={responseValue.url} download={`video.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download video</button>
                                    </a>
                                )}
                                {show && typeShow === 'text' && (
                                    <a href={responseValue.url} download={`text.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download Text</button>
                                    </a>
                                )}
                                {show && typeShow === 'spreadsheet' && (
                                    <a href={responseValue.url} download={`spreadsheet.${responseValue.extension}`}>
                                        <button className="btn btn-rounded btn-primary">Download Sheet</button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-card card border-0'>
                <div className='card-body mt-3 pb-1'>
                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        How to convert Base64 to Audio
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <ul>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Paste your string in the "Base64" field. </li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Press the "Decode Base64 to Audio" button.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Click on the filename link to download the audio file.</li>
                    </ul>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: "600", marginTop: "7px" }}>
                            <i className="fas fa-question-circle me-1"> </i>
                            What are the features of the decoder
                        </div>
                        <h6 style={{ fontSize: '12px', marginTop: "8px" }}>After decoding the Base64 string, you'll be able to:</h6>
                        <ul>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Preview the file (for example, you will see an image or video player).</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Download the file by clicking on the special link.</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Read the information about the original file (such as MIME type, extension, size).</li>
                            <li style={{ fontSize: '12px', marginTop: "8px" }}>Analyze the hex dump of the file.</li>
                        </ul>
                    </div>

                    <div style={{ fontSize: '13px', marginTop: "12px", marginBottom: '12px' }}>
                        <i className="fas fa-copyright me-1"></i> @2024
                        <a href='www.sagarinfotech.com'> www.sagarinfotech.com</a>
                    </div>
                    <div className='card-body'>
                        <button type="button" onClick={() => navigate('/PrivacyPolicy')} className="btn-rounded btn btn-info">
                            <span className="text-white me-2">
                                <i className="fas fa-lock"></i>
                            </span>
                            Privacy policy
                        </button>
                        <button type="button" onClick={() => { }} className="btn-rounded btn btn-info">
                            <span className="text-white me-2">
                                <i className="fas fa-at"></i>
                            </span>
                            Contact us
                        </button>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>
                        This website uses cookies. We use cookies to personalise content/ads and to analyse our traffic.
                    </p>
                </div>
            </div>
            {isLoading && <BlurLoader />}
        </>
    );
};

export default Base64ToFile;
