
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { AlertBox } from '../CommonComponents/InputBox';

const Base64ToImage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState({});
    console.log(responseValue)
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



    const inferMimeType = (byteArray) => {
        const signature = byteArray.slice(0, 4).join(' ');
        console.log(signature)
        switch (signature) {
            case '255 216 255 224':
                return 'image/jpeg';
            case '255 216 255 225':
                return 'image/jpg';
            case '137 80 78 71':
                return 'image/png';
            case '71 73 70 56':
                return 'image/gif';
            default:
                return null;
        }
    };
    const handleSubmit = () => {
        const base64String = formData.initialValue;
        if (!base64String) {
            AlertBox('ERROR', 'Enter Base64 Image!', 'txtValue1');
            return;
        }
        setIsLoading(true);
        try {
            const data = base64String;
            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            
            const mime = inferMimeType(byteArray) || 'application/octet-stream';
            const extension = mime.split('/')[1] || 'bin';
            const blob = new Blob([byteArray], { type: mime });
            const url = URL.createObjectURL(blob);
            const size = (blob.size / 1024).toFixed(2); // Size in KB
            
            if (mime.startsWith('image/')) {
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'image',
                });
            } 
            else if (mime === 'image/gif') {
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'image',
                });
            } else {
                setResponseValue({
                    url,
                    size,
                    mimeType: blob.type,
                    extension,
                    type: 'file',
                });
            }
            setShow(true);
        } catch (error) {
            console.error('Error processing Base64 string:', error);
        } finally {
            setIsLoading(false);
            console.log('Type to show:');
        }
    };

    useEffect(() => {
        document.title = 'Base64 To Image'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Base64 To Image'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Convert Base64 to image online using a free decoding tool which allows you to decode Base64 as image and preview it directly in the browser.
                            In addition, you will receive some basic information about this image (resolution, MIME type, extension, size).
                            And, of course, you will have a special link to download the image to your device.
                            If you are looking for the reverse process, check Image to Base64.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Base64 To Image converter</label>
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
                                    <div className='mb-3'>
                                        <img width="75%"
                                            height="300"
                                            src={responseValue?.url}
                                            alt="Uploaded"
                                        />
                                    </div>
                                    {responseValue && (
                                        <div>
                                            <ul>
                                             
                                                <li style={{ fontSize: '11px', }}> <b>MIME Type:</b> {responseValue.mimeType}</li>
                                                <li style={{ fontSize: '11px', }}> <b>Extension:</b> .{responseValue.extension}</li>
                                                <li style={{ fontSize: '11px', }}> <b>Size: </b> {responseValue.size}(KB)</li>

                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </> : <>

                                    <div>
                                        <div style={{ border: "1px solid black", marginBottom: "10px", padding: "10px", borderRadius: "6px" }}>

                                            <h6 style={{ marginTop: "8px" }}>IMAGE DISPLAY AREA</h6>
                                            <p style={{ marginTop: "8px" }}>The result of Base64 decoding will appear here as an interactive IMAGE</p>
                                        </div>
                                    </div>
                            </>}




                            <div className='card-body'>
                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                                {show ? <>  <a href={responseValue?.url} download={`image.${responseValue.extension}`}>
                                    <button className="btn btn-rounded btn-primary">Download Image</button>
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
                        How to convert Base64 to image online
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <ul>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Paste your string in the "Base64" field.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Press the "CONVERT" button.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Click on Download Button to download the image</li>
                    </ul>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: "600", marginTop: "7px" }}>
                            <i className="fas fa-question-circle me-1"> </i>
                            Important notes about the decoder
                        </div>
                        <p style={{ fontSize: '12px', marginTop:"7px" }} >  The "Base64 to Image" converter will force the decoding result to be displayed as an image, even if it is a different file type.
                            Therefore, if you are not sure that your Base64 string is an image, use the Base64 to file converter since it is capable of displaying various file types.
                            In any case, feel free to give it a try, since this converter will inform you if something is wrong.</p>
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
export default Base64ToImage;

